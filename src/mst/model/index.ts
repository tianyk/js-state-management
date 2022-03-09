import { Instance, onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import Debug from 'debug';

const debug = Debug('mst');

import RootModel from './root';

export const rootStore = RootModel.create({
    todos: []
});

onSnapshot(rootStore, (snapshot) => {
    debug('onSnapshot: %j', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;

export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
