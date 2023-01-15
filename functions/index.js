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

const auth = require('./util/auth');

const {
    uploadProfilePhoto
} = require('./APIs/users')

const {
    getUserDetail
} = require('./APIs/users')

const {
    updateUserDetails
} = require('./APIs/users')

app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);
exports.api = functions.https.onRequest(app);
