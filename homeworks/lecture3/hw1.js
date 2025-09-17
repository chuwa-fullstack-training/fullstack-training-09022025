/**
 * there are unlimited numbers of 1c, 5c, 25c, 50c
 * pick 48 coins to have 1 dollar
 * print out 2 solutions
 */
function pickCoins() {
    let totalCoin = 0;
    let totalPrice = 0;
    let result = [];

    for (let half = 0; half <= 100 / 50; half++) {
        for (let quarter = 0; quarter <= 100 / 25; quarter++) {
            totalPrice = half * 50 + quarter * 25;
            if (totalPrice > 100) {
                continue; // Stop when the total price is more than 1 dollar
            }

            for (let nickel = 0; nickel <= 100 / 5; nickel++) {
                totalPrice = half * 50 + quarter * 25 + nickel * 5;
                if (totalPrice > 100) {
                    continue;
                }

                let penny = 100 - half * 50 - quarter * 25 - nickel * 5;
                totalCoin = penny + nickel + quarter + half;
                if (totalCoin === 48) {
                    result.push(
                        `1c: ${penny}, 5c: ${nickel}, 25c: ${quarter}, 50c: ${half}`
                    );
                    if (result.length === 2) return result;
                }
            }
        }
    }
}

const result = pickCoins();
console.log(
    "2 solutions of using 48 coins of 1c, 5c, 25c, 50c to make 1 dollar are:"
);
result.forEach((item) => {
    console.log(item);
});
