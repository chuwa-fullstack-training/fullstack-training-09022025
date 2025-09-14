/*写一个closure函数， 记住之前的和
调用counter()返回一个函数
每传入一个数字，就把他加上之前的总和，返回结果
如果没有传入任何数字，就返回当前总和

*/

//closure: an internal function + external variable within the internal function and existed in the environment of external function
/*条件：
  1.external function里的变量
  2.这个变量需要也在 internal function里
  3.即使external function被执行完了，external环境里的variable也不会随之销毁，因为仍在被internal function使用，所以会被保留

*/

function counter() {
  // initialize a variable total
  let total = 0;
    //返回一个内部函数 function(n), 如果 n 是number，加到total；如果不是直接return
    //注：这里并没有返回total本身，而是先return了function(n)这个函数，把他作为返回值给到外面
    return function(n){
      if(typeof n === "number"){ //typeof 对应的所有都是字符串
        total += n;
      }
      return total;
    }
}

let count = counter(); // Step1: 调用counter()函数，结果是variable count 保存着这个内部函数，由于需要total，所以也会把total打包,闭包保存(total = 0)
                       // Step2: 执行count(3),也就是function(n)
console.log(count(3));  // Output: 3
console.log(count(5));  // Output: 8 (3 + 5)
console.log(count());   // Output: 8