// HTML tag validation
// Write a function that validates whether HTML tags are paired correctly or not.
// Example:
// <html><head><title>My Title</title></head></html> - true
// <html><head><title>My Title</title></head></head></html> - false
// <html><head><title>My Title</title></head></html - false

function checkValidHTML(html) {
    // implement your solution here
    // 不考虑自闭合，严格模式，考虑带attribute
    const tagRe = /<\/?([a-zA-Z][\w:-]*)[^>]*>/g
    const stack = []
    let m
    while ((m = tagRe.exec(html))) {
        const full = m[0]
        const name = m[1]
        if (!full.startsWith("</")) {
            stack.push(name)
        } else {
            if (!stack.length || stack.pop() != name) {
                return false
            }
        }
    }
    return stack.length === 0
}

console.log(checkValidHTML("<html><head><title>My Title</title></head></html>"))
console.log(checkValidHTML("<html><head><title>My Title</title></head></head></html>"))
console.log(checkValidHTML("<html><head><title>My Title</title></head></html"))