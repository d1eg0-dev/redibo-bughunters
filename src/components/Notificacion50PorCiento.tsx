'use client';

import { useEffect, useState } from 'react';

interface Props {
  monto: string;
  onClose: () => void;
}

export default function Notificacion50PorCiento({ monto, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    setMounted(true);

    const now = new Date();
    const fechaAjustada = new Date(now.getTime() - 1 * 60000);

    const opcionesFecha: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    setFecha(fechaAjustada.toLocaleDateString('es-ES', opcionesFecha));
    setHora(fechaAjustada.toLocaleTimeString('es-ES', opcionesHora));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-4">
          <div className="bg-yellow-500 rounded-full p-3 mb-3">
            <span className="text-2xl text-white">🔔</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            ¡Reserva registrada!
          </h1>
          <p className="text-sm text-gray-600 mt-1 text-center">
            Pago del 50% confirmado: ${monto} BOB
          </p>
        </div>

        {/* Lista de detalles */}
        <ul className="space-y-4 mb-6">
          <li className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Estado</p>
              <p className="text-sm text-gray-800">Pago parcial registrado</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Fecha</p>
              <p className="text-sm text-gray-800">{fecha}</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">⏰</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Hora</p>
              <p className="text-sm text-gray-800">{hora}</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Ubicación</p>
              <p className="text-sm text-gray-800">Av. Central #456</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">🧍‍♂️</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Usuario</p>
              <p className="text-sm text-gray-800">Carlos Gómez</p>
            </div>
          </li>
        </ul>

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="w-full bg-[#11295B] text-white py-2 rounded-lg font-medium hover:bg-[#0a1c3d] transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
