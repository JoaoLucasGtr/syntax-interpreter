import { Context } from '../../Context';
import { IExpression } from '../../IExpression';

class LesserThan implements IExpression {
  allowEquals: boolean;
  first: IExpression;
  second: IExpression;

  constructor(allowEquals: boolean, first: IExpression, second: IExpression) {
    this.allowEquals = allowEquals;
    this.first = first;
    this.second = second;
  }

  interpret(context: Context): boolean {
    const resultA = this.first.interpret(context);
    const resultB = this.second.interpret(context);

    return this.allowEquals
      ? parseFloat(resultA) <= parseFloat(resultB)
      : parseFloat(resultA) < parseFloat(resultB);
  }
}

export { LesserThan };
