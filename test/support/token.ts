import Token, { TokenType, Punctuator } from '../../src/token';

export type IntoToken = Token | Punctuator;

export function tokens(...values: IntoToken[]) {
  return values.map(value => {
    if (typeof value === 'string') {
      return new Token(value, value);
    } else {
      return value;
    }
  });
}

export function id([value]: TemplateStringsArray) {
  return new Token('id', value);
}
