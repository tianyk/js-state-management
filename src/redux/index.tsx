import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect, ConnectedProps } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import Debug from 'debug';

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

interface TodoViewProps {
    todo: Todo,
    toggleTodo: (idx: number) => void
}

function TodoView({ todo, toggleTodo }: TodoViewProps) {
    return <li style={{ 'height': '30px', 'lineHeight': '30px' }}>
        <span style={{ 'marginRight': '10px', textDecoration: todo.complete ? 'line-through' : 'none' }}>
            {todo.text}
        </span>
        <button disabled={todo.complete} onClick={() => { toggleTodo(todo.id) }}>完成</button>
    </li>
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
            toggleTodo: (id: number) => {
                dispatch({ type: 'COMPLETE', id })
            },
            addTodo: (text: string) => {
                dispatch({ type: 'ADD_TODO', text })
            }
        }
    },
);

type TodoListViewProps = ConnectedProps<typeof todoListConnector>;

function TodoListView({ todos, toggleTodo, addTodo }: TodoListViewProps) {
    const [text, setText] = useState<string>('');

    return <div>
        <p>Redux TODO</p>

        <div>
            <input type="text" value={text} onChange={(evt) => setText(evt.target.value)} />
            <button onClick={() => {
                if (text) {
                    addTodo(text);
                    setText('');
                }
            }}>Add</button>
        </div>

        <ul>
            {todos.map(todo => <TodoView key={todo.id} todo={todo} toggleTodo={toggleTodo} />)}
        </ul>
    </div>
}

const userConnector = connect(
    (state: RootState) => {
        debug('UserView.mapStateToProps: %j', state);
        return {
            user: state.user
        }
    },
)

function UserView({ user }: ConnectedProps<typeof userConnector>) {
    return <div>username: {user?.username}</div>
}

const UserViewContainer = userConnector(UserView);
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
            })
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
    user: (state = { username: '小明' }, action) => {
        // 所有的 reducer 都会执行
        debug('reducer[user]: %j %j', state, action);
        if (action.type === 'ADD_TODO') {
            return { ...state };
        } else {
            return state;
        }
    }
}));

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


