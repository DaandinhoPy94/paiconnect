import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden network-pattern bg-gradient-to-br from-background via-accent/10 to-primary/5 py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-3"></div>
      <div className="container relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Automate. Accelerate. Advance.</span> 🚀
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Praktische AI die je werk slimmer, sneller en eenvoudiger maakt.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                🎯 Plan een kennismaking
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/download">
                ⚡️ Download AI Quick Wins (gratis PDF)
              </Link>
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>✓ 30% tijdsbesparing per proces</p>
            <p>✓ 50% minder handmatige fouten</p>
            <p>✓ Snellere doorlooptijd in projecten</p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroSection;