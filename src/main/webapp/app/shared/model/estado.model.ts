import { IActividades } from 'app/shared/model/actividades.model';
import { IProyecto } from 'app/shared/model/proyecto.model';

export interface IEstado {
  id?: number;
  idTipoEstado?: number;
  nombreTipoEstado?: string;
  actividades?: IActividades[];
  proyectos?: IProyecto[];
}

export class Estado implements IEstado {
  constructor(
    public id?: number,
    public idTipoEstado?: number,
    public nombreTipoEstado?: string,
    public actividades?: IActividades[],
    public proyectos?: IProyecto[]
  ) {}
}
