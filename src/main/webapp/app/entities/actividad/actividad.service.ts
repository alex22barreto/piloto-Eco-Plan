import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActividad } from 'app/shared/model/actividad.model';

type EntityResponseType = HttpResponse<IActividad>;
type EntityArrayResponseType = HttpResponse<IActividad[]>;

@Injectable({ providedIn: 'root' })
export class ActividadService {
  public resourceUrl = SERVER_API_URL + 'api/actividads';

  constructor(protected http: HttpClient) {}

  create(actividad: IActividad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(actividad);
    return this.http
      .post<IActividad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(actividad: IActividad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(actividad);
    return this.http
      .put<IActividad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IActividad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IActividad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(actividad: IActividad): IActividad {
    const copy: IActividad = Object.assign({}, actividad, {
      fecInicio: actividad.fecInicio && actividad.fecInicio.isValid() ? actividad.fecInicio.toJSON() : undefined,
      fecFin: actividad.fecFin && actividad.fecFin.isValid() ? actividad.fecFin.toJSON() : undefined
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
      res.body.forEach((actividad: IActividad) => {
        actividad.fecInicio = actividad.fecInicio ? moment(actividad.fecInicio) : undefined;
        actividad.fecFin = actividad.fecFin ? moment(actividad.fecFin) : undefined;
      });
    }
    return res;
  }
}
