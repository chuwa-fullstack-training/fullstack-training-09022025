/** implement Singleton pattern in both ES5 and ES6
 * https://en.wikipedia.org/wiki/Singleton_pattern
 * 
 * Example:
 * const instance1 = new Singleton();
 * const instance2 = new Singleton();
 * console.log(instance1 === instance2); // Output: true
 */

// your code here

// ES5
function SingletonES5() {
    if (SingletonES5._instance) {
        return SingletonES5._instance
    } 
    SingletonES5._instance = this
}

// ES6
class SingletonES6 {
    constructor() {
        if (SingletonES6._instance) {
            return SingletonES6._instance
        }
        SingletonES6._instance = this
    }
}

const a = new SingletonES5();
const b = new SingletonES5();
console.log(a === b); // true

const x = new SingletonES6();
const y = new SingletonES6();
console.log(x === y); // true