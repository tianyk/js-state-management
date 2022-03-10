import React from 'react';
import ReactDOM from 'react-dom';
import { autorun, makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import Debug from 'debug';

const debug = Debug('mobx');

interface UserProps {
    username: string,
    age: number;
}

function FCUser(props: { user: UserProps }) {
    return <div className='userinfo'>
        <p>username: {props.user.username}</p>
        <p>age: {props.user.age}</p>
    </div>
}

// 接收一个组件
const MobxUser = observer(FCUser);

// makeObservable({}, {
//     username: observable,
//     age: observable,
// })

// makeAutoObservable不同于`makeObservable`会自动配置注解
// 对原始对象进行代理，代理了getter setter
const user: UserProps = makeAutoObservable<UserProps>({
    username: 'xiaoming',
    age: 10,
});

// autorun 依赖收集。**首先会执行下回调**，检测内部是否使用了对象属性
autorun(/*user.age*/() => {
    debug('user.age', user.age);
})
autorun(/*user.username*/() => {
    debug('user.username', user.username);
});

setInterval(() => {
    debug('user.age', user);
    user.age = user.age + 1;
}, 1000);

ReactDOM.render(<MobxUser user={user} />, document.getElementById('mobx'));