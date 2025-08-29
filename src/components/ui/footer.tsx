import React from "react";
import { Link } from "react-router-dom";
import { Video, Users, Camera, MessageSquare, Play } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1 (Left): Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="PaiConnect Logo" className="w-8 h-8" />
              <span className="text-xl font-bold">PaiConnect</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Automate. Accelerate. Advance.<br />
              Praktische AI voor moderne bedrijven.
            </p>
          </div>
          
          {/* Column 2 (Center): Social media and copyright */}
          <div className="flex flex-col items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              <a href="https://tiktok.com/@paiconnect" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Video size={20} />
              </a>
              <a href="https://facebook.com/paiconnect" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Users size={20} />
              </a>
              <a href="https://instagram.com/paiconnect" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Camera size={20} />
              </a>
              <a href="https://x.com/paiconnect" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <MessageSquare size={20} />
              </a>
              <a href="https://youtube.com/@paiconnect" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                <Play size={20} />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-primary-foreground/60">
              <p>&copy; 2024 PaiConnect. Alle rechten voorbehouden.</p>
            </div>
          </div>
          
          {/* Column 3 (Right): Contact information */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="text-sm text-primary-foreground/80 space-y-2 text-center md:text-right">
              <p>tech@paiconnect.nl</p>
              <p>+31 6 23 31 26 15</p>
              <div className="pt-4">
                <Link to="/contact" className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
                  Plan een kennismaking →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;