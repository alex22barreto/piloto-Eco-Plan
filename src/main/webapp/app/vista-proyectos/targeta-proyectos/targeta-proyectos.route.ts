import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoProyecto, TipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { ProyectoSTargetaService } from './targeta-proyectos.service';
import { TargetaProyectosComponent } from './targeta-proyectos.component';

@Injectable({ providedIn: 'root' })
export class TipoProyectoResolve implements Resolve<ITipoProyecto> {
  constructor(private service: ProyectoSTargetaService, private router: Router) {}

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

export const targetaProyectosRoute: Routes = [
  {
    path: '',
    component: TargetaProyectosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ecoplanApp.tipoProyecto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
