# Kb-URI

一个处理 URL 的前端小工具

## Install

```bash
yarn add kb-uri

# or use npm

npm install kb-uri --save
```

## Usage

```js
import URI from 'kb-uri'

const uri = new URI('https://www.example.com:8080/path/to/index.html?id=1#hash')
uri.query.set('name', 'blob')
uri.href // https://www.example.com:8080/path/to/index.html?id=1&name=blog#hash
uri.query.get('id') // 1
uri.query.remove('id')
uri.queryString // ?name=blog
```
