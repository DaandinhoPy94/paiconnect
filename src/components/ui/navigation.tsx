import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";
import LogoSVG from "./logo-svg";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <LogoSVG className="w-8 h-8" />
            <span className="text-xl font-bold gradient-text">PaiConnect</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/diensten" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => analytics.navClick('diensten')}
          >
            Diensten
          </Link>
          <Link 
            to="/ai-info" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => analytics.navClick('ai_info')}
          >
            AI Info
          </Link>
          <Link 
            to="/over" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => analytics.navClick('over')}
          >
            Over ons
          </Link>
          <Link 
            to="/faq" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => analytics.navClick('faq')}
          >
            FAQ
          </Link>
          <Button variant="tech" size="sm" asChild>
            <Link 
              to="/boeken?offer=auto-detect"
              onClick={() => analytics.ctaClick('Plan een intake', 'navigation', '/boeken')}
            >
              Plan een intake
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            <Link 
              to="/diensten" 
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => {
                analytics.navClick('diensten');
                setIsMobileMenuOpen(false);
              }}
            >
              Diensten
            </Link>
            <Link 
              to="/ai-info" 
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => {
                analytics.navClick('ai_info');
                setIsMobileMenuOpen(false);
              }}
            >
              AI Info
            </Link>
            <Link 
              to="/over" 
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => {
                analytics.navClick('over');
                setIsMobileMenuOpen(false);
              }}
            >
              Over ons
            </Link>
            <Link 
              to="/faq" 
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => {
                analytics.navClick('faq');
                setIsMobileMenuOpen(false);
              }}
            >
              FAQ
            </Link>
            <Button variant="tech" size="sm" className="w-full mt-4" asChild>
              <Link 
                to="/boeken?offer=auto-detect"
                onClick={() => {
                  analytics.ctaClick('Plan een intake', 'mobile_navigation', '/boeken');
                  setIsMobileMenuOpen(false);
                }}
              >
                Plan een intake
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;