import { Moment } from 'moment';

export interface IActividades {
  id?: number;
  codigo?: number;
  nombre?: string;
  fecInicio?: Moment;
  fecFin?: Moment;
  estado?: string;
  tipo?: string;
  conProveedor?: boolean;
}

export class Actividades implements IActividades {
  constructor(
    public id?: number,
    public codigo?: number,
    public nombre?: string,
    public fecInicio?: Moment,
    public fecFin?: Moment,
    public estado?: string,
    public tipo?: string,
    public conProveedor?: boolean
  ) {
    this.conProveedor = this.conProveedor || false;
  }
}
