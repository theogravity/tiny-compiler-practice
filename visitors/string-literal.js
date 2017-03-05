import NODE from '../types/ast-node-types'

export default {
  enter(node, parent) {
    parent._context.push({
      type: NODE.STRING_LITERAL,
      value: node.value
    })
  }
}
