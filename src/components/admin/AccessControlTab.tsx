"use client";

import { PortfolioData } from "@/types/portfolio";
import { Shield, Smartphone, Monitor, Copy, History } from "lucide-react";

interface AccessControlTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function AccessControlTab({ data }: AccessControlTabProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const devices = data.devices || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase flex items-center gap-2">
            <History className="text-rose-500" /> Login History
          </h2>
          <p className="text-gray-500 text-sm font-sans">
            Review the history of devices and IP addresses that have requested access
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
                <th className="p-4 font-normal">Last Login Request</th>
              </tr>
            </thead>
            <tbody>
              {devices.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500 font-sans text-sm"
                  >
                    NO LOGIN HISTORY RECORDED YET
                  </td>
                </tr>
              ) : (
                devices.map((device) => {
                  const isMobile = device.browser.toLowerCase().includes("mobile") || device.browser.toLowerCase().includes("android") || device.browser.toLowerCase().includes("iphone");
                  return (
                    <tr
                      key={device.id}
                      className="border-b border-white/40 hover:bg-white/20 transition-colors group"
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
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
