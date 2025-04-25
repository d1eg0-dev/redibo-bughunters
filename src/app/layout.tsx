
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ✅ Importa tu ErrorProvider y el componente que muestra el error
import { ErrorProvider } from "@/context/ErrorContext";
import GlobalErrorDisplay from "../components/GlobalErrorDisplay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redibo",
  description: "Ingenieria de software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("ErrorProvider:", ErrorProvider);
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* 🔁 Aquí envolvemos toda la app */}
        <ErrorProvider>
          {/* ✅ Componente que escucha errores globales y lanza la notificación */}
          <GlobalErrorDisplay />
          {children}
        </ErrorProvider>
      </body>
    </html>
  );
  

}
