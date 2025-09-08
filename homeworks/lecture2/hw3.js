// What would be the output of following code?
// Explain your answer.

console.log(0.1 + 0.2);
// 0.30000000000000004
// Repersenting floating point numbers in binary numbers will cause
// minor errors.

console.log(0.1 + 0.2 == 0.3);
// false
// The minor error caused by floating point number calculation will
// cause failure when doing percise comparation.

console.log(1 + "2" + "2");
// 122
// Type coercion, number 1 is converted into string "1" and string
// joining is done.

console.log(1 + +"2" + "2");
// 32
// + before a string will convert in into a number, so 1 +  +"2"
// results in number 3. Adding number 3 to string 2 will do
// string join and give string 32.

console.log(1 + -"1" + "2");
// 02
// - before a string will convert in into a number and change it
// into minus. It becomes 1 + (-1) + "2" and gives 02.

console.log(+"1" + "1" + "2");
// 112
// The first +"1" is converted into number 1, but it is added by 2
// strings so it is converted into string 1 again, resulting in 3
// strings joined.

console.log("A" - "B" + "2");
// NaN2
// Subtraction between non-number strings results in NaN. Adding NaN
// to string will convert it into string NaN.

console.log("A" - "B" + 2);
// NaN
// "A" - "B" results in NaN. Adding NaN to number still results in NaN.

console.log("0 || 1 = " + (0 || 1));
// 0 || 1 = 1
// When using || to numbers, it will return one of the operands.
// When the left one is truthy, it is returned. If the left one is
// falsy, the right one if returned.
// The left operand 0 is falsy, so the right operand 1 is returned.

console.log("1 || 2 = " + (1 || 2));
// 1 || 2 = 1
// The left operand 1 is truthy, so the left operand 1 is returned.

console.log("0 && 1 = " + (0 && 1));
// 0 && 1 = 0
// When using && to numbers, it will return one of the operands.
// It will evaluate operands from left to right. If a falsy value
// is found, it is returned. Otherwise, the last value is returned.
// 0 is falsy and it is returned.

console.log("1 && 2 = " + (1 && 2));
// 1 && 2 = 2
// Both operands are truthy and the last operand 2 is returned.

console.log(false == "0");
// true
// The are all falsy values and are considered equal when using ==.

console.log(false === "0");
// false
// They are not the same value when using === which also compares
// types.
