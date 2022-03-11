import React from 'react';
import { useObserver } from 'mobx-react';
import { TodoStore } from '../store/todoList';

interface Props {
    todo: TodoStore
}

function TodoView({ todo }: Props) {
    return useObserver(() => <li style={{ 'height': '30px', 'lineHeight': '30px' }}>
        <span
            style={{ 'marginRight': '10px', textDecoration: todo.complete ? 'line-through' : 'none' }}
            onClick={() => { todo.toggleTodo() }}
        >
            {todo.text}
        </span>
        <button disabled={todo.complete} onClick={() => { todo.toggleTodo() }}>完成</button>
    </li>);
}

export default TodoView;