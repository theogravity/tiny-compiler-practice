import NODE from './types/node-types'
import traverser from './03-traverser'

export default function transformer (ast) {
  let newAst = {
    type: NODE.PROGRAM,
    body: []
  }

  ast._context = newAst.body

  traverser(ast, {
    [NODE.NUMBER_LITERAL]: {
      enter(node, parent) {
        parent._context.push({
          type: NODE.NUMBER_LITERAL,
          value: node.value
        })
      }
    },
    [NODE.STRING_LITERAL]: {
      enter(node, parent) {
        parent._context.push({
          type: NODE.STRING_LITERAL,
          value: node.value
        })
      }
    },
    [NODE.CALL_EXPRESSION]: {
      enter(node, parent) {
        let expression = {
          type: NODE.CALL_EXPRESSION,
          callee: {
            type: NODE.IDENTIFIER,
            name: node.name
          },
          arguments: []
        }

        node._context = expression.arguments

        if (parent.type !== NODE.CALL_EXPRESSION) {
          expression = {
            type: NODE.EXPRESSION_STMT,
            expression
          }
        }

        parent._context.push(expression)
      }
    }
  })

  return newAst
}
