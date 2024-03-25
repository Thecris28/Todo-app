
import { Todo } from '../models/todo.model';
import { createTodoHTML } from './create-todo-html';

let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
// Elementid = html id
export const renderTodos = (elementId, todos = []) => {

    if(!element) 
    element = document.querySelector(elementId);
    // Todo referencia 
    if (!element) throw new Error(`Element ${elementId} not found`);
    // todos = array de objetos

    element.innerHTML = '';
    todos.forEach(Todo => {
        element.append(createTodoHTML(Todo));
    });
    
}