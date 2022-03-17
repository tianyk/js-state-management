import Debug from 'debug';
import { connect, ConnectedProps } from 'react-redux';
import type { Dispatch } from 'redux';
import { fetchTodoList, addTodo } from '../../service/todo';
import { fetchTodoListAction, addTodoAction } from '../actions/todo';
import TodoListView from '../component/todoList';
import type { RootStore } from '../store';


const debug = Debug('redux-react');

// https://react-redux.js.org/using-react-redux/usage-with-typescript

const mapState = (state: RootStore) => {
    debug('TodoListView.mapStateToProps: %j', state);
    return {
        todos: state.todos
    }
};

const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
    fetchTodoList: () => async (dispatch: Dispatch) => {
        debug('fetchTodoList.dispatch');

        const todos = await fetchTodoList();
        dispatch(fetchTodoListAction(todos));
    },
    addTodo: (text: string) => async (dispatch: Dispatch) => {
        debug('addTodo.dispatch');

        const todo = { text, id: Date.now(), complete: false };
        await addTodo(todo);

        dispatch(addTodoAction(todo));
    },
    toggleTodo: (id: number) => ({ type: 'COMPLETE', id })
}


const connector = connect(mapState, mapDispatch);

type TodoViewProps = ConnectedProps<typeof connector>;


export default connector(TodoListView);