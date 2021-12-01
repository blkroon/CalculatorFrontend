import { Component, OnInit } from '@angular/core';
import {CalculatorService} from "./calculator.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalculationResultModel} from "../calculationresult.model";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  result: CalculationResultModel | null = null;
  history: Array<CalculationResultModel> | null = null;

  valuesForm = new FormGroup({
    value1: new FormControl(null, [Validators.required]),
    value2: new FormControl(null, [Validators.required])
  });

  constructor(private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.calculatorService.history().subscribe(history => {
      console.log(history);
      this.history = history;
    console.log(this.history)});
  }

  calculate(action: any): void {
    this.calculatorService.calculate(this.valuesForm.controls["value1"]["value"], this.valuesForm.controls["value2"]["value"], action)
      .subscribe(result => {
      this.result = result;
      this.history?.push(result);
    });
  }
}
