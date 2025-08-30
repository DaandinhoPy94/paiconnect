import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  payment_status?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Secure booking function called');
    
    // Initialize Supabase client with service role key for database access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const requestBody = await req.json();
    const bookingData = requestBody.bookingData || requestBody;
    
    // Get client IP for rate limiting (extract first IP from x-forwarded-for)
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIP = forwardedFor 
      ? forwardedFor.split(',')[0].trim() 
      : req.headers.get('x-real-ip') || '127.0.0.1';
    
    console.log('Processing booking for:', bookingData?.email);
    console.log('Request body structure:', Object.keys(requestBody));
    console.log('Client IP:', clientIP);

    // Server-side validation
    if (!bookingData.name || bookingData.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    
    if (!bookingData.email || !isValidEmail(bookingData.email)) {
      throw new Error('Valid email is required');
    }
    
    if (!bookingData.type || bookingData.type.length === 0) {
      throw new Error('At least one service type must be selected');
    }

    if (bookingData.phone && !isValidPhone(bookingData.phone)) {
      throw new Error('Invalid phone number format');
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeString(bookingData.name),
      email: bookingData.email.toLowerCase().trim(),
      type: bookingData.type,
      details: bookingData.details ? sanitizeString(bookingData.details) : null,
      date: bookingData.date || null,
      company: bookingData.company ? sanitizeString(bookingData.company) : null,
      phone: bookingData.phone ? sanitizeString(bookingData.phone) : null,
      selected_package: bookingData.selected_package || null,
      price_cents: bookingData.price_cents || null,
      source: bookingData.source,
      payment_status: bookingData.payment_status || 'pending'
    };

    console.log('Calling secure booking function with sanitized data');

    // Call the secure database function
    const { data: bookingId, error } = await supabase.rpc('create_secure_booking', {
      booking_data: sanitizedData,
      client_ip: clientIP
    });

    if (error) {
      console.error('Database error:', error);
      
      // Return user-friendly error messages
      if (error.message.includes('Rate limit exceeded')) {
        return new Response(
          JSON.stringify({ 
            error: 'Te veel aanvragen. Maximaal 5 boekingen per uur per e-mailadres.' 
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (error.message.includes('Invalid email format')) {
        return new Response(
          JSON.stringify({ error: 'Ongeldig e-mailadres formaat.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (error.message.includes('Invalid phone format')) {
        return new Response(
          JSON.stringify({ error: 'Ongeldig telefoonnummer formaat.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw error;
    }

    console.log('Booking created successfully with ID:', bookingId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        bookingId,
        message: 'Boeking succesvol aangemaakt'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in secure-booking function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Er is een onverwachte fout opgetreden' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Utility functions for validation and sanitization
function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,15}$/;
  return phoneRegex.test(phone);
}

function sanitizeString(input: string): string {
  // Basic XSS prevention - remove HTML tags and trim
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}