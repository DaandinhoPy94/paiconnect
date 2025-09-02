import posthog from 'posthog-js';

// Initialize PostHog
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    posthog.init('phc_your_project_api_key_here', {
      api_host: 'https://app.posthog.com',
      loaded: (posthog) => {
        if (import.meta.env.DEV) posthog.debug();
      },
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true, // Privacy compliance
        maskInputOptions: {
          password: true,
          email: true,
        }
      }
    });
  }
};

// Base properties that get added to every event
const getBaseProperties = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionParams = JSON.parse(sessionStorage.getItem('analyticsParams') || '{}');
  
  return {
    utm_source: urlParams.get('utm_source') || sessionParams.utm_source || null,
    utm_medium: urlParams.get('utm_medium') || sessionParams.utm_medium || null,
    utm_campaign: urlParams.get('utm_campaign') || sessionParams.utm_campaign || null,
    utm_content: urlParams.get('utm_content') || sessionParams.utm_content || null,
    utm_term: urlParams.get('utm_term') || sessionParams.utm_term || null,
    referrer: sessionParams.referrer || document.referrer || null,
    landing_path: sessionParams.landing_path || window.location.pathname + window.location.search,
    page_title: document.title,
    page_path: window.location.pathname,
  };
};

// Store UTM and referrer data for session
export const initSessionTracking = () => {
  if (typeof window === 'undefined') return;
  
  const existing = JSON.parse(sessionStorage.getItem('analyticsParams') || '{}');
  if (existing.landing_path) return; // Already initialized this session
  
  const urlParams = new URLSearchParams(window.location.search);
  const params = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    referrer: document.referrer,
    landing_path: window.location.pathname + window.location.search,
    session_start: Date.now(),
  };
  
  sessionStorage.setItem('analyticsParams', JSON.stringify(params));
};

// Analytics event functions
export const analytics = {
  pageView: () => {
    posthog.capture('page_view', getBaseProperties());
  },

  navClick: (navItem: string) => {
    posthog.capture('nav_click', {
      ...getBaseProperties(),
      nav_item: navItem,
      current_page: window.location.pathname,
    });
  },

  ctaClick: (ctaText: string, ctaLocation: string, destination: string) => {
    posthog.capture('cta_click', {
      ...getBaseProperties(),
      cta_text: ctaText,
      cta_location: ctaLocation,
      destination: destination,
    });
  },

  serviceSelect: (services: string[], bookingStep: number) => {
    posthog.capture('service_select', {
      ...getBaseProperties(),
      services: services,
      booking_step: bookingStep,
    });
  },

  bookingStart: (entryPoint: string) => {
    posthog.capture('booking_start', {
      ...getBaseProperties(),
      entry_point: entryPoint,
      booking_start_time: Date.now(),
    });
    
    // Store booking start time for completion tracking
    sessionStorage.setItem('bookingStartTime', Date.now().toString());
  },

  bookingSubmitSuccess: (services: string[], hasCompany: boolean, hasPhone: boolean) => {
    const startTime = sessionStorage.getItem('bookingStartTime');
    const submissionTime = startTime ? (Date.now() - parseInt(startTime)) / 1000 : null;
    
    posthog.capture('booking_submit_success', {
      ...getBaseProperties(),
      services: services,
      has_company: hasCompany,
      has_phone: hasPhone,
      submission_time_seconds: submissionTime,
    });
    
    // Clean up
    sessionStorage.removeItem('bookingStartTime');
  },

  bookingSubmitFail: (errorType: string, errorStep: number, services: string[]) => {
    const startTime = sessionStorage.getItem('bookingStartTime');
    const submissionTime = startTime ? (Date.now() - parseInt(startTime)) / 1000 : null;
    
    posthog.capture('booking_submit_fail', {
      ...getBaseProperties(),
      error_type: errorType,
      error_step: errorStep,
      services: services,
      submission_time_seconds: submissionTime,
    });
  },

  // Identify user (only with non-PII data)
  identify: (traits: Record<string, any> = {}) => {
    // Generate anonymous user ID based on session
    const sessionId = sessionStorage.getItem('analyticsSessionId') || 
      'user_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('analyticsSessionId', sessionId);
    
    posthog.identify(sessionId, {
      ...traits,
      // Never include PII here
    });
  },
};

// Hook for tracking page views
export const usePageTracking = () => {
  if (typeof window !== 'undefined') {
    initSessionTracking();
    analytics.pageView();
  }
};