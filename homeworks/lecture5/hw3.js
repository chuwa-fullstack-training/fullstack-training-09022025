// what is the output in order? and explain why?

// 1
console.log("a");
setTimeout(() => console.log("b"), 0);
console.log("c");
new Promise((resolve, reject) => {
    resolve("d");
    console.log("e");
    reject("f");
}).then((result) => console.log(result));
// a c e d b
// During the process, synchronous actions a, c and e will be
// executed immediately, leaving the setTimeout and the promise.
// Promise is a microtask and has a higher priority, while
// setTimeout is a macrotask. Thus promise is done first. The
// "resolve('d');" is executed and the promise returns a fulfilled
// state, so the "reject('f');" is ignored. Then setTimeout is
// executed and printed b.

// 2
const fn = () =>
    new Promise((resolve, reject) => {
        console.log(1);
        resolve("success");
    });

fn().then((res) => {
    console.log(res);
});

console.log("start");
// 1 start success
// The "console.log(1);" is executed first as a synchronous action.
// The "start" line is executed later as a synchronous action and
// then the promise is executed. It returns resolve and the "success"
// is returned finally.
