import React from "react";
import logoImage from "@/assets/logo-new.png";

interface LogoSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

const LogoSVG: React.FC<LogoSVGProps> = ({ className = "w-8 h-8", width = 32, height = 32 }) => {
  return (
    <img
      src={logoImage}
      alt="PaiConnect Logo"
      className={className}
      width={width}
      height={height}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default LogoSVG;