import React from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export default function Logo({ className = "h-8 w-auto", onClick }: LogoProps) {
  return (
    <div className={`${className} cursor-pointer`} onClick={onClick}>
      <svg 
        viewBox="0 0 120 40" 
        className="h-full w-auto"
        fill="currentColor"
        role="img"
        aria-label="CVmaker.ai"
      >
        {/* Optimized minimal logo */}
        <text 
          x="0" 
          y="28" 
          fontSize="24" 
          fontWeight="bold" 
          fill="#39cccc"
        >
          CV
        </text>
        <text 
          x="35" 
          y="28" 
          fontSize="16" 
          fontWeight="normal" 
          fill="#000"
        >
          maker.ai
        </text>
      </svg>
    </div>
  );
} 