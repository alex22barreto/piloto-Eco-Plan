import { IEstado } from 'app/shared/model/estado.model';
import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';

export interface IProyecto {
  id?: number;
  codigo?: number;
  nombre?: string;
  estado?: IEstado;
  tipo?: ITipoProyecto;
}

export class Proyecto implements IProyecto {
  constructor(public id?: number, public codigo?: number, public nombre?: string, public estado?: IEstado, public tipo?: ITipoProyecto) {}
}
