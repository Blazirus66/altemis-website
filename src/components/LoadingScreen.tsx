'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visited = sessionStorage.getItem('altemis-visited');
    if (visited) {
      setShow(false);
      return;
    }

    setShow(true);
    sessionStorage.setItem('altemis-visited', 'true');

    const timer = setTimeout(() => setExit(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* The A logo scales in */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/logo.png"
              alt="ALTEMIS"
              width={400}
              height={200}
              className="w-[280px] md:w-[400px] h-auto"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
