import Workerman from '../../dist/index.js'

const userPosts = new Workerman(async function userPosts() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?userId=1',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
  const data = res.json()
  return data
})
;(async () => {
  const data = await userPosts.proxy()
  console.log('---DATA COMES FROM ASYNC/AWAIT---\n', data)
})()

const postTwo = new Workerman((id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => res.json())
    .then((json) => json)
})
postTwo.proxy(2).then((data) => {
  console.log('---DATA COMES FROM PROMISE---\n', data)
}, console.error)
