// What would be the output of following code?
// Explain your answer.

console.log(0.1 + 0.2);
// slightly different to 0.3 (binary floating-point rounding)

console.log(0.1 + 0.2 == 0.3);
// -> false  (tiny rounding error prevents exact equality)

console.log(1 +  "2" + "2");
// -> "122" (string concatenation)

console.log(1 +  +"2" + "2");
// unary plus converts "2" to number 2
// addition: 1 + 2 becomes 3
// string concatenation to "32" 

console.log(1 +  -"1" + "2");
// unary minus converts "1" to number 1
// addition: 1 + (-1) is 0
// string concatenation to "02" 

console.log(+"1" +  "1" + "2");
// unary plus converts "1" to number 1
// string concatenation to "112"

console.log( "A" - "B" + "2");
// binary minus convert both "A" and "B" to NaN
// NaN - NaN becomes NaN
// string concatenation to "NaN2"

console.log( "A" - "B" + 2);
// binary minus convert both "A" and "B" to NaN
// NaN - NaN becomes NaN
// NaN + anything is NaN

console.log("0 || 1 = "+(0 || 1));
// 0 || 1 is 1, since || returns the first truthy value, or it returns the last falsy one if all values are falsy.
// string concatenation to "0 || 1 = 1"

console.log("1 || 2 = "+(1 || 2));
// 1 || 2 is 1, since || returns the first truthy value
// string concatenation to "1 || 2 = 1"

console.log("0 && 1 = "+(0 && 1));
// 0 && 1 is 0, since && returns the first falsy value, or it returns the last truthy value if all values are truthy.
// string concatenation to "0 && 1 = 0"

console.log("1 && 2 = "+(1 && 2));
// 1 && 2 is 2, since && returns the first falsy value, or it returns the last truthy value if all values are truthy.
// string concatenation to "1 && 2 = 2"

console.log(false == '0')
// -> true
// Type coercion: JS will try to convert both to numbers when comparing a boolean with a string,
// so false becomes 0 and '0' becomes 0.

console.log(false === '0')
// -> false
// Since === does no type coercion, both the value and the type must be the same.
