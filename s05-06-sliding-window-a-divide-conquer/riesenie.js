/*
 * s05-06 Sliding Window a Divide and Conquer – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 */
'use strict';

// ───────────── 2-debug.js ─────────────

function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    max = Math.max(max, sum);
  }
  return max;
}

function windowSums(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  const result = [sum];
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    result.push(sum);
  }
  return result;
}

function minSubArrayLen(arr, target) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

function findLongestSubstring(str) {
  let start = 0;
  let best = 0;
  const seen = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch] !== undefined) {
      start = Math.max(start, seen[ch] + 1);
    }
    best = Math.max(best, i - start + 1);
    seen[ch] = i;
  }
  return best;
}

function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function halveCount(n) {
  let kroky = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    kroky++;
  }
  return kroky;
}

function maxAverage(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    max = Math.max(max, sum);
  }
  return max / k;
}

function sumOfWindow(arr, start, k) {
  let s = 0;
  for (let i = start; i < start + k; i++) {
    s += arr[i];
  }
  return s;
}

function isInSorted(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return true;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}

function longestRun(arr) {
  let cur = 1;
  let best = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      cur++;
      best = Math.max(best, cur);
    } else {
      cur = 1;
    }
  }
  return best;
}

// ───────────── 3-doplnenie.js ─────────────

function firstWindowSum(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  return sum;
}

function slideMax(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    max = Math.max(max, sum);
  }
  return max;
}

function bestWindow(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    best = Math.max(best, sum);
  }
  return best;
}

function shortestSum(arr, target) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

function searchMid(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function searchFound(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function searchRight(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function halvings(n) {
  let kroky = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    kroky++;
  }
  return kroky;
}

function longestNoRepeat(str) {
  let start = 0;
  let best = 0;
  const seen = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch] !== undefined) start = Math.max(start, seen[ch] + 1);
    best = Math.max(best, i - start + 1);
    seen[ch] = i;
  }
  return best;
}

function windowAverages(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  const result = [sum / k];
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    result.push(sum / k);
  }
  return result;
}

// ───────────── 5-prakticke.js ─────────────

function sumFirstK(arr, k) {
  let s = 0;
  for (let i = 0; i < k; i++) s += arr[i];
  return s;
}

function allWindowSums(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  const v = [sum];
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    v.push(sum);
  }
  return v;
}

function maxWindowSum(arr, k) {
  if (arr.length < k) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    max = Math.max(max, sum);
  }
  return max;
}

function minWindowSum(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let min = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    min = Math.min(min, sum);
  }
  return min;
}

function linearSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function binSearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function countHalvings(n) {
  let k = 0;
  while (n > 1) {
    n = n / 2;
    k++;
  }
  return k;
}

function smallestSubarray(arr, target) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

function longestUniqueSubstring(str) {
  let start = 0;
  let best = 0;
  const seen = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch] !== undefined) start = Math.max(start, seen[ch] + 1);
    best = Math.max(best, i - start + 1);
    seen[ch] = i;
  }
  return best;
}

function maxConsecutiveOnes(arr) {
  let cur = 0;
  let best = 0;
  for (const x of arr) {
    if (x === 1) {
      cur++;
      best = Math.max(best, cur);
    } else {
      cur = 0;
    }
  }
  return best;
}

module.exports = {
  maxSubarraySum, windowSums, minSubArrayLen, findLongestSubstring, binarySearch, halveCount, maxAverage, sumOfWindow, isInSorted, longestRun,
  firstWindowSum, slideMax, bestWindow, shortestSum, searchMid, searchFound, searchRight, halvings, longestNoRepeat, windowAverages,
  sumFirstK, allWindowSums, maxWindowSum, minWindowSum, linearSearch, binSearch, countHalvings, smallestSubarray, longestUniqueSubstring, maxConsecutiveOnes,
};
