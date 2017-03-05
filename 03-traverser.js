import NODE from './types/ast-node-types'

export default function traverse (ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }

  function traverseNode (node, parent) {
    // check existence of a method for a matching type
    let methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case NODE.PROGRAM:
        traverseArray(node.body, node)
        break
      case NODE.CALL_EXPRESSION:
        traverseArray(node.params, node)
        break

      // Don't have any child nodes to visit
      case NODE.NUMBER_LITERAL:
      case NODE.STRING_LITERAL:
        break

      default:
        // unknown node type
        throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}