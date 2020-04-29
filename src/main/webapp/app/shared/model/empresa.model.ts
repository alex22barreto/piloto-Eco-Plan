import { IProyecto } from 'app/shared/model/proyecto.model';

export interface IEmpresa {
  id?: number;
  tipoIdent?: string;
  identificacionEmpresa?: string;
  razonSocial?: string;
  celular?: number;
  email?: string;
  proyectos?: IProyecto[];
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public tipoIdent?: string,
    public identificacionEmpresa?: string,
    public razonSocial?: string,
    public celular?: number,
    public email?: string,
    public proyectos?: IProyecto[]
  ) {}
}
