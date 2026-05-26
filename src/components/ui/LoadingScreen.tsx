"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LoadingScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min(Math.round((elapsed / 4000) * 100), 100);
      setProgress(percent);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pathname && pathname.startsWith('/admin')) return;
    
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 4000); // 4s load time as requested
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [pathname]);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const petalVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: i * 45,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 1.8,
        type: "spring",
        bounce: 0.35
      }
    })
  };

  const innerPetalVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: 22.5 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: i * 45 + 22.5,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 1.8,
        type: "spring",
        bounce: 0.35
      }
    })
  };

  const ringVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0, borderWidth: "8px" },
    visible: {
      scale: 2,
      opacity: [0, 0.5, 0],
      borderWidth: "1px",
      transition: { delay: 0.8, duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(30px)', scale: 1.15 }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--color-bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Background Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,100,100,0.4) 0%, rgba(200,0,0,0.2) 100%)'
            }}
          />

          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            
            {/* Expanding Energy Ring */}
            <motion.div
              variants={ringVariants}
              initial="hidden"
              animate="visible"
              className="absolute rounded-full border-[var(--color-rose-gold)] w-[120px] h-[120px]"
            />

            {/* Glowing Pollen Particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`pollen-${i}`}
                initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  y: -150 - Math.random() * 200, 
                  x: (Math.random() - 0.5) * 300, 
                  opacity: [0, 1, 0],
                  scale: Math.random() * 2 + 0.5
                }}
                transition={{ 
                  delay: 0.5 + Math.random() * 1.5, 
                  duration: 2 + Math.random(), 
                  ease: "easeOut" 
                }}
                className="absolute w-2 h-2 rounded-full z-30"
                style={{
                  background: i % 2 === 0 ? '#ffcc00' : '#ff4d4d',
                  boxShadow: `0 0 12px ${i % 2 === 0 ? '#ffcc00' : '#ff4d4d'}`
                }}
              />
            ))}

            {/* Glassmorphism Petals (Outer) */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`outer-${i}`}
                custom={i}
                variants={petalVariants}
                initial="hidden"
                animate="visible"
                className="absolute origin-bottom backdrop-blur-md border border-red-400/60"
                style={{
                  width: '50px',
                  height: '140px',
                  borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
                  background: 'linear-gradient(135deg, rgba(255,100,100,0.8) 0%, rgba(200,0,0,0.6) 100%)',
                  bottom: '50%',
                  boxShadow: '0 8px 32px 0 rgba(255,0,0,0.3)',
                  zIndex: 10
                }}
              />
            ))}

            {/* Glassmorphism Petals (Inner) */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`inner-${i}`}
                custom={i}
                variants={innerPetalVariants}
                initial="hidden"
                animate="visible"
                className="absolute origin-bottom backdrop-blur-md border border-white/30"
                style={{
                  width: '35px',
                  height: '100px',
                  borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
                  background: 'linear-gradient(135deg, rgba(255,150,150,0.9) 0%, rgba(255,50,50,0.7) 100%)',
                  bottom: '50%',
                  boxShadow: '0 4px 16px 0 rgba(255,0,0,0.5)',
                  zIndex: 15
                }}
              />
            ))}

            {/* Glowing Center Core */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, type: "spring", bounce: 0.5 }}
              className="absolute w-[40px] h-[40px] rounded-full z-20"
              style={{
                background: 'linear-gradient(135deg, #FFF 0%, #ff4d4d 100%)',
                boxShadow: '0 0 40px #ff4d4d, inset 0 0 10px rgba(255,255,255,0.8)'
              }}
            />
          </div>

          {/* Elegant Typography */}
          <motion.div
            initial={{ opacity: 0, y: 15, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
            transition={{ delay: 1.2, duration: 2.0, ease: "easeOut" }}
            className="mt-8 text-sm md:text-base font-bold uppercase z-20"
            style={{ 
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(to right, #ff4d4d, #b30000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(255,0,0,0.3)'
            }}
          >
            Cultivating
          </motion.div>

          {/* Progress Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-3 text-xs font-mono font-bold z-20 text-red-500/80"
            style={{ textShadow: '0 0 10px rgba(255,0,0,0.2)' }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
