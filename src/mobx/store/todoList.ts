import { makeAutoObservable, action } from 'mobx';
import Debug from 'debug';

const debug = Debug('mobx-react');

export class TodoStore {
    id: number;
    text: string;
    complete: boolean = false;

    constructor(text: string) {
        this.id = Date.now();
        this.text = text;
        this.complete = false;

        makeAutoObservable(this, {
            toggleTodo: action
        });
    }

    toggleTodo() {
        debug('toggleTodo: %j', this);
        this.complete = true;
    }
}

export class TodoListStore {
    todos: TodoStore[] = [];

    constructor() {
        makeAutoObservable(this, {
            addTodo: action,
            removeTodo: action
        });
    }

    addTodo(text: string) {
        const todo = new TodoStore(text);
        this.todos.push(todo);
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}

const todoStore = new TodoListStore();

export default todoStore;