import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../service/calculator.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalculationResultModel} from "../model/calculationresult.model";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  errorMessage: boolean = false;
  result: CalculationResultModel | null = null;
  history: Array<CalculationResultModel> = [];

  valuesForm = new FormGroup({
    value1: new FormControl(null, [Validators.required]),
    value2: new FormControl(null, [Validators.required])
  });

  constructor(private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.calculatorService.history().subscribe(history => {
      this.history = history;
    });
  }

  calculate(action: any): void {
    this.errorMessage = false;
    this.calculatorService.calculate(this.valuesForm.controls["value1"]["value"], this.valuesForm.controls["value2"]["value"], action)
      .subscribe(result => {
        this.result = result;
        this.history?.unshift(result);
      }, (error => { this.errorMessage = true}));
    this.valuesForm.reset();
  }

  operatorConverter(value: string): string {
    switch (value) {
      case "ADD":
        return "+";
      case "SUBTRACT":
        return "-";
      case "MULTIPLY":
        return "×";
      case "DIVIDE":
        return "/";
      default:
        return "";
    }
  }
}
