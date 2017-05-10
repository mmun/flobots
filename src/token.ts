export type Punctuator = '@' | '.' | '(' | ')' | '=';
export type TokenType = 'id' | 'eof' | Punctuator;

export default class Token {
  type: TokenType;
  value: string;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }
}

export const EOF = new Token('eof', '');
