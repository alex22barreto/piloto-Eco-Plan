import { IActividad } from 'app/shared/model/actividad.model';

export interface ITipoActividad {
  id?: number;
  nombreTipoActividad?: string;
  actividads?: IActividad[];
}

export class TipoActividad implements ITipoActividad {
  constructor(public id?: number, public nombreTipoActividad?: string, public actividads?: IActividad[]) {}
}
