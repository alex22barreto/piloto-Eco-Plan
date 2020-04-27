import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { TipoProyectoService } from './tipo-proyecto.service';

@Component({
  templateUrl: './tipo-proyecto-delete-dialog.component.html'
})
export class TipoProyectoDeleteDialogComponent {
  tipoProyecto?: ITipoProyecto;

  constructor(
    protected tipoProyectoService: TipoProyectoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoProyectoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoProyectoListModification');
      this.activeModal.close();
    });
  }
}
