"use client";

import React, { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch devices to avoid weird behaviors or performance hits on mobile
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Soft botanical palette for the pollen dust
    const colors = ['#E2C2D8', '#B5D2DE', '#C7B5DE', '#F5E6EF', '#B88A72', '#ffffff'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    let lastMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles when mouse moves a certain distance
      if (distance > 4) {
        lastMouse = { x: e.clientX, y: e.clientY };
        
        // Spawn 1 to 3 pollen particles randomly
        const numParticles = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < numParticles; i++) {
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 15,
            y: e.clientY + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5, // slight upward drift initially
            size: Math.random() * 2.5 + 1, // 1 to 3.5px
            life: 0,
            maxLife: Math.random() * 30 + 40, // 40-70 frames of life
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update positions
        p.x += p.vx;
        p.y += p.vy;
        
        // Add very slight gravity pulling them down gently like pollen
        p.vy += 0.03; 
        // Add a little horizontal wind drift
        p.vx += (Math.random() - 0.5) * 0.1;
        
        p.life++;

        const progress = p.life / p.maxLife;
        const opacity = 1 - progress;
        // Shrink slightly over time
        const currentSize = Math.max(0, p.size * (1 - progress * 0.3));

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        
        // Add a glowing effect
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        
        // Reset shadow to avoid trailing artifacts on clearRect
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Filter out dead particles
      particles = particles.filter((p) => p.life < p.maxLife);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ display: 'block' }}
    />
  );
}
