
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { errores } from '@/lib/errores';

export async function GET() {
  const error = errores[Math.floor(Math.random() * errores.length)];

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  try {
    const [rows] = await db.query('SELECT 1'); // Conexión simple
    return NextResponse.json({ success: true, message: 'Depósito realizado con éxito 🎉' }, { status: 200 });
  } catch (err) {
    console.error('Error con la BD:', err);
    return NextResponse.json({ success: false, error: 'Error de conexión a la base de datos' }, { status: 500 });
  }
}
