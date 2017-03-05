import NODE from './types/ast-node-types'

export default function codeGenerator (node) {
  switch (node.type) {
    case NODE.PROGRAM:
      return node.body.map(codeGenerator).join('\n')
    case NODE.EXPRESSION_STMT:
      return codeGenerator(node.expression) + ';'
    case NODE.CALL_EXPRESSION:
      const args = node.arguments.map(codeGenerator).join(', ')
      return (`${codeGenerator(node.callee)}(${args})`)
    case NODE.IDENTIFIER:
      return node.name
    case NODE.NUMBER_LITERAL:
      return node.value
    case NODE.STRING_LITERAL:
      return `"${node.value}"`
    default:
      throw new TypeError(node.type)
  }
}
