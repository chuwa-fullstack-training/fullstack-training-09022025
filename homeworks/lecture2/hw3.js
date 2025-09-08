// What would be the output of following code?
// Explain your answer.

console.log(0.1 + 0.2); //0.30000000000000004, JS 里所有数字（除了 BigInt）都用 IEEE 754 双精度浮点数（64 位）, 0.1 和 0.2 在二进制里是无限小数，需要截断

console.log(0.1 + 0.2 == 0.3); //False 0.3在js里其实也不是0.3，但是无限接近0.3，但无论如何都不等于0.1 + 0.2

console.log(1 +  "2" + "2"); //"122", 如果两者相加中有string，则都转成string

console.log(1 +  +"2" + "2");//"32" /1 +  +"2"就是把"2"转成了number 2, 得到number 3 + “2” = “32”

console.log(1 +  -"1" + "2");//“02”，不是“2”，因为JS里每一步运算结果都是新的值，不会自动“消失”， 而 1 + (-1) 的结果就是 0，它是一个合法的值，必须传递给下一步。JS 不会因为“看起来没意义”就丢掉它

console.log(+"1" +  "1" + "2");//“112”

console.log( "A" - "B" + "2");// NaN2 - 只能做数值减法，不会做字符串运算，JS 会尝试把 "A" 和 "B" 转换成 数字（Number("A")、Number("B")），再做减法， 但是 "A"、"B" 并不是有效的数字字符串，转换结果都是 NaN，字符串拼接 → "NaN2"

console.log( "A" - "B" + 2); // NaN，"A" - "B" → NaN，再加上数字 2

console.log("0 || 1 = "+(0 || 1)); // "0 || 1 = 1" , 0 || 1 = true，所以是1，前面都是string, 默认conversion to string

console.log("1 || 2 = "+(1 || 2)); // "1 || 2 = 1" ，1 是truthy, 默认碰到第一个truthy就停，不看后面的数， || 逻辑：返回第一个 truthy 的值。

console.log("0 && 1 = "+(0 && 1)); // "0 && 1 =  0 "

console.log("1 && 2 = "+(1 && 2)); // "1 && 2 = 2 " && 逻辑： 只在两个值都 truthy 时返回后一个值，否则返回第一个 falsy 值。

console.log(false == '0') // True, 宽松转换， false和string 0 都会被转成 数字0 

console.log(false === '0') //False， false是boolean，不能跟string 0 相比较
