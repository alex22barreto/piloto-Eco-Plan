import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActividad } from 'app/shared/model/actividad.model';
import { ActividadService } from './actividad.service';

@Component({
  templateUrl: './actividad-delete-dialog.component.html'
})
export class ActividadDeleteDialogComponent {
  actividad?: IActividad;

  constructor(protected actividadService: ActividadService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.actividadService.delete(id).subscribe(() => {
      this.eventManager.broadcast('actividadListModification');
      this.activeModal.close();
    });
  }
}
