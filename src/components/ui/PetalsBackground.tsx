"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PetalsBackground() {
  const [petals, setPetals] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random petals
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: Math.random() * 15 + 10, // 10px to 25px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5, // 0s to 5s
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            bottom: '-50px',
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: ['0vw', `${Math.random() * 20 - 10}vw`],
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
