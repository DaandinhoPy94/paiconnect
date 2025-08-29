import React from "react";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import IntroSection from "@/components/ui/intro-section";
import ServicesSection from "@/components/ui/services-section";
import ResultsSection from "@/components/ui/results-section";
import FAQPreview from "@/components/ui/faq-preview";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import backgroundBanner from "@/assets/background-banner.jpg";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PaiConnect",
    "url": "https://paiconnect.nl",
    "logo": "https://paiconnect.nl/logo.png",
    "sameAs": ["https://www.linkedin.com/company/paiconnect"],
    "description": "PaiConnect helpt bedrijven sneller vooruit met AI via lezingen, workshops en consultancy. Automate. Accelerate. Advance.",
    "founder": {
      "@type": "Person",
      "name": "Daan van der Ster"
    },
    "service": [
      {
        "@type": "Service",
        "name": "AI Lezingen & Keynotes",
        "description": "Inspirerende lezingen over AI en quick wins voor bedrijven."
      },
      {
        "@type": "Service",
        "name": "AI Workshops & Training",
        "description": "Hands-on trainingen om AI praktisch in te zetten."
      },
      {
        "@type": "Service",
        "name": "AI Consultancy & Automatisering",
        "description": "Procesoptimalisatie met AI, make.com en n8n."
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="AI consultancy & workshops voor bedrijven – PaiConnect"
        description="Ontdek hoe AI jouw bedrijf slimmer maakt. Lezingen, workshops en consultancy voor automatisering en productiviteit."
        canonical="https://paiconnect.nl"
        structuredData={structuredData}
      />
      
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundBanner})` }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <IntroSection />
          <ServicesSection />
          <ResultsSection />
          <FAQPreview />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
