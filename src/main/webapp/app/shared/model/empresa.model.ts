import { IPersona } from 'app/shared/model/persona.model';

export interface IEmpresa {
  id?: number;
  tipoIdent?: string;
  identificacion?: string;
  razonSocial?: string;
  celular?: number;
  email?: string;
  personaContacto?: number;
  personaContacto?: IPersona;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public tipoIdent?: string,
    public identificacion?: string,
    public razonSocial?: string,
    public celular?: number,
    public email?: string,
    public personaContacto?: number,
    public personaContacto?: IPersona
  ) {}
}
