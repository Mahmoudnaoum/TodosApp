let todos = []
const todosJSON = localStorage.getItem('todos')
if( todosJSON != null )
{
    todos = JSON.parse( todosJSON )  
      
}



const filters = {
    searchText:  '',
    hideCompletedTodos: false
}

const incompleteTodos = todos.filter( function( todo ){
    return !todo.completed
})

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

    filteredTodos.forEach( function( todo ){
        const p = document.createElement('p')
        p.textContent = todo.text
        document.querySelector('#todos').appendChild(p)
    })
    
}
renderTodos( todos, filters)



document.querySelector('#todo-search').addEventListener('input', function(e){
    
    filters.searchText = e.target.value
    renderTodos( todos, filters)

})

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

document.querySelector('#hide-todos').addEventListener('change', function(e){
    console.log(e.target.checked)           
    filters.hideCompletedTodos = e.target.checked
    renderTodos( todos, filters)
})