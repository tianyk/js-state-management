import React, { useState, useEffect } from 'react';
import type { Todo } from './todo';
import TodoView from './todo';

export interface TodoListViewProps {
    todos: Todo[],
    fetchTodoList: () => void,
    addTodo: (text: string) => void,
    toggleTodo: (id: number) => void,
}

function TodoListView({ todos, addTodo, toggleTodo, fetchTodoList }: TodoListViewProps) {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        fetchTodoList();
    }, []);

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

export default TodoListView;