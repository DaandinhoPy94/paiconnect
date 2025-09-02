import React from "react";
import { Link } from "react-router-dom";
import { Video, Users, Camera, MessageSquare, Play } from "lucide-react";
import { Button } from "./button";
import LogoSVG from "./logo-svg";
import { analytics } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t text-foreground py-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          {/* Column 1 (Left): Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-2">
              <LogoSVG className="h-6 md:h-7 w-6 md:w-7" />
              <span className="text-base font-bold leading-tight">PaiConnect</span>
            </div>
            <p className="text-muted-foreground text-xs leading-snug">
              Automate. Accelerate. Advance.<br />
              Praktische AI voor moderne bedrijven.
            </p>
          </div>
          
          {/* Column 2 (Center): Social media and copyright */}
          <div className="flex flex-col items-center">
            {/* Social Media Icons */}
            <div className="flex gap-2 mb-3">
              <a href="https://tiktok.com/@paiconnect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                <Video className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://facebook.com/paiconnect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://instagram.com/paiconnect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                <Camera className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://x.com/paiconnect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://youtube.com/@paiconnect" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                <Play className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-xs text-muted-foreground">
              <p>&copy; 2024 PaiConnect. Alle rechten voorbehouden.</p>
            </div>
          </div>
          
          {/* Column 3 (Right): Contact information and CTA */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-base font-semibold mb-2 leading-tight">Contact</h3>
            <div className="text-sm space-y-2 text-center md:text-right leading-snug mb-3">
              <a href="mailto:tech@paiconnect.nl" className="text-muted-foreground hover:text-secondary transition-colors block">
                tech@paiconnect.nl
              </a>
              <a href="tel:+31623312615" className="text-muted-foreground hover:text-secondary transition-colors block">
                +31 6 23 31 26 15
              </a>
            </div>
            <Button variant="tech" size="sm" asChild>
              <Link 
                to="/boeken?offer=auto-detect"
                onClick={() => analytics.ctaClick('Plan een intake', 'footer', '/boeken')}
              >
                Plan een intake
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;