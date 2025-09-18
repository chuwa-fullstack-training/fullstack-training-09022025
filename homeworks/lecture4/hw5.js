// write a function to deep clone an object with circular reference
//
// const data = {
//     name: 'foo',
//     child: null
// }
// data.child = data;

const cloneDeepWithLoop = (obj) => {
    let deepCopy = {};
    for (let property in obj) {
        if (obj[property] !== obj) {
            // Properties without circular reference
            deepCopy[property] = obj[property];
        } else {
            // Properties with circular reference
            deepCopy[property] = deepCopy;
        }
    }
    return deepCopy;
};

const data = {
    name: "foo",
    child: null,
};
data.child = data;

console.log(data.child === data); // true
const deepCopy = cloneDeepWithLoop(data);
console.log(deepCopy === data); // false
console.log(deepCopy.child === deepCopy); // true
