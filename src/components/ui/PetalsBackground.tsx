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
      id: `drop-left-${i}`,
      left: `${Math.random() * 20}vw`,
      size: Math.random() * 10 + 8, // 8px to 18px
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 10,
      sway: Math.random() * 10 - 5
    }));

    // Generate droplets for the right side (80% to 100% width)
    const rightDroplets = Array.from({ length: 25 }).map((_, i) => ({
      id: `drop-right-${i}`,
      left: `${80 + Math.random() * 20}vw`,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      sway: Math.random() * 10 - 5
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

  // --- INTERACTIVE WIND EFFECT ---
  useEffect(() => {
    if (pathname && pathname.startsWith('/admin')) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseOut = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const particleStates = new Map<string, { vx: number, vy: number, x: number, y: number }>();

    const animateWind = () => {
      // 1. READ PHASE (Prevent layout thrashing)
      const elements = Array.from(document.querySelectorAll('.wind-particle')) as HTMLElement[];
      const rects = elements.map(el => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          id: el.id,
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
          isDroplet: el.classList.contains('droplet')
        };
      });

      // 2. WRITE PHASE
      rects.forEach(({ el, id, cx, cy, isDroplet }) => {
        if (!particleStates.has(id)) {
          particleStates.set(id, { vx: 0, vy: 0, x: 0, y: 0 });
        }
        const state = particleStates.get(id)!;
        
        // Repulsion logic
        if (mouseX !== -1000) {
          const dx = cx - mouseX;
          const dy = cy - mouseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const radius = 180; // Wind influence radius
          
          if (dist < radius && dist > 0) {
            const force = (radius - dist) / radius;
            // Add velocity away from mouse
            state.vx += (dx / dist) * force * 1.5;
            state.vy += (dy / dist) * force * 1.5;
          }
        }
        
        // Update physics
        state.x += state.vx;
        state.y += state.vy;
        
        // Friction
        state.vx *= 0.92;
        state.vy *= 0.92;
        
        // Spring back to original falling path
        state.x += (0 - state.x) * 0.05;
        state.y += (0 - state.y) * 0.05;
        
        // Apply transform. Droplets must keep their 45deg rotation!
        const baseTransform = isDroplet ? 'rotate(45deg)' : '';
        el.style.transform = `translate(${state.x}px, ${state.y}px) ${baseTransform}`;
      });

      animationFrameId = requestAnimationFrame(animateWind);
    };

    animateWind();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
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
          style={{
            position: 'absolute',
            left: drop.left,
            top: '-50px',
            width: `${drop.size}px`,
            height: `${drop.size}px`,
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
        >
          {/* Inner element handles wind physics safely separated from Framer Motion */}
          <div 
            id={drop.id}
            className="droplet wind-particle w-full h-full"
          />
        </motion.div>
      ))}

      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          style={{
            position: 'absolute',
            left: leaf.left,
            top: '-50px',
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
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
        >
          {/* Inner element handles wind physics safely separated from Framer Motion */}
          <div 
            id={leaf.id}
            className="leaf wind-particle w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
