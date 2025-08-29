import React from "react";
import { Link } from "react-router-dom";
import { Video, Users, Camera, MessageSquare, Play } from "lucide-react";
import logo from "@/assets/logo.png";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="PaiConnect Logo" className="w-8 h-8" />
              <span className="text-xl font-bold">PaiConnect</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Automate. Accelerate. Advance.<br />
              Praktische AI voor moderne bedrijven.
            </p>
          </div>
          
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
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-6">
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
          <div className="text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 PaiConnect. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;