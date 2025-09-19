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
  // implement here
  let freq = {}
  for (let num of nums) {
    freq[num] = (freq[num] || 0) + 1
  }
  let res = 0
  for (let x of Object.values(freq)) {
    res += x * (x - 1) / 2
  }
  return res
}

// Test
const assert = require("assert")
assert.strictEqual(numIdenticalPairs([1,2,3,1,1,3]), 4)
assert.strictEqual(numIdenticalPairs([1,1,1,1]), 6)
assert.strictEqual(numIdenticalPairs([1,2,3]), 0)
console.log("numIdenticalPairs: All Test Cases Passed!")

/**
 * Given a string s, remove the vowels 'a', 'e', 'i', 'o', and 'u' from it, and return the new string.
 */
function removeVowels(s) {
  // implement here
  return [...s].filter(ch => !"aeiou".includes(ch.toLowerCase())).join("")
}

// Test
assert.strictEqual(removeVowels("leetcode"), "ltcd")
assert.strictEqual(removeVowels("cindy"), "cndy")
console.log("removeVowels: All Test Cases Passed!")