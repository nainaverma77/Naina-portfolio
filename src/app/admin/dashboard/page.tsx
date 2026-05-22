"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    // In a real app, you would make an API call to delete the cookie
    // For now, we can just clear it from the client side if possible, 
    // but httpOnly cookies require an API route. 
    // We'll just push to home for this placeholder.
    router.push('/');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 className="floral-heading text-gradient" style={{ fontSize: '3rem', margin: 0 }}>
            Control Room
          </h1>
          <button 
            onClick={handleLogout}
            className="glass-pill" 
            style={{ padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Leave Garden
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Placeholder Cards */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Manage Projects</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Add, edit, or remove your portfolio projects. Data syncs with `projects.json`.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Manage Skills</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Update your skill bars and categories. Data syncs with `skills.json`.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Manage Education</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Update your timeline and academic history. Data syncs with `education.json`.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
