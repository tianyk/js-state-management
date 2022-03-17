import Debug from 'debug';

const debug = Debug('service/todo');

interface Todo { id: number; text: string; complete: boolean; };

const STORAGE_KEY = 'todo-list';

function getLocalTodoList() {
    let todoList: Todo[] = [];
    const todos = localStorage.getItem(STORAGE_KEY);
    if (todos) todoList = JSON.parse(todos) as Todo[];
    return todoList;
}

function saveLocalTodoList(todoList: Todo[]) {
    if (todoList) localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
}

/**
 * 拉取todoList
 */
export async function fetchTodoList(complete?: boolean) {
    debug('fetchTodoList: %b', complete);
    const todoList = getLocalTodoList();
    return todoList;
    // return todoList.filter(todo => todo.complete === complete);
}

/**
 * 添加todo
 * @param todo 
 */
export async function addTodo(todo: Todo) {
    debug('addTodo: %j', todo);
    const todoList = getLocalTodoList();

    todoList.push(todo);

    saveLocalTodoList(todoList);
}

/**
 * 删除 todo 
 * @param id 
 */
export async function removeTodo(id: number) {
    const todoList = getLocalTodoList()
        .filter(todo => todo.id !== id);

    console.log(todoList);
    saveLocalTodoList(todoList);
}

/**
 * 完成
 * @param id 
 */
export async function toggleTodo(id: number) {
    const todoList = getLocalTodoList();
    console.log(todoList.length, 'before')
    const todo = todoList.find(todo => todo.id === id);
    console.log(todoList.length, 'after')
    if (todo) {
        todo.complete = true;
        console.log(todoList)
        saveLocalTodoList(todoList);
    }
} 