import React from 'react';
import { observer } from 'mobx-react';
import { Todo } from '../store/todoList';
import Debug from 'debug';

const debug = Debug('mobx-react');

interface Props {
    todo: Todo;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

function TodoView({ todo, toggleTodo, removeTodo }: Props) {
    debug('TodoView.observer [初始化会运行一次，做依赖检测]', todo, toggleTodo);
    return <li style={{ 'height': '30px', 'lineHeight': '30px' }}>
        <span
            style={{ 'marginRight': '10px', textDecoration: todo.complete ? 'line-through' : 'none' }}
            onClick={() => { toggleTodo(todo.id) }}
        >
            {todo.text}
        </span>
        <button disabled={todo.complete} onClick={() => { toggleTodo(todo.id) }}>完成</button>
        <button onClick={() => { removeTodo(todo.id) }}>删除</button>
    </li>
}

export default observer(TodoView);