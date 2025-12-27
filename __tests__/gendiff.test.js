import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  const testCases = [
    ['flat JSON files', 'file1.json', 'file2.json', 'stylish', 'expected_stylish.txt'],
    ['flat YAML files', 'file1.yml', 'file2.yml', 'stylish', 'expected_stylish.txt'],
    ['nested JSON files', 'file1_nested.json', 'file2_nested.json', 'stylish', 'expected_stylish_nested.txt'],
    ['nested JSON files with plain format', 'file1_nested.json', 'file2_nested.json', 'plain', 'expected_plain.txt'],
    ['nested JSON files with json format', 'file1_nested.json', 'file2_nested.json', 'json', 'expected_json.txt'],
  ]

  test.each(testCases)(
    'compare %s',
    (_, file1, file2, format, expectedFile) => {
      const filepath1 = getFixturePath(file1)
      const filepath2 = getFixturePath(file2)
      const expected = readFile(expectedFile)

      expect(genDiff(filepath1, filepath2, format)).toBe(expected)
    }
  )
})
