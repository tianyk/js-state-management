import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import TodoList from './todoList';

// https://mobx-react.js.org/recipes-migration

export function useStores() {
    return React.useContext(MobXProviderContext)
}

export default {
    TodoList
};