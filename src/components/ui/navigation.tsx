import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <img 
              src="/src/assets/logo-new.png" 
              alt="PaiConnect Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold gradient-text">PaiConnect</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/diensten" className="text-muted-foreground hover:text-foreground transition-colors">
            Diensten
          </Link>
          <Link to="/ai-info" className="text-muted-foreground hover:text-foreground transition-colors">
            AI Info
          </Link>
          <Link to="/over" className="text-muted-foreground hover:text-foreground transition-colors">
            Over ons
          </Link>
          <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Button variant="tech" size="sm" asChild>
            <Link to="/booking">Plan een kennismaking</Link>
          </Button>
        </div>

        {/* Mobile menu button - would need to implement mobile menu */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;