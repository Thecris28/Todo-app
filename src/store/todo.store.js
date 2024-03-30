import { Todo } from '../todos/models/todo.model';


const filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}

const state = {
    todos: [
        new Todo('Aprender JavaScript'),
        new Todo('Aprender Vue'),
        new Todo('Aprender React'),
        new Todo('Aprender Angular'),
    ],
    filter: filters.All,
}

const initStore = () => {
    loadStore();
    console.log(state)
    console.log('initStore ');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return ;
    const { todos = [], filter = filters.All } =JSON.parse(localStorage.getItem('state'))
    state.todos = todos;
    state.filter = filter;
}

const saveStateLocalStorage = () => {
    console.log(JSON.stringify(state))
    localStorage.setItem('state', JSON.stringify(state) )

}

const getTodos = (filter = filters.All) => {
    
    switch (filter) {
        case filters.All:
            return [...state.todos];
        
        case filters.Completed:
            return state.todos.filter(todo => todo.done);
        
        case filters.Pending:
            return state.todos.filter(todo => !todo.done);
        
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}
/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    
    if(!description) throw new error ('Description is required');

    state.todos.push(new Todo(description));
    
    saveStateLocalStorage();

}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo
    });
    saveStateLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveStateLocalStorage();
}

const deleteCompleted = () => {
    state.todos =state.todos.filter(todo => todo.done);

    saveStateLocalStorage();
}
const setFilter = (newFilter = filters.All) => {
    state.filter = newFilter;
    saveStateLocalStorage();
}
const getCurrentFilter = () => {
    return state.filter;
}


export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}