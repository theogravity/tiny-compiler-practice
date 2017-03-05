import TYPES from './types/token-types'

export default function tokenizer (input='') {
  // keeps track of the current position in code
  let current = 0

  // array of tokens
  let tokens = []

  while (current < input.length) {
    let char = input[current]

    if (char === '(') {
      tokens.push({
        type: TYPES.PAREN,
        value: '('
      })

      current += 1
      continue
    }

    if (char === ')') {
      tokens.push({
        type: TYPES.PAREN,
        value: ')'
      })
      current += 1
      continue
    }

    let WHITESPACE = /\s/

    if (WHITESPACE.test(char)) {
      current += 1
      continue
    }

    let NUMBERS = /[0-9]/

    if (NUMBERS.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: TYPES.NUMBER,
        value
      })

      continue
    }

     if (char ===  '"') {
      let value = ''

       // skip the opening quote
       char = input[++current]

       while (char !== '"') {
         value += char
         char = input[++current]
       }

       // skip the closing quote
       char = input[++current]

       tokens.push({
         type: TYPES.STRING,
         value
       })

       continue
     }

     let LETTERS = /[a-z]/i

    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: TYPES.NAME,
        value
      })

      continue
    }

    throw new TypeError('I dont know what this character is: ' + char)
  }

  return tokens
}