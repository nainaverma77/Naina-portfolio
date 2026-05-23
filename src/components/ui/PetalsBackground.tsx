"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PetalsBackground() {
  const pathname = usePathname();
  const [droplets, setDroplets] = useState<{ id: string; left: string; size: number; duration: number; delay: number; sway: number }[]>([]);
  const [leaves, setLeaves] = useState<{ id: string; left: string; size: number; duration: number; delay: number; rotateDir: number; sway: number }[]>([]);

  useEffect(() => {
    if (pathname && pathname.startsWith('/admin')) return;
    // Generate droplets for the left side (0% to 20% width)
    const leftDroplets = Array.from({ length: 25 }).map((_, i) => ({
      id: `left-${i}`,
      left: `${Math.random() * 20}vw`,
      size: Math.random() * 10 + 8, // 8px to 18px
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 10,
      sway: Math.random() * 10 - 5
    }));

    // Generate droplets for the right side (80% to 100% width)
    const rightDroplets = Array.from({ length: 25 }).map((_, i) => ({
      id: `right-${i}`,
      left: `${80 + Math.random() * 20}vw`,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      sway: Math.random() * 10 - 5
    }));

    // eslint-disable-next-line
    setDroplets([...leftDroplets, ...rightDroplets]);

    // Generate Leaves for left side
    const leftLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: `leaf-left-${i}`,
      left: `${Math.random() * 20}vw`,
      size: Math.random() * 20 + 15, // 15px to 35px
      duration: Math.random() * 12 + 10, // Slower fall than water
      delay: Math.random() * 10,
      rotateDir: Math.random() > 0.5 ? 360 : -360, // Random spin direction
      sway: Math.random() * 20 - 10
    }));

    // Generate Leaves for right side
    const rightLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: `leaf-right-${i}`,
      left: `${80 + Math.random() * 20}vw`,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      rotateDir: Math.random() > 0.5 ? 360 : -360,
      sway: Math.random() * 20 - 10
    }));

    setLeaves([...leftLeaves, ...rightLeaves]);
  }, [pathname]);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: -1 }}>
      
      {/* Falling Water Droplets */}
      {droplets.map((drop) => (
        <motion.div
          key={drop.id}
          className="droplet"
          style={{
            left: drop.left,
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            top: '-50px', // Start above the screen
          }}
          animate={{
            y: ['0vh', '120vh'], // Fall downwards
            x: ['0vw', `${drop.sway}vw`], // Gentle sway
            opacity: [0, 0.8, 0.8, 0] // Fade in and out
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="leaf"
          style={{
            left: leaf.left,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: ['0vw', `${leaf.sway}vw`], // Wider sway for leaves
            rotate: [0, leaf.rotateDir], // Twirling as they fall
            opacity: [0, 0.9, 0.9, 0]
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
