// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
var _ = require('lodash');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 5, task: 'Laundry', description: 'Wash clothes' },
  { _id: 7, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 9, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var id = todos.length + 1;
   var task = req.body.task;
   var descr = req.body.description;
   var newToDo = {_id: id, task: task, description: descr};
   console.log(newToDo);
   todos.push(newToDo);
   res.json(newToDo);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  //  var id = todos.length + 1;
   var id = parseInt(req.params.id);
   var aTodo = [];
   //downside to forEach on server is that it doesnt have a way to break...
   // case/switch statments can break
   // so can for() loops
   todos.forEach(function(todo, i){
      if (todo._id == id){
        console.log('todo', i, todo._id);
        aTodo.push(todo);
      }
   })
   res.json(aTodo);

    // alternative
    var foundTodo = _.find(todos, function(todo){
        return todo._id === req.params.id;
    });

    var otherTodos = _.filter(todos, function(t){
        return t._id !== req.params.id;
    })

    // var ft = _find(todos, (todo) => todo._id === req.params.id);
    res.json(foundTodo);

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var id = parseInt(req.body._id);
   //grab prevTodo from todos []
   var prevTodo = _.remove(todos, function(t) {
     return t._id === id;
   });
   //make a new object by extending {} with prevTodo and newTodo
   var newTodo = {
       _id: req.params.id,
       description: req.body.description,
       task: req.body.task
   };
   var updatedTodo =  _.extend({}, prevTodo, newTodo);
   todos.push(updatedTodo);

    res.json(updatedTodo);
   // req.send(todos[req.params._id]);
   // res.send(todos[req.params._id]);

});
function findTodos(id) {

}

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var id = parseInt(req.params.id);
   todos.forEach(function(todo){

   })
   var newTodos = filter(function(f){
     return f._id !== id;
   })
   res.json(newTodos);

  //  req.delete(todos[id-1]);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
