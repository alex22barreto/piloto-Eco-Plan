import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';

@Component({
  selector: 'jhi-tipo-proyecto-detail',
  templateUrl: './tipo-proyecto-detail.component.html'
})
export class TipoProyectoDetailComponent implements OnInit {
  tipoProyecto: ITipoProyecto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoProyecto }) => (this.tipoProyecto = tipoProyecto));
  }

  previousState(): void {
    window.history.back();
  }
}
