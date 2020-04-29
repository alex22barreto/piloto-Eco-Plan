import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcoplanSharedModule } from 'app/shared/shared.module';
import { ActividadComponent } from './actividad.component';
import { ActividadDetailComponent } from './actividad-detail.component';
import { ActividadUpdateComponent } from './actividad-update.component';
import { ActividadDeleteDialogComponent } from './actividad-delete-dialog.component';
import { actividadRoute } from './actividad.route';

@NgModule({
  imports: [EcoplanSharedModule, RouterModule.forChild(actividadRoute)],
  declarations: [ActividadComponent, ActividadDetailComponent, ActividadUpdateComponent, ActividadDeleteDialogComponent],
  entryComponents: [ActividadDeleteDialogComponent]
})
export class EcoplanActividadModule {}
