"use client";

import NotificacionPago100 from "@/components/Pago100%";
import Notificacion50PorCiento from "@/components/Notificacion50PorCiento";
import NotificacionSinPago from "@/components/NotificacionSinPago";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function SimuladorPago() {
  const [formData, setFormData] = useState({
    precio: "",
    porcentaje: "0",
  });

  const [resultado, setResultado] = useState<"exito" | "fallo" | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalCargando, setModalCargando] = useState(false);
  const [mostrarNotificacion100, setMostrarNotificacion100] = useState(false); //Para notificacion 100% 
  const [mostrarNotificacion50, setMostrarNotificacion50] = useState(false); //Para notificacion 50% 
  const [mostrarNotificacionno, setMostrarNotificacionno] = useState(false); //Para notificacion 0% 
  
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultado(null);
    setError(null);
    setCargando(true);
  
    try {
      const res = await fetch("/api/pagar"); // llama al endpoint real
  
      const data = await res.json();
  
      if (!res.ok) {
        setResultado("fallo");
        setError(data.error || "Error desconocido");
      } else {
        setResultado("exito");
        // Mostrar la notificación solo si el porcentaje es 100
        if (parseFloat(formData.porcentaje) === 100) {
          setMostrarNotificacion100(true);
        }
        if (parseFloat(formData.porcentaje) === 50) {
         setMostrarNotificacion50(true);
         }
       if (parseFloat(formData.porcentaje) === 0) {
            setMostrarNotificacionno(true);
          }
      }
    } catch (err) {
      setResultado("fallo");
      setError("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };
  

  const cerrarModal = () => setError(null);

  const manejarAceptar = () => {
    setModalCargando(true);
    setTimeout(() => {
      setModalCargando(false);
      router.push("");
   //   setError(null);
      //window.location.href = "/reserva?error=El%20servidor%20no%20pudo%20procesar%20el%20pago.";

    }, 1000);
  };

  const precio = parseFloat(formData.precio) || 0;
  const porcentajeReserva = parseFloat(formData.porcentaje) || 0;
  const totalPagarHoy = precio * (porcentajeReserva / 100);

  return (
    <div className="pago-container">
      <h2 className="titulo">Simulación de Pago de Reserva</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <label className="etiqueta">Precio del servicio:</label>
        <input
          id="precio"
          type="number"
          className="campo"
          placeholder="Ej: 100"
          value={formData.precio}
          onChange={handleChange}
          required
        />

        <label className="etiqueta">Porcentaje de reserva:</label>
        <select
          id="porcentaje"
          value={formData.porcentaje}
          onChange={handleChange}
          className="campo"
        >
          <option value="0">Sin pago</option>
          <option value="50">50%</option>
          <option value="100">100%</option>
        </select>

        <div className="desglose">
          <h4 className="subtitulo">Desglose del Pago</h4>
          <p className="texto">
            <strong>Precio del servicio:</strong> ${precio.toFixed(2)}
          </p>
          <p className="texto">
            <strong>Monto de la reserva:</strong> {formData.porcentaje}%
          </p>
          <p className="texto">
            <strong>Total a pagar hoy:</strong> ${totalPagarHoy.toFixed(2)}
          </p>
        </div>

        <button type="submit" className="boton" disabled={cargando}>
          {cargando ? "Procesando..." : "Simular Pago"}
        </button>
      </form>

      {resultado === "exito" && (
        <p className="mensaje exito">✅ ¡Pago simulado con éxito!</p>
      )}




      {/* MODAL NOTIFICACION 100% */}
  {mostrarNotificacion100 && (
    <NotificacionPago100
      monto={totalPagarHoy.toFixed(2)}
      onClose={() => setMostrarNotificacion100(false)}
    />
  )}

  {/* MODAL NOTIFICACION 50% */}
  {mostrarNotificacion50 && (
    <Notificacion50PorCiento
      monto={totalPagarHoy.toFixed(2)}
      onClose={() => setMostrarNotificacion50(false)}
    />
  )}

  {/* MODAL NOTIFICACION 0% */}
  {mostrarNotificacionno && (
    <NotificacionSinPago
      onClose={() => setMostrarNotificacionno(false)}
    />
  )}








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

            {/* Icono */}
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
              onClick={cerrarModal}
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
      )}
    </div>
  );


  
}

