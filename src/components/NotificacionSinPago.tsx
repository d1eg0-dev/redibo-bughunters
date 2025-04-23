'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function NotificacionSinPago({ onClose }: Props) {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const now = new Date();
    const ajustada = new Date(now.getTime() - 1 * 60000);

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

    setFecha(ajustada.toLocaleDateString('es-ES', opcionesFecha));
    setHora(ajustada.toLocaleTimeString('es-ES', opcionesHora));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200">
        {/* Icono */}
        <div className="flex justify-center mb-4 text-yellow-400 text-5xl">
          <span>🔔</span>
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          ¡Reserva registrada!
        </h2>

        {/* Mensaje */}
        <p className="text-sm text-center text-gray-600 mt-2">
          Tu reserva ha sido registrada, pero aún no ha sido pagada.
        </p>

        {/* Detalles */}
        <ul className="text-sm text-gray-800 mt-5 space-y-4">
          <li className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-medium text-gray-600">Estado</p>
              <p>Pendiente de pago</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="font-medium text-gray-600">Fecha</p>
              <p>{fecha}</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">⏰</span>
            <div>
              <p className="font-medium text-gray-600">Hora</p>
              <p>{hora}</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="font-medium text-gray-600">Ubicación</p>
              <p>Av. Central #456</p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-xl">🧍‍♂️</span>
            <div>
              <p className="font-medium text-gray-600">Usuario</p>
              <p>Carlos Gómez</p>
            </div>
          </li>
        </ul>

        {/* Botón */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#1E2A78] text-white px-4 py-2 rounded-lg hover:bg-[#1b2569] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
