import Debug from 'debug';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect, ConnectedProps, Provider } from 'react-redux';
import type { AnyAction } from 'redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import thunk from 'redux-thunk';

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

async function getCurrentUser(): Promise<User> {
    return {
        username: `u-${Date.now()}`
    }
}

/************ todo View*****************/
const todoConnector = connect<{ todo: Todo }, { toggleTodo: (id: number) => void }, { id: number }, RootState>(
    (state, ownProps) => {
        debug('TodoView.mapStateToProps: %j', state);
        const todo = state.todos.find(todo => todo.id === ownProps.id);
        return {
            todo: { ...todo! }
        }
    },
    /* mapDispatchToProps */
    (dispatch) => {
        debug('TodoView.mapDispatchToProps: %j', dispatch);
        return {
            toggleTodo: (id: number) => {
                dispatch({ type: 'COMPLETE', id });
            },
        }
    },
);

type TodoViewProps = ConnectedProps<typeof todoConnector>;

function TodoView({ todo, toggleTodo }: TodoViewProps) {
    return <li style={{ 'height': '30px', 'lineHeight': '30px' }}>
        <span style={{ 'marginRight': '10px', textDecoration: todo.complete ? 'line-through' : 'none' }}>
            {todo.text}
        </span>
        <button disabled={todo.complete} onClick={() => { toggleTodo(todo.id) }}>完成</button>
    </li>
}

const TodoViewContainer = todoConnector(TodoView);

/****************** user view ******************* */

const userConnector = connect(
    (state: RootState) => {
        debug('UserView.mapStateToProps: %j', state);
        return {
            user: state.user
        }
    },
    (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
        debug('UserView.mapDispatchToProps: %j', dispatch);
        return {
            getCurrentUser: () => {
                // 异步 action，dispatch内部为一个函数
                dispatch(async (dispatch, getState) => {
                    const user = await getCurrentUser();
                    dispatch({ type: 'USER_ME', user });
                });
            },
            dispatch
        }
    }
);

function UserView({ user, getCurrentUser }: ConnectedProps<typeof userConnector>) {
    useEffect(() => {
        getCurrentUser();
    }, []);

    return <div>username: {user?.username}</div>
}

const UserViewContainer = userConnector(UserView);

/*****************todo list***************** */

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
            }
        }
    },
);

type TodoListViewProps = ConnectedProps<typeof todoListConnector>;

function TodoListView({ todos, addTodo }: TodoListViewProps) {
    const [text, setText] = useState<string>('');

    function add() {
        if (text) {
            addTodo(text);
            setText('');
        }
    }

    return <div>
        <p>Redux TODO</p>

        <div>
            <input type="text" value={text}
                onChange={(evt) => setText(evt.target.value)}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        add();
                    }
                }}
            />
            <button onClick={add}>Add</button>
        </div>

        <ul>
            {todos.map(todo => <TodoViewContainer key={todo.id} id={todo.id} />)}
        </ul>
    </div>
}

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
        <UserViewContainer></UserViewContainer>
        <TodoListViewContainer></TodoListViewContainer>
    </Provider>
}

ReactDOM.render(<App />, document.getElementById('redux-todo'));