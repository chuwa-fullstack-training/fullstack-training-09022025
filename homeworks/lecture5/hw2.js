/**
 * reverse words in a string
 *
 * input: "the sky is blue"
 * output: "blue is sky the"
 *
 * extra: in-place
 * @param {string[]} str
 */
function reverseWords(str) {
    let currentWord = "";
    let wordArray = [];

    str.forEach((value) => {
        if (value !== " ") {
            // If current char is not space
            currentWord = currentWord.concat(value);
        } else {
            // If current char is space
            wordArray.push(currentWord);
            currentWord = ""; // Start a new word
        }
    });
    if (currentWord !== "") {
        wordArray.push(currentWord); // Push the last word
    }

    let result = wordArray.reverse().reduce((accum, value) => {
        return accum.concat(" ", value);
    }, "");
    return result.trimStart(); // Delete the first space
}

const input = "the sky is blue".split(""); // ['t', 'h', 'e', ' ', 's', 'k', 'y', ' ', 'i', 's', ' ', 'b', 'l', 'u', 'e']
console.log(reverseWords(input));
