import React from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BANNER_LANGER_URL } from "@/lib/constants";

const FAQ = () => {
  const faqs = [
    {
      question: "Wat kost een lezing of workshop?",
      answer: "Lezingen vanaf €1.500, workshops vanaf €2.000. Alle prijzen zijn excl. BTW en afhankelijk van locatie, duur en specifieke wensen."
    },
    {
      question: "Hoe snel kunnen jullie starten?",
      answer: "Binnen 2 weken kunnen we meestal starten met lezingen of workshops. Voor consultancy projecten hangt dit af van de scope en complexiteit."
    },
    {
      question: "Is dit alleen voor grote bedrijven?",
      answer: "Nee, ook voor MKB. We passen onze aanpak aan op de grootte en behoeften van jouw organisatie. Van startups tot multinationals."
    },
    {
      question: "Welke tools gebruiken jullie?",
      answer: "We werken met make.com, n8n, ChatGPT, Notion, Slack, Google Workspace, Microsoft 365 en vele andere tools. De keuze hangt af van jouw bestaande systemen."
    },
    {
      question: "Zijn workshops op maat?",
      answer: "Ja, alle workshops worden afgestemd op jouw sector, team en specifieke uitdagingen. We maken gebruik van jouw eigen cases en voorbeelden."
    },
    {
      question: "Hoe meet ik ROI?",
      answer: "We meten tijdwinst, foutreductie en procesdoorlooptijd. Gemiddeld zien klanten 30% tijdsbesparing en 50% minder fouten binnen 3 maanden."
    },
    {
      question: "Kan ik online een sessie boeken?",
      answer: "Ja, via onze contactpagina kun je direct een kennismakingsgesprek inplannen. We bespreken dan jouw specifieke behoeften."
    },
    {
      question: "Wat als we weinig AI-kennis hebben?",
      answer: "Perfect! Dan beginnen we met een basis-sessie waarin we uitleggen wat AI wel en niet kan. We zorgen ervoor dat iedereen meekan."
    },
    {
      question: "Zijn jullie GDPR-compliant?",
      answer: "Ja, data blijft veilig. We werken volgens GDPR-richtlijnen en zorgen dat alle automatiseringen privacy-vriendelijk zijn opgezet."
    },
    {
      question: "Kunnen jullie continu support leveren?",
      answer: "Ja, via ons Run & Improve retainer programma leveren we doorlopende ondersteuning, optimalisatie en nieuwe automatiseringen."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Veelgestelde vragen over AI consultancy – PaiConnect"
        description="Antwoorden op de meest gestelde vragen over AI lezingen, workshops en consultancy. Van prijzen tot implementatie."
        canonical="https://paiconnect.nl/faq"
      />
      
      <div className="min-h-screen">
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
                        Veelgestelde <span className="gradient-text">vragen</span>
                      </h1>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Alle antwoorden op vragen over onze AI-diensten, prijzen en implementatie
                      </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                      <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border rounded-lg px-6"
                          >
                            <AccordionTrigger className="text-left py-6 hover:no-underline">
                              <span className="font-semibold text-primary">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      
                      <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold mb-4">Nog andere vragen?</h2>
                        <p className="text-muted-foreground mb-6">
                          Neem contact met ons op voor een persoonlijk gesprek over jouw AI-uitdagingen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button variant="tech" asChild>
                            <a href="mailto:tech@paiconnect.nl">
                              📧 tech@paiconnect.nl
                            </a>
                          </Button>
                          <Button variant="tech" asChild>
                            <a href="tel:+31623312615">
                              📞 +31 (0)6 23 31 26 15
                            </a>
                          </Button>
                        </div>
                      </div>
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

export default FAQ;