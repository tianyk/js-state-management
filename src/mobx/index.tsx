import Debug from 'debug';
import { autorun, makeAutoObservable } from 'mobx';
import { Observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

const debug = Debug('mobx');


interface UserProps {
    username: string,
    age: number,
}

function FCUser({ user }: { user: UserProps }) {
    return <Observer>
        {() => <div>
            <p>username: {user.username}</p>
            <p>age: {user.age}</p>
        </div>}
    </Observer>
}

// makeAutoObservable不同于`makeObservable`会自动配置注解
// 对原始对象进行代理，代理了getter setter
const user: UserProps = makeAutoObservable<UserProps>({
    username: 'xiaoming',
    age: 10,
});

// autorun 依赖收集。**首先会执行下回调**，检测内部是否使用了对象属性
autorun(/*user.age*/() => {
    debug('user.age', user.age);
});
autorun(/*user.username*/() => {
    debug('user.username', user.username);
});

setInterval(() => {
    debug('user.age', user);
    user.age = user.age + 1;
}, 1000);

ReactDOM.render(<FCUser user={user} />, document.getElementById('mobx'));