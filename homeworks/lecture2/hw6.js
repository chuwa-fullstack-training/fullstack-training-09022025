// Algorithms

// 1. Write a function that returns the largest element in a list.
function largestElement(list) {
    // corner case: empty list
    if(list.length === 0){
      return undefined;
    }
    let max = list[0];
    for(let i = 1;i<list.length;i++ ){ //这里一定要用let, let 会把变量 限制在 for 循环的作用域里（块级作用域）
      if(max<list[i]){
        max = list[i];
      }
    }
    return max;
}
/*
这里如果你没用 let/var/const 声明，JS 会认为：
如果是非严格模式：自动把 i 变成一个 全局变量（污染全局作用域）
如果是严格模式：直接报错 ReferenceError: i is not defined

var 没有块级作用域，只有 函数作用域 或 全局作用域。
所以在 for 里面写 var i = 0，这个 i 并不是循环私有的，而是整个函数（或者全局）里共享的一个变量。
*/

// 2. Write function that reverses a list, preferably in place.
function reverseList(list) {
    if(list.length === 1){
      return list;
    }
    let left = 0;
    let right = list.length - 1;
    while(left < right){
      let temp = left;
      list[left] = list[right];
      list[right] = temp;
    }
    return list;

}

// 3. Write a function that checks whether an element occurs at least twice in a list.
function checkTwice(list, element) {
    let count = 0;
    for(let i = 0;i<list.length;i++){
      if(list[i] === element){
        count ++;
        if(count >= 2){
        return true;
        }
      }
      
    }
    return false;
  
}