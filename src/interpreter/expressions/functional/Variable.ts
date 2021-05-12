import { Context } from '../../Context';
import { IExpression } from '../../IExpression';

class Variable implements IExpression {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  interpret(context: Context): object {
    return context.getValue(this.name);
  }
}

export { Variable };
