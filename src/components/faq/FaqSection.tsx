import React from "react";
import StructuredData from "@/components/seo/StructuredData";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ items, title = "Veelgestelde vragen" }) => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(i => ({
      "@type": "Question",
      "name": i.question,
      "acceptedAnswer": { "@type": "Answer", "text": i.answer }
    }))
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-6">
        {items.map((i, idx) => (
          <div key={idx}>
            <p className="font-semibold">{i.question}</p>
            <p className="text-muted-foreground">{i.answer}</p>
          </div>
        ))}
      </div>
      <StructuredData data={ld} />
    </section>
  );
};

export default FaqSection;


