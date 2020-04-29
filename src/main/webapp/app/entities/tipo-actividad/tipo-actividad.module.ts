import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcoplanSharedModule } from 'app/shared/shared.module';
import { TipoActividadComponent } from './tipo-actividad.component';
import { TipoActividadDetailComponent } from './tipo-actividad-detail.component';
import { TipoActividadUpdateComponent } from './tipo-actividad-update.component';
import { TipoActividadDeleteDialogComponent } from './tipo-actividad-delete-dialog.component';
import { tipoActividadRoute } from './tipo-actividad.route';

@NgModule({
  imports: [EcoplanSharedModule, RouterModule.forChild(tipoActividadRoute)],
  declarations: [TipoActividadComponent, TipoActividadDetailComponent, TipoActividadUpdateComponent, TipoActividadDeleteDialogComponent],
  entryComponents: [TipoActividadDeleteDialogComponent]
})
export class EcoplanTipoActividadModule {}
