import React from 'react';

export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,162,255,0.5)]">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a2ff" />
            <stop offset="50%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#e3b341" />
          </linearGradient>
        </defs>
        <path
          d="M20 80 L20 20 L50 50 L80 20 L80 80"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M80 20 L95 5 L95 25 M95 5 L75 5"
          fill="none"
          stroke="#e3b341"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}
