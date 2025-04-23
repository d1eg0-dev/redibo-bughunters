// src/components/ErrorNotification.tsx
import React from "react";

interface ErrorNotificationProps {
  error: string;
  onClose: () => void;
  modalCargando: boolean;
  onAceptar: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  onClose,
  modalCargando,
  onAceptar,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative text-center space-y-4 border-2 border-[#11295B]">
            <button
            className="absolute top-2 right-3 text-4xl text-gray-700 hover:text-red-600 transition-all duration-200 transform hover:scale-125 hover:rotate-90"
         onClick={onClose}
           aria-label="Cerrar notificación"
         >
         &times;
              </button>

        <div className="text-[#FCA311] text-4xl">❌</div>
        <h2 className="text-2xl font-bold text-[#11295B]">ERROR</h2>
        <p className="text-gray-700">
          Error en el depósito de Garantía. <br />
          No se pudo procesar su pago: <br />
          <span className="font-semibold">{error}</span>
        </p>
        <button
          onClick={onAceptar}
          disabled={modalCargando}
          className={`w-full mt-4 border-2 rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
            modalCargando
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-[#11295B] border-[#11295B] hover:bg-[#11295B] hover:text-white"
          }`}
        >
          {modalCargando ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Aceptar"
          )}
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;
