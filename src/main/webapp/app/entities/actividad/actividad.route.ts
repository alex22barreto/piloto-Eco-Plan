import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IActividad, Actividad } from 'app/shared/model/actividad.model';
import { ActividadService } from './actividad.service';
import { ActividadComponent } from './actividad.component';
import { ActividadDetailComponent } from './actividad-detail.component';
import { ActividadUpdateComponent } from './actividad-update.component';

@Injectable({ providedIn: 'root' })
export class ActividadResolve implements Resolve<IActividad> {
  constructor(private service: ActividadService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActividad> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((actividad: HttpResponse<Actividad>) => {
          if (actividad.body) {
            return of(actividad.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Actividad());
  }
}

export const actividadRoute: Routes = [
  {
    path: '',
    component: ActividadComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ActividadDetailComponent,
    resolve: {
      actividad: ActividadResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ActividadUpdateComponent,
    resolve: {
      actividad: ActividadResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ActividadUpdateComponent,
    resolve: {
      actividad: ActividadResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
