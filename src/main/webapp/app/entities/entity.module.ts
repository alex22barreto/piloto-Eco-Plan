import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
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
