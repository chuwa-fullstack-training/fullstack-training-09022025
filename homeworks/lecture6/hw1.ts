// 1. why there would be error in the following code? and how to fix it?
//we are returning a new object of type T but T could have more properties than just id and type
//so we need to use the spread operator to include and override type
type User = {
  id: number;
  type: string;
};

function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    type: "customer",
  };
}

// 2. fix the following code
// requirement: the function should accept either two strings or two numbers at the same time,
// so if parameters are one string and one number, it should throw an error
function f(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && b === "string") {
    return `${a} : ${b}`;
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else throw new Error("Arguments must both be strings or both be numbers.");
}
