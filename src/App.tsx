import React, { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { analytics, initSessionTracking } from "@/lib/analytics";
import Index from "./pages/Index";

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
          <PageTracker />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/diensten" element={<Services />} />
              <Route path="/diensten/:service" element={<Services />} />
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
