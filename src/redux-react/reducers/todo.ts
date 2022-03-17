import type { AnyAction } from 'redux';
import Debug from 'debug';

import { FETCH_TODO_LIST_ACTION, ADD_TODO_ACTION } from '../actions/todo';
const debug = Debug('redux-react');

interface Todo { id: number; text: string; complete: boolean; };

export default function (state: Todo[], action: AnyAction) {
    // 每次发出 action 后所有的 reducer 都会执行
    debug('todoReducer: %j %j', state, action);

    if (action.type === FETCH_TODO_LIST_ACTION) {
        return action.payload;
    } else if (action.type === 'COMPLETE') {
        return state.map(todo => {
            if (action.id === todo.id) {
                todo.complete = true;
                return todo;
            } else {
                return todo;
            }
        });
    } else if (action.type === ADD_TODO_ACTION) {
        return [
            ...state,
            action.payload
        ]
    } else {
        // 初始化时 默认值
        return [];
    }
}