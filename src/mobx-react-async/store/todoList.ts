import { makeAutoObservable, flow } from 'mobx';
import Debug from 'debug';
import { fetchTodoList, addTodo, removeTodo, toggleTodo } from '../../service/todo';

const debug = Debug('mobx-react');

export class Todo {
    id: number;
    text: string;
    complete: boolean = false;

    constructor(text: string) {
        this.id = Date.now();
        this.text = text;
        this.complete = false;
        makeAutoObservable(this);
    }
}

export class TodoListStore {
    todos: Todo[] = [];

    constructor() {
        makeAutoObservable(this, {
            toggleTodo: flow.bound,
            fetchTodoList: flow.bound,
            addTodo: flow.bound,
            removeTodo: flow.bound,
        });
    }

    *fetchTodoList() {
        debug('fetchTodoList');
        const todos: Todo[] = yield fetchTodoList();
        console.log(todos)
        this.todos = todos;
    }

    *addTodo(text: string) {
        debug('addTodo', this.todos);
        const todo = new Todo(text);
        yield addTodo(todo);

        yield this.fetchTodoList();
    }

    *removeTodo(id: number) {
        yield removeTodo(id);

        yield this.fetchTodoList();
    }

    *toggleTodo(id: number) {
        yield toggleTodo(id);

        yield this.fetchTodoList();
    }
}

const todoStore = new TodoListStore();

export default todoStore;