/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        if (nums[left] === 0) {
            nums.unshift(nums.splice(left, 1)[0]);
            left++
        } else if (nums[left] === 1) {
            left++
        } else if (nums[left] === 2) {
            nums.push(nums.splice(left, 1)[0])
            right--
        }
    }
};

sortColors([2,0,2,1,1,0])