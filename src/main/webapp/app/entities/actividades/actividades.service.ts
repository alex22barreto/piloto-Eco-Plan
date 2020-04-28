import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActividades } from 'app/shared/model/actividades.model';

type EntityResponseType = HttpResponse<IActividades>;
type EntityArrayResponseType = HttpResponse<IActividades[]>;

@Injectable({ providedIn: 'root' })
export class ActividadesService {
  public resourceUrl = SERVER_API_URL + 'api/actividades';

  constructor(protected http: HttpClient) {}

  create(actividades: IActividades): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(actividades);
    return this.http
      .post<IActividades>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(actividades: IActividades): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(actividades);
    return this.http
      .put<IActividades>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IActividades>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IActividades[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(actividades: IActividades): IActividades {
    const copy: IActividades = Object.assign({}, actividades, {
      fecInicio: actividades.fecInicio && actividades.fecInicio.isValid() ? actividades.fecInicio.toJSON() : undefined,
      fecFin: actividades.fecFin && actividades.fecFin.isValid() ? actividades.fecFin.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecInicio = res.body.fecInicio ? moment(res.body.fecInicio) : undefined;
      res.body.fecFin = res.body.fecFin ? moment(res.body.fecFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((actividades: IActividades) => {
        actividades.fecInicio = actividades.fecInicio ? moment(actividades.fecInicio) : undefined;
        actividades.fecFin = actividades.fecFin ? moment(actividades.fecFin) : undefined;
      });
    }
    return res;
  }
}
