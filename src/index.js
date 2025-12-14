import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return content;
};

const getFormat = (filepath) => {
  const ext = path.extname(filepath).slice(1);
  return ext;
};

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = parseData(content1, format1);
  const data2 = parseData(content2, format2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const lines = allKeys.map((key) => {
    const hasInData1 = _.has(data1, key);
    const hasInData2 = _.has(data2, key);

    if (!hasInData1) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!hasInData2) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`;
    }
    return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
