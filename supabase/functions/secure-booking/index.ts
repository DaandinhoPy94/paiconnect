import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schemas
interface BookingData {
  name: string;
  email: string;
  type: string[];
  details?: string;
  date?: string;
  company?: string;
  phone?: string;
  selected_package?: string;
  price_cents?: number;
  source: string;
  payment_status: string;
}

function validateBookingData(data: any): BookingData {
  console.log('Validating booking data:', data);
  
  // Required fields validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    throw new Error('Valid email is required');
  }
  
  // Basic email format validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }
  
  if (!Array.isArray(data.type) || data.type.length === 0) {
    throw new Error('At least one service type must be selected');
  }
  
  if (!data.source || typeof data.source !== 'string') {
    throw new Error('Source is required');
  }
  
  if (!data.payment_status || typeof data.payment_status !== 'string') {
    throw new Error('Payment status is required');
  }
  
  // Optional phone validation
  if (data.phone && typeof data.phone === 'string') {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,15}$/;
    if (!phoneRegex.test(data.phone)) {
      throw new Error('Invalid phone format');
    }
  }
  
  // Sanitize and return validated data
  return {
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    type: data.type,
    details: data.details?.trim() || null,
    date: data.date || null,
    company: data.company?.trim() || null,
    phone: data.phone?.trim() || null,
    selected_package: data.selected_package || null,
    price_cents: data.price_cents || null,
    source: data.source,
    payment_status: data.payment_status
  };
}

function getClientIP(request: Request): string {
  // Try to get real IP from common headers
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return xForwardedFor.split(',')[0].trim();
  }
  
  return xRealIP || cfConnectingIP || '0.0.0.0';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Secure booking request received:', req.method);
    
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Initialize Supabase client with service role for secure operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse and validate request body
    const requestData = await req.json();
    console.log('Request data received');
    
    const validatedData = validateBookingData(requestData);
    console.log('Data validation passed');
    
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    console.log('Client IP:', clientIP);
    
    // Call secure booking function with rate limiting and validation
    const { data: bookingId, error } = await supabase.rpc('create_secure_booking', {
      booking_data: validatedData,
      client_ip: clientIP
    });

    if (error) {
      console.error('Database error:', error);
      
      // Handle specific error types
      if (error.message.includes('Rate limit exceeded')) {
        return new Response(
          JSON.stringify({
            error: 'Too many booking attempts. Please wait before trying again.',
            code: 'RATE_LIMIT_EXCEEDED'
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (error.message.includes('Invalid email') || 
          error.message.includes('Invalid phone') ||
          error.message.includes('Name must be')) {
        return new Response(
          JSON.stringify({
            error: error.message,
            code: 'VALIDATION_ERROR'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      throw error;
    }

    console.log('Booking created successfully:', bookingId);

    return new Response(
      JSON.stringify({
        success: true,
        booking_id: bookingId,
        message: 'Booking created successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing booking:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error',
        code: 'INTERNAL_ERROR'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});