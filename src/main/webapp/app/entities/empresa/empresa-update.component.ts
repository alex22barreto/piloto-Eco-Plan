import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmpresa, Empresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'jhi-empresa-update',
  templateUrl: './empresa-update.component.html'
})
export class EmpresaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipoIdent: [null, [Validators.required]],
    identificacionEmpresa: [null, [Validators.required]],
    razonSocial: [null, [Validators.required]],
    celular: [null, [Validators.required]],
    email: [null, [Validators.required]]
  });

  constructor(protected empresaService: EmpresaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empresa }) => {
      this.updateForm(empresa);
    });
  }

  updateForm(empresa: IEmpresa): void {
    this.editForm.patchValue({
      id: empresa.id,
      tipoIdent: empresa.tipoIdent,
      identificacionEmpresa: empresa.identificacionEmpresa,
      razonSocial: empresa.razonSocial,
      celular: empresa.celular,
      email: empresa.email
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empresa = this.createFromForm();
    if (empresa.id !== undefined) {
      this.subscribeToSaveResponse(this.empresaService.update(empresa));
    } else {
      this.subscribeToSaveResponse(this.empresaService.create(empresa));
    }
  }

  private createFromForm(): IEmpresa {
    return {
      ...new Empresa(),
      id: this.editForm.get(['id'])!.value,
      tipoIdent: this.editForm.get(['tipoIdent'])!.value,
      identificacionEmpresa: this.editForm.get(['identificacionEmpresa'])!.value,
      razonSocial: this.editForm.get(['razonSocial'])!.value,
      celular: this.editForm.get(['celular'])!.value,
      email: this.editForm.get(['email'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpresa>>): void {
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
