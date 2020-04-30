import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcoplanSharedModule } from 'app/shared/shared.module';
import { TargetaProyectosComponent } from './targeta-proyectos.component';
import { targetaProyectosRoute } from './targeta-proyectos.route';

@NgModule({
  imports: [EcoplanSharedModule, RouterModule.forChild(targetaProyectosRoute)],
  declarations: [TargetaProyectosComponent]
})
export class EcoplanTargetaProyectosModule {}
