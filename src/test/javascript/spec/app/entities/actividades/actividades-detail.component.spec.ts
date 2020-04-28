import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcoplanTestModule } from '../../../test.module';
import { ActividadesDetailComponent } from 'app/entities/actividades/actividades-detail.component';
import { Actividades } from 'app/shared/model/actividades.model';

describe('Component Tests', () => {
  describe('Actividades Management Detail Component', () => {
    let comp: ActividadesDetailComponent;
    let fixture: ComponentFixture<ActividadesDetailComponent>;
    const route = ({ data: of({ actividades: new Actividades(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcoplanTestModule],
        declarations: [ActividadesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ActividadesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActividadesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load actividades on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.actividades).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
