/** write a funciton to make the following code work
 * console.log(sum(2)(3) === 5)
 * console.log(sum(2, 3) === 5)
 */
function sum() {
    if (arguments.length === 2) {
        // sum(2, 3)
        return arguments[0] + arguments[1];
    } else if (arguments.length === 1) {
        // sum(2)(3)
        let first = arguments[0];
        return function (second) {
            return first + second;
        };
    }
}

console.log(sum(2)(3) === 5);
console.log(sum(2, 3) === 5);
