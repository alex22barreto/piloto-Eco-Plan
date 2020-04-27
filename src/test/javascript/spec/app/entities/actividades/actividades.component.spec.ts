import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcoplanTestModule } from '../../../test.module';
import { ActividadesComponent } from 'app/entities/actividades/actividades.component';
import { ActividadesService } from 'app/entities/actividades/actividades.service';
import { Actividades } from 'app/shared/model/actividades.model';

describe('Component Tests', () => {
  describe('Actividades Management Component', () => {
    let comp: ActividadesComponent;
    let fixture: ComponentFixture<ActividadesComponent>;
    let service: ActividadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcoplanTestModule],
        declarations: [ActividadesComponent]
      })
        .overrideTemplate(ActividadesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActividadesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActividadesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Actividades(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.actividades && comp.actividades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
