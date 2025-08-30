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
$function$;