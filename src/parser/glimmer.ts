import * as ast from '../ast';
import AbstractParser from './abstract';

export default class GlimmerParser extends AbstractParser {
  peekId() {
    return this.peek('id');
  }
  parseId(): ast.Id {
    this.expect('id');
    return ast.id(this.value);
  }

  peekArg() {
    return this.peek('@');
  }
  parseArg(): ast.Arg {
    this.expect('@');
    this.expect('id');
    return ast.arg(ast.id(this.value));
  }

  peekPath(): boolean {
    return this.peekId() || this.peekArg();
  }
  parsePath(): ast.Path {
    return this.parsePathTail(this.parsePathRoot());
  }

  parsePathRoot(): ast.PathRoot {
    if (this.peekId()) {
      return this.parseId();
    } else if (this.peekArg()) {
      return this.parseArg();
    } else {
      throw "unexpected token";
    }
  }

  peekPathTail(): boolean {
    return this.peek('.');
  }
  parsePathTail(root: ast.PathRoot): ast.Path {
    let node = root as ast.Path;

    while (this.accept('.')) {
      this.expect('id');
      node = ast.member(node, ast.id(this.value));
    }

    return node;
  }

  parseName(): ast.Name {
    return this.parsePath();
  }

  peekSubexpression(): boolean {
    return this.peek('(');
  }
  parseSubexpression(): ast.Subexpression {
    this.expect('(');

    let name = this.parseName();
    let ordered: ast.Expression[] = [];
    let named: ast.Pair[] = [];

    while (this.peekExpression()) {
      if (this.peekId()) {
        let id = this.parseId();
        if (this.accept('=')) {
          let value = this.parseExpression();
          named.push(ast.pair(id, value));
        } else {
          ordered.push(this.parsePathTail(id));
        }
      } else {
        ordered.push(this.parseExpression());
      }
    }

    this.expect(')');
    return ast.subexpr(name, ordered, named);
  }

  peekExpression() {
    return this.peekPath() || this.peekSubexpression();
  }
  parseExpression(): ast.Expression {
    if (this.peekPath()) {
      return this.parsePath();
    } else if (this.peekSubexpression()) {
      return this.parseSubexpression();
    } else {
      throw 'unexpected';
    }
  }
}
