export interface Note {
    id: string,
    nombreNota: string,
    descripcion: string,
    tiponota: Tiponota[],
  }
  
  export interface Tiponota {
    id: string;
    name: string;
  }