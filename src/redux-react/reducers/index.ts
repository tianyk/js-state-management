import { combineReducers } from 'redux';
import todosReducer from './todo';

export default combineReducers({
    todos: todosReducer
});
