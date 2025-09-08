// Hoisting

// 1.
var x; // 声明 x，初始化为 undefined
// hoisting: var y;   // 声明 y，初始化为 undefined

if (x !== 3) { //undefined !== 3 → true，进入
  console.log(y); //y 还没赋值，所以是 undefined
  var y = 5;
  if (y === 5) {
    var x = 3;
  }
  console.log(y);// 5
}
if (x === 3) {
  console.log(y);// 5
}


// 2.
var x = 3;
if (x === 3) { 
  var x = 2;
  console.log(x); // 2
}
console.log(x); //2

