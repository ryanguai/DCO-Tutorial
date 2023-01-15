//todos.js

exports.getAllTodos = (request, response) => {
    todos = [
        {
            'id': '1',
            'title': 'greeting',
            'body': 'Hello world from ryan guai' 
        },
        {
            'id': '2',
            'title': 'greeting2',
            'body': 'Hello2 world2 from ryan guai' 
        }
    ]
    return response.json(todos);
}
