/**
 * Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.
 *
 * Example 1:
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 * Output: [2]
 *
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * Output: [9,4]
 *
 */
const intersection = (nums1, nums2) => {
    // Reassign so that we iterate the shorter one
    let short = nums1.length <= nums2.length ? nums1 : nums2;
    let long = nums1.length > nums2.length ? nums1 : nums2;
    let result = [];

    // Find intersection and only add unique ones to result
    short.forEach((element) => {
        if (long.includes(element) && !result.includes(element)) {
            result.push(element);
        }
    });

    return result;
};

let nums1 = [1, 2, 2, 1];
let nums2 = [2, 2];
console.log(intersection(nums1, nums2));
nums1 = [4, 9, 5];
nums2 = [9, 4, 9, 8, 4];
console.log(intersection(nums1, nums2));
