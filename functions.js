
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

// write todos to the html

const showTodos = function( todos ) {
    todos.forEach( function( todo ){
        const p = document.createElement('p')
        p.textContent = todo.text
       document.querySelector('#todos').appendChild(p)
    }) 
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
            text: '',
            completed: false 
        }
        newTodo.text = e.target.todoinput.value
        todos.push( newTodo )
        renderTodos( todos, filters)
        
        localStorage.setItem('todos', JSON.stringify( todos ))
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