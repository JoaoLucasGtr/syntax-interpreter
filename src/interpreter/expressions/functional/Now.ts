import { Context } from '../../Context';
import { IExpression } from '../../IExpression';

class Now implements IExpression {
  interpret(context: Context): string {
    return new Date().toISOString();
  }
}

export { Now };
