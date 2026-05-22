"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import projectsData from '@/data/projects.json';
import ProjectModal from '@/components/ui/ProjectModal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

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
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
            Featured <span className="text-gradient">Blooms</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            A collection of my finest digital creations.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '3rem' 
        }}>
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Fake Image Placeholder - using gradient */}
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
                {project.title.charAt(0)}
              </div>

              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {project.techStack.map(tech => (
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

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                  <button onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl, '_blank'); }} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'transparent', border: 'none', color: 'var(--color-primary)',
                    fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem'
                  }}>
                    <ExternalLink size={16} /> Live
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); window.open(project.repoUrl, '_blank'); }} style={{
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
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
