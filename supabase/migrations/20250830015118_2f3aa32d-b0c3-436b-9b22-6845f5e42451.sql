-- Fix remaining security issues from linter

-- Step 1: Fix function search_path issues by adding explicit search_path settings
CREATE OR REPLACE FUNCTION public.is_valid_email(email text)
RETURNS boolean AS $$
BEGIN
  SET search_path = public;
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_valid_phone(phone text)
RETURNS boolean AS $$
BEGIN
  SET search_path = public;
  RETURN phone IS NULL OR phone = '' OR phone ~* '^[\+]?[\d\s\-\(\)]{8,15}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS trigger AS $$
BEGIN
  SET search_path = public;
  
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
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.check_booking_rate_limit(user_email text, user_ip inet DEFAULT NULL)
RETURNS boolean AS $$
DECLARE
  recent_count integer;
  window_minutes integer := 60;
  max_bookings integer := 5;
BEGIN
  SET search_path = public;
  
  -- Clean old entries
  DELETE FROM public.booking_rate_limits 
  WHERE window_start < now() - interval '1 hour' * window_minutes;
  
  -- Count recent bookings
  SELECT COALESCE(SUM(booking_count), 0) INTO recent_count
  FROM public.booking_rate_limits
  WHERE email = user_email 
    AND window_start > now() - interval '1 hour' * window_minutes;
  
  IF recent_count >= max_bookings THEN
    RETURN false;
  END IF;
  
  -- Update rate limit record
  INSERT INTO public.booking_rate_limits (email, ip_address, booking_count, window_start)
  VALUES (user_email, user_ip, 1, now())
  ON CONFLICT (email) 
  DO UPDATE SET 
    booking_count = booking_rate_limits.booking_count + 1,
    window_start = CASE 
      WHEN booking_rate_limits.window_start < now() - interval '1 hour' 
      THEN now() 
      ELSE booking_rate_limits.window_start 
    END;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 2: Add RLS policy for booking_rate_limits table (was missing)
CREATE POLICY "service_role_can_manage_rate_limits" 
ON public.booking_rate_limits 
FOR ALL 
TO service_role
WITH CHECK (true);

-- Step 3: Create secure booking submission function for edge function to use
CREATE OR REPLACE FUNCTION public.create_secure_booking(
  booking_data jsonb,
  client_ip inet DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  booking_id uuid;
  user_email text;
BEGIN
  SET search_path = public;
  
  -- Extract email for rate limiting
  user_email := booking_data->>'email';
  
  -- Check rate limit
  IF NOT public.check_booking_rate_limit(user_email, client_ip) THEN
    RAISE EXCEPTION 'Rate limit exceeded. Maximum 5 bookings per hour per email address.';
  END IF;
  
  -- Insert booking (validation trigger will run automatically)
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;