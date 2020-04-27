import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { PersonaDeleteDialogComponent } from './persona-delete-dialog.component';

@Component({
  selector: 'jhi-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit, OnDestroy {
  personas?: IPersona[];
  eventSubscriber?: Subscription;

  constructor(protected personaService: PersonaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPersonas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPersona): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPersonas(): void {
    this.eventSubscriber = this.eventManager.subscribe('personaListModification', () => this.loadAll());
  }

  delete(persona: IPersona): void {
    const modalRef = this.modalService.open(PersonaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.persona = persona;
  }
}
