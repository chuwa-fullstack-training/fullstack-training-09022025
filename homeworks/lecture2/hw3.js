// What would be the output of following code?
// Explain your answer.

console.log(0.1 + 0.2); // 0.30000000000000004 floating point precision, 0.1 and 0.2 cannot be represented exactly in binary

console.log(0.1 + 0.2 == 0.3); //false because it actually equals to 0.30000000000000004

console.log(1 + "2" + "2"); //"122" typw coercion and string concatenation

console.log(1 + +"2" + "2"); //"32" we can convert a string into number by placing + in front so 1 + 2 = 3 and 3 + "2" is "32"

console.log(1 + -"1" + "2"); // "02" by placing - infront of a string, we are converting it into a negative number so 1 + (-1) = 0, 0 + "2" is "02"

console.log(+"1" + "1" + "2"); //"112" string concatentation

console.log("A" - "B" + "2"); // NaN, A and B are non numeric strings

console.log("A" - "B" + 2); // NaN, A and B are non numeric strings

console.log("0 || 1 = " + (0 || 1)); // (0 || 1) returns the first true value which in this case is 1, so by applying the string concatenation we get "0 || 1 = 1"

console.log("1 || 2 = " + (1 || 2)); //"1 || 2 = 1"

console.log("0 && 1 = " + (0 && 1)); // "0 && 1 = 0"

console.log("1 && 2 = " + (1 && 2)); // "0 && 1 = 1"

console.log(false == "0"); //true type coercion

console.log(false === "0"); //false not type coercion
