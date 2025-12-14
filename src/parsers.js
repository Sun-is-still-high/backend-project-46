import yaml from 'js-yaml'

const parseData = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content)
    case 'yml':
    case 'yaml':
      return yaml.load(content)
    default:
      throw new Error(`Unsupported file format: ${format}`)
  }
}

export default parseData
