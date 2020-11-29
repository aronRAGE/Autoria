// const promise = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         let rand = Math.random()
//         if (rand > 0.5) {
//             resolve(rand)
//         } else {
//             reject('error, rand < 0.5')
//         }
//     }, 1000);
// })

// console.log(promise);

// promise
//     .finally(() => {
//         console.log('finally');
//         return 'final'
//     })
//     .then(result => {
//         console.log('success1', result);
//         return result
//     })
//     .catch(error => {
//         console.log('error1', error);
//         return error
//     })
//     .then(result =>{
//         console.log('success2', result);
//         return result
//     })
//     .catch(error => {
//         console.log('error2', error);
//          return error
//     })
    


//     Promise.reject('a')
//     .catch(p=>p+'b')
//     .catch(p=>p+'c')
//     .then(p=>p+'d')
//     .finally(p=>p+'e')
//     .then(p=>console.log(p))
