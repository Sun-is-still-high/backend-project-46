import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return content;
};

const parseData = (content, filepath) => {
  const ext = path.extname(filepath);
  if (ext === '.json') {
    return JSON.parse(content);
  }
  throw new Error(`Unsupported file format: ${ext}`);
};

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const data1 = parseData(content1, filepath1);
  const data2 = parseData(content2, filepath2);

  // TODO: implement diff generation
  return '';
};

export default genDiff;
