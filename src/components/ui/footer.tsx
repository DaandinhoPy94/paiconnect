import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
            <img 
              src="/src/assets/logo-32x32.png" 
              alt="PaiConnect Logo" 
              className="w-8 h-8"
            />
          
          <div>
            <h3 className="font-semibold mb-4">Diensten</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/diensten/lezingen" className="hover:text-secondary transition-colors">Lezingen & Keynotes</Link></li>
              <li><Link to="/diensten/workshops" className="hover:text-secondary transition-colors">Workshops & Training</Link></li>
              <li><Link to="/diensten/consultancy" className="hover:text-secondary transition-colors">Consultancy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Bedrijf</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/over" className="hover:text-secondary transition-colors">Over ons</Link></li>
              <li><Link to="/prijzen" className="hover:text-secondary transition-colors">Prijzen</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="text-sm text-primary-foreground/80 space-y-2">
              <p>info@paiconnect.nl</p>
              <p>+31 (0)6 12345678</p>
              <div className="pt-4">
                <Link to="/contact" className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
                  Plan een kennismaking →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 PaiConnect. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;