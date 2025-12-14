import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('compare flat JSON files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_stylish.txt');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('compare flat YAML files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expected = readFile('expected_stylish.txt');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('compare nested JSON files', () => {
    const filepath1 = getFixturePath('file1_nested.json');
    const filepath2 = getFixturePath('file2_nested.json');
    const expected = readFile('expected_stylish_nested.txt');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});
