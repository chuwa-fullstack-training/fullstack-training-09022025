// 1. use `promise` to print 1, 2, 3 in every 1 second
function print() {
    timeoutPrint(1)
        .then(() => {
            return timeoutPrint(2);
        })
        .then(() => {
            return timeoutPrint(3);
        });
}

// Helper function, 1s as default delay time
function timeoutPrint(number, delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(number);
            resolve();
        }, delay);
    });
}

print();

// improved: print every single numbers in a list in every 1 second
// hint: `reduce`
const nums = [3, 1, 6, 9, 2];

function printList(nums) {
    return nums.reduce((prevPromise, num) => {
        return prevPromise.then(() => {
            return timeoutPrint(num);
        });
    }, Promise.resolve());
}

printList(nums);

// 2. traffic light
// output: red -> green -> yellow -> red -> ...
// the delay time is up to you, but the order has to be correct
function trafficLight(loopTime) {
    // Red delay 8s, green dalay 10s, yellow delay 2s
    const colors = ["red", "green", "yellow"];
    const delays = [8000, 10000, 2000];

    // Create dummy array for reduce
    const array = Array(3 * loopTime).fill("");
    return array.reduce((prevPromise, num, index) => {
        let colorIndex = index % 3; // Check the light
        return prevPromise.then(() => {
            return timeoutPrint(colors[colorIndex], delays[colorIndex]);
        });
    }, Promise.resolve());
}

trafficLight(2);
