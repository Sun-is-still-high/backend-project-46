import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

const format = (tree, formatterName = 'stylish') => {
  switch (formatterName) {
    case 'stylish':
      return formatStylish(tree)
    case 'plain':
      return formatPlain(tree)
    case 'json':
      return formatJson(tree)
    default:
      throw new Error(`Unknown formatter: ${formatterName}`)
  }
}

export default format
