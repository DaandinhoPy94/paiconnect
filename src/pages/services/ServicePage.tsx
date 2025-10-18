import React, { Suspense, useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import StructuredData from "@/components/seo/StructuredData";
import { getServiceBySlug } from "@/lib/content";

interface ServicePageProps {
  slug: "ai-lezingen" | "ai-workshops" | "automatisering";
}

const ServicePage: React.FC<ServicePageProps> = ({ slug }) => {
  const [loaded, setLoaded] = useState<{ meta: any; Content: any } | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const result = await getServiceBySlug(slug);
      if (active) setLoaded(result);
    })();
    return () => { active = false; };
  }, [slug]);

  if (!loaded) return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!loaded.Content) return <div className="container py-12">Dienst niet gevonden.</div>;

  const { meta, Content } = loaded;
  const canonical = `https://paiconnect.nl/diensten/${meta.slug}`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "inLanguage": "nl-NL",
    "name": meta.title,
    "provider": { "@type": "Organization", "name": "PAIConnect", "url": "https://paiconnect.nl" },
    "areaServed": "Netherlands",
    "description": meta.description,
    ...(meta.priceFrom ? { "offers": { "@type": "Offer", "priceCurrency": meta.currency || "EUR", "price": String(meta.priceFrom), "availability": "https://schema.org/InStock" } } : {})
  };

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description || meta.title}
        canonical={canonical}
      />
      <div className="min-h-screen">
        <Navigation />
        <main className="container py-12 prose prose-neutral max-w-none">
          <h1>{meta.title}</h1>
          <Suspense fallback={<div>Laden…</div>}>
            <Content />
          </Suspense>
        </main>
        <Footer />
      </div>
      <StructuredData data={serviceLd} />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Diensten", "item": "https://paiconnect.nl/diensten" },
          { "@type": "ListItem", "position": 2, "name": meta.title, "item": canonical }
        ]
      }} />
    </>
  );
};

export default ServicePage;


