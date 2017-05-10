export interface Node {
  type: string;
}

export interface Id extends Node {
  name: string
}

export interface Arg extends Node {
  id: Id
}

export interface MemberExpression extends Node {
  base: Node,
  key: Id
}

export interface Subexpression extends Node {
  name: Name,
  ordered: Expression[],
  named: Pair[]
}

export interface Pair extends Node {
  key: Id,
  value: Expression
}

export type PathRoot = Id | Arg;
export type Path = PathRoot | MemberExpression;
export type Name = Path;
export type Expression = Path | Subexpression;

export function id(name: string): Id {
  return {
    type: 'Id',
    name: name
  };
}

export function arg(id: Id): Arg {
  return {
    type: 'Arg',
    id: id
  };
}

export function member(base: Node, key: Id): MemberExpression {
  return {
    type: 'MemberExpression',
    base: base,
    key: key
  };
}

export function subexpr(name: Name, ordered: Expression[] = [], named: Pair[] = []): Subexpression {
  return {
    type: 'Subexpression',
    name: name,
    ordered: ordered,
    named: named
  };
}

export function pair(key: Id, value: Expression): Pair {
  return {
    type: 'Pair',
    key: key,
    value: value
  };
}
