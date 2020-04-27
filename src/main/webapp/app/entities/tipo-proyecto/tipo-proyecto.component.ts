import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { TipoProyectoService } from './tipo-proyecto.service';
import { TipoProyectoDeleteDialogComponent } from './tipo-proyecto-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-proyecto',
  templateUrl: './tipo-proyecto.component.html'
})
export class TipoProyectoComponent implements OnInit, OnDestroy {
  tipoProyectos?: ITipoProyecto[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoProyectoService: TipoProyectoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoProyectoService.query().subscribe((res: HttpResponse<ITipoProyecto[]>) => (this.tipoProyectos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoProyectos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoProyecto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoProyectos(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoProyectoListModification', () => this.loadAll());
  }

  delete(tipoProyecto: ITipoProyecto): void {
    const modalRef = this.modalService.open(TipoProyectoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoProyecto = tipoProyecto;
  }
}
