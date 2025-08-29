import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      title: "Lezingen & Keynotes",
      description: "Inspireer je team met de nieuwste AI-trends, quick wins en real-life toepassingen.",
      icon: "🎤",
      link: "/booking",
      cta: "Boek een lezing"
    },
    {
      title: "Workshops & Training",
      description: "Leer zelf hoe je AI en automation-tools inzet in je workflow.",
      icon: "🎯",
      link: "/booking",
      cta: "Plan een workshop"
    },
    {
      title: "Consultancy & Automatisering",
      description: "Laat processen slimmer verlopen via make.com, n8n en integraties met je bestaande systemen.",
      icon: "⚙️",
      link: "/booking",
      cta: "Start een Audit"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Drie pijlers voor AI-succes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Van inspiratie tot implementatie - wij begeleiden je hele AI-reis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover h-full">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <p className="text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link to={service.link}>
                    {service.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;