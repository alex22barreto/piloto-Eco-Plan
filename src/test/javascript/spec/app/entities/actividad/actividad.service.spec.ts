import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ActividadService } from 'app/entities/actividad/actividad.service';
import { IActividad, Actividad } from 'app/shared/model/actividad.model';

describe('Service Tests', () => {
  describe('Actividad Service', () => {
    let injector: TestBed;
    let service: ActividadService;
    let httpMock: HttpTestingController;
    let elemDefault: IActividad;
    let expectedResult: IActividad | IActividad[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ActividadService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Actividad(0, 0, 'AAAAAAA', currentDate, currentDate, false);
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

      it('should create a Actividad', () => {
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

        service.create(new Actividad()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Actividad', () => {
        const returnedFromService = Object.assign(
          {
            codigoActividad: 1,
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

      it('should return a list of Actividad', () => {
        const returnedFromService = Object.assign(
          {
            codigoActividad: 1,
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

      it('should delete a Actividad', () => {
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
