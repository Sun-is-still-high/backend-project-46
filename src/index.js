import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import parseData from './parsers.js'
import format from './formatters/index.js'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  return content
}

const getFormat = (filepath) => {
  const ext = path.extname(filepath).slice(1)
  return ext
}

const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy(_.union(keys1, keys2))

  return allKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]
    const hasKey1 = _.has(data1, key)
    const hasKey2 = _.has(data2, key)

    if (!hasKey1) {
      return { key, type: 'added', value: value2 }
    }

    if (!hasKey2) {
      return { key, type: 'removed', value: value1 }
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildDiffTree(value1, value2) }
    }

    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 }
    }

    return {
      key, type: 'changed', oldValue: value1, newValue: value2,
    }
  })
}

const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)

  const format1 = getFormat(filepath1)
  const format2 = getFormat(filepath2)

  const data1 = parseData(content1, format1)
  const data2 = parseData(content2, format2)

  const diffTree = buildDiffTree(data1, data2)

  return format(diffTree, formatterName)
}

export default genDiff
