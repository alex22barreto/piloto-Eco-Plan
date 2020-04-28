export interface IProyecto {
  id?: number;
  codigo?: number;
  nombre?: string;
  estado?: string;
  tipo?: string;
}

export class Proyecto implements IProyecto {
  constructor(public id?: number, public codigo?: number, public nombre?: string, public estado?: string, public tipo?: string) {}
}
