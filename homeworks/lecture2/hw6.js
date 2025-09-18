// Algorithms

// 1. Write a function that returns the largest element in a list.
function largestElement(list) {
    // implement your code here
    if (list.length === 0) return undefined;
    let res = list[0]
    for (let num of list) res = Math.max(res, num)
    return res
}

// 2. Write function that reverses a list, preferably in place.
function reverseList(list) {
    // implement your code here
    let i = 0, j = list.length - 1
    while (i < j) {
        [list[i], list[j]] = [list[j], list[i]]
        i++
        j--
    }
}

// 3. Write a function that checks whether an element occurs at least twice in a list.
function checkTwice(list, element) {
    // implement your code here
    let cnt = 0
    for (let num of list) {
        if (num === element) cnt++
    }
    return (cnt >= 2)
}


// Test
const assert = require("assert");

// 1. largestElement
assert.strictEqual(largestElement([1, 5, 3, 9, 2]), 9);
assert.strictEqual(largestElement([]), undefined);

// 2. reverseList
let arr1 = [1, 2, 3, 4];
reverseList(arr1);
assert.deepStrictEqual(arr1, [4, 3, 2, 1]);

let arr2 = ["a", "b", "c"];
reverseList(arr2);
assert.deepStrictEqual(arr2, ["c", "b", "a"]);

// 3. checkTwice
assert.strictEqual(checkTwice([1, 2, 3, 2], 2), true);
assert.strictEqual(checkTwice([1, 2, 3, 4], 2), false);
assert.strictEqual(checkTwice(["a", "b", "a"], "a"), true);
assert.strictEqual(checkTwice([true, false, true], true), true);

console.log("✅ All tests passed!");