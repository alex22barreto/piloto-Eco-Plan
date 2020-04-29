import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcoplanTestModule } from '../../../test.module';
import { TipoProyectoDetailComponent } from 'app/entities/tipo-proyecto/tipo-proyecto-detail.component';
import { TipoProyecto } from 'app/shared/model/tipo-proyecto.model';

describe('Component Tests', () => {
  describe('TipoProyecto Management Detail Component', () => {
    let comp: TipoProyectoDetailComponent;
    let fixture: ComponentFixture<TipoProyectoDetailComponent>;
    const route = ({ data: of({ tipoProyecto: new TipoProyecto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcoplanTestModule],
        declarations: [TipoProyectoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoProyectoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoProyectoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoProyecto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoProyecto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
