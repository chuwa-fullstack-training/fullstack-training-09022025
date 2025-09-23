// what is the output? and explain why?

// 1
//1 2
Promise.resolve(1) //create a promise with value of 1
  .then((res) => {
    console.log(res); //prints 1
    return 2;
  })
  .catch((err) => {
    //execute only if the promise was rejected
    return 3; //skipped
  })
  .then((res) => {
    console.log(res); // prints 2 which is returned from previous then()
  });

// 2
// 1 3
Promise.reject(1)
  .then((res) => {
    console.log(res); //skipped because the Promise was rejected
    return 2; //skipped
  })
  .catch((err) => {
    console.log(err); //prints 1
    return 3; //return 3 to then()
  })
  .then((res) => {
    console.log(res); //prints 3
  });

//3
// Error: 2 because promise.all() waits for all the promises to resolve but if any one of them is rejected,
// it immediately rejects and the rest are ignored.
// At 1s: runAsync(1) and runAsync(3) both resolve (but we won't see the result yet, because Promise.all hasn't resolved).
//At 2s: runReject(2) rejects with "Error: 2" this is the first rejection, so Promise.all immediately rejects here.
//runReject(4) would reject later at 4s, but it doesn’t matter  because the Promise chain is already in a rejected state.
function runAsync(x) {
  const p = new Promise((resolve) => setTimeout(() => resolve(x), 1000));
  return p;
}

function runReject(x) {
  const p = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Error: ${x}`), 1000 * x)
  );
  return p;
}

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
