import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { usuario_id, mensaje } = body;

    // Insertar notificación
    const [result]: any = await db.query(
      'INSERT INTO notificacion (usuario_id, mensaje) VALUES (?, ?)',
      [usuario_id, mensaje]
    );

    // Obtener la notificación insertada (última)
    const [rows]: any = await db.query(
      'SELECT n.*, u.nombre AS usuario FROM notificacion n JOIN usuario u ON n.usuario_id = u.id WHERE n.id = ?',
      [result.insertId]
    );

    return NextResponse.json(rows[0], { status: 201 });

  } catch (err) {
    console.error('❌ Error al guardar:', err);
    return NextResponse.json({ error: 'Error al guardar notificación' }, { status: 500 });
  }
}
