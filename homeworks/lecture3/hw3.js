function counter() {
    let sum = 0;
    return function (i) {
        // Return a function so that the sum will be stored in it
        if (arguments.length === 1) {
            sum += i; // Add the value if provided
        }
        return sum; // Return the original value if not provided
    };
}

let count = counter();
console.log(count(3)); // Output: 3
console.log(count(5)); // Output: 8 (3 + 5)
console.log(count()); // Output: 8
