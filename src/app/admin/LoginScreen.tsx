"use client";

import { useState } from "react";
import { verifyLogin } from "@/app/actions";
import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await verifyLogin(username, password);
    if (result.success) {
      // Re-run the server component to load the dashboard
      router.refresh();
    } else {
      setError(result.error || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-cyan" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-cyan/5 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-2xl font-bold font-orbitron text-white mb-2 uppercase tracking-widest">
            System Override
          </h2>
          <p className="text-gray-400 text-sm font-mono tracking-widest">
            AUTHENTICATION REQUIRED
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-sm text-center rounded font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
              Operator ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User size={16} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded py-2.5 pl-10 pr-3 text-white focus:border-neon-cyan outline-none font-mono"
                placeholder="Enter Username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
              Access Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={16} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded py-2.5 pl-10 pr-3 text-white focus:border-neon-cyan outline-none font-mono"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20 py-3 rounded font-bold tracking-widest transition-all disabled:opacity-50 uppercase font-orbitron mt-4 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
          >
            {isLoading ? "Authenticating..." : "Initialize Access"}
          </button>
        </form>
      </div>
    </div>
  );
}
