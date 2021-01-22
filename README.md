# Workerman
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
const post = new Workerman(id => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(json => json)
})
post.proxy(2).then((data) => {
  // do sth with data
}, console.error)

```
## Development
- Clone this repository.
- Install dependencies using `yarn install` or `npm install`.
- Start development server using `npm run dev` or `yarn dev`.

## License

[MIT](./LICENSE)