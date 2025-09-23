// what is the output of the following code? and explain why?

// 1
//The console prints out 55555 after 1 sec because the i inside the setTimeout callback references the variable itself
// and not the value of i. Since i is declare as var,  all the callbacks share the same i so
// by the time the callbacks run, the loop has finished, and i has been incremented to 5.
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}

// 2
// The console prints out 01234 after 1 sec because i is declared with let which is block scope and
//every time in the loop we get a new i that remember its value because of the setTimeout function that uses closures
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}

// 3
//The output is 01234 after 1 sec because here we are passing i to the IIFE function which receives an unique i
//each time that we passed it from the loop. IIFE function creates a new function scope and copies the current value of i into the function parameter and since the i is unique in each iteration, it doesn't change afterward.
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 1000);
  })(i);
}

// 4
//The console will print "I am another fn" after 1 sec because the fn that is being called in the setTimeout
// has a refence of fn and not the snapshot of its code, so when we reassign fn before the timer expired, the original fn is alterated.
let fn = () => {
  console.log("I am fn");
};
setTimeout(fn, 1000);
fn = () => {
  console.log("I am another fn");
};

// 5
// The console will print "another" after 1 sec because objects are passed by reference so when setTimeout calls obj it takes the reference of obj and not a snapshot of its value, so when we modify obj, it gets updated.
let obj = {
  name: "obj",
};
setTimeout(() => console.log(obj), 1000);
obj.name = "another obj";
