import React from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BANNER_LANGER_URL } from "@/lib/constants";

const Services = () => {
  const services = [
    {
      id: "lezingen",
      title: "Lezingen & Keynotes",
      subtitle: "Inspiratie en inzicht in AI",
      icon: "🎤",
      description: "Wij verzorgen lezingen die bedrijven meenemen in de huidige en toekomstige mogelijkheden van AI. Geen vaag verhaal, maar een concreet overzicht van quick wins, slimme tools en de impact op jouw sector. Ideaal voor directiesessies, kick-offs of events.",
      deliverables: [
        "45–60 minuten keynote",
        "Inclusief Q&A en slides",
        "Praktische voorbeelden"
      ],
      cta: "Boek een lezing",
      link: "/booking",
      price: "vanaf €1.500"
    },
    {
      id: "workshops",
      title: "Workshops & Training",
      subtitle: "Hands-on AI leren gebruiken",
      icon: "🎯",
      description: "In onze workshops leren medewerkers hoe ze AI écht toepassen. Van ChatGPT tot automatisering met make.com: deelnemers krijgen de tools, prompts en skills die direct bruikbaar zijn. Praktisch, concreet en afgestemd op jouw team.",
      deliverables: [
        "Prompting Basics – Hoe bouw je goede prompts?",
        "AI Tools per rol – Welke tool gebruik je waarvoor?",
        "Automatisering – Intro make.com en n8n"
      ],
      cta: "Plan een workshop",
      link: "/booking",
      price: "vanaf €2.000 per dagdeel"
    },
    {
      id: "consultancy",
      title: "Consultancy & Automatisering",
      subtitle: "Slimme processen, meer resultaat",
      icon: "⚙️",
      description: "Wij analyseren en verbeteren bedrijfsprocessen met en zonder AI. Van workflow automation (Drive, Slack, Notion, CRM) tot integraties en dashboards. Doel: minder handmatig werk, meer snelheid en betrouwbaarheid.",
      deliverables: [
        "Audit Sprint – 1–2 weken scan + advies",
        "Implement Sprint – 2–4 weken uitvoering",
        "Run & Improve – Doorlopende optimalisatie"
      ],
      cta: "Start met een Audit",
      price: "vanaf €120/uur of projectprijs"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Consultancy and Training",
    "provider": {
      "@type": "Organization",
      "name": "PaiConnect",
      "url": "https://paiconnect.nl"
    },
    "areaServed": "Netherlands",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Lectures & Keynotes",
            "description": "Inspiring presentations about AI applications for organizations. Concrete overview of quick wins, smart tools and sector impact.",
            "serviceType": "Educational Lecture"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "1500",
            "priceCurrency": "EUR",
            "description": "Starting from €1,500"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "AI Workshops & Training",
            "description": "Hands-on workshops where employees learn to actually apply AI. From ChatGPT to automation with make.com: participants get tools, prompts and skills that are immediately usable.",
            "serviceType": "Training Workshop"
          },
          "priceSpecification": {
            "@type": "PriceSpecification", 
            "price": "2000",
            "priceCurrency": "EUR",
            "description": "Starting from €2,000 per half-day"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "AI Consultancy & Automation",
            "description": "Analysis and improvement of business processes with and without AI. From workflow automation to integrations and dashboards.",
            "serviceType": "Business Consultancy"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "120", 
            "priceCurrency": "EUR",
            "unitText": "per hour",
            "description": "Starting from €120/hour or project price"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead 
        title="AI lecture, workshop & automation services - PaiConnect"
        description="Professional AI services: inspiring lectures, practical workshops & workflow automation consultancy. Transform your business with proven AI implementation."
        canonical="https://paiconnect.nl/diensten"
        ogDescription="Professional AI lectures, workshops & automation. Transform your business with proven implementation."
        structuredData={structuredData}
      />
      
      <div>
        <Navigation />
        
        <div
          className="w-full bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${BANNER_LANGER_URL})` }}
        >
          <main>
            <section className="py-16 md:py-24">
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 bg-white/40"></div>
                <div className="relative">
                  <div className="container">
                    <div className="text-center mb-16">
                      <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Onze <span className="gradient-text">AI-diensten</span>
                      </h1>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Van inspiratie tot implementatie - wij begeleiden jouw organisatie door de hele AI-transformatie
                      </p>
                    </div>
                    
                    <div className="space-y-16">
                      {services.map((service, index) => (
                        <Card key={service.id} className="card-hover">
                          <div className="grid md:grid-cols-2 gap-8 p-8">
                            <div>
                              <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="text-5xl">{service.icon}</div>
                                  <div>
                                    <CardTitle className="text-2xl text-primary">
                                      {service.title}
                                    </CardTitle>
                                    <p className="text-muted-foreground">{service.subtitle}</p>
                                  </div>
                                </div>
                              </CardHeader>
                              
                              <CardContent className="p-0">
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                  {service.description}
                                </p>
                                
                                <div className="mb-6">
                                  <h3 className="font-semibold mb-3">Wat je krijgt:</h3>
                                  <ul className="space-y-2">
                                    {service.deliverables.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">✓</span>
                                        <span className="text-sm text-muted-foreground">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Prijs</p>
                                    <p className="text-lg font-semibold text-primary">{service.price}</p>
                                  </div>
                                   <Button variant="tech" asChild>
                                     <Link to={service.link || "/booking"}>
                                       {service.cta}
                                     </Link>
                                   </Button>
                                </div>
                              </CardContent>
                            </div>
                            
                            <div className="flex items-center justify-center bg-gradient-subtle rounded-lg p-8">
                              <div className="text-center">
                                <div className="text-8xl mb-4 opacity-50">{service.icon}</div>
                                <p className="text-muted-foreground">
                                  Praktische AI-implementatie voor moderne bedrijven
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Services;