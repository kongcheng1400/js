new Promise((resolve, reject) => {
    console.log('初始化')
    resolve('初始化完成') //快速的产生resolved promise.
})
.then((result) => {
        console.log(result)
        throw new Error('something wrong')
        console.log('第一个执行')
})
/*
//出错先找链中第一个onReject callback
.then(null, (result) => {
    console.log(result + ' 第一个执行出错.') 
})
*/
//或者使用catch
.catch(error => {
        console.log('error catched: ', error)
})


