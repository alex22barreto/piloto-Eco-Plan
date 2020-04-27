import { Moment } from 'moment';
import { IEstado } from 'app/shared/model/estado.model';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';

export interface IActividades {
  id?: number;
  codigo?: number;
  nombre?: string;
  fecInicio?: Moment;
  fecFin?: Moment;
  conProveedor?: boolean;
  estado?: IEstado;
  tipo?: ITipoActividad;
}

export class Actividades implements IActividades {
  constructor(
    public id?: number,
    public codigo?: number,
    public nombre?: string,
    public fecInicio?: Moment,
    public fecFin?: Moment,
    public conProveedor?: boolean,
    public estado?: IEstado,
    public tipo?: ITipoActividad
  ) {
    this.conProveedor = this.conProveedor || false;
  }
}
