// what is the output in order? and explain why?

// 1
// a c e d b because of the Synchronous code > microtask > macrotask
//I have classified them below with comments.
console.log("a"); // synchronous code that executes immediately
setTimeout(() => console.log("b"), 0); // macrotask
console.log("c"); // synchronous code
new Promise((resolve, reject) => {
  //code here are executed synchronously too
  resolve("d"); // schedule microtask
  console.log("e"); // microtask but prints first inside here
  reject("f"); //microtask, wont print if we resolve the promise
}).then((result) => console.log(result)); // microtask

// 2
// 1 start success
//we first define fn, when we called it, it executes the promise and prints out 1, the promise then schedule the resolve, while it is an asynchronous operation, we first execute start and then success.
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });

fn().then((res) => {
  console.log(res);
});

console.log("start");
