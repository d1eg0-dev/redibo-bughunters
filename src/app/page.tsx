"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const goTo = (path: string) => router.push(path);

  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 bg-gray-50">
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center text-center space-y-6">
    {/* Imagen de ejemplo */}
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbsY6cRgWxtXtNOwByVipLAG5zKS2awSQsA&s" // coloca aquí la ruta de tu imagen o usa una URL
      alt="Auto"
      className="w-48 h-48 object-contain mx-auto"
    />

    {/* Título y descripción */}
    <h1 className="text-4xl font-bold text-gray-800">Bienvenido a REDIBO</h1>
    <p className="text-lg text-gray-600">Tu tienda en línea para rentar autos.</p>

    {/* Detalles destacados */}
    <div className="flex gap-6 mt-2 text-sm text-gray-500">
      <span className="flex items-center gap-1">🚗 Variedad de modelos</span>
      <span className="flex items-center gap-1">⏱️ Reserva en minutos</span>
      <span className="flex items-center gap-1">🛡️ Seguro incluido</span>
    </div>

    {/* Botón principal con menú */}
    <div className="relative mt-4">
      <button
        onClick={toggleDropdown}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
      >
        Pagar Reserva
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-md z-10">
          <button
            onClick={() => goTo("/SimuladorPago")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            Pago
          </button>
          <button
            onClick={() => goTo("/pagosgarantia")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            Pago por Garantía
          </button>
        </div>
      )}
    </div>
  </div>
</main>

    </div>
  );
}
