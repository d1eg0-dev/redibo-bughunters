"use client";

import NotificacionPago100 from "@/components/Pago100%";
import Notificacion50PorCiento from "@/components/Notificacion50PorCiento";
import NotificacionErrorPago50 from "@/components/NotificacionErrorPago50"; // ✅ Importado
import NotificacionSinPago from "@/components/NotificacionSinPago";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ErrorNotification from "@/components/ErrorNotificacion"; 
import "./styles.css";

export default function SimuladorPago() {
  const [formData, setFormData] = useState({
    porcentaje: "0",
    metodoPago: "tarjeta",
    nombreUsuario: "",
    usuarioId: ""
  });

  const [precio, setPrecio] = useState(0);
  const [resultado, setResultado] = useState<"exito" | "fallo" | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalCargando, setModalCargando] = useState(false);
  const [mostrarNotificacion100, setMostrarNotificacion100] = useState(false);
  const [mostrarNotificacion50, setMostrarNotificacion50] = useState(false);
  const [mostrarErrorPago50, setMostrarErrorPago50] = useState(false); // ✅ Nuevo estado
  const [mostrarNotificacionno, setMostrarNotificacionno] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function cargarDatosIniciales() {
      try {
        const resAuto = await fetch("/api/automovil/1");
        const autoData = await resAuto.json();
        setPrecio(parseFloat(autoData.costo));

        const resUser = await fetch("/api/usuario/1");
        const userData = await resUser.json();

        setFormData(prev => ({
          ...prev,
          nombreUsuario: userData.nombre,
          usuarioId: userData.id
        }));
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      }

      const notificacion100 = localStorage.getItem("mostrarNotificacion100");
      if (notificacion100 === "true") {
        setMostrarNotificacion100(true);
      }
    }

    cargarDatosIniciales();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const registrarPago = async (monto: string, metodo: string, fecha: string) => {
    try {
      await fetch("/api/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: formData.usuarioId,
          monto,
          fecha_pago: fecha,
          metodo,
        })
      });
    } catch (error) {
      console.error("Error registrando pago:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultado(null);
    setError(null);
    setCargando(true);

    try {
      const res = await fetch("/api/pagar");
      const data = await res.json();

      if (!res.ok) {
        setResultado("fallo");
        setError(data.error || "Error desconocido");
      } else {
        setResultado("exito");

        const montoCalculado = (precio * parseFloat(formData.porcentaje) / 100).toFixed(2);
        const fechaActual = new Date().toLocaleString('es-BO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        await registrarPago(montoCalculado, formData.metodoPago, fechaActual);

        const porcentaje = parseFloat(formData.porcentaje);

        if (porcentaje === 100) {
          setMostrarNotificacion100(true);
          localStorage.setItem("mostrarNotificacion100", "true");
        } else if (porcentaje === 50) {
          const aleatorio = Math.random() < 0.5;
          if (aleatorio) {
            setMostrarNotificacion50(true);
          } else {
            setMostrarErrorPago50(true);
          }
        } else if (porcentaje === 0) {
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

  const cerrarModal = () => {
    setModalCargando(true);
    setTimeout(() => {
      setError(null);
      setModalCargando(false);
    }, 500);
  };

  const porcentajeReserva = parseFloat(formData.porcentaje) || 0;
  const totalPagarHoy = precio * (porcentajeReserva / 100);

  return (
    <div className="pago-container">
      <h2 className="titulo">Formulario de Pago de Reserva</h2> 
      <form onSubmit={handleSubmit} className="formulario">
        <div className="desglose">
          <h4 className="subtitulo">Datos de la Reserva</h4>
          <p className="texto"><strong>Usuario:</strong> {formData.nombreUsuario}</p>
          <p className="texto"><strong>Precio del servicio:</strong> ${precio.toFixed(2)}</p>
        </div>

        <label className="etiqueta">Porcentaje de reserva:</label>
        <select id="porcentaje" value={formData.porcentaje} onChange={handleChange} className="campo">
          <option value="0">Sin pago</option>
          <option value="50">50%</option>
          <option value="100">100%</option>
        </select>

        <label className="etiqueta">Método de pago:</label>
        <select id="metodoPago" value={formData.metodoPago} onChange={handleChange} className="campo">
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>

        <div className="desglose">
          <h4 className="subtitulo">Total a Pagar</h4>
          <p className="texto"><strong>Total a pagar hoy:</strong> ${totalPagarHoy.toFixed(2)}</p>
        </div>

        <button type="submit" className="boton" disabled={cargando}>
          {cargando ? "Procesando..." : "Reservar"}
        </button>
      </form>

      {/* RESULTADOS */}
      {resultado === "exito" && <p className="mensaje exito">✅ ¡Pago registrado exitosamente!</p>}
      {resultado === "fallo" && <p className="mensaje error">❌ Error procesando el pago</p>}

      {/* NOTIFICACIONES */}
      {mostrarNotificacion100 && (
        <NotificacionPago100
          monto={totalPagarHoy.toFixed(2)}
          onClose={() => {
            setMostrarNotificacion100(false);
            localStorage.removeItem("mostrarNotificacion100");
          }}
        />
      )}
      {mostrarNotificacion50 && (
        <Notificacion50PorCiento
          monto={totalPagarHoy.toFixed(2)}
          onClose={() => setMostrarNotificacion50(false)}
        />
      )}
      {mostrarErrorPago50 && (
        <NotificacionErrorPago50
          monto={totalPagarHoy.toFixed(2)}
          onClose={() => setMostrarErrorPago50(false)}
        />
      )}
      {mostrarNotificacionno && (
        <NotificacionSinPago onClose={() => setMostrarNotificacionno(false)} />
      )}

      {/* MODAL ERROR */}
      {error && (
        <ErrorNotification
          error={error}
          onClose={() => setError(null)}
          modalCargando={modalCargando}
          onAceptar={cerrarModal}
          title=""
        />
      )}
    </div>
  );
}
