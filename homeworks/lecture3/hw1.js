/**
 * there are unlimited numbers of 1c, 5c, 25c, 50c
 * pick 48 coins to have 1 dollar
 * print out 2 solutions
 */
function pickCoins() {
  // implement here
  const solutions = [];

  for (let a = 0; a <= 48; a++) {
    for (let b = 0; b <= 48 - a; b++) {
      for (let c = 0; c <= 48 - a - b; c++) {
        let d = 48 - a - b - c;

        let totalCoins = a + b + c + d;
        let totalValue = a * 1 + b * 5 + c * 25 + d * 50;

        if (totalCoins === 48 && totalValue === 100) {
          solutions.push({ "1c": a, "5c": b, "25c": c, "50c": d });
          if (solutions.length === 2) return solutions;
        }
      }
    }
  }

  return solutions;
}

const result = pickCoins();
console.log("Two valid solutions:");
result.forEach((sol, index) => {
  console.log(`Solution ${index + 1}:`, sol);
});
