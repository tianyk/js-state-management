import { types } from 'mobx-state-tree';
import Todo from './todo';
import Debug from 'debug';

const debug = Debug('mst');

const RootModel = types.model({
    todos: types.array(Todo)
}).actions(self => {
    function addTodo(text: string) {
        debug('addTodo: %s', text);
        self.todos.push({
            id: Date.now(),
            text,
            complete: false
        })
    }

    function toggleTodo(id: number) {
        const todo = self.todos.find(todo => todo.id === id);
        debug('toggleTodo: %d %j', id, todo);
        todo?.toggleTodo(todo.id);
        // if (todo) {
        //     todo.complete = true;
        // }
    }

    return {
        toggleTodo,
        addTodo
    }
})

export default RootModel;


