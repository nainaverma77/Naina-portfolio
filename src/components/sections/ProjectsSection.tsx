"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import siteConfig from '@/data/site_config.json';
import ProjectModal from '@/components/ui/ProjectModal';
import MediaRenderer from '@/components/MediaRenderer';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: siteConfig.sections.projects.title.replace(/ (.*?)$/, ' <span class="text-gradient">$1</span>') }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            {siteConfig.sections.projects.subtitle}
          </p>
        </motion.div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          
          <button 
            onClick={scrollLeft}
            className="glass-pill hidden md:flex"
            style={{ 
              position: 'absolute', left: '-3rem', zIndex: 20, 
              width: '3rem', height: '3rem', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            ref={scrollContainerRef}
            style={{ 
              display: 'flex', 
              gap: '2rem', 
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '1rem',
              width: '100%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />
            
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="glass-panel"
                style={{
                  minWidth: '320px',
                  maxWidth: '350px',
                  flex: '0 0 auto',
                  scrollSnapAlign: 'start',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
                onClick={() => setSelectedProject(project)}
              >
                {project.imageUrl ? (
                  <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                    <MediaRenderer url={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div style={{
                    height: '200px',
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary))',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '3rem',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {project.name.charAt(0)}
                  </div>
                )}

                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                    {project.name}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {project.tech.map(tech => (
                      <span key={tech} style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                        border: '1px solid rgba(255,255,255,0.5)',
                        color: 'var(--color-text-primary)',
                        fontWeight: 500
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                    <button onClick={(e) => { e.stopPropagation(); window.open(project.links.live, '_blank'); }} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'transparent', border: 'none', color: 'var(--color-rose-gold)',
                      fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem'
                    }}>
                      <ExternalLink size={16} /> Live
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); window.open(project.links.github, '_blank'); }} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'transparent', border: 'none', color: 'var(--color-text-secondary)',
                      fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Code
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="glass-pill hidden md:flex"
            style={{ 
              position: 'absolute', right: '-3rem', zIndex: 20, 
              width: '3rem', height: '3rem', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
