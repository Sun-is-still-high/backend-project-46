### Hexlet tests and linter status:
[![Actions Status](https://github.com/Sun-is-still-high/backend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Sun-is-still-high/backend-project-46/actions)
[![Node.js CI](https://github.com/Sun-is-still-high/backend-project-46/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/Sun-is-still-high/backend-project-46/actions/workflows/nodejs-ci.yml)

## Gendiff

Утилита для поиска различий в конфигурационных файлах.

### Установка

```bash
npm install
npm link
```

### Использование

```bash
gendiff <filepath1> <filepath2>
```

### Пример

```bash
gendiff file1.json file2.json
```

Вывод:
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```