import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ActividadesService } from 'app/entities/actividades/actividades.service';
import { IActividades, Actividades } from 'app/shared/model/actividades.model';

describe('Service Tests', () => {
  describe('Actividades Service', () => {
    let injector: TestBed;
    let service: ActividadesService;
    let httpMock: HttpTestingController;
    let elemDefault: IActividades;
    let expectedResult: IActividades | IActividades[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ActividadesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Actividades(0, 0, 'AAAAAAA', currentDate, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecInicio: currentDate.format(DATE_TIME_FORMAT),
            fecFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Actividades', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecInicio: currentDate.format(DATE_TIME_FORMAT),
            fecFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecInicio: currentDate,
            fecFin: currentDate
          },
          returnedFromService
        );

        service.create(new Actividades()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Actividades', () => {
        const returnedFromService = Object.assign(
          {
            codigo: 1,
            nombre: 'BBBBBB',
            fecInicio: currentDate.format(DATE_TIME_FORMAT),
            fecFin: currentDate.format(DATE_TIME_FORMAT),
            conProveedor: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecInicio: currentDate,
            fecFin: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Actividades', () => {
        const returnedFromService = Object.assign(
          {
            codigo: 1,
            nombre: 'BBBBBB',
            fecInicio: currentDate.format(DATE_TIME_FORMAT),
            fecFin: currentDate.format(DATE_TIME_FORMAT),
            conProveedor: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecInicio: currentDate,
            fecFin: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Actividades', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
