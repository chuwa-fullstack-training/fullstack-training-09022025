/**
 * add `,` to the number every 3 digits
 * example: 12345678 => 12,345,678
 * example: 1234.56 => 1,234.56
 * @param {number} num
 */
function format(num) {
    const numArray = num.toString().split(""); // Split into digit array
    // Array to store integer part and dot + decimal part
    let integerArray,
        decimalArray = null;

    // Split and store into new arrays
    if (numArray.includes(".")) {
        // With decimal part
        integerArray = numArray.slice(0, numArray.indexOf("."));
        decimalArray = numArray.slice(numArray.indexOf("."));
    } else {
        // Only decimal part
        integerArray = numArray;
    }

    // Deal with integer part
    let result = integerArray.reverse().reduce((accum, digit, index) => {
        // Index starts from 0, add comma when index is 2, 5, 8, ...
        if ((index + 1) % 3 !== 0) {
            return digit + accum;
        } else {
            return "," + digit + accum;
        }
    }, "");
    // Delete the first comma to avoid ",123,456"
    if (result[0] === ",") {
        result = result.slice(1);
    }
    // Add the decimal part without modification
    if (decimalArray !== null) {
        result = result.concat(decimalArray.join(""));
    }
    return result;
}

console.log(format(12345678));
console.log(format(1234.56));
