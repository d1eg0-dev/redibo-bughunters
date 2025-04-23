import React from "react";
import { Cliente } from "@/types/cliente";
import { Img } from "react-image";
import {
  CheckCircleIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

interface NotificacionesDetalleProps {
    datos: Cliente | null; // Puede ser un objeto Cliente o null
    onClose: () => void;   // Función para cerrar la notificación
}
export default function NotificacionesDetalle({ datos, onClose }: NotificacionesDetalleProps) {
    if (!datos) return null;

  
  const session = {
    user: {
      id: 1,
      //name: "Ana Martínez"
    }
  };
 

  return (
    <div className="fixed inset-0   bg-white/10 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md sm:p-6 p-4 shadow-2xl text-center border-0">
        <Img 
        src="/campana1.svg"
        alt="Icono de notificación"
        className="w-12 h-12 sm:w-14 sm:h-14 mb-4 mx-auto"
         />

        <h2 className="font-family: 'Inter' semi-bold font-bold text-2xl text-black mb-2">
          ¡Deposito de garantía registrado!
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Tu deposito ha sido registrado correctamente.
        </p>

        <div className="text-center font-family: 'Inter' text-gray-600 my-4 space-y-1">
          <p>
            <span className="font-family: 'Inter' text-gray-600"> <CheckCircleIcon className="w-5 h-5 text-green-500 inline mr-1" /> Estado:</span>{" "}
            <span
              className={
                datos.estado === "Pago confirmado"
                  ? "text-green-600 font-family: 'Inter'"
                  : datos.estado === "Pago confirmado" //aqui se modifica el estado
                  ? "text-yellow-600 font-family: 'Inter'"
                  : "text-red-600 tfont-family: 'Inter'"
              }
            >
              {datos.estado}
            </span>
          </p>
          <p>
            
            <span className="font-family: 'Inter' text-gray-600"> <CalendarIcon className="w-5 h-5 text-gray-500 inline mr-1" /> Fecha:</span>{" "}
            {datos.fecha}
          </p>
          <p>
            <span className="font-family: 'Inter' text-gray-600"> <ClockIcon className="w-5 h-5 text-pink-500 inline mr-1" /> Hora:</span>{" "}
            {datos.hora}
          </p>
          <p>
            <span className="font-family: 'Inter' text-gray-600"> <MapPinIcon className="w-5 h-5 text-blue-500 inline mr-1" /> Ubicación:</span>{" "}
            {datos.ubicacion}
          </p>
          {/* Solo mostrar el usuario si es el mismo que está logueado */}
          {session.user.id === datos.id && (
            <p>
              <span className="font-family: 'Inter' text-gray-600"> <UserIcon className="w-5 h-5 text-blue-500 inline mr-1" /> Usuario:</span>{" "}
              {datos.name}
            </p>
          )}  
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-[170px] h-[35px] bg-[#11295B] text-white hover:bg-[#0e224f] rounded-lg font-family: 'Inter' transition"
         // className="mt-6 px-6 py-2 bg-[#11295B] text-white hover:bg-[#0e224f] rounded-lg text-sm sm:text-base transition"
                    //mt-4 px-4 py-2 bg-indigo-950 text-white hover:bg-indigo-900 rounded text-sm sm:text-base
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}