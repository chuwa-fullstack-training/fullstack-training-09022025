/** Implement a User class with a private variable #password (Use closure, not # syntax).
 * The class should have methods to setPassword and checkPassword.
 *
 * Example:
 * const user = new User();
 * user.setPassword('123456');
 * user.checkPassword('123456'); // true
 * user.checkPassword('123'); // false
 * user.password; // undefined
 * user.setPassword('123'); // Error
 * user.checkPassword('123'); // false
 * user.password; // undefined
 */
function User() {
    let password;

    this.setPassword = function (input) {
        if (typeof input !== "string") {
            throw new Error("Please input string as password.");
        }
        if (input.length < 6) {
            throw new Error("Please input at least 6 characters as password.");
        }
        password = input;
    };

    this.checkPassword = function (input) {
        return password === input;
    };
}

const user = new User();
user.setPassword("123456");
console.log(user.checkPassword("123456")); // true
console.log(user.checkPassword("123")); // false
console.log(user.password); // undefined
user.setPassword("123"); // Error
console.log(user.checkPassword("123")); // false
console.log(user.password); // undefined
