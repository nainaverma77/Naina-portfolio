"use client";

import { useState, useEffect, useCallback } from "react";
import { verifyLogin, verifyLoginOtp } from "@/app/actions";
import { Lock, User, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtp && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtp, resendTimer]);

  const handleResendOtp = useCallback(async () => {
    if (resendTimer > 0) return;
    setError("");
    setIsLoading(true);
    const result = await verifyLogin(username, password);
    if (result.success && result.requiresOtp) {
      setResendTimer(30);
      setIsLoading(false);
      setError("OTP resent successfully!");
      setTimeout(() => setError(""), 3000);
    } else {
      setError(result.error || "Failed to resend OTP");
      setIsLoading(false);
    }
  }, [resendTimer, username, password]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!showOtp) {
      const result = await verifyLogin(username, password);
      if (result.success && result.requiresOtp) {
        setShowOtp(true);
        setResendTimer(30);
        setIsLoading(false);
      } else {
        setError(result.error || "Login failed");
        setIsLoading(false);
      }
    } else {
      const result = await verifyLoginOtp(otp);
      if (result.success) {
        // Re-run the server component to load the dashboard
        router.refresh();
      } else {
        setError(result.error || "Invalid OTP");
        setIsLoading(false);
      }
    }
  }, [showOtp, username, password, otp, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md glass-panel p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-primary)]/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--color-secondary)]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-gradient" style={{ fontFamily: "var(--font-heading)" }}>
            Admin Access
          </h2>
          <p className="text-sm tracking-widest uppercase" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
            Secure Authentication
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-center rounded-lg backdrop-blur-sm" style={{ fontFamily: "var(--font-body)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          {!showOtp ? (
            <>
              <div>
                <label className="block text-xs mb-2 uppercase tracking-wider" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/50 border border-white/60 rounded-xl py-2.5 pl-10 pr-3 focus:border-[var(--color-primary)] outline-none transition-colors backdrop-blur-sm shadow-sm"
                    style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}
                    placeholder="Enter Username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-2 uppercase tracking-wider" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/50 border border-white/60 rounded-xl py-2.5 pl-10 pr-3 focus:border-[var(--color-primary)] outline-none transition-colors backdrop-blur-sm shadow-sm"
                    style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs mb-2 uppercase tracking-wider text-rose-500" style={{ fontFamily: "var(--font-body)" }}>
                Enter OTP (Sent to Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <KeyRound size={16} />
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-white/50 border border-white/60 rounded-xl py-2.5 pl-10 pr-3 focus:border-[var(--color-primary)] outline-none transition-colors backdrop-blur-sm shadow-sm text-center tracking-widest font-bold"
                  style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full glass-pill py-3 mt-4 text-sm font-semibold uppercase tracking-wider disabled:opacity-50 hover:opacity-90"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {isLoading ? "Authenticating..." : (showOtp ? "Verify OTP" : "Login")}
          </button>

          {showOtp && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || isLoading}
                className="text-xs font-sans text-rose-500 hover:text-rose-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Didn't receive code? Resend OTP"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
