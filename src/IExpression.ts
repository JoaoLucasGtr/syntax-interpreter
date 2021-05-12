import { Context } from './Context';

interface IExpression {
  interpret(context: Context): any;
}

export { IExpression };
