function counter() {
  //implement here
  let total = 0;

  return function (arg) {
    if (arg === undefined) return total;

    const num = Number(arg);
    if (isNaN(num)) throw new Error("Invalid input: not a number");

    return (total += num);
  };
}
let count = counter();
console.log(count(3)); // Output: 3
console.log(count(5)); // Output: 8 (3 + 5)
console.log(count()); // Output: 8
