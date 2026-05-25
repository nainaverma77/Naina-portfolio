"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { PortfolioData } from "@/types/portfolio";

const PortfolioContext = createContext<PortfolioData | null>(null);

export function PortfolioProvider({
  data,
  children,
}: {
  data: PortfolioData;
  children: ReactNode;
}) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
