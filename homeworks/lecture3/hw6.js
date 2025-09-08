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
  let count = {}; // 记录每个数字出现次数
  let result = 0;

  for (let num of nums) {
    if (count[num]) {
      result += count[num]; // 已经出现过 count[num] 次，可以组成这么多对
      count[num]++;
    } else {
      count[num] = 1;
    }
  }
  return result;
}

/**
 * Given a string s, remove the vowels 'a', 'e', 'i', 'o', and 'u' from it, and return the new string.
 */
function removeVowels(s) {
  let vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let result = '';
  for (let ch of s) {
    if (!vowels.has(ch)) {
      result += ch;
    }
  }
  return result;
}

//test

console.log(numIdenticalPairs([1,2,3,1,1,3])); // 4
console.log(numIdenticalPairs([1,1,1,1]));     // 6
console.log(numIdenticalPairs([1,2,3]));       // 0

console.log(removeVowels("leetcodeisacommunityforcoders")); // "ltcdscmmntyfrcdrs"
console.log(removeVowels("aeiou"));                         // ""
