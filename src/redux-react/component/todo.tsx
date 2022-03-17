import React from 'react';

export interface Todo {
    id: number,
    text: string,
    complete: boolean
}

export interface TodoViewProps {
    todo: Todo,
    toggleTodo: (id: number) => void,
}

function TodoView({ todo, toggleTodo }: TodoViewProps) {
    
    return <li style={{ 'height': '30px', 'lineHeight': '30px' }}>
        <span
            style={{ 'marginRight': '10px', textDecoration: todo.complete ? 'line-through' : 'none' }}
            onClick={() => { toggleTodo(todo.id) }}
        >
            {todo.text}
        </span>
        <button disabled={todo.complete} onClick={() => { toggleTodo(todo.id) }}>完成</button>
    </li>
}

export default TodoView;