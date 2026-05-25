"use client";

import { useState } from "react";
import { PortfolioData, Device } from "@/types/portfolio";
import { Shield, Smartphone, Monitor, CheckCircle, XCircle, Copy } from "lucide-react";
import { toggleDeviceTrust } from "@/app/actions";

interface AccessControlTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function AccessControlTab({ data, setData }: AccessControlTabProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    deviceId: string;
    isTrusted: boolean;
    ip: string;
  } | null>(null);

  const confirmToggleTrust = async () => {
    if (!confirmModal) return;
    const { deviceId, isTrusted } = confirmModal;
    setLoadingId(deviceId);
    setConfirmModal(null);
    try {
      await toggleDeviceTrust(deviceId, !isTrusted);
      
      // Optimistic UI Update
      setData({
        ...data,
        devices: data.devices?.map((d) =>
          d.id === deviceId ? { ...d, isTrusted: !isTrusted } : d
        ) || [],
      });

      // Wait a moment before clearing loading state
      setTimeout(() => setLoadingId(null), 300);
    } catch (e) {
      console.error(e);
      setLoadingId(null);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const devices = data.devices || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase flex items-center gap-2">
            <Shield className="text-rose-500" /> Access Control
          </h2>
          <p className="text-gray-500 text-sm font-sans">
            Manage devices and IP addresses that can bypass Email OTP
          </p>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur border border-white/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 border-b border-white/60 font-serif text-xs tracking-wider uppercase text-gray-600">
                <th className="p-4 font-normal">Device ID</th>
                <th className="p-4 font-normal">IP Address</th>
                <th className="p-4 font-normal">Browser/OS</th>
                <th className="p-4 font-normal">Last Login</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-gray-500 font-sans text-sm"
                  >
                    NO DEVICES RECORDED YET
                  </td>
                </tr>
              ) : (
                devices.map((device, i) => {
                  const isMobile = device.browser.toLowerCase().includes("mobile") || device.browser.toLowerCase().includes("android") || device.browser.toLowerCase().includes("iphone");
                  return (
                    <tr
                      key={device.id}
                      className={`border-b border-white/40 hover:bg-white/20 transition-colors group ${device.isTrusted ? "bg-green-500/5" : "bg-rose-500/5"}`}
                    >
                      <td className="p-4 font-sans text-[10px] text-gray-800 font-mono break-all max-w-[120px]">
                        <div className="flex items-center gap-2 group/copy">
                          <span>{device.id}</span>
                          <button
                            onClick={() => handleCopy(device.id)}
                            className="opacity-0 group-hover/copy:opacity-100 text-gray-400 hover:text-rose-500 transition-all"
                            title="Copy ID"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 font-sans text-sm text-gray-600">
                        <div className="flex items-center gap-2 group/copy">
                          <span>{device.ip}</span>
                          <button
                            onClick={() => handleCopy(device.ip)}
                            className="opacity-0 group-hover/copy:opacity-100 text-gray-400 hover:text-rose-500 transition-all"
                            title="Copy IP Address"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-[10px] text-gray-800 flex items-start gap-2 break-words max-w-[200px]">
                        {isMobile ? <Smartphone size={14} className="text-gray-400 mt-0.5 shrink-0" /> : <Monitor size={14} className="text-gray-400 mt-0.5 shrink-0" />}
                        <span title={device.browser}>
                          {device.browser}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-gray-500">
                        {new Date(device.lastLogin).toLocaleString()}
                      </td>
                      <td className="p-4">
                        {device.isTrusted ? (
                          <span className="flex items-center gap-1 text-[10px] font-sans border border-green-500/30 bg-green-500/10 text-green-600 px-2 py-0.5 rounded w-fit">
                            <CheckCircle size={10} /> TRUSTED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-sans border border-rose-500/30 bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded w-fit">
                            <XCircle size={10} /> OTP REQUIRED
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setConfirmModal({ deviceId: device.id, isTrusted: device.isTrusted, ip: device.ip })}
                          disabled={loadingId === device.id}
                          className={`text-xs px-4 py-2 rounded transition-all disabled:opacity-50 font-medium ${
                            device.isTrusted
                              ? "bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-500/30"
                              : "bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white border border-green-500/30"
                          }`}
                        >
                          {loadingId === device.id ? (
                            "Updating..."
                          ) : device.isTrusted ? (
                            "Revoke Trust"
                          ) : (
                            "Trust Device"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel p-6 max-w-md w-full relative animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
              {confirmModal.isTrusted ? "Revoke Trust?" : "Trust Device?"}
            </h3>
            <p className="text-sm text-gray-600 font-sans mb-6">
              {confirmModal.isTrusted
                ? `Are you sure you want to revoke trust for device ending in ${confirmModal.deviceId.substring(confirmModal.deviceId.length - 8)}? They will be required to enter an OTP on their next login.`
                : `Are you sure you want to trust device ending in ${confirmModal.deviceId.substring(confirmModal.deviceId.length - 8)} (IP: ${confirmModal.ip})? They will bypass the OTP requirement on future logins.`}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-lg text-sm font-sans text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggleTrust}
                className={`px-4 py-2 rounded-lg text-sm font-sans text-white transition-colors shadow-lg ${
                  confirmModal.isTrusted
                    ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20"
                    : "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                }`}
              >
                {confirmModal.isTrusted ? "Yes, Revoke" : "Yes, Trust"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
