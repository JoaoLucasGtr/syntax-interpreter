import { Context } from '../../Context';
import { IExpression } from '../../IExpression';
import { parseBool } from '../../utils';

class And implements IExpression {
  first: IExpression;
  second: IExpression;

  constructor(first: IExpression, second: IExpression) {
    this.first = first;
    this.second = second;
  }

  interpret(context: Context): boolean {
    const resultA = this.first.interpret(context);
    const resultB = this.second.interpret(context);
    
    const booleanA = parseBool(resultA);
    const booleanB = parseBool(resultB);

    return booleanA && booleanB;
  }
}

export { And };
