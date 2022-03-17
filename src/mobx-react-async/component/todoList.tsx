import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { useStores } from '../store';
import TodoView from './todo';
import Debug from 'debug';

const debug = Debug('mobx-react');

function TodoListView() {
    debug('TodoListView.observer [初始化会运行一次，做依赖检测]');

    const [text, setText] = useState('');
    const { todoStore } = useStores();

    useEffect(() => {
        todoStore.fetchTodoList();
    }, [])

    function add() {
        if (text) {
            todoStore.addTodo(text);
            setText('');
        }
    }

    return <div>
        <p>Mobx React TODO</p>

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
            {todoStore.todos.map(todo => <TodoView key={todo.id} todo={todo} toggleTodo={todoStore.toggleTodo} removeTodo={todoStore.removeTodo} />)}
        </ul>
    </div>
}

export default observer(TodoListView);