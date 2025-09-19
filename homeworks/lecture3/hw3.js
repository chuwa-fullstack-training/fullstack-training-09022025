function counter() {
    // implement here
    let total = 0
    return function(x) {
        if (arguments.length > 0) {
            total += x
        }
        return total
    }
}

let count = counter();
console.log(count(3));  // Output: 3
console.log(count(5));  // Output: 8 (3 + 5)
console.log(count());   // Output: 8

// Explanation:
// The returned function forms a closure, so it can access and modify the variable total even after counter() has finished executing.