import { NextResponse } from "next/server";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface Automovil extends RowDataPacket {
  costo: number;
  garantia: string;
}

export async function GET(  
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;                
    const [rows] = await db.query<Automovil[]>(
      'SELECT costo, garantia FROM automovil WHERE id = ?',
      [id]
    );

    if (!rows?.length) {
      return NextResponse.json({ error: "Automóvil no encontrado" }, { status: 404 });
    }
  
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener automóvil:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
