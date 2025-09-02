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
      return new Response(
        JSON.stringify({ 
          ok: false, 
          message: 'Naam moet minimaal 2 karakters bevatten',
          detail: 'validation_error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (!bookingData.email || !isValidEmail(bookingData.email)) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          message: 'Geldig e-mailadres is verplicht',
          detail: 'validation_error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (!bookingData.type || !Array.isArray(bookingData.type) || bookingData.type.length === 0) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          message: 'Minimaal één service type moet geselecteerd zijn',
          detail: 'validation_error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (bookingData.phone && !isValidPhone(bookingData.phone)) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          message: 'Ongeldig telefoonnummer formaat',
          detail: 'validation_error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Sanitize inputs and prepare data
    const sanitizedData = {
      name: sanitizeString(bookingData.name),
      email: bookingData.email.toLowerCase().trim(),
      type: Array.isArray(bookingData.type) ? bookingData.type : [bookingData.type],
      details: bookingData.details ? sanitizeString(bookingData.details) : null,
      date: bookingData.date ? new Date(bookingData.date).toISOString() : null,
      company: bookingData.company ? sanitizeString(bookingData.company) : null,
      phone: bookingData.phone ? sanitizeString(bookingData.phone) : null,
      selected_package: bookingData.selected_package || null,
      price_cents: bookingData.price_cents || null,
      source: bookingData.source || 'booking_form',
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
      
      // Return specific error messages based on error type
      if (error.message.includes('Rate limit exceeded')) {
        return new Response(
          JSON.stringify({ 
            ok: false,
            message: 'Te veel aanvragen. Maximaal 5 boekingen per uur per e-mailadres.',
            detail: 'rate_limit_error'
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (error.message.includes('Invalid email format')) {
        return new Response(
          JSON.stringify({ 
            ok: false,
            message: 'Ongeldig e-mailadres formaat.',
            detail: 'validation_error'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (error.message.includes('Invalid phone format')) {
        return new Response(
          JSON.stringify({ 
            ok: false,
            message: 'Ongeldig telefoonnummer formaat.',
            detail: 'validation_error'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (error.message.includes('Name must be at least')) {
        return new Response(
          JSON.stringify({ 
            ok: false,
            message: 'Naam moet minimaal 2 karakters bevatten.',
            detail: 'validation_error'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (error.message.includes('At least one service type')) {
        return new Response(
          JSON.stringify({ 
            ok: false,
            message: 'Minimaal één service type moet geselecteerd zijn.',
            detail: 'validation_error'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Generic database error
      return new Response(
        JSON.stringify({ 
          ok: false,
          message: 'Er is een probleem opgetreden bij het opslaan. Probeer het opnieuw.',
          detail: 'database_error'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Booking created successfully with ID:', bookingId);

    return new Response(
      JSON.stringify({ 
        ok: true,
        id: bookingId,
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
        ok: false,
        message: 'Er is een onverwachte fout opgetreden. Probeer het opnieuw.',
        detail: 'unexpected_error'
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