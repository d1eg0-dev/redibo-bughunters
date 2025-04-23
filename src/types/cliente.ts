export interface Cliente { 
    id: number; // de la tabla usuario
    name: string; // nombre del usuario
    usuario: string; // también puede ser nombre, útil si usas ambos
    estado: string; // estado del pago
    fecha: string; // fecha de la notificación
    hora: string; // hora de la notificación
    ubicacion: string; // campo manual
}