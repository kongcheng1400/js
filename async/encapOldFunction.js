const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
wait(10000).then(() => console.log('resolved and 10 seconds timeout')).catch((error) => {console.log('Catched error: ', error)})

