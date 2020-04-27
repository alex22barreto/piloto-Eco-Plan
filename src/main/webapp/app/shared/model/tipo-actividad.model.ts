import { IActividades } from 'app/shared/model/actividades.model';

export interface ITipoActividad {
  id?: number;
  idTipoActividad?: number;
  nombreTipoActividad?: string;
  actividades?: IActividades[];
}

export class TipoActividad implements ITipoActividad {
  constructor(
    public id?: number,
    public idTipoActividad?: number,
    public nombreTipoActividad?: string,
    public actividades?: IActividades[]
  ) {}
}
