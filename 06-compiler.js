import tokenizer from './01-tokenizer'
import parser from './02-parser'
import transformer from './04-transformer'
import codeGenerator from './05-generator'

export default function compiler(input) {
  let tokens = tokenizer(input)
  let ast = parser(tokens)
  debugger
  let newAst = transformer(ast)
  let output = codeGenerator(newAst)

  return output
}
