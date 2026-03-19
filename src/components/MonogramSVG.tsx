'use client';

export default function MonogramSVG({
  className = '',
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer triangle - main shape */}
      <path
        d="M100 10 L20 200 L180 200 Z"
        fill="none"
        stroke="#CC0000"
        strokeWidth="6"
        strokeLinejoin="round"
        style={
          animated
            ? {
                strokeDasharray: 550,
                strokeDashoffset: 550,
                animation: 'drawStroke 1.2s ease forwards 0.2s',
              }
            : undefined
        }
      />
      {/* Inner triangle cutout - creates the "A" hole */}
      <path
        d="M100 80 L65 170 L135 170 Z"
        fill="none"
        stroke="#CC0000"
        strokeWidth="4"
        strokeLinejoin="round"
        style={
          animated
            ? {
                strokeDasharray: 300,
                strokeDashoffset: 300,
                animation: 'drawStroke 0.8s ease forwards 0.6s',
              }
            : undefined
        }
      />
      {/* Left inner stroke - the diagonal inside */}
      <path
        d="M100 10 L65 170"
        stroke="#CC0000"
        strokeWidth="4"
        strokeLinecap="round"
        style={
          animated
            ? {
                strokeDasharray: 180,
                strokeDashoffset: 180,
                animation: 'drawStroke 0.8s ease forwards 0.4s',
              }
            : undefined
        }
      />
      {/* Right inner stroke */}
      <path
        d="M100 10 L135 170"
        stroke="#CC0000"
        strokeWidth="4"
        strokeLinecap="round"
        style={
          animated
            ? {
                strokeDasharray: 180,
                strokeDashoffset: 180,
                animation: 'drawStroke 0.8s ease forwards 0.4s',
              }
            : undefined
        }
      />
    </svg>
  );
}
