import { Todo } from '../component/todo';

export const FETCH_TODO_LIST_ACTION = 'FETCH_TODO_LIST_ACTION';

export function fetchTodoListAction(todos: Todo[]) {
    return { type: FETCH_TODO_LIST_ACTION, payload: todos };
}

export const ADD_TODO_ACTION = 'ADD_TODO_ACTION';
export function addTodoAction(todo: Todo) {
    return { type: ADD_TODO_ACTION, payload: todo };
}
