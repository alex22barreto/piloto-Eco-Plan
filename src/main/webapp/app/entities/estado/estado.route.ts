import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstado, Estado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';
import { EstadoComponent } from './estado.component';
import { EstadoDetailComponent } from './estado-detail.component';
import { EstadoUpdateComponent } from './estado-update.component';

@Injectable({ providedIn: 'root' })
export class EstadoResolve implements Resolve<IEstado> {
  constructor(private service: EstadoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estado: HttpResponse<Estado>) => {
          if (estado.body) {
            return of(estado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Estado());
  }
}

export const estadoRoute: Routes = [
  {
    path: '',
    component: EstadoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.estado.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoDetailComponent,
    resolve: {
      estado: EstadoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.estado.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoUpdateComponent,
    resolve: {
      estado: EstadoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.estado.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoUpdateComponent,
    resolve: {
      estado: EstadoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.estado.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
