// src/app/api/usuario/[id]/route.ts

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2'; // Importamos RowDataPacket correctamente

interface Usuario extends RowDataPacket {
  id: number;
  nombre: string;
  ubicacion: string;
}

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;

    const [rows] = await db.query<Usuario[]>(
      'SELECT id, nombre, ubicacion FROM usuario WHERE id = ?',
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
