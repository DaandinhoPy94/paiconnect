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
      link: "/boeken?offer=lezing",
      cta: "Boek een lezing"
    },
    {
      title: "Workshops & Training",
      description: "Leer zelf hoe je AI en automation-tools inzet in je workflow.",
      icon: "🎯",
      link: "/boeken?offer=workshop",
      cta: "Plan een workshop"
    },
    {
      title: "Consultancy & Automatisering",
      description: "Laat processen slimmer verlopen via make.com, n8n en integraties met je bestaande systemen.",
      icon: "⚙️",
      link: "/boeken?offer=consultancy",
      cta: "Plan een intake"
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
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover h-full flex flex-col">
              <CardHeader className="text-center pb-4 sm:pb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow px-4 sm:px-6 pb-4 sm:pb-6">
                <p className="text-muted-foreground mb-4 sm:mb-6 flex-grow text-sm sm:text-base">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <Button variant="tech" asChild className="w-full text-sm sm:text-base">
                    <Link to={service.link}>
                      {service.cta}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;