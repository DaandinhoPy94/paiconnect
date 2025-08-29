import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Button } from "./button";
import { Link } from "react-router-dom";

const FAQPreview = () => {
  const faqs = [
    {
      question: "Wat kost een lezing of workshop?",
      answer: "Lezingen vanaf €1.500, workshops vanaf €2.000. Alle prijzen zijn excl. BTW en afhankelijk van locatie en duur."
    },
    {
      question: "Hoe snel kunnen jullie starten?",
      answer: "Binnen 2 weken kunnen we meestal starten met lezingen of workshops. Voor consultancy projecten hangt dit af van de scope."
    },
    {
      question: "Is dit alleen voor grote bedrijven?",
      answer: "Nee, ook voor MKB. We passen onze aanpak aan op de grootte en behoeften van jouw organisatie."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Veelgestelde vragen
            </h2>
            <p className="text-xl text-muted-foreground">
              Antwoorden op de meest gestelde vragen over onze AI-diensten
            </p>
          </div>
          
          <Accordion type="single" collapsible className="mb-8">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/faq">
                Bekijk alle FAQ's
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;