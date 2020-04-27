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
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.EcoplanPersonaModule)
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
        path: 'actividades',
        loadChildren: () => import('./actividades/actividades.module').then(m => m.EcoplanActividadesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EcoplanEntityModule {}
