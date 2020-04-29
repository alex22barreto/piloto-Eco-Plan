import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IActividad, Actividad } from 'app/shared/model/actividad.model';
import { ActividadService } from './actividad.service';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from 'app/entities/proyecto/proyecto.service';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from 'app/entities/tipo-actividad/tipo-actividad.service';
import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from 'app/entities/estado/estado.service';

type SelectableEntity = IProyecto | ITipoActividad | IEstado;

@Component({
  selector: 'jhi-actividad-update',
  templateUrl: './actividad-update.component.html'
})
export class ActividadUpdateComponent implements OnInit {
  isSaving = false;
  proyectos: IProyecto[] = [];
  tipoactividads: ITipoActividad[] = [];
  estados: IEstado[] = [];

  editForm = this.fb.group({
    id: [],
    codigoActividad: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    fecInicio: [null, [Validators.required]],
    fecFin: [null, [Validators.required]],
    conProveedor: [null, [Validators.required]],
    proyecto: [],
    tipoActividad: [],
    estado: []
  });

  constructor(
    protected actividadService: ActividadService,
    protected proyectoService: ProyectoService,
    protected tipoActividadService: TipoActividadService,
    protected estadoService: EstadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actividad }) => {
      if (!actividad.id) {
        const today = moment().startOf('day');
        actividad.fecInicio = today;
        actividad.fecFin = today;
      }

      this.updateForm(actividad);

      this.proyectoService.query().subscribe((res: HttpResponse<IProyecto[]>) => (this.proyectos = res.body || []));

      this.tipoActividadService.query().subscribe((res: HttpResponse<ITipoActividad[]>) => (this.tipoactividads = res.body || []));

      this.estadoService.query().subscribe((res: HttpResponse<IEstado[]>) => (this.estados = res.body || []));
    });
  }

  updateForm(actividad: IActividad): void {
    this.editForm.patchValue({
      id: actividad.id,
      codigoActividad: actividad.codigoActividad,
      nombre: actividad.nombre,
      fecInicio: actividad.fecInicio ? actividad.fecInicio.format(DATE_TIME_FORMAT) : null,
      fecFin: actividad.fecFin ? actividad.fecFin.format(DATE_TIME_FORMAT) : null,
      conProveedor: actividad.conProveedor,
      proyecto: actividad.proyecto,
      tipoActividad: actividad.tipoActividad,
      estado: actividad.estado
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const actividad = this.createFromForm();
    if (actividad.id !== undefined) {
      this.subscribeToSaveResponse(this.actividadService.update(actividad));
    } else {
      this.subscribeToSaveResponse(this.actividadService.create(actividad));
    }
  }

  private createFromForm(): IActividad {
    return {
      ...new Actividad(),
      id: this.editForm.get(['id'])!.value,
      codigoActividad: this.editForm.get(['codigoActividad'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      fecInicio: this.editForm.get(['fecInicio'])!.value ? moment(this.editForm.get(['fecInicio'])!.value, DATE_TIME_FORMAT) : undefined,
      fecFin: this.editForm.get(['fecFin'])!.value ? moment(this.editForm.get(['fecFin'])!.value, DATE_TIME_FORMAT) : undefined,
      conProveedor: this.editForm.get(['conProveedor'])!.value,
      proyecto: this.editForm.get(['proyecto'])!.value,
      tipoActividad: this.editForm.get(['tipoActividad'])!.value,
      estado: this.editForm.get(['estado'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActividad>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
