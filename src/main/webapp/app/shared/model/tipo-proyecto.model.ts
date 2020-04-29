import { IProyecto } from 'app/shared/model/proyecto.model';

export interface ITipoProyecto {
  id?: number;
  nombreTipoProyecto?: string;
  proyectos?: IProyecto[];
}

export class TipoProyecto implements ITipoProyecto {
  constructor(public id?: number, public nombreTipoProyecto?: string, public proyectos?: IProyecto[]) {}
}
