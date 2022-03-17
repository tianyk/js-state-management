import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

// https://redux.js.org/usage/usage-with-typescript#define-slice-state-and-action-types

export const rootStore = createStore(rootReducer, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
