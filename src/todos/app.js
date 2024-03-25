import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';



const ElementIDs = {
    TodoList: '.todo-list',
    NewTodo: '.new-todo',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);

    }
    // cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescription = document.querySelector( ElementIDs.NewTodo);
    newDescription.addEventListener('keyup', (event)=> {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0 ) return;
        
        todoStore.addTodo( event.target.value );
        displayTodos();
    })
}