// 1. why there would be error in the following code? and how to fix it?
type User = {
    id: number;
    type: string;
};

// function makeCustomer<T extends User>(u: T): T {
//     return {
//         id: u.id,
//         type: "customer",
//     };
// }
// We defined that T extends User, which means T at least have attributes including { id:
// number; type: "customer" }. However, the returned object only includes { id: number;
// type: "customer" }, which may not satisfy T if T has other new attributes.
// It can be fixed by changing the returned type into User. Code shown as below.

function makeCustomer<T extends User>(u: T): User {
    return {
        id: u.id,
        type: "customer",
    };
}

// 2. fix the following code
// requirement: the function should accept either two strings or two numbers at the same time,
// so if parameters are one string and one number, it should throw an error
function f(a: string | number, b: string | number) {
    if (typeof a === "string" && typeof b === "string") {
        return `${a} : ${b}`;
    } else if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else {
        throw new Error(
            "One string and one number can not be accepted as parameters."
        );
    }
}

console.log(f("as", "df")); // as : df
console.log(f(12, 34)); // 46
console.log(f("as", 34)); // Error
