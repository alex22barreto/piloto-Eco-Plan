import { IProyecto } from 'app/shared/model/proyecto.model';
import { IActividad } from 'app/shared/model/actividad.model';

export interface IEstado {
  id?: number;
  estadoNombre?: string;
  proyectos?: IProyecto[];
  actividads?: IActividad[];
}

export class Estado implements IEstado {
  constructor(public id?: number, public estadoNombre?: string, public proyectos?: IProyecto[], public actividads?: IActividad[]) {}
}
