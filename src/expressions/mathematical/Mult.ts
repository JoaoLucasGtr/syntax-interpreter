import { Context } from "../../Context";
import { IExpression } from "../../IExpression";

class Mult implements IExpression {
  first: IExpression;
  second: IExpression;

  constructor(first: IExpression, second: IExpression) {
    this.first = first;
    this.second = second;
  }

  interpret(context: Context): number {
    const resultA = this.first.interpret(context);
    const resultB = this.second.interpret(context);

    return parseFloat(resultA) * parseFloat(resultB);
  }
}

export { Mult };
