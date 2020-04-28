import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActividades } from 'app/shared/model/actividades.model';
import { ActividadesService } from './actividades.service';

@Component({
  templateUrl: './actividades-delete-dialog.component.html'
})
export class ActividadesDeleteDialogComponent {
  actividades?: IActividades;

  constructor(
    protected actividadesService: ActividadesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.actividadesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('actividadesListModification');
      this.activeModal.close();
    });
  }
}
