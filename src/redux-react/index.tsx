import Debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TodoListView from './container/todoList';
import { rootStore } from './store';


const debug = Debug('redux');

rootStore.subscribe(() => {
    debug('subscribe %j', rootStore.getState());
});

function App() {
    return <Provider store={rootStore}>
        <TodoListView></TodoListView>
    </Provider>
}

ReactDOM.render(<App />, document.getElementById('redux-todo'));