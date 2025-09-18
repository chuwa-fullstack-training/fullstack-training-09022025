// Below are some JavaScript scope related questions.

// 1. When executed, what value will be output?
function f1() {
  var a1 = 10;
  if (a1 > 5) {
    a1 = 7;
  }
  console.log(a1);
}
f1();
// -> 7
// var is function scope

// 2. When executed, what value will be output?
function f2() {
  if (true) {
    var a2 = 5;
  }
  console.log(a2);
}
f2();
// -> 5
// var is function scoped, same as:
// var a2;
// if (true) {
//   a2 = 5;
// }
// With let/const instead of var, this would throw ReferenceError.

// 3. When executed, what value will be output?
function f3() {
  a3 = 3;
}
f3();
console.log(a3);
// -> 3
// Because assignment without var/let/const creates a global variable in non-strict mode.
// In "use strict" mode, this would throw ReferenceError instead.

// 4.
var a4 = 5;
function first() {
  a4 = 6;
}

function second() {
  console.log(a4);
}
first();
second();
// -> 6
// a is declared with var in the global scope, it is accessible and mutable in both functions.
// a is reassigned to 6 when executing function first() and then printed out when executing second().

// 5.
var a5 = 5;
function f5() {
  var a5 = 7;
  console.log(a5);
}
f5()
// -> 7
// Inside f, the local variable `a` declared with var shadows the global `a`.
// This local `a` is independent of the global one.
// Global `a` remains 5 after calling f().

// 6.
var a6 = 1;
function b() {
  a6 = 10;
  return;
  function a6() {}  // function declaration is hoisted inside b()
}
b();
console.log(a6);
// -> 1
// -> Inside function b(), the inner function a() is hoisted, so 10 is reassigned to the local `a` instead of the global `a`.
// And the global `a` is always 1, and console.log prints 1.