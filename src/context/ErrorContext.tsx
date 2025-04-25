// context/ErrorContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface ErrorContextType {
  error: string;
  type?: "garantia" | "reserva" | "general";
  showError: (msg: string, type?: "garantia" | "reserva" | "general") => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState("");
  const [type, setType] = useState<"garantia" | "reserva" | "general" | undefined>("general");

  const showError = (msg: string, tipo: "garantia" | "reserva" | "general" = "general") => {
    setError(msg);
    setType(tipo);
  };

  const clearError = () => {
    setError("");
    setType("general");
  };

  return (
    <ErrorContext.Provider value={{ error, type, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("useError debe usarse dentro de ErrorProvider");
  return context;
};
