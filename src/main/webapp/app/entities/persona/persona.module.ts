import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcoplanSharedModule } from 'app/shared/shared.module';
import { PersonaComponent } from './persona.component';
import { PersonaDetailComponent } from './persona-detail.component';
import { PersonaUpdateComponent } from './persona-update.component';
import { PersonaDeleteDialogComponent } from './persona-delete-dialog.component';
import { personaRoute } from './persona.route';

@NgModule({
  imports: [EcoplanSharedModule, RouterModule.forChild(personaRoute)],
  declarations: [PersonaComponent, PersonaDetailComponent, PersonaUpdateComponent, PersonaDeleteDialogComponent],
  entryComponents: [PersonaDeleteDialogComponent]
})
export class EcoplanPersonaModule {}
