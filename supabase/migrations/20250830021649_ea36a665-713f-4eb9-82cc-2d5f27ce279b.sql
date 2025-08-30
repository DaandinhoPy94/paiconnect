-- Update create_secure_booking function to work without rate limiting table
CREATE OR REPLACE FUNCTION public.create_secure_booking(booking_data jsonb, client_ip inet DEFAULT NULL::inet)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  booking_id uuid;
BEGIN
  SET search_path = public;
  
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
$function$

-- Update check_booking_rate_limit function to always return true (no rate limiting)
CREATE OR REPLACE FUNCTION public.check_booking_rate_limit(user_email text, user_ip inet DEFAULT NULL::inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  SET search_path = public;
  -- Always return true since we're not using rate limiting table
  RETURN true;
END;
$function$