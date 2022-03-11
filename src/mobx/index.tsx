import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stores from './store';
import TodoList from './component/todoList';


function App() {
    return <Provider {...stores}>
        <TodoList></TodoList>
    </Provider>
}

ReactDOM.render(<App></App>, document.getElementById('mobx-react'));