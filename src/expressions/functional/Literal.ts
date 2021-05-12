import { Context } from '../../Context';
import { IExpression } from '../../IExpression';

class Literal implements IExpression {
  value: NonNullable<string | number | boolean>;

  constructor(value: NonNullable<string | number | boolean>) {
    this.value = value;
  }

  interpret(context: Context): NonNullable<string | number | boolean> {
    return this.value;
  }
}

export { Literal };
