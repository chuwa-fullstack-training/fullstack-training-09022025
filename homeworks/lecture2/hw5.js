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
// undefined 5 5
// The first log outputs undefined because y is not defined
// at this time and there is no hoisting. The second one works
// fine because y has been defined. The third log is triggered
// because it is assigned in the if block. x in this block has
// global scope.

// 2.
var x = 3;
if (x === 3) {
  var x = 2;
  console.log(x);
}
console.log(x);

// 2 2
// Two x variable both have global scope. Both log will read the
// x which is defined later, which has a value of 2.
