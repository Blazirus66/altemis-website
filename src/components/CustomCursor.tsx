'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [data-cursor]'
      );
      if (target) {
        setHovered(true);
        setLabel(
          (target as HTMLElement).dataset.cursor || ''
        );
      }
    };

    const out = () => {
      setHovered(false);
      setLabel('');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        animate={{
          x: pos.x - (hovered ? 35 : 6),
          y: pos.y - (hovered ? 35 : 6),
          width: hovered ? 70 : 12,
          height: hovered ? 70 : 12,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      >
        <div
          className={`rounded-full flex items-center justify-center transition-colors duration-200 ${
            hovered ? 'bg-red w-full h-full' : 'bg-white w-full h-full'
          }`}
        >
          {hovered && label && (
            <span className="text-white text-xs font-semibold tracking-wide">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
