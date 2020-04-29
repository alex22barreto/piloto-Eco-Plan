import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';

@Component({
  templateUrl: './tipo-actividad-delete-dialog.component.html'
})
export class TipoActividadDeleteDialogComponent {
  tipoActividad?: ITipoActividad;

  constructor(
    protected tipoActividadService: TipoActividadService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoActividadService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoActividadListModification');
      this.activeModal.close();
    });
  }
}
