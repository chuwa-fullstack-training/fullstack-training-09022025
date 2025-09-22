// what is the output? and explain why?

// 1
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  });

  // Output: 1 2
  // Explanation: Promise.resolve(1) gives 1 to the first .then, so it logs 1
  // The returned value 2 is passed to the next .then
  // No error occurs, so the .catch is skipped

// // 2
Promise.reject(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    console.log(err);
    return 3;
  })
  .then(res => {
    console.log(res);
  });

// Output: 1 3
// Explanation: Promise.reject(1) gives 1 to the .catch, so it logs 1
// The .catch returns value 3, which is passed to the second .then

//3
function runAsync(x) {
  const p = new Promise(resolve =>
    setTimeout(() => resolve(x), 1000)
  );
  return p;
}

function runReject(x) {
  const p = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Error: ${x}`), 1000 * x)
  );
  return p;
}

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Output: Error: 2
// Explanation: At 1 second, runAsync(1) and runAsync(3) resolve successfully, but Promise.all waits for all promises. 
// At 2 seconds, runReject(2) rejects, so Promise.all immediately fails 
// and the .catch is triggered with "Error: 2". 
// runReject(4) is ignored because Promise.all has already settled.