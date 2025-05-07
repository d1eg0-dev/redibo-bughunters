// NotificacionErrorPago50.tsx

'use client';

import { useState, useEffect } from 'react';
import { Img } from 'react-image';

interface NotificacionErrorProps {
  monto: string;  // Aceptamos 'monto' como propiedad
  onClose: () => void;
}

export default function NotificacionErrorPago({ monto, onClose }: NotificacionErrorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-[1000]">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="relative">
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-black-500 hover:text-gray-700 text-xl font-bold" 
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <Img
            src="/error-icon.svg" // 🔥 Asegúrate de tener este ícono, o cambia por otro como "/error.svg"
            alt="Error"
            className="w-10 h-10 mx-auto mb-2"
          />

          <h1 className="text-lg font-semibold text-cent text-[#11295B] mb-0.5">
            ERROR
          </h1>
          <p className="text-xs text-center text-gray-600 mb-1">
            Error: Pago no procesado.<br />
            Verifique su método de pago e intente nuevamente.
          </p>
          <p className="text-xs text-center text-gray-600 mb-1">
            
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-[#11295B] text-white px-10 py-1.5 rounded-lg hover:bg-[#0a1c3d] text-sm transition-colors w-full"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
