import Token, { TokenType, EOF } from '../token';

function unexpected(token?: Token) {
  if (token) {
    throw new Error(`Unexpected token ${token.type}`);
  } else {
    throw new Error("Unexpected end of input");
  }
}

// An abstract LL(1) parser
export default class AbstractParser {
  index: number;
  tokens: Token[];
  token: Token | null;

  constructor(tokens: Token[]) {
    this.index = -1;
    this.tokens = tokens;
    this.token = null;
  }

  next() {
    // EOF
    this.index++;
    this.token = this.tokens[this.index];
  }

  get value(): string {
    return this.token!.value;
  }

  // Try peek(...types: TokenType[]) for more concise peeking
  peek(type: TokenType): boolean {
    let next = this.tokens[this.index+1];
    if (next) {
      return next.type === type;
    } else {
      return type === 'eof';
    }
  }

  accept(type: TokenType): boolean {
    if (this.peek(type)) {
      this.next();
      return true;
    } else {
      return false; 
    }
  }

  // Try expect(...types: TokenType[]) for better errors?
  expect(type: TokenType): boolean {
    if (this.accept(type)) {
      return true;
    } else {
      throw unexpected();
    }
  }
}
