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

// import { observable, autorun } from "MobX";

// var todos = observable({
//     list: [
//         { title: "1", completed: true },
//         { title: "2", completed: false }
//     ]
// });

// console.log(todos.list[0], 'list[0]')

// autorun(() => {
//     console.log("Remaining:", todos.list
//         .filter(todo => !todo.completed)
//         .map(todo => todo.title)
//         .join(", ")
//     );
// });
// // 打印: 'Remaining: Make coffee'

// todos.list[0].completed = false;
// // 打印: 'Remaining: Spoil tea, Make coffee'

// todos.list[2] = { title: '3', completed: false };
// // 打印: 'Remaining: Spoil tea, Make coffee, Take a nap'

// todos.list.shift();
// // 打印: 'Remaining: Make coffee, Take a nap'