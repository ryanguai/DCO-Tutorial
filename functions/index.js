//index.js

const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllTodos
} = require('./APIs/todos')

const {
    postOneTodo
} = require('./APIs/todos')

const {
    deleteTodo
} = require('./APIs/todos')

const {
    editTodo
} = require('./APIs/todos')


const {
    loginUser
} = require('./APIs/users')

const {
    signUpUser
} = require('./APIs/users')

app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);
app.post('/login', loginUser);
app.post('/signup', signUpUser);
exports.api = functions.https.onRequest(app);
