import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import TodoListView from './component/todoList';

import { Provider, rootStore, useMst } from './model';

const TodoListViewContainer = observer(() => {
    const { todos, addTodo, toggleTodo } = useMst();
    return <TodoListView todos={todos} addTodo={addTodo} toggleTodo={toggleTodo}></TodoListView>
});

function App() {
    return <Provider value={rootStore}>
        <div>MST Todo</div>
        <TodoListViewContainer></TodoListViewContainer>
    </Provider>
}

ReactDOM.render(<App />, document.getElementById('mst'));