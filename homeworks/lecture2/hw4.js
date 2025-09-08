// Below are some JavaScript scope related questions.

// 1. When executed, what value will be output?
function f() {
  var a = 10;
  if (a > 5) {
    a = 7;
  }
  console.log(a);
}
// 7
// a is defined inside the function. It is accessible in the if
// block and modified.

// 2. When executed, what value will be output?
function f() {
  if (true) {
    var a = 5;
  }
  console.log(a);
}
// 5
// var has function scope, it is accessible in the whole function
// even defined in a block.

// 3. When executed, what value will be output?
function f() {
  a = 3;
}
f();
console.log(a);
// 3
// variables defined without 'var', 'const' or 'let' has global
// scope.

// 4.
var a = 5;
function first() {
  a = 6;
}

function second() {
  console.log(a);
}
first();
second();
// 6
// a has global scope and it is modified in first(). second()
// prints the updated value.

// 5.
var a = 5;
function f() {
  var a = 7;
  console.log(a);
}
// 7
// Variables with the same name are considered according to
// their scopes. It is called shadowing. The variable with
// more local scope is considered first.

// 6.
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
// 1
// Inside b(), function a() is hoisted to the top of b()
// scope. The inner function has a function scope. This
// keeps true after doing a = 10;. When reading a from
// outside b(), only global variable a of value 1 can be
// read.
