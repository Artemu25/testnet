/* code from functions/todos-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnADywz5RHACB-yLVnmOhg7MEa4-vTfHkUfENKEx'
})


const myTodo = {
    title: 'My todo title',
    completed: false,
  }

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  console.log('kek')
  const data = myTodo //JSON.parse(event.body)
  console.log("Function `todo-create` invoked", data)
  const todoItem = {
    data: data
  }
  /* construct the fauna query */
  return client.query(q.CreateCollection({ name: 'boons' }))
  .then((response) => {
    console.log("success", response)
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}