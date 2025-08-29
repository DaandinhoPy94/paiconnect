import React from "react";
import { Card, CardContent } from "./card";

const ResultsSection = () => {
  const results = [
    {
      metric: "30%",
      description: "tijdsbesparing per proces",
      icon: "⏱️"
    },
    {
      metric: "50%",
      description: "minder handmatige fouten",
      icon: "✅"
    },
    {
      metric: "2x",
      description: "snellere doorlooptijd in projecten",
      icon: "🚀"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meetbare resultaten
          </h2>
          <p className="text-xl text-muted-foreground">
            Onze klanten zien direct impact van AI-implementatie
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <Card key={index} className="text-center card-hover">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{result.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {result.metric}
                </div>
                <p className="text-muted-foreground">
                  {result.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;