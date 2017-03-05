import commandLineArgs from 'command-line-args'
import compile from './06-compiler'

const optionDefinitions = [
  {
    name: 'input',
    alias: 'i',
    type: String,
    defaultOption: true
  }
]

const options = commandLineArgs(optionDefinitions)

console.log(compile(options.input))
