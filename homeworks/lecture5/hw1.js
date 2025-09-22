// what is the output of the following code? and explain why?

// 1
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 5 5 5 5 5
// Explanation: var is function-scoped, so all callbacks share the same i.
// The loop finishes and set i to 5 before the callbacks are taken from the task queue. So each log prints 5.

// 2
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 0 1 2 3 4
// Explanation: let is block-scoped, so each iteration of the loop creates a new i.
// When the callbacks are taken from the task queue after the timeout execution, they print 0 through 4.

// 3
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 1000);
  })(i);
}
// Output: 0 1 2 3 4
// Explanation: Each iteration immediately invokes a function (IIFE) that captures the current value of i as its own parameter, so each callback closes over a different i, resulting in 0 1 2 3 4.

// 4
let fn = () => {
  console.log('I am fn');
}
setTimeout(fn, 1000);
fn = () => {
  console.log('I am another fn');
}
// Output: I am fn
// Explanation: when the function is passed into setTimeout, it keeps a reference to that original function block. 
// Even if we later change the fn variable to point to a new function block, the timer will still call the original function it captured at the start.

// 5
let obj = {
  name: 'obj',
}
setTimeout(() => console.log(obj), 1000);
obj.name = 'another obj';
// Output: another obj
// Explanation: Since the obj is passed by reference, the timer will log the updated values even if the object’s properties is changed after passing it to setTimeout.