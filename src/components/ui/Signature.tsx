'use client';

import { useEffect } from 'react';

export default function Signature() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(
        "%c🌸 Designed & Built by Anikesh and Naina", 
        "color: #B88A72; font-size: 16px; font-weight: bold; font-family: sans-serif; padding: 10px 15px; border: 2px solid #618055; border-radius: 8px; background: rgba(255,255,255,0.9);"
      );
      console.log(
        "%cSystem Override: Floral Protocol Engaged.",
        "color: #618055; font-size: 12px; font-family: monospace; font-style: italic;"
      );
    }
  }, []);

  return null;
}
