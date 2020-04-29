import { Moment } from 'moment';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';
import { IEstado } from 'app/shared/model/estado.model';

export interface IActividad {
  id?: number;
  codigoActividad?: number;
  nombre?: string;
  fecInicio?: Moment;
  fecFin?: Moment;
  conProveedor?: boolean;
  proyecto?: IProyecto;
  tipoActividad?: ITipoActividad;
  estado?: IEstado;
}

export class Actividad implements IActividad {
  constructor(
    public id?: number,
    public codigoActividad?: number,
    public nombre?: string,
    public fecInicio?: Moment,
    public fecFin?: Moment,
    public conProveedor?: boolean,
    public proyecto?: IProyecto,
    public tipoActividad?: ITipoActividad,
    public estado?: IEstado
  ) {
    this.conProveedor = this.conProveedor || false;
  }
}
