// src/app/PagoGarantia/page.tsx

"use client";

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import './Garantias.css';
import NotificacionGarantia from "@/components/NotificacionGarantia";
import { Cliente } from "@/types/cliente";
import { useError } from "@/context/ErrorContext";

export default function PagoGarantia() {
  const [precioGarantia, setPrecioGarantia] = useState(0);
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [datosCliente, setDatosCliente] = useState<Cliente | null>(null);
  const [mostrarNoti, setMostrarNoti] = useState(false);
  const [resultado, setResultado] = useState<'exito' | 'fallo' | null>(null);
  const [cargando, setCargando] = useState(false);
  const [conexionExitosa, setConexionExitosa] = useState<boolean | null>(null);
  const [modalCargando, setModalCargando] = useState(false);
  const router = useRouter();
  const { showError } = useError(); 

  useEffect(() => {
    async function cargarDatosIniciales() {
      try {
        const resGarantia = await fetch('/api/automovil/1');
        const garantiaData = await resGarantia.json();
        setPrecioGarantia(parseFloat(garantiaData.garantia));

        const resUser = await fetch('/api/usuario/1');
        const userData = await resUser.json();

        setDatosCliente({
          id: userData.id,
          usuario: userData.nombre,
          name: userData.nombre,
          estado: "Pago confirmado",
          fecha: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          ubicacion: userData.ubicacion 
        });

        setConexionExitosa(true);
      } catch (err) {
        console.error("Error cargando datos iniciales:", err);
        setConexionExitosa(false);
      }
    }

    cargarDatosIniciales();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    setResultado(null);
    

    try {
      const res = await fetch("/api/pagar");
      const data = await res.json();

      if (!res.ok) {
        setResultado("fallo");
        showError(data.error || "Error desconocido");
      } else {
        const random = Math.random();
        //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        if (metodoPago === "tarjeta" && random < 0.3) {
              setResultado("fallo");
               showError("Tarjeta rechazada.","garantia");
               return;
        }
        //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        if (metodoPago === "transferencia" && random < 0.3) {
              setResultado("fallo");
              showError("Timeout en la transacción.","garantia");
              return;
          }
        setResultado("exito");

        const ahora = new Date();
        const fechaActual = new Date().toISOString();

        setDatosCliente(prev => prev && ({
          ...prev,
          fecha: ahora.toLocaleDateString(),
          hora: ahora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }));
        
        await fetch('/api/pago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario_id: datosCliente?.id,
            monto: precioGarantia,
            fecha_pago: fechaActual,
            metodo: metodoPago
          })
        });

        setMostrarNoti(true);
      }
    } catch (err) {
      console.error("Error de conexión", err);
      setResultado("fallo");
      showError("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };
  const manejarAceptar = () => {
    setModalCargando(true);
    setTimeout(() => {
      setModalCargando(false);
    }, 500);
  };


  return (
    <div className="garantia-container">
      <h1 className="titulo">Pago de Garantía</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <label className="etiqueta">Precio de la garantía:</label>
        <input
          type="number"
          className="campo"
          value={precioGarantia}
          disabled
        />

        <label className="etiqueta">Método de pago:</label>
        <select
          value={metodoPago}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setMetodoPago(e.target.value)}
          className="campo"
        >
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>

        <div className="desglose">
          <h4 className="subtitulo">Total a pagar hoy</h4>
          <p className="texto">${precioGarantia.toFixed(2)}</p>
        </div>

        <button type="submit" className="boton" disabled={cargando}>
          {cargando ? 'Procesando...' : 'Pagar'}
        </button>
      </form>

      {resultado === 'exito' && mostrarNoti && datosCliente && (
        <NotificacionGarantia
          datos={datosCliente}
          onClose={() => setMostrarNoti(false)}
        />
      )}
  
    </div>
  );
}