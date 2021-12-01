export class CalculationResultModel {
  constructor(
    public id: number,
    public result: number,
    public value1: number,
    public value2: number,
    public action: string) {
  }
}
