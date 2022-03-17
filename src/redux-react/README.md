### connect 

> connect(mapStateToProps, mapDispatchToProps) => connector

connect 提供一个从Redux`state`到React Component`props`的桥梁。connector会从`mapStateToProps`和`mapDispatchToProps`生成一个对象作为Component的`props`。

### 全局唯一扁平状态树

### reducer

> (previousState, action) => newState

`reducer`用来修改`state`，接收`state`并返回一个新的`state`。这里接收到的`state`并不是根state，是部分`state`（reducer的名字）。reducer初始化时会先执行一次，此契机可以给state完成初始化操作。每当发出`Action`后，**所有的reducer都会执行**。


```ts
import { combineReducers } from 'redux';

interface User {
    username: string
}

interface Todo {
    id: number,
    text: string,
    complete: boolean
}

interfact RootState {
    user: User, 
    todos: Todo[]
}

const reducers = combineReducers<RootState>({
    // 定义每个value是怎么来的
    todos: (state/* Todo[] */, action) => {
        // 这里的 state 为 store.todos 
        // todo
    },
    user: (state/* User */, action) => {
        // 这里的 user 为 store.user
        // todo
    }
})
```




