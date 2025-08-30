-- Enable RLS on bookings table (should already be enabled)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert bookings (this policy already exists but let's ensure it's correct)
DROP POLICY IF EXISTS "anon_can_insert_bookings" ON public.bookings;
CREATE POLICY "anon_can_insert_bookings" 
ON public.bookings 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users to insert bookings
CREATE POLICY "authenticated_can_insert_bookings" 
ON public.bookings 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow authenticated users to view their own bookings (if email matches)
CREATE POLICY "users_can_view_own_bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated 
USING (email = (auth.jwt() ->> 'email'));

-- Allow service role (admin) to view all bookings
CREATE POLICY "service_role_can_view_all_bookings" 
ON public.bookings 
FOR ALL 
TO service_role 
USING (true);

-- Allow authenticated users to update their own bookings (if email matches)
CREATE POLICY "users_can_update_own_bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated 
USING (email = (auth.jwt() ->> 'email'));

-- Create an index on email for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);