import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcoplanTestModule } from '../../../test.module';
import { TipoActividadComponent } from 'app/entities/tipo-actividad/tipo-actividad.component';
import { TipoActividadService } from 'app/entities/tipo-actividad/tipo-actividad.service';
import { TipoActividad } from 'app/shared/model/tipo-actividad.model';

describe('Component Tests', () => {
  describe('TipoActividad Management Component', () => {
    let comp: TipoActividadComponent;
    let fixture: ComponentFixture<TipoActividadComponent>;
    let service: TipoActividadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcoplanTestModule],
        declarations: [TipoActividadComponent]
      })
        .overrideTemplate(TipoActividadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoActividadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoActividadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoActividad(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoActividads && comp.tipoActividads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
