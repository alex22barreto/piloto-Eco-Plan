import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoActividad, TipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';
import { TipoActividadComponent } from './tipo-actividad.component';
import { TipoActividadDetailComponent } from './tipo-actividad-detail.component';
import { TipoActividadUpdateComponent } from './tipo-actividad-update.component';

@Injectable({ providedIn: 'root' })
export class TipoActividadResolve implements Resolve<ITipoActividad> {
  constructor(private service: TipoActividadService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoActividad> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoActividad: HttpResponse<TipoActividad>) => {
          if (tipoActividad.body) {
            return of(tipoActividad.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoActividad());
  }
}

export const tipoActividadRoute: Routes = [
  {
    path: '',
    component: TipoActividadComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoActividadDetailComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoActividadUpdateComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoActividadUpdateComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
