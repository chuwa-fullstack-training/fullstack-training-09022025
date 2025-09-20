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
    // implement here
    let password
    let isSet = false

    function setPassword (newPassword) {
        if (isSet) {
            throw new Error("Password has already been set!")
        }
        password = newPassword
        isSet = true
    }

    function checkPassword(str) {
        return str === password
    }

    return { setPassword, checkPassword }
}

// Test
const user = new User();

user.setPassword("123456");
console.log(user.checkPassword("123456")); // true
console.log(user.checkPassword("123"));    // false
console.log(user.password);                // undefined

try {
  user.setPassword("123"); // 第二次设置 → 抛错
} catch (e) {
  console.log("Error caught:", e.message);
}

console.log(user.checkPassword("123"));    // false
console.log(user.password);                // undefined