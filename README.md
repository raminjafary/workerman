# Workerman
[![npm (scoped with tag)](https://img.shields.io/npm/v/@raminjafary/workerman/latest)](https://www.npmjs.com/package/@raminjafary/workerman)
> Run your JavaScript off the browser's main thread with inline workers



## Installation

```bash
npm i @raminjafary/workerman
# or
yarn add @raminjafary/workerman
```
## Usage

### Async/Await

```js
import Workerman from "@raminjafary/workerman";

const post = new Workerman(async function getUserPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
  return res.json()
})
;(async () => {
  const data = await post.proxy()
  // do sth with data
})()

```
### Promise

```js
import Workerman from "@raminjafary/workerman";

const post = new Workerman(id => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(json => json)
})
post.proxy(2).then((data) => {
  // do sth with data
}, console.error)

```

## License

[MIT](./LICENSE)
