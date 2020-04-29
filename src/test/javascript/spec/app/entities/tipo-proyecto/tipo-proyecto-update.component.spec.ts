import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EcoplanTestModule } from '../../../test.module';
import { TipoProyectoUpdateComponent } from 'app/entities/tipo-proyecto/tipo-proyecto-update.component';
import { TipoProyectoService } from 'app/entities/tipo-proyecto/tipo-proyecto.service';
import { TipoProyecto } from 'app/shared/model/tipo-proyecto.model';

describe('Component Tests', () => {
  describe('TipoProyecto Management Update Component', () => {
    let comp: TipoProyectoUpdateComponent;
    let fixture: ComponentFixture<TipoProyectoUpdateComponent>;
    let service: TipoProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcoplanTestModule],
        declarations: [TipoProyectoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoProyectoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoProyectoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoProyectoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoProyecto(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoProyecto();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
