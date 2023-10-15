export interface Note {
    id: string;
    nombreNota: string;
    descripcion: string;
    tipoNotaId: string;
    tiponota: tiponota | null;  // Asegúrate de tener el tipo correcto aquí
  }
  
  export interface tiponota {
    id: string;
    name: string;
  }