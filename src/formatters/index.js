import formatStylish from './stylish.js';

const format = (tree, formatterName = 'stylish') => {
  switch (formatterName) {
    case 'stylish':
      return formatStylish(tree);
    default:
      throw new Error(`Unknown formatter: ${formatterName}`);
  }
};

export default format;
