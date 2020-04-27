import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';
import { EstadoDeleteDialogComponent } from './estado-delete-dialog.component';

@Component({
  selector: 'jhi-estado',
  templateUrl: './estado.component.html'
})
export class EstadoComponent implements OnInit, OnDestroy {
  estados?: IEstado[];
  eventSubscriber?: Subscription;

  constructor(protected estadoService: EstadoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.estadoService.query().subscribe((res: HttpResponse<IEstado[]>) => (this.estados = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstados();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstado): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstados(): void {
    this.eventSubscriber = this.eventManager.subscribe('estadoListModification', () => this.loadAll());
  }

  delete(estado: IEstado): void {
    const modalRef = this.modalService.open(EstadoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estado = estado;
  }
}
