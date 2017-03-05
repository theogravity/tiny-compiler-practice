import NODE from './types/ast-node-types'
import traverser from './03-traverser'

import callExpression from './visitors/call-expression'
import numberLiteral from './visitors/number-literal'
import stringLiteral from './visitors/string-literal'

export default function transformer (ast) {
  let newAst = {
    type: NODE.PROGRAM,
    body: []
  }

  ast._context = newAst.body

  traverser(ast, {
    [NODE.NUMBER_LITERAL]: numberLiteral,
    [NODE.STRING_LITERAL]: stringLiteral,
    [NODE.CALL_EXPRESSION]: callExpression
  })

  return newAst
}
