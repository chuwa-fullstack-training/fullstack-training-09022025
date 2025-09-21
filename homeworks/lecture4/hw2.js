// ONLY use map, filter, reduce to solve the following problems:

// 1. Given an array of numbers, return an array of numbers that are doubled.

// 2. Given an array of numbers, return an array of numbers that are even.

// 3. Reverse the string: "Hello World" -> "dlroW olleH"

/**
 * 4. Flatten the array of arrays to a single array:
 * Example 1:
 * const arr = [[0, 1], [2, 3], [4, 5]];
 * Expected output: [0, 1, 2, 3, 4, 5]
 * Example 2:
 * const arr = [[0, 1], [2, 3], [4, [5, 6]]];
 * Expected output: [0, 1, 2, 3, 4, 5, 6]
 */

const arr = [1, 2, 3, 6, 7, 8]

const res1 = arr.map(num => num * 2)
console.log(res1)

const res2 = arr.filter(num => num % 2 == 0)
console.log(res2)

const str = "Hello World"
const res3 = [...str].reduce((acc, ch) => ch + acc, "")
console.log(res3)

// recursion
const flatten_recursion = arr =>
    arr.reduce((acc, curr) => 
        acc.concat(Array.isArray(curr) ? flatten_recursion(curr) : curr)
    , [])

// iteration
const flatten_iterative = arr => {
    const stack = [...arr]
    const result = []
    while (stack.length) {
        const curr = stack.pop()
        if (Array.isArray(curr)) stack.push(...curr)
        else result.push(curr)
    }
    return result.reverse()
}

console.log(flatten_recursion([[0, 1], [2, 3], [4, [5, 6]]]))
console.log(flatten_iterative([[0, 1], [2, 3], [4, [5, 6]]]))