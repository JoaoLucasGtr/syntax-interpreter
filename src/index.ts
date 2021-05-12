import { Context } from './Context';
import { IExpression } from './IExpression';
import {
  Literal, Variable, Now,
  And, Equals, GreaterThan, LesserThan, If, Or,
  Div, Mod, Mult, Round, Sub, Sum
} from './expressions';

class Interpreter {
  context: Context;
  dictionary: Map<string, string> = new Map<string, string>([
    ["now", "now"],
    ["and", "and"],
    ["equals", "eq"],
    ["greaterThan", "gt"],
    ["greaterThanEquals", "gte"],
    ["if", "if"],
    ["lesserThan", "lt"],
    ["lesserThanEquals", "lte"],
    ["or", "or"],
    ["division", "div"],
    ["module", "mod"],
    ["multiplication", "mult"],
    ["round", "rd"],
    ["subtraction", "sub"],
    ["sum", "sum"]
  ]);

  constructor(model: object, dictionary?: Record<string, string>) {
    this.context = new Context(model);

    if (dictionary) {
      Object.keys(dictionary).forEach(prop => {
        if (dictionary[prop]) this.dictionary.set(prop, dictionary[prop]);
      });
    }
  }

  interpret(expression: String): any {
    if (!expression) return '';

    try {
      const list = this.buildList(expression);
      const tree = this.buildTree(list);
      const result = tree.interpret(this.context);
      return result;
    } catch (err) {
      console.error(err);
      return '#ERROR';
    }
  }

  buildList(expression: String): Array<String> {
    // TODO: sanitize expression before send to buildTree method.
    const sanitized = expression.replace(/[(;)]/g, ' ').split(' ')?.reverse();
    const list = sanitized?.filter(i => i);

    return list;
  }

  buildTree(list: Array<String>): IExpression {
    const stack = new Array<IExpression>();
    for (let item of list) {
      switch (item.toLowerCase()) {
        case this.dictionary.get('and'):
          stack.push(
            new And(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('equals'):
          stack.push(
            new Equals(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('greaterThan'):
          stack.push(
            new GreaterThan(
              false,
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('greaterThanEquals'):
          stack.push(
            new GreaterThan(
              true,
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('if'):
          stack.push(
            new If(
              stack.pop() as IExpression,
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('lesserThan'):
          stack.push(
            new LesserThan(
              false,
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('lesserThanEquals'):
          stack.push(
            new LesserThan(
              true,
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('or'):
          stack.push(
            new Or(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          )
          break;
        case this.dictionary.get('division'):
          stack.push(
            new Div(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('module'):
          stack.push(
            new Mod(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('multiplication'):
          stack.push(
            new Mult(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('round'):
          stack.push(
            new Round(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('subtraction'):
          stack.push(
            new Sub(
              stack.pop() as IExpression,
              stack.pop() as IExpression
            )
          );
          break;
        case this.dictionary.get('sum'):
          stack.push(
            new Sum(
              stack.pop() as IExpression,
              stack.pop() as IExpression)
          );
          break;
        case this.dictionary.get('now'):
          stack.push(new Now())
          break;
        default:
          if (!isNaN(item as any)) {
            stack.push(new Literal(Number(item)));
          } else if (item.includes('{')) {
            const variable = item.substr(1, item.length - 2);
            stack.push(new Variable(variable));
          } else {
            stack.push(new Literal(item.toString()));
          }
          break;
      }
    }
    return stack[0];
  }

}

export { Interpreter };
