import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IActividades, Actividades } from 'app/shared/model/actividades.model';
import { ActividadesService } from './actividades.service';

@Component({
  selector: 'jhi-actividades-update',
  templateUrl: './actividades-update.component.html'
})
export class ActividadesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    nombre: [],
    fecInicio: [],
    fecFin: [],
    estado: [],
    tipo: [],
    conProveedor: []
  });

  constructor(protected actividadesService: ActividadesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actividades }) => {
      if (!actividades.id) {
        const today = moment().startOf('day');
        actividades.fecInicio = today;
        actividades.fecFin = today;
      }

      this.updateForm(actividades);
    });
  }

  updateForm(actividades: IActividades): void {
    this.editForm.patchValue({
      id: actividades.id,
      codigo: actividades.codigo,
      nombre: actividades.nombre,
      fecInicio: actividades.fecInicio ? actividades.fecInicio.format(DATE_TIME_FORMAT) : null,
      fecFin: actividades.fecFin ? actividades.fecFin.format(DATE_TIME_FORMAT) : null,
      estado: actividades.estado,
      tipo: actividades.tipo,
      conProveedor: actividades.conProveedor
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const actividades = this.createFromForm();
    if (actividades.id !== undefined) {
      this.subscribeToSaveResponse(this.actividadesService.update(actividades));
    } else {
      this.subscribeToSaveResponse(this.actividadesService.create(actividades));
    }
  }

  private createFromForm(): IActividades {
    return {
      ...new Actividades(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      fecInicio: this.editForm.get(['fecInicio'])!.value ? moment(this.editForm.get(['fecInicio'])!.value, DATE_TIME_FORMAT) : undefined,
      fecFin: this.editForm.get(['fecFin'])!.value ? moment(this.editForm.get(['fecFin'])!.value, DATE_TIME_FORMAT) : undefined,
      estado: this.editForm.get(['estado'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      conProveedor: this.editForm.get(['conProveedor'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActividades>>): void {
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
