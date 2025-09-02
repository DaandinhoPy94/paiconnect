import React from "react";

interface LogoSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

const LogoSVG: React.FC<LogoSVGProps> = ({ className = "w-8 h-8", width = 32, height = 32 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PaiConnect Logo"
    >
      {/* Modern tech-inspired logo design */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </linearGradient>
      </defs>
      
      {/* Main logo shape - simplified tech icon */}
      <rect
        x="32"
        y="32"
        width="192"
        height="192"
        rx="24"
        fill="url(#logoGradient)"
        opacity="0.1"
      />
      
      {/* Central connection nodes */}
      <circle cx="128" cy="80" r="16" fill="url(#logoGradient)" />
      <circle cx="80" cy="176" r="12" fill="url(#logoGradient)" opacity="0.8" />
      <circle cx="176" cy="176" r="12" fill="url(#logoGradient)" opacity="0.8" />
      
      {/* Connection lines */}
      <path
        d="M128 96 L80 160 M128 96 L176 160"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Tech accent elements */}
      <rect
        x="64"
        y="128"
        width="24"
        height="4"
        rx="2"
        fill="url(#logoGradient)"
        opacity="0.6"
      />
      <rect
        x="168"
        y="128"
        width="24"
        height="4"
        rx="2"
        fill="url(#logoGradient)"
        opacity="0.6"
      />
    </svg>
  );
};

export default LogoSVG;