import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IActividades } from 'app/shared/model/actividades.model';
import { ActividadesService } from './actividades.service';
import { ActividadesDeleteDialogComponent } from './actividades-delete-dialog.component';

@Component({
  selector: 'jhi-actividades',
  templateUrl: './actividades.component.html'
})
export class ActividadesComponent implements OnInit, OnDestroy {
  actividades?: IActividades[];
  eventSubscriber?: Subscription;

  constructor(
    protected actividadesService: ActividadesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.actividadesService.query().subscribe((res: HttpResponse<IActividades[]>) => (this.actividades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActividades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IActividades): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActividades(): void {
    this.eventSubscriber = this.eventManager.subscribe('actividadesListModification', () => this.loadAll());
  }

  delete(actividades: IActividades): void {
    const modalRef = this.modalService.open(ActividadesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.actividades = actividades;
  }
}
