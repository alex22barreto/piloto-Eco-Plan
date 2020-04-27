import { IProyecto } from 'app/shared/model/proyecto.model';

export interface ITipoProyecto {
  id?: number;
  idTipoProyecto?: number;
  nombreTipoProyecto?: string;
  proyectos?: IProyecto[];
}

export class TipoProyecto implements ITipoProyecto {
  constructor(public id?: number, public idTipoProyecto?: number, public nombreTipoProyecto?: string, public proyectos?: IProyecto[]) {}
}
