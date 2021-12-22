import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CalculationModel} from "../model/calculation.model";
import {Observable} from "rxjs";
import {CalculationResultModel} from "../model/calculationresult.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  readonly calculateUrl: string = environment.url + "api/calculate";
  readonly url: string = environment.url;

  constructor(private http: HttpClient) { }

  calculate(value1: number, value2: number, action: string): Observable<CalculationResultModel> {
    let body: CalculationModel = new CalculationModel(value1, value2, action);
    return this.http.post<CalculationResultModel>(this.calculateUrl, body);
  }

  history(): Observable<Array<CalculationResultModel>> {
    return this.http.get<Array<CalculationResultModel>>(this.calculateUrl);
  }

  logout(): void {
    this.http.post(this.url + "logout", null).subscribe();
  }
}
