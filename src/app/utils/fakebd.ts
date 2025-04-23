export type Cliente = {
    id: string;
    name: string;
    usuario: string;
    ubicacion: string;
    estado: string;
    fecha: string;
    hora: string;
  };
  
  export const usuarios: Cliente[] = [
    {
      id: "123",
      name: "Juan Perez",
      usuario: "juanperez",
      ubicacion: "La Paz",
      estado: "Pago confirmado",
      fecha: "15/04/2025",
      hora: "10:45",
    },
    {
      id: "456",
      name: "Ana Martínez",
      usuario: "anamartinez",
      ubicacion: "Cochabamba",
      estado: "Pago confirmado",
      fecha: "16/04/2025",
      hora: "08:30",
    },
  ];
  
  export const getUsuarioPorId = (id: string): Cliente | undefined => {
    return usuarios.find(user => user.id === id);
  };