import { IActividad } from 'app/shared/model/actividad.model';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { IEstado } from 'app/shared/model/estado.model';

export interface IProyecto {
  id?: number;
  codigoProyecto?: number;
  nombre?: string;
  actividads?: IActividad[];
  empresa?: IEmpresa;
  tipoProyecto?: ITipoProyecto;
  estado?: IEstado;
}

export class Proyecto implements IProyecto {
  constructor(
    public id?: number,
    public codigoProyecto?: number,
    public nombre?: string,
    public actividads?: IActividad[],
    public empresa?: IEmpresa,
    public tipoProyecto?: ITipoProyecto,
    public estado?: IEstado
  ) {}
}
