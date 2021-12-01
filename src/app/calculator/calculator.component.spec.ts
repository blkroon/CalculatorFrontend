import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import {CalculatorService} from "../service/calculator.service";
import {CalculationResultModel} from "../model/calculationresult.model";
import {Observable, of, throwError} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let CalculatorServiceMock: CalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CalculatorComponent ],
      providers: [{
        provide: CalculatorService,
        useValue: {
          calculate: () => {
          },
          history: () => { return new Observable<Array<CalculationResultModel>>()
          }
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    CalculatorServiceMock = TestBed.get(CalculatorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display result', () => {
    spyOn(CalculatorServiceMock, 'calculate').and.returnValue(of(new CalculationResultModel(1, 2, 3, 1, "SUBTRACT")))
    component.calculate("SUBTRACT");

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#result").textContent).toContain('2')
  });

  it('should display alert', () => {
    spyOn(CalculatorServiceMock, 'calculate').and.callFake(() => {
      return throwError(new Error('Error'));
    });
    component.calculate("DIVIDE")

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#errorAlert").textContent).toContain(' Invalid calculation!')
  });

  it('should convert ADD to +', () => {
    expect(component.operatorConverter('ADD')).toBe("+")
  })

  it('should convert SUBTRACT to -', () => {
    expect(component.operatorConverter('SUBTRACT')).toBe("-")
  })

  it('should convert MULTIPLY to ×', () => {
    expect(component.operatorConverter('MULTIPLY')).toBe("×")
  })

  it('should convert ADD to /', () => {
    expect(component.operatorConverter('DIVIDE')).toBe("/")
  })

});
