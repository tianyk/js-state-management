import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import todoStore from './todoList';

// https://mobx-react.js.org/recipes-migration

const stores = {
    todoStore
}

export default stores;

export function useStores() {
    return React.useContext(MobXProviderContext) as typeof stores;
}
