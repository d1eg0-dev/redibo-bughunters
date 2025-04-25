// GlobalErrorDisplay.tsx
"use client";
import ErrorNotification from "@/components/ErrorNotificacion";
import { useError } from "@/context/ErrorContext";

const GlobalErrorDisplay = () => {
  const { error, type, clearError } = useError();

  if (!error) return null;

  // Mensaje dinámico
  let titleMessage = "Error en el proceso";
  if (type === "garantia") titleMessage = "Error en el depósito de Garantía.";
  if (type === "reserva") titleMessage = "Error en el pago de Reserva.";

  return (
    <ErrorNotification
      title={titleMessage}
      error={error}
      onClose={clearError}
      modalCargando={false}
      onAceptar={clearError}
    />
  );
};

export default GlobalErrorDisplay;
