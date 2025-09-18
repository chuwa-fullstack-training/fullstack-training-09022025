/*
* Copy the enumerable properties of p to o, and return o.
* If o and p have a property by the same name, o's property is overwritten.
* This function does not handle getters and setters or copy attributes.
*/
function extend(o, p) {
    // implement your code here
    o = Object.assign(o, p)
    return o
}

/*
* Return a new object that holds the properties of both o and p.
* If o and p have properties by the same name, the values from o are used.
*/
function union(o, p) {
    // implement your code here
    return {...p, ...o}
    // 或者写成 return Object.assign({}, p, o)
}

/*
* Remove properties from o if there is not a property with the same name in p.
* Return o.
*/
function restrict(o, p) {
    // implement your code here
    Object.keys(o).forEach((key) => {
        if (!(key in p)) delete o[key]
    }) 
    return o
}

/*
* Return a new object that holds only the properties of o that also appear
* in p. This is something like the intersection of o and p, but the values of
* the properties in p are discarded
*/
function intersection(o, p) {
    // implement your code here
    return Object.fromEntries(
        Object.entries(o).filter(([key]) => key in p)
    )
}

// Test
const assert = require("assert")
let o = {a: 1, b: 2, c: 3}
let p = {a: 5, d: 7}

assert.deepStrictEqual(extend({...o}, p), {a: 5, b: 2, c: 3, d: 7})
assert.deepStrictEqual(union(o, p), {a: 1, b: 2, c: 3, d: 7})
assert.deepStrictEqual(restrict({...o}, p), {a: 1})
assert.deepStrictEqual(intersection(o, p), {a: 1})

console.log("All tests passed 🎉")

// Takeaways:
// Object.assign(target, ...sources) → 浅拷贝，后者覆盖前者。
// Object.entries(obj) → 返回 [key, value] 的数组。
// Object.fromEntries(arr) → [key, value] 数组转对象。
// 展开运算符 {...obj} → 简洁的拷贝 / 合并写法。
// Object.keys(obj) → 只取对象自身的可枚举属性（不会拿到原型链的）。
// strictEqual → 比较值或引用（跟 === 一样）。
// deepStrictEqual → 比较值，数组/对象会递归比较里面的内容。
// delete obj.key 只能删掉对象的自有属性，不能删掉继承的属性。