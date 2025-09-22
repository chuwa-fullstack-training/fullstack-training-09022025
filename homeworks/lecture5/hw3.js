// what is the output in order? and explain why?

// 1
console.log('a');
setTimeout(() => console.log('b'), 0);
console.log('c');
new Promise((resolve, reject) => {
  resolve('d');
  console.log('e');
  reject('f');
}).then(result => console.log(result));

// Output: a c e d b
// Sync (main thread): a, c, e
// Microtask (Promise.then): d
// Macrotask (setTimeout 0): b

// 2
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve('success');
  });

fn().then(res => {
  console.log(res);
});

console.log('start');

// Output: 1 start success
// Sync (main thread): 1 start
// Microtask (Promise.then): success
// Promise executor runs synchronously; .then callbacks run as microtasks.