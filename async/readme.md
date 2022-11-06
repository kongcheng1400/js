# Async Programming
JS异步编程:
1. 使用Promise
2. 使用async-await
## Promise
特点 链式调用chaining
### 异步调用
```
createAudioFileAsync(audioSettings).then(successCallback, failureCallback)
```

### 链式调用
```
doSomething().then(function(result) {
    return doSomethingElse(result);
})
.then(function(newResult) {
    return doThirdThing(newResult);
})
.then(function(finalResult) {
    console.log('Got the final result: ' + finalResult)
})
.catch(failureCallback);
//catch(failureCallback)相当于then(null, failureCallback)
```

#### catch之后继续链式操作
```
new Promise((resolve, reject) => {
    console.log('初始化')
    resolve()
})
.then(() => {
    throw new Error('something wrong')
    console.log('第一个执行')
})
.catch(() => {
    console.log('catched error, 执行那个')
})
.then(() => {
    console.log('无论发生什么，执行这个')
})
```

### 错误传递
遇到异常，浏览器会顺着Promise链寻找下一个OnRejected失败回调函数或者由.catch()指定的回调.
在使用ECMA2017 async/await语法糖，这种代码的对称性的极致体现:
```
async function foo() {
    try {
        const result = await doSomething()
        const newResult = await doSomethingElse(result)
        const finalResult = await doThirdThing(newResult)
        console.log(`Got final result: $(finalResult)`)
    } catch(error) {
        failureCallback(error)
    }
}
```

### 对旧的函数使用promise封装.
```
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
wait(10000).then(() => saySomething('10 seconds')).catch(failureCallback)
```

### 组合
`Promise.resolve()`, `Promise.reject()`是手动创建promise的快捷方法.

`Promise.all()`, `Promise.race()`

1. 并行操作，然后等多个操作全部结束:
```
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
```
可以使用一些:
```
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve()).then(result3 => {})
```
调用一个由异步函数组成的数组时，相当于:
`Promise.resolve().then(func1).then(func2).then(func3)`

ECMA2017: 时序组合可以通过使用async/await
let result;
for (const f of [func1, func2, func3]) {
    result = await f(result);
}

## examples1
### delay 1S

使用promise来wrap
```
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

delay(1000).then(() => console.log('ran after 1 second1 passed'));
```

或者:
```
async function test() {
  console.log('start timer');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('after 1 second');
}

test();
```

使用async await语法糖.
```
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function test() {
  console.log('start timer');
  await delay(1000);
  console.log('after 1 second');
}
test()
```

## async
- async+await可以用更简洁的方式写出基于Promise的异步行为
- async函数可以作为表达式来定义
