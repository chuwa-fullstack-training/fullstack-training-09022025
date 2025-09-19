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

    function setPassword (newPassword) {
        if (newPassword.length < 6) {
            throw new Error("The length of the new password must be at least 6!")
        }
        password = newPassword
    }

    function checkPassword(str) {
        return str === password
    }

    return { setPassword, checkPassword }
}

const assert = require("assert");

const user = new User();

// 设置密码成功
user.setPassword("123456");
assert.strictEqual(user.checkPassword("123456"), true);
assert.strictEqual(user.checkPassword("123"), false);
assert.strictEqual(user.password, undefined);

// 设置非法密码（< 6）
try {
  user.setPassword("123");
  assert.fail("Expected an error for short password"); // 不该到这里
} catch (e) {
  assert.ok(e instanceof Error);
}

// 再次确认密码没被改掉
assert.strictEqual(user.checkPassword("123"), false);
assert.strictEqual(user.password, undefined);

console.log("All test cases passed ✅");