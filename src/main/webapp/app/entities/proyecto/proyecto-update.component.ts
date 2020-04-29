import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProyecto, Proyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from './proyecto.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';
import { ITipoProyecto } from 'app/shared/model/tipo-proyecto.model';
import { TipoProyectoService } from 'app/entities/tipo-proyecto/tipo-proyecto.service';
import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from 'app/entities/estado/estado.service';

type SelectableEntity = IEmpresa | ITipoProyecto | IEstado;

@Component({
  selector: 'jhi-proyecto-update',
  templateUrl: './proyecto-update.component.html'
})
export class ProyectoUpdateComponent implements OnInit {
  isSaving = false;
  empresas: IEmpresa[] = [];
  tipoproyectos: ITipoProyecto[] = [];
  estados: IEstado[] = [];

  editForm = this.fb.group({
    id: [],
    codigoProyecto: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    empresa: [],
    tipoProyecto: [],
    estado: []
  });

  constructor(
    protected proyectoService: ProyectoService,
    protected empresaService: EmpresaService,
    protected tipoProyectoService: TipoProyectoService,
    protected estadoService: EstadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proyecto }) => {
      this.updateForm(proyecto);

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));

      this.tipoProyectoService.query().subscribe((res: HttpResponse<ITipoProyecto[]>) => (this.tipoproyectos = res.body || []));

      this.estadoService.query().subscribe((res: HttpResponse<IEstado[]>) => (this.estados = res.body || []));
    });
  }

  updateForm(proyecto: IProyecto): void {
    this.editForm.patchValue({
      id: proyecto.id,
      codigoProyecto: proyecto.codigoProyecto,
      nombre: proyecto.nombre,
      empresa: proyecto.empresa,
      tipoProyecto: proyecto.tipoProyecto,
      estado: proyecto.estado
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
      codigoProyecto: this.editForm.get(['codigoProyecto'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      empresa: this.editForm.get(['empresa'])!.value,
      tipoProyecto: this.editForm.get(['tipoProyecto'])!.value,
      estado: this.editForm.get(['estado'])!.value
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
