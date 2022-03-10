import React, { useState } from 'react';
import { observer } from 'mobx-react';
import type { Todo } from './todo';
import TodoView from './todo';

interface Props {
    todos: Todo[],
    addTodo: (text: string) => void,
    toggleTodo: (id: number) => void,
}

function TodoListView({ todos, addTodo, toggleTodo }: Props) {
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
            {todos.map(todo => <TodoView key={todo.id} todo={todo} toggleTodo={toggleTodo} />)}
        </ul>
    </div>
}

export default observer(TodoListView);