import { IEmpresa } from 'app/shared/model/empresa.model';

export interface IPersona {
  id?: number;
  idPersona?: number;
  identificacion?: number;
  nombre?: string;
  apellido?: string;
  empresas?: IEmpresa[];
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public idPersona?: number,
    public identificacion?: number,
    public nombre?: string,
    public apellido?: string,
    public empresas?: IEmpresa[]
  ) {}
}
