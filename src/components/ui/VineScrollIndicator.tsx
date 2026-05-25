"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function VineScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [bloomProgress, setBloomProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setBloomProgress(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Points where the vine curves peak and flowers should bloom
  const flowerPoints = [0.083, 0.249, 0.416, 0.583, 0.749, 0.916];

  return (
    <div className="fixed left-2 lg:left-6 top-0 bottom-0 w-12 z-50 pointer-events-none hidden md:flex flex-col items-center">
      
      {/* The Vine Path */}
      <svg 
        width="40" 
        height="100%" 
        viewBox="0 0 40 1000" 
        preserveAspectRatio="none" 
        className="absolute top-0"
      >
        {/* Faded background vine */}
        <path 
           d="M 20 0 Q 40 83, 20 166 T 20 333 T 20 500 T 20 666 T 20 833 T 20 1000"
           fill="none"
           stroke="rgba(116, 139, 111, 0.2)" /* faint muted-green */
           strokeWidth="4"
           strokeLinecap="round"
        />
        {/* Growing active vine */}
        <motion.path
           d="M 20 0 Q 40 83, 20 166 T 20 333 T 20 500 T 20 666 T 20 833 T 20 1000"
           fill="none"
           stroke="var(--color-medium-green)"
           strokeWidth="4"
           strokeLinecap="round"
           style={{ pathLength: scaleY }}
        />
      </svg>

      {/* Flowers blooming along the vine */}
      {flowerPoints.map((point, index) => {
        const isBloomed = bloomProgress >= point - 0.08; // Bloom slightly before reaching the exact point
        const isRight = index % 2 === 0; // Alternates based on the SVG curve we drew
        
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ 
              top: `calc(${point * 100}% - 12px)`, // -12px to center the 24px flower on the point
              left: isRight ? '22px' : '-6px',
            }}
            initial={{ scale: 0, opacity: 0, rotate: isRight ? -45 : 45 }}
            animate={{ 
              scale: isBloomed ? 1 : 0, 
              opacity: isBloomed ? 1 : 0,
              rotate: isBloomed ? (isRight ? 15 : -15) : (isRight ? -45 : 45)
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
          >
            {/* 4-Petal Flower SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-primary-light)" stroke="var(--color-muted-rose-gold)" strokeWidth="1.5">
              <path d="M12 12c-2-2-5-1-6 2s1 5 3 4 5-1 6-2-1-5-3-4z" />
              <path d="M12 12c2-2 5-1 6 2s-1 5-3 4-5-1-6-2 1-5 3-4z" />
              <path d="M12 12c-2 2-5 1-6-2s1-5 3-4 5 1 6 2-1 5-3 4z" />
              <path d="M12 12c2 2 5 1 6-2s-1-5-3-4-5 1-6 2 1 5 3 4z" />
              <circle cx="12" cy="12" r="3" fill="var(--color-rose-gold)" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
