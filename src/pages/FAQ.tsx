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
      question: "What does an AI lecture or workshop cost?",
      answer: "Lectures start from €1,500, workshops from €2,000. All prices exclude VAT and depend on location, duration and specific requirements. We customize every session to your needs and industry."
    },
    {
      question: "How quickly can you start with our AI project?",
      answer: "Within 2 weeks we can usually start with lectures or workshops. For consultancy projects this depends on scope and complexity. We'll provide a clear timeline during our intake call."
    },
    {
      question: "Do you only work with large companies?",
      answer: "No, we specialize in SMEs too. We adapt our approach to your organization's size and needs. From startups to multinationals - practical AI implementation works for everyone."
    },
    {
      question: "Which AI tools and platforms do you use?",
      answer: "We work with make.com, n8n, ChatGPT, Claude, Notion, Slack, Google Workspace, Microsoft 365 and many other tools. Tool choice depends on your existing systems and specific needs."
    },
    {
      question: "Are workshops customized to our business?",
      answer: "Yes, all workshops are tailored to your sector, team and specific challenges. We use your own cases and examples to ensure maximum relevance and practical application."
    },
    {
      question: "How do I measure ROI from AI implementation?",
      answer: "We measure time savings, error reduction and process throughput. On average, clients see 30% time savings and 50% fewer errors within 3 months of implementation."
    },
    {
      question: "What if our team has limited AI knowledge?",
      answer: "Perfect! We start with basics, explaining what AI can and cannot do. Our approach ensures everyone can participate regardless of their current AI knowledge level."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead 
        title="AI consultancy FAQ: lectures, workshops & automation costs"
        description="Common questions about PaiConnect AI services: pricing for lectures & workshops, workflow automation ROI, implementation timelines & business results."
        canonical="https://paiconnect.nl/faq"
        ogDescription="AI consultancy FAQ: pricing, ROI, timelines & results. Get answers to your AI implementation questions."
        structuredData={structuredData}
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