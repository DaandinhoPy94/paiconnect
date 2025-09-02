import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { analytics } from "@/lib/analytics";

const Hero = () => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-16 md:py-24">
        {/* Critical content first - optimized for LCP */}
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Simplified H1 for faster LCP - using solid color instead of gradient */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary">
              AI implementatie die écht werkt
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Verhoog je productiviteit met 30% door slimme automatisering. Van strategie tot implementatie, voor Nederlandse MKB-bedrijven.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="tech" size="lg" className="w-full sm:w-auto" asChild>
                <Link 
                  to="/boeken?offer=auto-detect"
                  onClick={() => analytics.ctaClick('Plan een intake', 'hero', '/boeken')}
                >
                  Plan een intake
                </Link>
              </Button>
              
              <Button variant="ghost" size="lg" className="hidden sm:inline-flex" asChild>
                <Link 
                  to="/diensten"
                  onClick={() => analytics.ctaClick('Bekijk workshops', 'hero', '/diensten')}
                >
                  Bekijk workshops
                </Link>
              </Button>
            </div>
            
            {/* Trust Cue */}
            <p className="text-sm text-muted-foreground font-medium">
              ✓ 100+ bedrijven bereikten meetbare resultaten binnen 3 maanden
            </p>
          </div>
        </div>
        
        {/* Simplified decorative elements - reduced for better LCP */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%)' }}></div>
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-secondary/10 rounded-full"></div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
        <Button variant="tech" size="lg" className="w-full shadow-lg" asChild>
          <Link 
            to="/boeken?offer=auto-detect"
            onClick={() => analytics.ctaClick('Plan een intake', 'mobile_sticky', '/boeken')}
          >
            Plan een intake
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Hero;