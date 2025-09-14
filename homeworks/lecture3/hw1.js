/** 
 * there are unlimited numbers of 1c, 5c, 25c, 50c
 * pick 48 coins to have 1 dollar
 * print out 2 solutions
 */
function pickCoins() {
    let solutions = [];
    for(let a = 0; a<= 48; a++){//1c
      for(let b = 0; b<= 48 - a; b++){ //5c
        for(let c = 0; c<= 48 - a - b; c++){ //25c
          let d = 48 - a - b - c; //50c
          if( a + b + c + d === 48 && 1*a + 5*b + 25*c + 50*d === 100){
            solutions.push({a,b,c,d}); // 把{ a: a, b: b, c: c, d: d }这个元素 push到空数组solutions
            if (solutions.length === 2){
              console.log("First 2 solutions", solutions);
              return;
            }
          }
        }
      }

    }
}
pickCoins();

//simpler solution？这题想考察什么？
/*
function pickCoins_math2() {
  const res = [];
  const d = 0;
  for (let c = 0; c <= 2; c++) {
    const b = 13 - 6 * c;
    if (b >= 0) {
      const a = 48 - b - c - d;
      res.push({ a, b, c, d });
    }
  }
  console.log(res.slice(0, 2));
}
  */