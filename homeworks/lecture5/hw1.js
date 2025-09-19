// what is the output of the following code? and explain why?

// 1
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 1000);
}
// 5 5 5 5 5
// Var has a function scope, which means there will be only one binding
// during the whole loop iterations. Every setTimeout will access the
// final value of var i after the loop ends.

// 2
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 1000);
}
// 0 1 2 3 4
// Let has a block scope, so we will have a new binding for each iteration
// in for loop. Each setTimeout will get a new variable i.

// 3
for (var i = 0; i < 5; i++) {
    (function (i) {
        setTimeout(() => console.log(i), 1000);
    })(i);
}
// 0 1 2 3 4
// Using IIFE will create a different function for each loop. This makes var
// also works properly as let in question 2.

// 4
let fn = () => {
    console.log("I am fn");
};
setTimeout(fn, 1000);
fn = () => {
    console.log("I am another fn");
};
// I am fn
// The content of setTimeout will be fixed after the call of it. It can only be
// changed by doing clearTimeout and using a new setTimeout.

// 5
let obj = {
    name: "obj",
};
setTimeout(() => console.log(obj), 1000);
obj.name = "another obj";
// { name: 'another obj' }
// The content of setTimeout is fixed to printing the variable obj, but the
// content is not fixed. "obj.name = 'another obj';", as a synchronous action
// is done before the "console.log(obj)" is executed so the name property is
// changed.
