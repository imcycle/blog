/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // 二分法 找到target
    let index = -1;
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;

        if (nums[mid] === target) {
            index = mid;
            break
        }

        if (target > nums[mid]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    if (index === -1) return [-1, -1]

    // 二分法 找 左边界
    // mid 是target && 左边不是target
    left = 0;
    right = index;
    let resLeft = null;
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (nums[mid] === target && (mid === left || nums[mid - 1] !== target)) {
            resLeft = mid;
            break
        }

        if (nums[mid] === target) {
            right = mid
        } else {
            // mid 小于 target 
            left = mid + 1
        }
    }

    // 二分法 找 右边界
    // mid 是target && 右边边不是target
    left = index;
    right = nums.length - 1;
    let resRight = null;
    while (left <= right) {
        const mid = Math.ceil((right - left) / 2) + left;
        if (nums[mid] === target && (mid === right || nums[mid + 1] !== target)) {
            resRight = mid;
            break
        }

        if (nums[mid] === target) {
            left = mid
        } else {
            // mid 大于target
            right = mid - 1 
        }
    }



    return [resLeft, resRight]
};

searchRange([2,2],
    2)