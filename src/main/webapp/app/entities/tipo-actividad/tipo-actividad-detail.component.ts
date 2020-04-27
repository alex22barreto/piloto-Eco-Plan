import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';

@Component({
  selector: 'jhi-tipo-actividad-detail',
  templateUrl: './tipo-actividad-detail.component.html'
})
export class TipoActividadDetailComponent implements OnInit {
  tipoActividad: ITipoActividad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoActividad }) => (this.tipoActividad = tipoActividad));
  }

  previousState(): void {
    window.history.back();
  }
}
