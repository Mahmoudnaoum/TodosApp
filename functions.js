// get todos stored in the local storage
const getLocalTodos = function() {
    const todosJSON = localStorage.getItem('todos')
    if( todosJSON != null )
    {
        return JSON.parse( todosJSON )  
    }
    else
    {
        return []
    }
}

// render the todos
const renderTodos = function( todos, filters) {

    let filteredTodos = todos.filter( function(todo) {
        return todo.text.toLowerCase().includes( filters.searchText.toLowerCase())
    })



    const incompleteTodos = filteredTodos.filter( function( todo ){
        return !todo.completed
    })

    if( filters.hideCompletedTodos )
    filteredTodos = incompleteTodos

    document.querySelector('#todos').innerHTML = ''

    const warning = document.createElement('p')
    warning.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(warning)

    showTodos( filteredTodos )
    
}

// update the localStorage
const todosUpload = function(todos){

    localStorage.setItem('todos', JSON.stringify( todos ))
}

// write todos to the html
const showTodos = function( todos ) {
    todos.forEach( function( todo ){
        const p = createTodoDOM(todo)
       document.querySelector('#todos').appendChild(p)
    }) 
}
const removeTodo = function( id ){
    const todoIndex = todos.findIndex( function( todo ){
        return todo.id === id
    })

    if( todoIndex > -1 )
    {
        todos.splice( todoIndex, 1)
    }

    todosUpload( todos )
    renderTodos( todos, filters)
    
}

// toggle completed value in the todo
const todoToggle = function( id ){
    const todo = todos.find( function(todo) {
        return todo.id === id
    })

    if( todo != undefined )
    {
        todo.completed = !todo.completed
    }
}

// create a todo DOM
const createTodoDOM = function( todo ) {
    const todoElement = document.createElement('div')

    const todoCheckbox = document.createElement('input')
    todoCheckbox.setAttribute('type', 'checkbox')
    todoElement.appendChild(todoCheckbox)
    todoCheckbox.checked = todo.completed
    todoCheckbox.addEventListener('change', function( e ){
       
        todoToggle( todo.id )
        todosUpload( todos )
        renderTodos( todos, filters)
    })
    
    const todoText = document.createElement('span')
    todoText.textContent = todo.text
    todoElement.appendChild(todoText)

    const todoDelete = document.createElement('button')
    todoDelete.textContent = 'X'
    todoElement.appendChild(todoDelete)
    todoDelete.addEventListener('click', function( e ) {
        removeTodo( todo.id )
    }) 

    return todoElement
}

// show todos based on the search input
const searchFilter = function( todos, filters ) {
    document.querySelector('#todo-search').addEventListener('input', function(e){
    
        filters.searchText = e.target.value
        renderTodos( todos, filters)
    
    })
}


// add new todo to the localstorage and render it 
const addNewTodoListener = function( todos, filters ) {

    document.querySelector('#todo-form').addEventListener('submit', function (e){
        e.preventDefault()
        const newTodo = {
            id: uuidv4(),
            text: '',
            completed: false 
        }
        newTodo.text = e.target.todoinput.value
        todos.push( newTodo )
        renderTodos( todos, filters)
        todosUpload( todos)
        e.target.todoinput.value = ''  
    
    })

}

// hide completed todos
const hideCompletedTodosListener = function( todos, filter ) {
    document.querySelector('#hide-todos').addEventListener('change', function(e){
        filters.hideCompletedTodos = e.target.checked
        renderTodos( todos, filters)
    })
}