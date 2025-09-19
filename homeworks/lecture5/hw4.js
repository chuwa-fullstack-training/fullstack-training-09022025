// what is the output? and explain why?

// 1
Promise.resolve(1)
    .then((res) => {
        console.log(res);
        return 2;
    })
    .catch((err) => {
        return 3;
    })
    .then((res) => {
        console.log(res);
    });
// 1 2
// The first then executed and printed 1
// The first catch did not catch an rejected and was not executed
// The second then received 2 from the first then and printed 2

// // 2
Promise.reject(1)
    .then((res) => {
        console.log(res);
        return 2;
    })
    .catch((err) => {
        console.log(err);
        return 3;
    })
    .then((res) => {
        console.log(res);
    });
// 1 3
// The first then did not executed because of reject
// The first catch caught a reject and received 1. 1 was printed
// The second then received 3 from the first catch. 3 was printed

//3
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
// Error: 2
// Promise.all will be rejected if one of the promise failed. We have
// runReject(4) which will reject in 4000ms and runReject(2) which will
// reject in 2000ms. runReject(2) rejects first and its error info is
// caught by catch and printed.
