'use client';

import { useState, useEffect } from 'react';
import { Img } from 'react-image';

interface NotificacionProps {
  monto: string;
  onClose: () => void;
}

interface NotificationData {
  fecha: string;
  hora: string;
  usuario: string;
  ubicacion: string;
  visible: boolean;
}

export default function NotificacionPago100({ monto, onClose }: NotificacionProps) {
  const [mounted, setMounted] = useState(false);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [usuario, setUsuario] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Recuperar estado del localStorage
    const savedNotification = localStorage.getItem('lastNotification');
    if (savedNotification) {
      const { fecha, hora, usuario, ubicacion, visible }: NotificationData = JSON.parse(savedNotification);
      setFecha(fecha);
      setHora(hora);
      setUsuario(usuario);
      setUbicacion(ubicacion);
      setIsVisible(visible);
      
      // Si la notificación está marcada como visible, no hacemos nada más
      if (visible) return;
    }

    // Si no hay datos guardados o la notificación estaba oculta, generamos nuevos
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
      hour12: false
    };

    const newFecha = fechaAjustada.toLocaleDateString('es-ES', opcionesFecha);
    const newHora = fechaAjustada.toLocaleTimeString('es-ES', opcionesHora);

    setFecha(newFecha);
    setHora(newHora);
    setIsVisible(true); // Mostramos la notificación

    // Llamada API para traer usuario y ubicación
    async function cargarDatosUsuario() {
      try {
        const res = await fetch('/api/usuario/1');
        const data = await res.json();

        const newUsuario = data.nombre;
        const newUbicacion = data.ubicacion;

        setUsuario(newUsuario);
        setUbicacion(newUbicacion);

        // Guardar en localStorage con visible=true
        localStorage.setItem('lastNotification', JSON.stringify({
          fecha: newFecha,
          hora: newHora,
          usuario: newUsuario,
          ubicacion: newUbicacion,
          visible: true
        }));
      } catch (error) {
        console.error('Error cargando datos de usuario:', error);
      }
    }

    cargarDatosUsuario();
  }, []);

  const handleClose = () => {
    // Actualizar el localStorage marcando la notificación como no visible
    const savedNotification = localStorage.getItem('lastNotification');
    if (savedNotification) {
      const notificationData: NotificationData = JSON.parse(savedNotification);
      localStorage.setItem('lastNotification', JSON.stringify({
        ...notificationData,
        visible: false
      }));
    }
    
    setIsVisible(false);
    onClose();
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-md pointer-events-auto">
        {/* Icono */}
        <Img
          src="/campana1.svg"
          alt="Notificación"
          className="w-10 h-10 mb-2 mx-auto"
        />

        {/* Título */}
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-0.5">
          ¡Deposito Registrado!
        </h2>

        {/* Mensaje personalizado */}
        <p className="text-xs text-center text-gray-600 mb-1">
          Realizaste una reserva del 100%.
        </p>

        {/* Detalles */}
        <ul className="mt-1 text-gray-800 text-xs space-y-0.25 leading-snug">
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
        </ul>

        {/* Botón */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleClose}
            className="bg-[#1E2A78] text-white px-10 py-2 rounded-lg hover:bg-[#1b2569] text-sm transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}