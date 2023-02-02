/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 二分法
    const n = nums.length
    if (target === nums[0]) return 0;
    if (target === nums[n - 1]) return n - 1;

    let left = 0, right = n - 1, isDZ = nums[left] <= nums[right];
    while (right >= left) {
        // 处理剩余长度 1 or 2
        if (right - left === 0) return target === nums[left] ? left : -1;
        if (right - left === 1) {
            if (target === nums[left]) return left;
            if (target === nums[right]) return right;
            return -1;
        }

        let med = Math.floor((right - left) / 2) + left;
        if (nums[med] === target) {
            return med
        }

        if (isDZ) {
            if (target > nums[med]) {
                left = med + 1
            } else {
                right = med - 1
            }
        } else {
            if (nums[med] > nums[left]) {
                // 左边递增 右边旋转
                if (target <= nums[right] || target > nums[med]) {
                    left = med + 1
                    if (nums[left] < nums[right]) isDZ = true;
                } else if (target >= nums[left] && target < nums[med]) {
                    right = med - 1
                    isDZ = true
                } else {
                    return -1
                }
            } else {
                // 左边旋转 右边递增
                if (target > nums[med] && target <= nums[right]) {
                    left = med + 1
                    isDZ = true
                } else if (target < nums[med] || target >= nums[left]) {
                    right = med - 1
                    if (nums[left] <= nums[right]) isDZ = true;
                } else {
                    return -1
                }
            }
        }

    }

    return -1
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    const n = nums.length

    let left = 0, right = n - 1;
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (nums[mid] === target) {
            return mid;
        }

        if (nums[0] <= nums[mid]) {
            if (nums[0] <= target && target < nums[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            if (nums[mid] < target && target >= nums[n - 1]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1
};

search([4,5,6,7,8,1,2,3],
    8)