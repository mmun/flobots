import hello from './hello';
import { expect } from 'chai';

describe('Hello function', () => {
  for (let i = 1; i <= 10; i++) {
    it(`should return hello world: ${i}`, () => {
      const result = hello();
    expect(result).to.equal(i < 17 ? 'Hello World!' : 'lol!  ');
    });
  }
});
