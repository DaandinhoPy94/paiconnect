import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import AIInfo from "./pages/AIInfo";
import AIToolDetail from "./pages/AIToolDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
