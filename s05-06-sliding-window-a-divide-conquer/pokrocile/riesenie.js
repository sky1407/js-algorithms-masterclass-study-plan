/*
 * RIEŠENIA – 03 Sliding Window a Divide and Conquer
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function maxSubarraySum(arr, num) {
  if (num <= 0 || arr.length < num) return null;
  let maxSum = 0;
  for (let i = 0; i < num; i++) maxSum += arr[i];
  let tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
const zlozitost1 = 'O(n)';

function countZeroes(arr) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 1) left = mid + 1;
    else right = mid;
  }
  return arr.length - left;
}
const zlozitost2 = 'O(log n)';

function findLongestSubstring(str) {
  const seen = {};
  let start = 0;
  let longest = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch in seen) start = Math.max(start, seen[ch] + 1);
    seen[ch] = i;
    longest = Math.max(longest, i - start + 1);
  }
  return longest;
}

function minSubArrayLen(nums, sum) {
  let start = 0;
  let total = 0;
  let minLen = Infinity;
  for (let end = 0; end < nums.length; end++) {
    total += nums[end];
    while (total >= sum) {
      minLen = Math.min(minLen, end - start + 1);
      total -= nums[start];
      start++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

function bound(arr, num, first) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === num) {
      result = mid;
      if (first) hi = mid - 1;
      else lo = mid + 1;
    } else if (arr[mid] < num) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}

function sortedFrequency(arr, num) {
  const first = bound(arr, num, true);
  if (first === -1) return -1;
  const last = bound(arr, num, false);
  return last - first + 1;
}
const zlozitost5 = 'O(log n)';

function insertPosition(arr, x) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
const zlozitost6 = 'O(log n)';

function containsNearbyDuplicate(nums, k) {
  const window = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
    if (i >= k) window.delete(nums[i - k]);
  }
  return false;
}
const protipriklad7 = [[1, 2, 1], 2];

function findMin(arr) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > arr[hi]) lo = mid + 1;
    else hi = mid;
  }
  return arr[lo];
}
const protipriklad8 = [[3, 1, 2]];

function lowerBound(arr, x) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function upperBound(arr, x) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function countInRange(arr, low, high) {
  if (low > high) return 0;
  return upperBound(arr, high) - lowerBound(arr, low);
}
const protipriklad9 = [[1, 2, 3], 1, 3];

function longestSubarrayWithSumAtMost(nums, limit) {
  let start = 0;
  let sum = 0;
  let best = 0;
  for (let end = 0; end < nums.length; end++) {
    sum += nums[end];
    while (sum > limit) {
      sum -= nums[start];
      start++;
    }
    best = Math.max(best, end - start + 1);
  }
  return best;
}

function findRotatedIndex(arr, num) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === num) return mid;
    if (arr[lo] <= arr[mid]) {
      if (num >= arr[lo] && num < arr[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else if (num > arr[mid] && num <= arr[hi]) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}

function sqrtFloor(n) {
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (mid * mid <= n) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

function peakTraffic(requests, minutes) {
  if (minutes <= 0 || requests.length < minutes) return null;
  let total = 0;
  for (let i = 0; i < minutes; i++) total += requests[i];
  let best = { start: 0, total };
  for (let i = minutes; i < requests.length; i++) {
    total += requests[i] - requests[i - minutes];
    if (total > best.total) best = { start: i - minutes + 1, total };
  }
  return best;
}

function findFirstBadDeploy(deploys, isBroken) {
  let lo = 0;
  let hi = deploys.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (isBroken(deploys[mid])) hi = mid;
    else lo = mid + 1;
  }
  return lo < deploys.length ? deploys[lo] : null;
}

module.exports = {
  maxSubarraySum, zlozitost1, countZeroes, zlozitost2, findLongestSubstring,
  minSubArrayLen, sortedFrequency, zlozitost5, insertPosition, zlozitost6,
  containsNearbyDuplicate, protipriklad7, findMin, protipriklad8, countInRange, protipriklad9,
  longestSubarrayWithSumAtMost, findRotatedIndex, sqrtFloor,
  peakTraffic, findFirstBadDeploy,
};
