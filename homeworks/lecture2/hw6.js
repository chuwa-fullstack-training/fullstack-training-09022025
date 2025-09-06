// Algorithms

// 1. Write a function that returns the largest element in a list.
function largestElement(list) {
  // implement your code here
  return list.length ? Math.max(...list) : undefined;
}

// 2. Write function that reverses a list, preferably in place.
function reverseList(list) {
  // implement your code here
  return list.length ? list.reverse() : undefined;
}

// 3. Write a function that checks whether an element occurs at least twice in a list.
function checkTwice(list, element) {
  // implement your code here
  return list.filter((i) => i === element).length >= 2;
}
