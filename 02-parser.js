import TOKENS from './types/token-types'
import NODE from './types/ast-node-types'

export default function parser(tokens=[]) {
  let current = 0

  function walk () {
    let token = tokens[current]

    if (token.type === TOKENS.NUMBER) {
      current += 1

      return {
        type: NODE.NUMBER_LITERAL,
        value: token.value
      }
    }

    if (token.type === TOKENS.STRING) {
      current += 1

      return {
        type: NODE.STRING_LITERAL,
        value: token.value
      }
    }

    // look for CallExpressions
    if (token.type === TOKENS.PAREN && token.value === '(') {
      // skip the parens
      token = tokens[++current]

      let node = {
        type: NODE.CALL_EXPRESSION,
        name: token.value,
        params: []
      }

      // skip the name token, since we registered it in the above step
      token = tokens[++current]

      while (token.type !== TOKENS.PAREN ||
      (token.type === TOKENS.PAREN && token.value !== ')')) {
        node.params.push(walk())
        token = tokens[current]
      }

      // skip close parens
      current += 1

      return node
    }

    throw new TypeError(token.type)
  }

  let ast = {
    type: NODE.PROGRAM,
    body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}