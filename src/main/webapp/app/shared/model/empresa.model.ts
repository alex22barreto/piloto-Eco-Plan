export interface IEmpresa {
  id?: number;
  tipoIdent?: string;
  identificacion?: string;
  razonSocial?: string;
  celular?: number;
  email?: string;
  personaContacto?: string;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public tipoIdent?: string,
    public identificacion?: string,
    public razonSocial?: string,
    public celular?: number,
    public email?: string,
    public personaContacto?: string
  ) {}
}
