import { Context } from '../../Context';
import { IExpression } from '../../IExpression';

class Or implements IExpression {
  first: IExpression;
  second: IExpression;

  constructor(first: IExpression, second: IExpression) {
    this.first = first;
    this.second = second;
  }

  interpret(context: Context): boolean {
    const resultA = this.first.interpret(context);
    const resultB = this.second.interpret(context);

    const booleanA = Boolean(resultA);
    const booleanB = Boolean(resultB);

    return booleanA || booleanB;
  }
}

export { Or };
