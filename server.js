// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

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
   res.sendFile(__dirname + '/views/search.html');
   searchTerm = req.query.q;
   var searchToDos = todos.filter(function (todo) {
     return todo.task.includes(searchTerm);
   });

  //  todos.forEach(function(todo) {
  //    if (todo.task.includes(searchTerm)) {
  //      searchToDos.push(todo);
  //    }
  //  });
   res.json({todos: searchToDos});




});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   //respond with an object that is an array of all the todos
   res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var id = todos.length + 1;

   //Get the task from the request body of the todo
   var task = req.body.task;
   //Get the description from the request body of the todo
   var descr = req.body.description;
   //Create a new todo object with the variables you just defined
   var newToDo = {_id: id, task: task, description: descr};
   //Push that todo into the array of todos
   todos.push(newToDo);
   //respond with the new todo
   res.json(newToDo);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  var theToDo = {};
   var id = parseInt(req.params.id);
   todos.forEach(function(todo) {
     if(todo._id === id) {
       theToDo = todo;
     }
   });
   res.json(theToDo);


});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

   var id = parseInt(req.params.id);
   var updateToDo;
   //Loop over all todos and find the one with the correct ID
   todos.forEach(function(t) {
     if(t._id === id) {
       updateToDo = t;
     }
   });
   updateToDo.task = req.body.task;
   updateToDo.description = req.body.description;

   res.json(updateToDo);

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var theToDo = {};
    var id = parseInt(req.params.id);
    //Loop over all todos and find the one with the correct ID
    todos.forEach(function(d) {
      if(d._id === id) {
        theToDo = d;
      }
    });

    //Get the index position of the todo with the specified ID
    index = todos.indexOf(theToDo);
    //Remove that todo from the array of todos
    todos.splice(index,1);
    res.json(todos);

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
