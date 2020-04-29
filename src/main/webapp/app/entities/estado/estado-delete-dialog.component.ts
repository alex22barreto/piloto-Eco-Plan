import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';

@Component({
  templateUrl: './estado-delete-dialog.component.html'
})
export class EstadoDeleteDialogComponent {
  estado?: IEstado;

  constructor(protected estadoService: EstadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estadoListModification');
      this.activeModal.close();
    });
  }
}
