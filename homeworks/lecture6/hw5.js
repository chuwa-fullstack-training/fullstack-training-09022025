// 1. use `promise` to print 1, 2, 3 in every 1 second
function print() {
  // your code here
  new Promise((resolve) => setTimeout(resolve, 1000))
    .then(() => {
      console.log(1);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    })
    .then(() => {
      console.log(2);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    })
    .then(() => {
      console.log(3);
    });
}

// improved: print every single numbers in a list in every 1 second
// hint: `reduce`
const nums = [3, 1, 6, 9, 2];

function printList() {
  // your code here
  nums.reduce((promise, num) => {
    return promise.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(num);
          resolve();
        }, 1000);
      });
    });
  }, Promise.resolve());
}

// 2. traffic light
// output: red -> green -> yellow -> red -> ...
// the delay time is up to you, but the order has to be correct
async function trafficLight() {
  // your code here
  while (true) {
    console.log("Red");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Green");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Yellow");
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
}

trafficLight();
