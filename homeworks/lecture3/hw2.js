/** write a function to make the following code work
 * console.log(sum(2)(3) === 5)
 * console.log(sum(2, 3) === 5)
 */

//考察点：currying？
function sum() {
    if (arguments.length === 2) {
    // 情况1：直接传两个参数
    return arguments[0] + arguments[1];
  } else if (arguments.length === 1) {
    // 情况2：只传一个参数，返回一个函数
    var first = arguments[0]; // 一定要放在function之外，才会记住2这个值，不然就是arg[0]，不知道具体数值；
    return function(b) {
      return first + b;
    };
  }
}
console.log(sum(2)(3) === 5); // sum(2)是一个不知名函数，3是sum(2)的参数
console.log(sum(2, 3) === 5);