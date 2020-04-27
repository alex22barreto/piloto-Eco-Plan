import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IActividades, Actividades } from 'app/shared/model/actividades.model';
import { ActividadesService } from './actividades.service';
import { ActividadesComponent } from './actividades.component';
import { ActividadesDetailComponent } from './actividades-detail.component';
import { ActividadesUpdateComponent } from './actividades-update.component';

@Injectable({ providedIn: 'root' })
export class ActividadesResolve implements Resolve<IActividades> {
  constructor(private service: ActividadesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActividades> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((actividades: HttpResponse<Actividades>) => {
          if (actividades.body) {
            return of(actividades.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Actividades());
  }
}

export const actividadesRoute: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ActividadesDetailComponent,
    resolve: {
      actividades: ActividadesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ActividadesUpdateComponent,
    resolve: {
      actividades: ActividadesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ActividadesUpdateComponent,
    resolve: {
      actividades: ActividadesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.actividades.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
