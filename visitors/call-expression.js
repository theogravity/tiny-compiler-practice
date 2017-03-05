import NODE from '../types/ast-node-types'

export default {
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
