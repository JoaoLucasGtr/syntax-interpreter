import { Context } from "../../Context";
import { IExpression } from "../../IExpression";

class Round implements IExpression {
  first: IExpression;
  second: IExpression;

  constructor(first: IExpression, second: IExpression) {
    this.first = first;
    this.second = second;
  }

  interpret(context: Context): number {
    const resultA = this.first.interpret(context);
    const resultB = this.second.interpret(context);
    const number = Number(resultA.toString().replaceAll(',', '.'));

    return Number.isInteger(number)
      ? number
      : Number(number.toFixed(Number(resultB)));
  }
}

export { Round };
