import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoProyecto, TipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { TipoProyectoService } from './tipo-proyecto.service';

@Component({
  selector: 'jhi-tipo-proyecto-update',
  templateUrl: './tipo-proyecto-update.component.html'
})
export class TipoProyectoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreTipoProyecto: [null, [Validators.required]]
  });

  constructor(protected tipoProyectoService: TipoProyectoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoProyecto }) => {
      this.updateForm(tipoProyecto);
    });
  }

  updateForm(tipoProyecto: ITipoProyecto): void {
    this.editForm.patchValue({
      id: tipoProyecto.id,
      nombreTipoProyecto: tipoProyecto.nombreTipoProyecto
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoProyecto = this.createFromForm();
    if (tipoProyecto.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoProyectoService.update(tipoProyecto));
    } else {
      this.subscribeToSaveResponse(this.tipoProyectoService.create(tipoProyecto));
    }
  }

  private createFromForm(): ITipoProyecto {
    return {
      ...new TipoProyecto(),
      id: this.editForm.get(['id'])!.value,
      nombreTipoProyecto: this.editForm.get(['nombreTipoProyecto'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoProyecto>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
