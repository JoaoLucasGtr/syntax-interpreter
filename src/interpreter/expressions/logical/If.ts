import { Context } from '../../Context';
import { IExpression } from '../../IExpression';

class If implements IExpression {
  condition: IExpression;
  ifTrue: IExpression;
  ifFalse: IExpression;

  constructor(
    condition: IExpression,
    ifTrue: IExpression,
    ifFalse: IExpression
  ) {
    this.condition = condition;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
  }

  interpret(context: Context): object {
    const result = this.condition.interpret(context);
    const resultTrue = this.ifTrue.interpret(context);
    const resultFalse = this.ifFalse?.interpret(context);

    const boolean = Boolean(result);
    return boolean ? resultTrue : resultFalse || false;
  }
}

export { If };
