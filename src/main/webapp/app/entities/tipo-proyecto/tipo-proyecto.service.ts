import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';

type EntityResponseType = HttpResponse<ITipoProyecto>;
type EntityArrayResponseType = HttpResponse<ITipoProyecto[]>;

@Injectable({ providedIn: 'root' })
export class TipoProyectoService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-proyectos';

  constructor(protected http: HttpClient) {}

  create(tipoProyecto: ITipoProyecto): Observable<EntityResponseType> {
    return this.http.post<ITipoProyecto>(this.resourceUrl, tipoProyecto, { observe: 'response' });
  }

  update(tipoProyecto: ITipoProyecto): Observable<EntityResponseType> {
    return this.http.put<ITipoProyecto>(this.resourceUrl, tipoProyecto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoProyecto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoProyecto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
