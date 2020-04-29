import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IActividad } from 'app/shared/model/actividad.model';
import { ActividadService } from './actividad.service';
import { ActividadDeleteDialogComponent } from './actividad-delete-dialog.component';

@Component({
  selector: 'jhi-actividad',
  templateUrl: './actividad.component.html'
})
export class ActividadComponent implements OnInit, OnDestroy {
  actividads?: IActividad[];
  eventSubscriber?: Subscription;

  constructor(protected actividadService: ActividadService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.actividadService.query().subscribe((res: HttpResponse<IActividad[]>) => (this.actividads = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActividads();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IActividad): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActividads(): void {
    this.eventSubscriber = this.eventManager.subscribe('actividadListModification', () => this.loadAll());
  }

  delete(actividad: IActividad): void {
    const modalRef = this.modalService.open(ActividadDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.actividad = actividad;
  }
}
