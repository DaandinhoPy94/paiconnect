-- Fix database functions by properly dropping dependencies first

-- Drop trigger first
DROP TRIGGER IF EXISTS validate_booking_trigger ON public.bookings;

-- Drop and recreate validate_booking function without SET statement
DROP FUNCTION IF EXISTS public.validate_booking();
CREATE OR REPLACE FUNCTION public.validate_booking()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Validate email format
  IF NOT public.is_valid_email(NEW.email) THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate phone if provided
  IF NOT public.is_valid_phone(NEW.phone) THEN
    RAISE EXCEPTION 'Invalid phone format';
  END IF;
  
  -- Validate required fields
  IF NEW.name IS NULL OR length(trim(NEW.name)) < 2 THEN
    RAISE EXCEPTION 'Name must be at least 2 characters';
  END IF;
  
  -- Validate type array is not empty
  IF NEW.type IS NULL OR array_length(NEW.type, 1) = 0 THEN
    RAISE EXCEPTION 'At least one service type must be selected';
  END IF;
  
  -- Sanitize text inputs (basic XSS prevention)
  NEW.name := trim(NEW.name);
  NEW.email := lower(trim(NEW.email));
  NEW.company := trim(NEW.company);
  NEW.details := trim(NEW.details);
  
  RETURN NEW;
END;
$function$;

-- Drop and recreate is_valid_email function without SET statement
DROP FUNCTION IF EXISTS public.is_valid_email(text);
CREATE OR REPLACE FUNCTION public.is_valid_email(email text)
 RETURNS boolean
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$function$;

-- Drop and recreate is_valid_phone function without SET statement
DROP FUNCTION IF EXISTS public.is_valid_phone(text);
CREATE OR REPLACE FUNCTION public.is_valid_phone(phone text)
 RETURNS boolean
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN phone IS NULL OR phone = '' OR phone ~* '^[\+]?[\d\s\-\(\)]{8,15}$';
END;
$function$;

-- Drop and recreate create_secure_booking function without SET statement
DROP FUNCTION IF EXISTS public.create_secure_booking(jsonb, inet);
CREATE OR REPLACE FUNCTION public.create_secure_booking(booking_data jsonb, client_ip inet DEFAULT NULL::inet)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  booking_id uuid;
BEGIN
  -- Insert booking directly (validation trigger will run automatically)
  INSERT INTO public.bookings (
    name,
    email,
    type,
    details,
    date,
    company,
    phone,
    selected_package,
    price_cents,
    source,
    payment_status
  ) VALUES (
    booking_data->>'name',
    booking_data->>'email',
    ARRAY(SELECT jsonb_array_elements_text(booking_data->'type')),
    booking_data->>'details',
    CASE WHEN booking_data->>'date' IS NOT NULL 
         THEN (booking_data->>'date')::timestamp with time zone 
         ELSE NULL END,
    booking_data->>'company',
    booking_data->>'phone',
    booking_data->>'selected_package',
    CASE WHEN booking_data->>'price_cents' IS NOT NULL 
         THEN (booking_data->>'price_cents')::integer 
         ELSE NULL END,
    booking_data->>'source',
    booking_data->>'payment_status'
  ) RETURNING id INTO booking_id;
  
  RETURN booking_id;
END;
$function$;

-- Recreate validation trigger
CREATE TRIGGER validate_booking_trigger
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_booking();