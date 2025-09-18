// Hoisting

// 1.
var x;

if (x !== 3) {
  console.log(y);
  var y = 5;
  if (y === 5) {
    var x = 3;
  }
  console.log(y);
}
if (x === 3) {
  console.log(y);
}

// -> undefined
// -> 5
// -> 5

// All var declarations are hoisted to the top of the function/global scope. 
// Both x and y are declared but not initialized at the beginning, so the first log prints `undefined`.
// Then y is assigned to 5 and x is assigned to 3, so the next two logs print 5.

// Hoisted form:
// var x;
// var y;
// if (x !== 3) {
//   console.log(y); // undefined
//   y = 5;
//   if (y === 5) {
//     x = 3;
//   }
//   console.log(y); // 5
// }
// if (x === 3) {
//   console.log(y); // 5
// }

// 2.
var x2 = 3;
if (x2 === 3) {
  var x2 = 2;
  console.log(x2);
}
console.log(x2);

// -> 2
// -> 2

// Since var is function-scoped, the declaration inside if does not create a new local variable.
// It reassigns the same x2 in the global scope. So both logs prints 2.

// Hoisted form
// var x2;
// x2 = 3;
// if (x2 === 3) {
//   x2 = 2;
//   console.log(x2); // 2
// }
// console.log(x2); // 2