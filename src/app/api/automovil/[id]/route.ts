import {NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";


interface Automovil extends RowDataPacket {
  costo: number;
}

interface Params {
  params: {
    id: string;
  };
}

export async function GET(  
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  
) {
  try {
    const { id } =  await params

    const [rows] = await db.query<Automovil[]>(
      'SELECT costo, garantia FROM automovil WHERE id = ?',
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Automóvil no encontrado' }, { status: 404 });
    }

    return NextResponse.json({id});
  } catch (error) {
    console.error('Error al obtener automóvil:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
