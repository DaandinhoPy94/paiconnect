import React, { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { analytics, initSessionTracking } from "@/lib/analytics";
import Index from "./pages/Index";
const BlogIndex = lazy(() => import("./pages/blog/Index"));
const BlogPost = lazy(() => import("./pages/blog/Post"));
const ServicePage = lazy(() => import("./pages/services/ServicePage"));

// Lazy load non-critical pages for better performance  
const Services = lazy(() => import("./pages/Services"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Booking = lazy(() => import("./pages/Booking"));
const BookingSuccess = lazy(() => import("./pages/BookingSuccess"));
const AIInfo = lazy(() => import("./pages/AIInfo"));
const AIToolDetail = lazy(() => import("./pages/AIToolDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Initialize analytics synchronously to avoid loading issues
const AnalyticsLoader = () => {
  useEffect(() => {
    import("@/lib/analytics").then(module => {
      module.initAnalytics();
    });
  }, []);
  return null;
};

const queryClient = new QueryClient();

// Component to track page views
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    initSessionTracking();
    analytics.pageView();
  }, [location]);
  
  return null;
};

const App = () => {
  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "PAIConnect",
                "image": "https://paiconnect.nl/og-default.jpg",
                "url": "https://paiconnect.nl/",
                "telephone": "+31-6-23312615",
                "address": {"@type": "PostalAddress", "addressCountry": "NL", "addressLocality": "Amsterdam"},
                "areaServed": "Netherlands",
                "sameAs": ["https://www.linkedin.com/company/paiconnect"]
              })}
            </script>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "PAIConnect",
                "url": "https://paiconnect.nl",
                "inLanguage": "nl-NL",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://paiconnect.nl/search?q={query}",
                  "query-input": "required name=query"
                }
              })}
            </script>
          </Helmet>
          <PageTracker />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/diensten" element={<Services />} />
              <Route path="/diensten/ai-lezingen" element={<ServicePage slug="ai-lezingen" />} />
              <Route path="/diensten/ai-workshops" element={<ServicePage slug="ai-workshops" />} />
              <Route path="/diensten/automatisering" element={<ServicePage slug="automatisering" />} />
              <Route path="/diensten/:service" element={<Services />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/over" element={<About />} />
              <Route path="/contact" element={<About />} />
              <Route path="/ai-info" element={<AIInfo />} />
              <Route path="/ai-info/:toolName" element={<AIToolDetail />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/boeken" element={<Booking />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <AnalyticsLoader />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
