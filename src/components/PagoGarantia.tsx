"use client";
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import './Garantias.css';
import NotificacionGarantia from "@/components/NotificacionGarantia";
import { Cliente } from "@/types/cliente";


export default function PagoGarantia() {
  const [precio, setPrecio] = useState('');
  const [resultado, setResultado] = useState<'exito' | 'fallo' | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //const router = useRouter(); // ← usar router

  const [conexionExitosa, setConexionExitosa] = useState<boolean | null>(null); // nuevo estado
 
  const router = useRouter();
 
   // ✅ Verifica conexión a la base de datos al montar el componente
   useEffect(() => {
     const verificarConexion = async () => {
       try {
         const res = await fetch('/api/pagar');
         const data = await res.json();
         if (res.ok && data.success) {
           setConexionExitosa(true);
         } else {
           setConexionExitosa(false);
         }
       } catch (err) {
         setConexionExitosa(false);
       }
     };


     verificarConexion();
    }, []);

  const [datosCliente, setDatosCliente] = useState<Cliente | null>(null);
  const [mostrarNoti, setMostrarNoti] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    setResultado(null);
    setError(null);

    try {
      const res = await fetch("/api/pagar");
      const data = await res.json();
    
      if (!res.ok) {
        setResultado("fallo");
        setError(data.error || "Error desconocido");
      } else {
        setResultado("exito");
    
        // ✅ Paso 2: Insertar la notificación en la BD
        const mensaje = `Depósito de garantía confirmado por un monto de $${parseFloat(precio).toFixed(2)}.`;
        const resNoti = await fetch('/api/notificacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario_id: 1, // ID del usuario (simulado)
            mensaje
          })
        });
    
        const nuevaNoti = await resNoti.json();
    
        // ✅ Preparar datos para mostrar en el modal
        setDatosCliente({
          id: nuevaNoti.usuario_id,
          usuario: nuevaNoti.usuario,
          name: nuevaNoti.usuario,
          estado: "Pago confirmado",
          fecha: new Date(nuevaNoti.fecha_envio).toLocaleDateString(),
          hora: new Date(nuevaNoti.fecha_envio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          ubicacion: "Av. Principal 123"
        });
    
        setMostrarNoti(true);
      }
    } catch (err) {
      console.error("Error de conexión", err);
      setResultado("fallo");
      setError("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
    
  };

  const totalHoy = parseFloat(precio) || 0;

  return (
    <div className="garantia-container">
      <h1 className="titulo">Pago de Garantía</h1>


      {conexionExitosa === true && (
        <p className="mensaje exito">✅ ¡Conexión a la base de datos exitosa!</p>
      )}
      {conexionExitosa === false && (
        <p className="mensaje fallo">❌ No se pudo conectar con la base de datos.</p>
      )}

      <form onSubmit={handleSubmit} className="formulario">
        <label className="etiqueta">Precio de la garantía:</label>
        <input
          type="number"
          className="campo"
          placeholder="Ej: 150"
          value={precio}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrecio(e.target.value)}
          required
        />

        <div className="desglose">
          <h4 className="subtitulo">Total a pagar hoy</h4>
          <p className="texto">${totalHoy.toFixed(2)}</p>
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

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative text-center space-y-4 border-2 border-[#11295B]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setError(null)}
            >
              &times;
            </button>
            <div className="text-[#FCA311] text-4xl">❌</div>
            <h2 className="text-2xl font-bold text-[#11295B]">ERROR</h2>
            <p className="text-gray-700">
              Error en el depósito de Garantía. <br />
              No se pudo procesar su pago: <br />
              <span className="font-semibold">{error}</span>
            </p>
            <button
              onClick={() => setError(null)}
              className="w-full mt-4 border-2 rounded-lg px-4 py-2 font-semibold transition-colors duration-200 bg-white text-[#11295B] border-[#11295B] hover:bg-[#11295B] hover:text-white"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>

  );
}
