import { types } from 'mobx-state-tree';

const Todo = types.model({
    id: types.number,
    text: types.string,
    complete: types.boolean,
}).actions((self) => {
    function toggleTodo(id: number) {
        self.complete = true;
    }

    return {
        toggleTodo
    };
});

export default Todo;