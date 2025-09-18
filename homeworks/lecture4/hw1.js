// HTML tag validation
// Write a function that validates whether HTML tags are paired correctly or not.
// Example:
// <html><head><title>My Title</title></head></html> - true
// <html><head><title>My Title</title></head></head></html> - false
// <html><head><title>My Title</title></head></html - true

function checkValidHTML(html) {
    const tagRegex = /<\/?([^>]+?)>/;
    let stack = [];
    let match;

    while (tagRegex.test(html)) {
        match = tagRegex.exec(html);
        const fullTag = match[0];
        const tagName = match[1];
        html = html.replace(fullTag, "");
        if (fullTag[1] !== "/") {
            // Open tag
            stack.push(tagName);
        } else {
            // Close tag
            if (stack.length === 0) {
                // No open tag available
                return false;
            }
            const openTag = stack.pop();
            if (openTag !== tagName) {
                // Tag name not matched
                return false;
            }
        }
    }

    return stack.length === 0; // Return true if stack is empty
}

console.log(
    checkValidHTML("<html><head><title>My Title</title></head></html>")
);
console.log(
    checkValidHTML("<html><head><title>My Title</title></head></head></html>")
);
console.log(checkValidHTML("<html><head><title>My Title</title></head></html"));
