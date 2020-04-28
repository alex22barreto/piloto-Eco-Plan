import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActividades } from 'app/shared/model/actividades.model';

@Component({
  selector: 'jhi-actividades-detail',
  templateUrl: './actividades-detail.component.html'
})
export class ActividadesDetailComponent implements OnInit {
  actividades: IActividades | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actividades }) => (this.actividades = actividades));
  }

  previousState(): void {
    window.history.back();
  }
}
