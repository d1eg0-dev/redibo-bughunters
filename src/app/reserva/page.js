





"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReservaPage() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null); 
  const [modalCargando, setModalCargando] = useState(false);
  const router = useRouter();

  const intentarDeposito = async () => {
    setCargando(true);
    setError(null);

    try {
      const res = await fetch("/api/pagar");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Inténtelo nuevamente o contacte a soporte técnico.");
      } else {
        alert("¡Depósito realizado con éxito!");
      }
    } catch (e) {
      setError("Error de red inesperado. Inténtelo nuevamente o contacte a soporte.");
    } finally {
      setCargando(false);
    }
  };

  const cerrarModal = () => setError(null);

  const manejarAceptar = () => {
    setModalCargando(true);
    setTimeout(() => {
      setModalCargando(false);
      setError(null);
      router.push("/reserva"); // Redirige a pantalla de pago u otra que definas
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Reservar Auto</h1>

      <button
        onClick={intentarDeposito}
        className="btn btn-primary"
        disabled={cargando}
      >
        {cargando ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Intentar depósito de garantía"
        )}
      </button>

      {/* MODAL DE ERROR */}
      {error && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative text-center space-y-4 border-2 border-[#11295B]">
      {/* Botón de cerrar (x) */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        onClick={cerrarModal}
      >
        &times;
      </button>

      {/* Icono de campana amarilla */}
      <div className="text-[#FCA311] text-4xl">❌</div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-[#11295B]">ERROR</h2>

      {/* Mensaje */}
      <p className="text-gray-700">
        Error en el depósito de Garantía. <br />
        No se pudo procesar su pago: <br />
        <span className="font-semibold">{error}</span>
      </p>

      {/* Botón Aceptar estilizado */}
      <button
        onClick={manejarAceptar}
        disabled={modalCargando}
        className={`w-full mt-4 border-2 rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
          modalCargando
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-[#11295B] border-[#11295B] hover:bg-[#11295B] hover:text-white'
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
)}

    </div>
  );
}