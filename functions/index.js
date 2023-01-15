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

app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);
exports.api = functions.https.onRequest(app);
