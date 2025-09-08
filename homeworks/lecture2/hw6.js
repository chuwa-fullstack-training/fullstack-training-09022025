// Algorithms

// 1. Write a function that returns the largest element in a list.
function largestElement(list) {
  let largest = Number.NEGATIVE_INFINITY;
  list.forEach((number) => {
    if (number > largest) {
      largest = number;
    }
  });
  return largest;
}

// 2. Write function that reverses a list, preferably in place.
function reverseList(list) {
  let result = [];
  list.reverse().forEach((number) => {
    result.push(number);
  });
  return result;
}

// 3. Write a function that checks whether an element occurs at least twice in a list.
function checkTwice(list, element) {
  let count = 0;
  let flag = false;
  list.forEach((number) => {
    if (number === element) {
      count++;
    }
    if (count === 2) {
      flag = true;
    }
  });
  return flag; // true: occurs at least twice; false: doesn't occur at least twice
}
