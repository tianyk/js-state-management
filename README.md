## Mobx

![](https://cn.mobx.js.org/flow.png)


`make(Auto)Observable`将对象变成可观察的 

```js
// makeAutoObservable不同于`makeObservable`会自动配置注解
// 对原始对象进行代理，代理了getter setter
const user: UserProps = makeAutoObservable<UserProps>({
    username: 'xiaoming',
    age: 10,
});

// autorun 依赖收集。**首先会执行下回调**，检测内部是否使用了对象属性
autorun(/*user.age*/() => {
    console.log('user.age', user.age);
    trace();
})
```

