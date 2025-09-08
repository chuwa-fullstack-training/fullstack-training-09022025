// Below are some JavaScript scope related questions.
/*
在 JavaScript 里，「全局」指的是：
  最外层作用域（不是写在函数或块里）
  在这里定义的东西可以被所有代码访问
在不同环境下，全局对象不同：
  浏览器：全局对象是 window
  Node.js：全局对象是 global
  现代规范里：统一叫 globalThis
不管a的值有没有改变，只要他是在外层被定义，就永远是全局变量
*/

// 1. When executed, what value will be output? //7
function f() {
  var a = 10;
  if (a > 5) {
    a = 7;
  }
  console.log(a);
}

// 2. When executed, what value will be output? // 5
// if (true) 在任何情况下都成立，所以里面的代码总会执行。
// if true之前hoisting了一个  var a
function f() {
  if (true) {
    var a = 5;
  }
  console.log(a);
}

// 3. When executed, what value will be output? // 3
// 非严格模式下，未声明直接赋值会创建/写入全局变量 a(window.a 但不是var)
// 注：在 "use strict" 下，这里会抛 ReferenceError,除非写上：显式写上 var/let/const
/* 这里 f 是一个函数对象，f() 表示调用这个函数。
  小括号 () 代表执行。
  如果函数有参数，比如 function f(x) { ... }，调用时要写成 f(10)。
  如果没写括号，只写 f，那只是引用函数本身，不会执行
*/
  function f() {
  a = 3;
}
f();
console.log(a);

// 4. //6
var a = 5;
function first() {
  a = 6;
}

function second() {
  console.log(a);
}
first();
second();

// 5. //7
// 函数内的 var a 遮蔽了外部的 a，打印的是局部变量 7（与外部 a=5 无关
var a = 5;
function f() {
  var a = 7;
  console.log(a);
}

// 6. // 1
/* 当你调用 b() 之前，JS 引擎会先“编译/准备”函数体，把里面的函数声明先处理（叫提升/hoisting）
  function a() {} 虽然它写在 return 的后面，但它是声明，不是普通执行语句，会在进入函数时就被处理
  在 b 的局部作用域里，先创建了一个局部变量 a，并把它设为这个函数。

  function a() {}
  包含了两层含义：
    声明一个名字 a（就像 var a 一样，先占一个位置）。
    把一个函数对象赋值给它。
*/
var a = 1; 
function b() {
  a = 10; // 对“局部 a”赋值
  return; //return 直接结束 b，局部变量a 随之销毁
  function a() {}
}
b();
console.log(a);
