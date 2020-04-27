import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoProyecto, TipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { TipoProyectoService } from './tipo-proyecto.service';
import { TipoProyectoComponent } from './tipo-proyecto.component';
import { TipoProyectoDetailComponent } from './tipo-proyecto-detail.component';
import { TipoProyectoUpdateComponent } from './tipo-proyecto-update.component';

@Injectable({ providedIn: 'root' })
export class TipoProyectoResolve implements Resolve<ITipoProyecto> {
  constructor(private service: TipoProyectoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoProyecto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoProyecto: HttpResponse<TipoProyecto>) => {
          if (tipoProyecto.body) {
            return of(tipoProyecto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoProyecto());
  }
}

export const tipoProyectoRoute: Routes = [
  {
    path: '',
    component: TipoProyectoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoProyecto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoProyectoDetailComponent,
    resolve: {
      tipoProyecto: TipoProyectoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoProyecto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoProyectoUpdateComponent,
    resolve: {
      tipoProyecto: TipoProyectoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoProyecto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoProyectoUpdateComponent,
    resolve: {
      tipoProyecto: TipoProyectoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoProyecto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
