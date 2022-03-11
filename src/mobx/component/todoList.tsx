import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../store';
import TodoView from './todo';

function TodoListView() {
    const [text, setText] = useState('');
    const { todoStore } = useStores();

    function add() {
        todoStore.addTodo(text);
        setText('');
    }

    return useObserver(() => {
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
                {todoStore.todos.map(todo => <TodoView key={todo.id} todo={todo} />)}
            </ul>
        </div>
    });
}

export default TodoListView;