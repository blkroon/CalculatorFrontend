import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {CalculationModel} from "../calculation.model";
import {environment} from "../../environments/environment";

describe('CalculatorService', () => {
  let service: CalculatorService;
  let mockHttpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CalculatorService);
    mockHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call the post method of the httpclient", () => {
    spyOn(mockHttpClient, "post");
    const calculation: CalculationModel = new CalculationModel(5, 10, "ADD");

    service.calculate(calculation.value1, calculation.value2, calculation.action)

    expect(mockHttpClient.post).toHaveBeenCalledOnceWith(environment.url, calculation)
  });

  it("should call the get method of the httpclient", () => {
    spyOn(mockHttpClient, "get");

    service.history()

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(environment.url);
  });
});
