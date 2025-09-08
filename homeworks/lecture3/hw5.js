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
  // 私有变量，外面无法直接访问
  let password;

  // 设置密码
  this.setPassword = function (newPassword) {
    if (typeof newPassword !== "string" || newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    password = newPassword;
  };

  // check
  this.checkPassword = function (tryPassword) {
    return password === tryPassword;
  };
}

//test
const user = new User();

user.setPassword('123456');
console.log(user.checkPassword('123456')); // true
console.log(user.checkPassword('123'));    // false
console.log(user.password);                // undefined
console.log(user.checkPassword('123'));    // false
console.log(user.password);     