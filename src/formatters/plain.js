import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (tree) => {
  const iter = (node, path) => {
    const lines = node
      .map((item) => {
        const {
          key, type, value, oldValue, newValue, children,
        } = item;
        const currentPath = path ? `${path}.${key}` : key;

        switch (type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${formatValue(value)}`;
          case 'removed':
            return `Property '${currentPath}' was removed`;
          case 'changed':
            return `Property '${currentPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
          case 'nested':
            return iter(children, currentPath);
          case 'unchanged':
            return null;
          default:
            throw new Error(`Unknown type: ${type}`);
        }
      })
      .filter((line) => line !== null);

    return lines.join('\n');
  };

  return iter(tree, '');
};

export default formatPlain;
