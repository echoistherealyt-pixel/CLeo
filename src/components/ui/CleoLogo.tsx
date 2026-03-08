"use client";

interface CleoLogoProps {
  width?: number;
  className?: string;
}

export default function CleoLogo({ width = 240, className = "" }: CleoLogoProps) {
  const height = width * (110 / 380);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 380 110"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B2FFF" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#C9A96E" />
        </linearGradient>
        <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0" />
          <stop offset="30%" stopColor="#7B2FFF" />
          <stop offset="70%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x="190" y="75"
        textAnchor="middle"
        fontFamily="'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif"
        fontSize="72"
        fontWeight="400"
        letterSpacing="18"
        fill="url(#g1)"
        filter="url(#glow)"
      >
        CLEO
      </text>

      <line x1="60" y1="88" x2="320" y2="88" stroke="url(#fade)" strokeWidth="0.6" opacity="0.7" />

      <polygon points="50,44 55,50 50,56 45,50" fill="none" stroke="#7B2FFF" strokeWidth="1" opacity="0.5" />
      <polygon points="330,44 335,50 330,56 325,50" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}