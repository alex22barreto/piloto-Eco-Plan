import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcoplanTestModule } from '../../../test.module';
import { TipoProyectoComponent } from 'app/entities/tipo-proyecto/tipo-proyecto.component';
import { TipoProyectoService } from 'app/entities/tipo-proyecto/tipo-proyecto.service';
import { TipoProyecto } from 'app/shared/model/tipo-proyecto.model';

describe('Component Tests', () => {
  describe('TipoProyecto Management Component', () => {
    let comp: TipoProyectoComponent;
    let fixture: ComponentFixture<TipoProyectoComponent>;
    let service: TipoProyectoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcoplanTestModule],
        declarations: [TipoProyectoComponent]
      })
        .overrideTemplate(TipoProyectoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoProyectoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoProyectoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoProyecto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoProyectos && comp.tipoProyectos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
