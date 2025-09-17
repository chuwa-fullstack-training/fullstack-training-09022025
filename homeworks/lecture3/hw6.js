/**
 * Given an array of integers nums, return the number of good pairs.
 * A pair (i, j) is called good if nums[i] == nums[j] and i < j.
 *
 * Example 1:
 * Input: nums = [1,2,3,1,1,3]  Output: 4
 * Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5)
 *
 * Example 2:
 * Input: nums = [1,1,1,1]  Output: 6
 * Explanation: Each pair in the array are good.
 *
 * Example 3:
 * Input: nums = [1,2,3]    Output: 0
 *
 * Constraints:
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 100
 */
function numIdenticalPairs(nums) {
    let Occurance = {};
    let numPairs = 0;

    // Check how many times every number appears
    nums.forEach((num) => {
        if (Occurance[num] === undefined) {
            // Add a new number
            Occurance[num] = 1;
        } else {
            // Add 1 to the counter
            Occurance[num] += 1;
        }
    });

    Object.keys(Occurance).forEach((key) => {
        if (Occurance[key] !== 1) {
            // Combination formula
            const n = Occurance[key];
            numPairs += (n * (n - 1)) / 2;
        }
    });
    return numPairs;
}

nums = [1, 2, 3, 1, 1, 3];
console.log(numIdenticalPairs(nums));
nums = [1, 1, 1, 1];
console.log(numIdenticalPairs(nums));
nums = [1, 2, 3];
console.log(numIdenticalPairs(nums));

/**
 * Given a string s, remove the vowels 'a', 'e', 'i', 'o', and 'u' from it, and return the new string.
 */
function removeVowels(s) {
    const vowels = ["a", "e", "i", "o", "u"];
    let result = "";
    for (const char of s) {
        if (!vowels.includes(char)) {
            result += char;
        }
    }
    return result;
}

console.log(removeVowels("The quick brown fox jumps over a lazy dog."));
