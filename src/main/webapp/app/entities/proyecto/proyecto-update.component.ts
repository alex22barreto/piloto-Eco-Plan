import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProyecto, Proyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from './proyecto.service';
import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from 'app/entities/estado/estado.service';
import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { TipoProyectoService } from 'app/entities/tipo-proyecto/tipo-proyecto.service';

type SelectableEntity = IEstado | ITipoProyecto;

@Component({
  selector: 'jhi-proyecto-update',
  templateUrl: './proyecto-update.component.html'
})
export class ProyectoUpdateComponent implements OnInit {
  isSaving = false;
  estados: IEstado[] = [];
  tipoproyectos: ITipoProyecto[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    nombre: [],
    estado: [],
    tipo: []
  });

  constructor(
    protected proyectoService: ProyectoService,
    protected estadoService: EstadoService,
    protected tipoProyectoService: TipoProyectoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proyecto }) => {
      this.updateForm(proyecto);

      this.estadoService.query().subscribe((res: HttpResponse<IEstado[]>) => (this.estados = res.body || []));

      this.tipoProyectoService.query().subscribe((res: HttpResponse<ITipoProyecto[]>) => (this.tipoproyectos = res.body || []));
    });
  }

  updateForm(proyecto: IProyecto): void {
    this.editForm.patchValue({
      id: proyecto.id,
      codigo: proyecto.codigo,
      nombre: proyecto.nombre,
      estado: proyecto.estado,
      tipo: proyecto.tipo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proyecto = this.createFromForm();
    if (proyecto.id !== undefined) {
      this.subscribeToSaveResponse(this.proyectoService.update(proyecto));
    } else {
      this.subscribeToSaveResponse(this.proyectoService.create(proyecto));
    }
  }

  private createFromForm(): IProyecto {
    return {
      ...new Proyecto(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      tipo: this.editForm.get(['tipo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProyecto>>): void {
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
