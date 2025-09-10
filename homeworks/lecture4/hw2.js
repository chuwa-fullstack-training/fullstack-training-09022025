// ONLY use map, filter, reduce to solve the following problems:

// 1. Given an array of numbers, return an array of numbers that are doubled.
const double = (arr) => arr.map((num) => num * 2);

// 2. Given an array of numbers, return an array of numbers that are even.
const evenNumbers = (arr) => arr.filter((num) => num % 2 === 1);

// 3. Reverse the string: "Hello World" -> "dlroW olleH"
const reversedStr = (arr) => arr.split("").reduce((acc, cur) => cur + acc, "");

/**
 * 4. Flatten the array of arrays to a single array:
 * Example 1:
 * const arr = [[0, 1], [2, 3], [4, 5]];
 * Expected output: [0, 1, 2, 3, 4, 5]
 * Example 2:
 * const arr = [[0, 1], [2, 3], [4, [5, 6]]];
 * Expected output: [0, 1, 2, 3, 4, 5, 6]
 */

const flatten = (arr) =>
  // reduce + recursion
  arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  );
