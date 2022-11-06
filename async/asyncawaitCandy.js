
//使用语法糖
console.log('\nusing the async/await candy:')
async function foo() {
    try {
        console.log('初始化')
        const result = await (() => { return '初始化完成' })()
        const newResult = await ((result) => { console.log(result); return '第一次执行完成' })(result)
        //throw error:
        throw new Error('something wrong!')
        const finalResult = await ((result) => { console.log(result); return '最终执行完成' })(newResult)
        console.log(`Got the final result: ${finalResult}`)
    } catch (error) {
        console.log('error catched: ', error)
    }
}
foo()