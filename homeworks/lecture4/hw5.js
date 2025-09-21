// write a function to deep clone an object with circular reference
// 
// const data = {
//     name: 'foo',
//     child: null
// }
// data.child = data;

const cloneDeepWithLoop = (obj) => {
    // Implement the function here
    const memo = new WeakMap();
    const cloneRec = (node) => {
        if (typeof node !== "object" || node === null) return node
        if (memo.has(node)) return memo.get(node);

        const cloned = {}
        memo.set(node, cloned)

        for (const key of Object.keys(node)) {
            cloned[key] = cloneRec(node[key])
        }
        return cloned
    }
    return cloneRec(obj)
}

// Test
const assert = require("assert");

const data = { name: 'foo', child: null };
data.child = data;
const copy = cloneDeepWithLoop(data);

assert.notStrictEqual(copy, data);
assert.strictEqual(copy.name, 'foo');
assert.strictEqual(copy.child, copy);
assert.notStrictEqual(copy.child, data);

console.log("Test case passed!")