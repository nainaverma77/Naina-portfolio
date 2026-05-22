"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center', zIndex: 10 }}>
        <h1 className="floral-heading text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontStyle: 'italic' }}>
          Admin Login
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Welcome back to your digital garden.
        </p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input 
            type="password" 
            placeholder="Enter Master Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              padding: '1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--color-border)', 
              background: 'rgba(255,255,255,0.5)',
              outline: 'none',
              width: '100%',
              color: 'var(--color-text-primary)'
            }} 
          />
          
          {error && (
            <p style={{ color: '#D486B2', fontSize: '0.875rem', margin: 0 }}>
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="glass-pill" 
            style={{ 
              padding: '1rem', 
              width: '100%', 
              fontWeight: 600, 
              color: 'var(--color-text-primary)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Unlocking...' : 'Unlock Garden'}
          </button>
        </form>
      </div>
    </div>
  );
}
