//test then
new Promise((resolve, reject) => {
    console.log('初始化')
    //resolve('resolved!')
    reject('rejected!')
}).then((result) => {console.log('on Fullfiled: ', result)}, (result) => {console.log('onRejected: ', result)})