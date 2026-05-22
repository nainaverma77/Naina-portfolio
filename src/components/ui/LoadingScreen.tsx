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
    }, 2800); // 2.8 seconds total loading time
    
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
          <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Center Core of the Flower */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: '30px', height: '30px',
                backgroundColor: 'var(--color-accent)',
                borderRadius: '50%',
                zIndex: 10,
                boxShadow: '0 0 20px rgba(199, 181, 222, 0.5)'
              }}
            />
            
            {/* The Petals Blooming */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ 
                  delay: 0.2 + (i * 0.1), // Sequential blooming
                  duration: 1, 
                  type: "spring",
                  bounce: 0.4
                }}
                style={{
                  position: 'absolute',
                  width: '40px',
                  height: '90px',
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
            transition={{ delay: 1.2, duration: 0.8 }}
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
