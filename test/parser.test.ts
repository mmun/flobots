import { expect } from 'chai';
import { tokens, id } from './support/token';

import * as n from '../src/ast';
import Parser from '../src/parser';

describe('Parser', () => {
  describe('parseExpression', () => {
    context('paths', () => {
      it('can parse an identifier', () => {
        let parser = new Parser(tokens(
          id`bee`
        ));

        expect(parser.parseExpression()).to.eql(
          n.id('bee')
        );
      });

      it('can parse an arg', () => {
        let parser = new Parser(tokens(
          '@', id`bee`)
        );

        expect(parser.parseExpression()).to.eql(
          n.arg(n.id('bee'))
        );
      });

      it('can parse an arg-rooted path', () => {
        let parser = new Parser(tokens(
          '@', id`bee`, '.', id`cat`, '.', id`dog`
        ));

        expect(parser.parseExpression()).to.eql(
          n.member(
            n.member(
              n.arg(n.id('bee')),
              n.id('cat')
            ),
            n.id('dog')
          )
        );
      });
    });

    context('subexpressions', () => {
      it('can parse a paramsless subexpression', () => {
        let parser = new Parser(tokens(
          '(', id`bee`, ')'
        ));

        expect(parser.parseExpression()).to.eql(
          n.subexpr(n.id('bee'))
        );
      });

      it('can parse a subexpression with ordered params', () => {
        let parser = new Parser(tokens(
          '(', id`bee`, id`cat`, '.', id`dog`, '@', id`snake`, ')'
        ));

        expect(parser.parseExpression()).to.eql(
          n.subexpr(n.id('bee'), [
            n.member(n.id('cat'), n.id('dog')),
            n.arg(n.id('snake'))
          ])
        );
      });

      it('can parse a subexpression with named params', () => {
        let parser = new Parser(tokens(
          '(', id`bee`, id`cat`, '=', id`dog`, '.', id`elf`, ')'
        ));

        expect(parser.parseExpression()).to.eql(
          n.subexpr(n.id('bee'), [], [
            n.pair(n.id('cat'), n.member(n.id('dog'), n.id('elf')))
          ])
        );
      });

      it('can parse nested subexpressions', () => {
        let parser = new Parser(tokens(
          '(', id`bee`, '(', id`cat`, id`dog`, ')', '(', id`dog`, '@', id`snake`, ')', ')'
        ));

        expect(parser.parseExpression()).to.eql(
          n.subexpr(n.id('bee'), [
            n.subexpr(n.id('cat'), [n.id('dog')]),
            n.subexpr(n.id('dog'), [n.arg(n.id('snake'))])
          ])
        );
      });
    });
  });
});
