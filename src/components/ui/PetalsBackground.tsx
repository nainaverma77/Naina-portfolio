"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PetalsBackground() {
  const [droplets, setDroplets] = useState<{ id: string; left: string; size: number; duration: number; delay: number }[]>([]);
  const [leaves, setLeaves] = useState<{ id: string; left: string; size: number; duration: number; delay: number; rotateDir: number }[]>([]);
  const [bees, setBees] = useState<{ id: number; top: string; duration: number; delay: number; scale: number; reverse: boolean }[]>([]);

  useEffect(() => {
    // Generate droplets for the left side (0% to 20% width)
    const leftDroplets = Array.from({ length: 25 }).map((_, i) => ({
      id: `left-${i}`,
      left: `${Math.random() * 20}vw`,
      size: Math.random() * 10 + 8, // 8px to 18px
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 10,
    }));

    // Generate droplets for the right side (80% to 100% width)
    const rightDroplets = Array.from({ length: 25 }).map((_, i) => ({
      id: `right-${i}`,
      left: `${80 + Math.random() * 20}vw`,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
    }));

    setDroplets([...leftDroplets, ...rightDroplets]);

    // Generate Leaves for left side
    const leftLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: `leaf-left-${i}`,
      left: `${Math.random() * 20}vw`,
      size: Math.random() * 20 + 15, // 15px to 35px
      duration: Math.random() * 12 + 10, // Slower fall than water
      delay: Math.random() * 10,
      rotateDir: Math.random() > 0.5 ? 360 : -360, // Random spin direction
    }));

    // Generate Leaves for right side
    const rightLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: `leaf-right-${i}`,
      left: `${80 + Math.random() * 20}vw`,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      rotateDir: Math.random() > 0.5 ? 360 : -360,
    }));

    setLeaves([...leftLeaves, ...rightLeaves]);

    // Generate 3 random bees
    const newBees = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60 + 20}vh`, // Fly somewhere in the middle 60% of the screen
      duration: Math.random() * 15 + 20, // Very slow, 20s to 35s to cross screen
      delay: Math.random() * 15,
      scale: Math.random() * 0.5 + 1, // 1x to 1.5x size
      reverse: Math.random() > 0.5 // 50% chance to fly right-to-left
    }));
    setBees(newBees);
  }, []);

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
            x: ['0vw', `${Math.random() * 10 - 5}vw`], // Gentle sway
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
            x: ['0vw', `${Math.random() * 20 - 10}vw`], // Wider sway for leaves
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

      {/* Flying Bees */}
      {bees.map((bee) => (
        <motion.div
          key={`bee-${bee.id}`}
          style={{
            position: 'absolute',
            top: bee.top,
            fontSize: `${bee.scale * 2}rem`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
            zIndex: 10
          }}
          initial={{
            x: bee.reverse ? '110vw' : '-10vw',
            scaleX: bee.reverse ? -1 : 1 // Flip the bee emoji if flying left
          }}
          animate={{
            x: bee.reverse ? ['110vw', '-10vw'] : ['-10vw', '110vw'],
            y: ['0vh', '-5vh', '5vh', '-2vh', '0vh'], // Wiggling up and down
          }}
          transition={{
            x: {
              duration: bee.duration,
              delay: bee.delay,
              repeat: Infinity,
              ease: "linear"
            },
            y: {
              duration: 4, // Wiggle speed
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          🐝
        </motion.div>
      ))}
    </div>
  );
}
