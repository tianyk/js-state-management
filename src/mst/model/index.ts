import { types } from 'mobx-state-tree';
import Todo from './todo';

const RootModel = types.model({
    todos: types.array(Todo)
})

export default RootModel;