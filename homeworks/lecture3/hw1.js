/** 
 * there are unlimited numbers of 1c, 5c, 25c, 50c
 * pick 48 coins to have 1 dollar
 * print out 2 solutions
 */
function pickCoins() {
    // implement here
    // use a, b, c, d to represents to number of coins 1c, 5c, 25c, 50c
    let res = []
    for (let a = 0; a <= 48; a++) {
        for (let b = 0; b <= 48 - a; b++) {
            for (let c = 0; c <= 48 - a - b; c++) {
                let d = 48 - a - b - c
                if (a + 5 * b + 25 * c + 50 * d === 100) {
                    res.push({a, b, c, d})
                    if (res.length == 2) return res
                }
            }
        }
    }
    return res
}

const sols = pickCoins()
sols.forEach((s, i) => {
    console.log(`Solution ${i+1}: ${s.a}×1c ${s.b}×5c ${s.c}×25c ${s.d}×50c`)
})