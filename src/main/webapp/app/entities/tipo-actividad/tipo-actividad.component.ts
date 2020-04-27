import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';
import { TipoActividadDeleteDialogComponent } from './tipo-actividad-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-actividad',
  templateUrl: './tipo-actividad.component.html'
})
export class TipoActividadComponent implements OnInit, OnDestroy {
  tipoActividads?: ITipoActividad[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoActividadService: TipoActividadService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoActividadService.query().subscribe((res: HttpResponse<ITipoActividad[]>) => (this.tipoActividads = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoActividads();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoActividad): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoActividads(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoActividadListModification', () => this.loadAll());
  }

  delete(tipoActividad: ITipoActividad): void {
    const modalRef = this.modalService.open(TipoActividadDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoActividad = tipoActividad;
  }
}
