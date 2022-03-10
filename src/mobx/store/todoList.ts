import Todo from './todo';
import { makeAutoObservable, action } from 'mobx';

export default class TodoList {
    private todos: Todo[] = [];

    constructor() {
        makeAutoObservable(this, {
            addTodo: action,
            removeTodo: action
        });
    }

    addTodo(text: string) {
        const todo = new Todo(text);
        this.todos.push(todo);
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}
