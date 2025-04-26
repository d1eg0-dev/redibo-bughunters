'use client';

import { useState, useEffect } from 'react';
import { Img } from 'react-image';
import { useRouter } from 'next/navigation'; 

interface NotificacionProps {
  monto: string;
  onClose: () => void;
}

export default function Notificacion50PorCiento({ monto, onClose }: NotificacionProps) {
  const [mounted, setMounted] = useState(false);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [usuario, setUsuario] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const router = useRouter();

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

    // 🔥 Llamada API para cargar usuario y ubicación
    async function cargarDatosUsuario() {
      try {
        const res = await fetch('/api/usuario/1'); // Ajusta el ID si es necesario
        const data = await res.json();

        setUsuario(data.nombre); // nombre del usuario
        setUbicacion(data.ubicacion); // ubicación
      } catch (error) {
        console.error('Error cargando datos de usuario:', error);
      }
    }

    cargarDatosUsuario();
  }, []);

  if (!mounted) return null;

  // 🔥 Corrección para saldo pendiente:
  const montoPagado = parseFloat(monto);
  const montoTotal = montoPagado * 2; // Si pagó el 50%, el total es el doble
  const saldoPendiente = montoTotal - montoPagado;

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
            src="/campana1.svg"
            alt="Notificación"
            className="w-10 h-10 mx-auto mb-2"
          />

          <h1 className="text-lg font-semibold text-center text-gray-800 mb-0.5 whitespace-nowrap">
            ¡Reserva confirmada con el 50%!
          </h1>
          <p className="text-xs text-center text-gray-600 mb-1">
            Tu reserva ha sido confirmada con el pago del 50% ({montoPagado.toFixed(2)} BOB)
          </p>
        </div>

        <ul className="text-gray-800 text-xs space-y-0.25 leading-snug mb-4">
          <li className="flex items-center justify-center gap-1">
            <span className="text-base">📅</span>
            <span>Fecha: {fecha}</span>
          </li>
          <li className="flex items-center justify-center gap-1">
            <span className="text-base">⏰</span>
            <span>Hora: {hora}</span>
          </li>
          <li className="flex items-center justify-center gap-1">
            <span className="text-base">📍</span>
            <span>Ubicación: {ubicacion || "Cargando ubicación..."}</span>
          </li>
          <li className="flex items-center justify-center gap-1">
            <span className="text-base">🧍‍♂</span>
            <span>Usuario: {usuario || "Cargando usuario..."}</span>
          </li>
          <li className="flex items-center justify-center gap-1">
            <span className="text-base">💳</span>
            <span>Pagado: {montoPagado.toFixed(2)} BOB</span>
          </li>
          <li className="flex items-center justify-center gap-1">
            <span className="text-base">⏳</span>
            <span>Pendiente: {saldoPendiente.toFixed(2)} BOB</span>
          </li>
        </ul>

        <button
            onClick={() => {
              onClose();

              router.push('/confirmacion');
            }}
          className="bg-[#11295B] text-white px-10 py-1.5 rounded-lg hover:bg-[#0a1c3d] text-sm transition-colors w-full"
        >
          Completar Pago
        </button>
      </div>
    </div>
  );
}
