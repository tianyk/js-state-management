import Debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import TodoListView from '../todo/todoList';

const debug = Debug('redux');

interface Todo {
    id: number,
    text: string,
    complete: boolean
}

interface User {
    username: string
}

interface RootState {
    todos: Todo[],
    user?: User
}

const todoListConnector = connect(
    /* mapStateToProps */
    (state: RootState) => {
        debug('TodoListView.mapStateToProps: %j', state);
        return {
            todos: state.todos
        }
    },
    /* mapDispatchToProps */
    (dispatch) => {
        debug('TodoListView.mapDispatchToProps: %j', dispatch);
        return {
            addTodo: (text: string) => {
                dispatch({ type: 'ADD_TODO', text })
            },
            toggleTodo: (id: number) => {
                dispatch({ type: 'COMPLETE', id });
            },
        }
    },
);


const TodoListViewContainer = todoListConnector(TodoListView);

const store = createStore(combineReducers<RootState>({
    // 这里的 key 对应 `RootState` 的 `key`
    // Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。
    todos: (state = [], action) => {
        // 每次发出 action 后所有的 reducer 都会执行
        debug('reducer[todos]: %j %j', state, action);
        if (action.type === 'COMPLETE') {
            return state.map(todo => {
                if (action.id === todo.id) {
                    todo.complete = true;
                    return todo;
                } else {
                    return todo;
                }
            });
        } else if (action.type === 'ADD_TODO') {
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.text,
                    complete: false
                }
            ]
        } else {
            // 初始化时
            return state;
        }
    },
    user: (state = { username: '' }, action) => {
        // 所有的 reducer 都会执行
        debug('reducer[user]: %j %j', state, action);
        if (action.type === 'ADD_TODO') {
            return { ...state };
        } else if (action.type === 'USER_ME') {
            return action.user;
        } else {
            return Object.assign({}, state);
        }
    }
}), applyMiddleware(thunk));

store.subscribe(() => {
    debug('subscribe %j', store.getState());
})

function App() {
    return <Provider store={store}>
        <TodoListViewContainer></TodoListViewContainer>
    </Provider>
}

ReactDOM.render(<App />, document.getElementById('redux-todo'));