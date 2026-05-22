"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PetalsBackground() {
  const [petals, setPetals] = useState<{ id: string; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate petals for the left side (0% to 20% width)
    const leftPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: `left-${i}`,
      left: `${Math.random() * 20}vw`,
      size: Math.random() * 15 + 10, // 10px to 25px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 10, // 0s to 10s stagger
    }));

    // Generate petals for the right side (80% to 100% width)
    const rightPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: `right-${i}`,
      left: `${80 + Math.random() * 20}vw`,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));

    setPetals([...leftPetals, ...rightPetals]);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Falling Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            top: '-50px', // Start above the screen
          }}
          animate={{
            y: ['0vh', '120vh'], // Fall downwards
            x: ['0vw', `${Math.random() * 10 - 5}vw`], // Gentle sway
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
