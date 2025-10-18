import React from "react";
import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import IntroSection from "@/components/ui/intro-section";
import ServicesSection from "@/components/ui/services-section";
import ResultsSection from "@/components/ui/results-section";
import FAQPreview from "@/components/ui/faq-preview";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { BANNER_LANGER_URL } from "@/lib/constants";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PaiConnect",
    "url": "https://paiconnect.nl",
    "logo": "https://paiconnect.nl/logo.png",
    "sameAs": ["https://www.linkedin.com/company/paiconnect"],
    "description": "PaiConnect helps businesses move forward faster with AI through lectures, workshops and consultancy. Automate. Accelerate. Advance.",
    "slogan": "Automate. Accelerate. Advance.",
    "areaServed": "Netherlands",
    "founder": {
      "@type": "Person",
      "name": "Daan van der Ster"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-6-23312615",
      "email": "tech@paiconnect.nl",
      "contactType": "customer service"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Lectures & Keynotes",
            "description": "Inspiring lectures about AI and quick wins for businesses.",
            "serviceType": "Educational Event"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "AI Workshops & Training",
            "description": "Hands-on training to practically implement AI.",
            "serviceType": "Training Workshop"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Consultancy & Automation", 
            "description": "Process optimization with AI, make.com and n8n.",
            "serviceType": "Business Consultancy"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead 
        title="AI lecture, workshop & workflow automation - PaiConnect"
        description="Dutch AI consultancy: practical lectures, hands-on workshops & workflow automation. Help businesses automate, accelerate & advance with proven results."
        canonical="https://paiconnect.nl"
        ogDescription="Dutch AI experts helping businesses automate, accelerate & advance with proven AI implementation results."
        structuredData={structuredData}
      />
      
      <div className="min-h-screen">
        <Navigation />
        
        <div
          className="w-full bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${BANNER_LANGER_URL})` }}
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-white/40"></div>
            <div className="relative">
              <main>
                <Hero />
                <IntroSection />
                <ServicesSection />
                <ResultsSection />
                <FAQPreview />
              </main>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
