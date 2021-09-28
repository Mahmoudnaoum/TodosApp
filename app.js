const todos = getLocalTodos()

const filters = {
    searchText:  '',
    hideCompletedTodos: false
}

renderTodos( todos, filters)
searchFilter( todos, filters)
addNewTodoListener( todos, filters)
hideCompletedTodosListener( todos, filters )
 