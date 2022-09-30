/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  var res = []

  for (var a = 0; a < n; a++) {
    if (a > 0 && nums[a] === nums[a - 1]) {
      continue
    }
    for (var b = a + 1; b < n; b++) {
      if (b > a + 1 && nums[b] === nums[b - 1]) {
        continue
      }
      for (var c = b + 1; c < n; c++) {
        if (c > b + 1 && nums[c] === nums[c - 1]) {
          continue
        }
        for (var d = c + 1; d < n; d++) {
          if (d > c + 1 && nums[d] === nums[d - 1]) {
            continue
          }

          if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
            res.push([nums[a], nums[b], nums[c], nums[d]])
          }
        }
      }
    }
  }

  return res
};

var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  var res = []

  for (var a = 0; a < n; a++) {
    if (a > 0 && nums[a] === nums[a - 1]) {
      continue
    }
    for (var b = a + 1; b < n; b++) {
      if (b > a + 1 && nums[b] === nums[b - 1]) {
        continue
      }

      var left = b + 1
      var right = n - 1

      while (left < right) {
        if (left > b + 1 && nums[left] === nums[left - 1]) {
          left++
          continue
        }

        var r = nums[a] + nums[b] + nums[left] + nums[right]
        if (r < target) {
          left++
        } else if (r === target) {
          res.push([nums[a], nums[b], nums[left], nums[right]])
          left++
        } else {
          right--
        }
      }
    }
  }

  return res
};