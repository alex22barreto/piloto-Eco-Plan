import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcoplanSharedModule } from 'app/shared/shared.module';
import { ActividadesComponent } from './actividades.component';
import { ActividadesDetailComponent } from './actividades-detail.component';
import { ActividadesUpdateComponent } from './actividades-update.component';
import { ActividadesDeleteDialogComponent } from './actividades-delete-dialog.component';
import { actividadesRoute } from './actividades.route';

@NgModule({
  imports: [EcoplanSharedModule, RouterModule.forChild(actividadesRoute)],
  declarations: [ActividadesComponent, ActividadesDetailComponent, ActividadesUpdateComponent, ActividadesDeleteDialogComponent],
  entryComponents: [ActividadesDeleteDialogComponent]
})
export class EcoplanActividadesModule {}
