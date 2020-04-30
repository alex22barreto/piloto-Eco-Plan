import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'targeta-proyectos',
        loadChildren: () => import('./targeta-proyectos/targeta-proyectos.module').then(m => m.EcoplanTargetaProyectosModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EcoplanVistaProyectosModule {}
