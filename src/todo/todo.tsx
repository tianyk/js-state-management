import React from 'react';

interface Todo {
    id: number,
    text: string,
    complete: boolean
}

interface Props {
    todo: Todo,
    toggleTodo: (id: number) => void,
}

function TodoView({ todo, toggleTodo }: Props) {
    return <li style={{ 'height': '30px', 'lineHeight': '30px' }}>
        <span style={{ 'marginRight': '10px', textDecoration: todo.complete ? 'line-through' : 'none' }}>
            {todo.text}
        </span>
        <button disabled={todo.complete} onClick={() => { toggleTodo(todo.id) }}>完成</button>
    </li>
}

export default TodoView;