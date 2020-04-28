import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from './proyecto.service';
import { ProyectoDeleteDialogComponent } from './proyecto-delete-dialog.component';

@Component({
  selector: 'jhi-proyecto',
  templateUrl: './proyecto.component.html'
})
export class ProyectoComponent implements OnInit, OnDestroy {
  proyectos?: IProyecto[];
  eventSubscriber?: Subscription;

  constructor(protected proyectoService: ProyectoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.proyectoService.query().subscribe((res: HttpResponse<IProyecto[]>) => (this.proyectos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProyectos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProyecto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProyectos(): void {
    this.eventSubscriber = this.eventManager.subscribe('proyectoListModification', () => this.loadAll());
  }

  delete(proyecto: IProyecto): void {
    const modalRef = this.modalService.open(ProyectoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proyecto = proyecto;
  }
}
