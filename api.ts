import {
  Injectable,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import { IParametro, IReseller, IResellerParametro } from '../../models';


interface ILicenciaServer {
  idMaquina: string;
  idIReseller: number;
  codArea: number;
  isActive: boolean;
  codUser: number;
  nombreUsuario: string;
  telefono: string;
  direccion: string;
  codPostal: string;
  poblacion: string;
  provincia: string;
  maquina: string;
}

interface IResellerServer {
  clientName: string;
  codTecnico: string;
  email: string;
  idIReseller: number;
  idUser: number;
  isContactable: boolean;
  licenseInCloud: boolean;
  logo: string;
  telephone: string;
  web: string;
}

const API_URL = 'https://app.osmolink.com/api/v3';
// const API_HEADER = { 'x-view': 'VReseller' };

function toLocalReseller(iReseller: IResellerServer, codArea: number): IReseller {
  if(!!iReseller) {
    return {
      clientName: iReseller.clientName,
      credentials: { area: codArea, tecnico: iReseller.codTecnico },
      email: iReseller.email,
      id: iReseller.idIReseller,
      isContactable: iReseller.isContactable,
      logo: iReseller.logo,
      telephone: iReseller.telephone,
      web: iReseller.web,
    };
  } else { return null; }
}

@Injectable()
class ApiService {

  ///////////////
  // Variables //
  ///////////////

  private _codArea: number = null;
  private _licencia: ILicenciaServer = null;
  private _reseller: IResellerServer = null;



  /////////////////
  // Constructor //
  /////////////////

  constructor(
    private http: HttpClient,
  ) { }



  ///////////////////////
  // GET/SET Functions //
  ///////////////////////

  get isLicenciaActiva() {
    return !!this._licencia ? this._licencia.isActive : true;
  }

  get isLicenciaInCloud() {
    return !!this._reseller ? this._reseller.licenseInCloud : false;
  }

  get tecnicoCanEdit() {
    if(this.isLicenciaInCloud === true) {
      return this.isLicenciaActiva;
    } else { return true; }
  }



  //////////////////////
  // Public Functions //
  //////////////////////

  signin(data: any): Promise<IReseller> {
    return this.http.post<IResellerServer>(`${API_URL}/horizon/iReseller/log`, data).toPromise()
      .then((iReseller) => {
        this._codArea = data.codArea;
        this._reseller = iReseller;
        return toLocalReseller(iReseller, data.codArea);
      });
  }

  getLicencia(idMaquina: string): Promise<ILicenciaServer> {
    const data = { idMaquina, codTecnico: this._reseller.codTecnico, codArea: this._codArea };
    return this.http.post<ILicenciaServer>(`${API_URL}/horizon/iLicencia/log`, data).toPromise()
      .then((iLicencia) => {
        this._licencia = iLicencia;
        return iLicencia;
      });
  }

  setLicencia(data: any): Promise<ILicenciaServer> {
    const licencia = { ...data, codTecnico: this._reseller.codTecnico, codArea: this._codArea };

    let promise$: Promise<ILicenciaServer> = null;
    if(!!this._licencia) {
      promise$ = this.http.put<ILicenciaServer>(`${API_URL}/horizon/iLicencia/${licencia.idMaquina}`, licencia).toPromise();
    } else {
      promise$ = this.http.post<ILicenciaServer>(`${API_URL}/horizon/iLicencia`, licencia).toPromise();
    }

    return promise$.then((iLicencia) => {
      this._licencia = iLicencia;
      return iLicencia;
    })
  }

  getParametros(): Promise<IParametro[]> {
    return this.http.get(`${API_URL}/public/horizon/iParametro?_perPage=-1`).toPromise()
      .then((iParametros: any[]) => {
        return iParametros.map<IParametro>((p) => ({
          direction: p.direction,
          id: p.idIParametro,
          max: p.max,
          min: p.min,
          size: p.size,
          type: p.type,
        }));
      });
  }

  getReseller(codTecnico: string): Promise<IReseller> {
    return this.http.get(`${API_URL}/public/horizon/iReseller?_filters=[{"field":"codTecnico","value":"${codTecnico}"}]`).toPromise()
      .then((iResellers: any[]) => toLocalReseller(iResellers.shift(), 0));
  }

  getResellerById(idReseller: number): Promise<IReseller> {
    return this.http.get(`${API_URL}/public/horizon/iReseller?_filters=[{"field":"idIReseller","value":${idReseller}}]`).toPromise()
      .then((iResellers: any[]) => toLocalReseller(iResellers.shift(), 0));
  }

  getResellerParametros(idReseller: number): Promise<IResellerParametro[]> {
    return this.http.get(`${API_URL}/public/horizon/iResellerParametro?_filters=[{"field":"idIReseller","value":${idReseller}}]&_perPage=-1`).toPromise()
      .then((iResellerParametros: any[]) => {
        return iResellerParametros.map<IResellerParametro>((rp) => ({
          idParametro: rp.idIParametro,
          idReseller: rp.idIReseller,
          isEditable: rp.isEditable !== null ? rp.isEditable : undefined,
          value: rp.value,
        }));
      });
  }

}


export {
  ApiService,
};