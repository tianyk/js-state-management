import { makeAutoObservable, action } from 'mobx';

export default class Todo {
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
        this.complete = true;
    }
}