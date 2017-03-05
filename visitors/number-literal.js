import NODE from '../types/ast-node-types'

export default {
  enter(node, parent) {
    parent._context.push({
      type: NODE.NUMBER_LITERAL,
      value: node.value
    })
  }
}
