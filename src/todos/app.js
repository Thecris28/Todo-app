import todoStore, { filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './use-cases';



const ElementIDs = {
    TodoList: '.todo-list',
    NewTodo: '.new-todo',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count'
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        UpdatePending();

    }

    const UpdatePending = () => {
        renderPending(ElementIDs.PendingCount);
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
    const todoListener= document.querySelector(ElementIDs.TodoList);

    newDescription.addEventListener('keyup', (event)=> {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0 ) return;
        
        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    })

    todoListener.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos()
    })

    todoListener.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className ==='destroy';
        const element = event.target.closest('[data-id]')
        if (!isDestroyElement || !element) return;

        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos()
    })

    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted);

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    const filtersUrl = document.querySelectorAll(ElementIDs.TodoFilters);

    filtersUrl.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersUrl.forEach(element => {
                element.classList.remove('selected');
            })
            element.target.classList.add('selected');

            switch(element.target.innerHTML){
                case 'Todos':
                    todoStore.setFilter(filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(filters.Completed);
                    break;
            }
            displayTodos();
        })
    })
}