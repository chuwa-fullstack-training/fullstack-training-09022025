// ONLY use map, filter, reduce to solve the following problems:

// 1. Given an array of numbers, return an array of numbers that are doubled.
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(function (num) {
    return num * 2;
});
console.log(doubledNumbers);

// 2. Given an array of numbers, return an array of numbers that are even.
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers);

// 3. Reverse the string: "Hello World" -> "dlroW olleH"
const string = "Hello World";
const reversedString = string.split("").reduce(function (accumulator, value) {
    return value + accumulator;
}, "");
console.log(reversedString);

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
    arr.reduce((accumulator, value) => {
        if (value instanceof Array) {
            return accumulator.concat(flatten(value));
        } else {
            accumulator.push(value);
            return accumulator;
        }
    }, []);

const arr1 = [
    [0, 1],
    [2, 3],
    [4, 5],
];
console.log(flatten(arr1));
const arr2 = [
    [0, 1],
    [2, 3],
    [4, [5, 6]],
];
console.log(flatten(arr2));
