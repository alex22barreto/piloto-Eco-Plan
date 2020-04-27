import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoActividad, TipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';

@Component({
  selector: 'jhi-tipo-actividad-update',
  templateUrl: './tipo-actividad-update.component.html'
})
export class TipoActividadUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idTipoActividad: [],
    nombreTipoActividad: []
  });

  constructor(protected tipoActividadService: TipoActividadService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoActividad }) => {
      this.updateForm(tipoActividad);
    });
  }

  updateForm(tipoActividad: ITipoActividad): void {
    this.editForm.patchValue({
      id: tipoActividad.id,
      idTipoActividad: tipoActividad.idTipoActividad,
      nombreTipoActividad: tipoActividad.nombreTipoActividad
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoActividad = this.createFromForm();
    if (tipoActividad.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoActividadService.update(tipoActividad));
    } else {
      this.subscribeToSaveResponse(this.tipoActividadService.create(tipoActividad));
    }
  }

  private createFromForm(): ITipoActividad {
    return {
      ...new TipoActividad(),
      id: this.editForm.get(['id'])!.value,
      idTipoActividad: this.editForm.get(['idTipoActividad'])!.value,
      nombreTipoActividad: this.editForm.get(['nombreTipoActividad'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoActividad>>): void {
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
