"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 4500); // Increased to 4.5 seconds to accommodate the bee sequence
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--color-bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem'
          }}
        >
          {/* Flower Animation Container */}
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* The Bee */}
            <motion.div
              initial={{ x: -400, y: -300, opacity: 0, rotate: 20 }}
              animate={{ 
                x: [-400, -200, -60, 0], 
                y: [-300, -150, -60, -35], 
                opacity: [0, 1, 1, 1],
                rotate: [20, -10, 15, 0]
              }}
              transition={{ 
                duration: 1.8, 
                ease: "easeInOut",
                times: [0, 0.4, 0.8, 1]
              }}
              style={{
                position: 'absolute',
                fontSize: '4rem',
                zIndex: 20,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
              }}
            >
              🐝
            </motion.div>

            {/* Center Core of the Flower (Bud) */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5, type: "spring", bounce: 0.5 }}
              style={{
                position: 'absolute',
                width: '60px', height: '60px',
                backgroundColor: 'var(--color-accent)',
                borderRadius: '50%',
                zIndex: 10,
                boxShadow: '0 0 30px rgba(199, 181, 222, 0.5)'
              }}
            />
            
            {/* The Petals Blooming */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ 
                  delay: 2.0 + (i * 0.1), // Bloom starts sequentially AFTER the bee lands
                  duration: 1, 
                  type: "spring",
                  bounce: 0.4
                }}
                style={{
                  position: 'absolute',
                  width: '80px',
                  height: '180px',
                  background: 'linear-gradient(to top, var(--color-primary), var(--color-primary-light))',
                  borderRadius: '50%',
                  transformOrigin: 'bottom center',
                  rotate: `${i * 45}deg`,
                  bottom: '50%',
                  boxShadow: '0 0 15px rgba(226, 194, 216, 0.4)',
                  mixBlendMode: 'multiply'
                }}
              />
            ))}
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="text-gradient"
            style={{ 
              fontSize: '1.25rem', 
              letterSpacing: '0.3em',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)'
            }}
          >
            BLOOMING...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
