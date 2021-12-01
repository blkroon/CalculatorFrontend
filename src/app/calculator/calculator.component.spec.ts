import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import {CalculatorService} from "./calculator.service";
import {CalculationResultModel} from "../calculationresult.model";
import {Observable} from "rxjs";

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
