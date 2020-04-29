import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tipo-proyecto',
        loadChildren: () => import('./tipo-proyecto/tipo-proyecto.module').then(m => m.EcoplanTipoProyectoModule)
      },
      {
        path: 'tipo-actividad',
        loadChildren: () => import('./tipo-actividad/tipo-actividad.module').then(m => m.EcoplanTipoActividadModule)
      },
      {
        path: 'estado',
        loadChildren: () => import('./estado/estado.module').then(m => m.EcoplanEstadoModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EcoplanEmpresaModule)
      },
      {
        path: 'proyecto',
        loadChildren: () => import('./proyecto/proyecto.module').then(m => m.EcoplanProyectoModule)
      },
      {
        path: 'actividad',
        loadChildren: () => import('./actividad/actividad.module').then(m => m.EcoplanActividadModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EcoplanEntityModule {}
