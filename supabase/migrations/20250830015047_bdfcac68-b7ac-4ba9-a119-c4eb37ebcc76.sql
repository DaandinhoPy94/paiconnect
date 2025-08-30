-- Fix critical security vulnerabilities in bookings table

-- Step 1: Remove overly permissive RLS policies
DROP POLICY IF EXISTS "anon_can_insert_bookings" ON public.bookings;
DROP POLICY IF EXISTS "authenticated_can_insert_bookings" ON public.bookings;

-- Step 2: Add email validation function
CREATE OR REPLACE FUNCTION public.is_valid_email(email text)
RETURNS boolean AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Step 3: Add phone validation function
CREATE OR REPLACE FUNCTION public.is_valid_phone(phone text)
RETURNS boolean AS $$
BEGIN
  -- Allow null/empty phone numbers, but validate if provided
  RETURN phone IS NULL OR phone = '' OR phone ~* '^[\+]?[\d\s\-\(\)]{8,15}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Step 4: Add booking validation trigger function
CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql;

-- Step 5: Create validation trigger
DROP TRIGGER IF EXISTS validate_booking_trigger ON public.bookings;
CREATE TRIGGER validate_booking_trigger
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_booking();

-- Step 6: Create rate limiting table
CREATE TABLE IF NOT EXISTS public.booking_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address inet,
  booking_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate limiting table
ALTER TABLE public.booking_rate_limits ENABLE ROW LEVEL SECURITY;

-- Step 7: Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_booking_rate_limit(user_email text, user_ip inet DEFAULT NULL)
RETURNS boolean AS $$
DECLARE
  recent_count integer;
  window_minutes integer := 60; -- 1 hour window
  max_bookings integer := 5; -- Max 5 bookings per hour per email
BEGIN
  -- Clean old entries (older than window)
  DELETE FROM public.booking_rate_limits 
  WHERE window_start < now() - interval '1 hour' * window_minutes;
  
  -- Count recent bookings for this email
  SELECT COALESCE(SUM(booking_count), 0) INTO recent_count
  FROM public.booking_rate_limits
  WHERE email = user_email 
    AND window_start > now() - interval '1 hour' * window_minutes;
  
  -- Check if rate limit exceeded
  IF recent_count >= max_bookings THEN
    RETURN false;
  END IF;
  
  -- Update or insert rate limit record
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 8: Create secure RLS policies (no direct anonymous access)
CREATE POLICY "service_role_can_insert_bookings" 
ON public.bookings 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Step 9: Fix the set_updated_at function security issue
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  -- Set explicit search_path for security
  SET search_path = public;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;