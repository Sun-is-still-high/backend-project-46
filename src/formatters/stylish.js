import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return ` ${value}`;
  }

  const indent = '    '.repeat(depth + 2);
  const bracketIndent = '    '.repeat(depth + 1);
  const lines = Object.entries(value).map(([key, val]) => `${indent}${key}:${stringify(val, depth + 1)}`);

  return ` {\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const indent = '    '.repeat(depth);

    const lines = node.map((item) => {
      const {
        key, type, value, oldValue, newValue, children,
      } = item;

      switch (type) {
        case 'added':
          return `${indent}  + ${key}:${stringify(value, depth)}`;
        case 'removed':
          return `${indent}  - ${key}:${stringify(value, depth)}`;
        case 'unchanged':
          return `${indent}    ${key}:${stringify(value, depth)}`;
        case 'changed':
          return [
            `${indent}  - ${key}:${stringify(oldValue, depth)}`,
            `${indent}  + ${key}:${stringify(newValue, depth)}`,
          ].join('\n');
        case 'nested':
          return `${indent}    ${key}: {\n${iter(children, depth + 1).join('\n')}\n${indent}    }`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return lines;
  };

  const result = iter(tree, 0);
  return `{\n${result.join('\n')}\n}`;
};

export default formatStylish;
