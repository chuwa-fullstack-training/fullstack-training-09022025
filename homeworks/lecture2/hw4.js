// Below are some JavaScript scope related questions.

// 1. When executed, what value will be output?
// nothing will print out unless we call the function f() then we get 7 which is the value of a
function f() {
  var a = 10;
  if (a > 5) {
    a = 7;
  }
  console.log(a);
}

// 2. When executed, what value will be output?
// same as above, nothing will print out unless we call f() then we get 5 which is the value of a
function f() {
  if (true) {
    var a = 5;
  }
  console.log(a);
}

// 3. When executed, what value will be output?
// 3
function f() {
  a = 3;
}
f();
console.log(a);

// 4.
// 6
var a = 5;
function first() {
  a = 6;
}

function second() {
  console.log(a);
}
first();
second();

// 5.
// nothing will print out unless we call the function f() then we get 7 which is the value of a
var a = 5;
function f() {
  var a = 7;
  console.log(a);
}

// 6.
// 1
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
