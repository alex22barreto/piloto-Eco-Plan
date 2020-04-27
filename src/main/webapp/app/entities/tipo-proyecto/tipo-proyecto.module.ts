import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcoplanSharedModule } from 'app/shared/shared.module';
import { TipoProyectoComponent } from './tipo-proyecto.component';
import { TipoProyectoDetailComponent } from './tipo-proyecto-detail.component';
import { TipoProyectoUpdateComponent } from './tipo-proyecto-update.component';
import { TipoProyectoDeleteDialogComponent } from './tipo-proyecto-delete-dialog.component';
import { tipoProyectoRoute } from './tipo-proyecto.route';

@NgModule({
  imports: [EcoplanSharedModule, RouterModule.forChild(tipoProyectoRoute)],
  declarations: [TipoProyectoComponent, TipoProyectoDetailComponent, TipoProyectoUpdateComponent, TipoProyectoDeleteDialogComponent],
  entryComponents: [TipoProyectoDeleteDialogComponent]
})
export class EcoplanTipoProyectoModule {}
