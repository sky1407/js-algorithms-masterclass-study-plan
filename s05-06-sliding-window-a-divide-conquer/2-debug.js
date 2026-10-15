/*
 * s05-06 Sliding Window a Divide and Conquer – DEBUGGING (10 úloh)
 *
 * Každá funkcia má presne JEDNU chybu. Nájdi ju a oprav.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: klikni vľavo od čísla riadku (červená bodka) a stlač F5 → Node.js.
 */
'use strict';

// 1) maxSubarraySum – najväčší súčet k susedných čísel (null, ak je pole kratšie ako k)
//    maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) → 10,   maxSubarraySum([-3, -2, -5], 2) → -5
function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = 0;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    max = Math.max(max, sum);
  }
  return max;
}

// 2) windowSums – pole súčtov všetkých okien veľkosti k
//    windowSums([1, 2, 3, 4], 2) → [3, 5, 7]
function windowSums(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  const result = [sum];
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - 1] + arr[i];
    result.push(sum);
  }
  return result;
}

// 3) minSubArrayLen – dĺžka najkratšieho kusu poľa so súčtom aspoň target, inak 0
//    minSubArrayLen([2, 3, 1, 2, 4, 3], 7) → 2,   minSubArrayLen([1, 1], 5) → 0
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
  return minLen;
}

// 4) findLongestSubstring – dĺžka najdlhšieho kusu textu bez opakovaného písmena
//    findLongestSubstring('abcabcbb') → 3
function findLongestSubstring(str) {
  let start = 0;
  let best = 0;
  const seen = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch] !== undefined) {
      start = Math.max(start, seen[ch]);
    }
    best = Math.max(best, i - start + 1);
    seen[ch] = i;
  }
  return best;
}

// 5) binarySearch – index x v zotriedenom poli, inak -1
//    binarySearch([1, 3, 5, 7, 9], 9) → 4
function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) right = mid - 1;
    else left = mid + 1;
  }
  return -1;
}

// 6) halveCount – koľkokrát môžeš n deliť 2 (nadol), kým nie je 1
//    halveCount(8) → 3   (8 → 4 → 2 → 1)
function halveCount(n) {
  let kroky = 0;
  while (n >= 1) {
    n = Math.floor(n / 2);
    kroky++;
  }
  return kroky;
}

// 7) maxAverage – najväčší priemer k susedných čísel
//    maxAverage([1, 12, -5, -6, 50, 3], 4) → 12.75
function maxAverage(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    max = Math.max(max, sum);
  }
  return max / arr.length;
}

// 8) sumOfWindow – súčet k prvkov, ktoré začínajú na indexe start
//    sumOfWindow([1, 2, 3, 4, 5], 2, 2) → 7   (3 + 4)
function sumOfWindow(arr, start, k) {
  let s = 0;
  for (let i = start; i < k; i++) {
    s += arr[i];
  }
  return s;
}

// 9) isInSorted – je x v zotriedenom poli? (binárne vyhľadávanie)
//    isInSorted([5], 5) → true
function isInSorted(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return true;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}

// 10) longestRun – dĺžka najdlhšej série rovnakých čísel idúcich za sebou
//     longestRun([1, 1, 2, 2, 2, 3]) → 3
function longestRun(arr) {
  let cur = 1;
  let best = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
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
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s05-06 Sliding Window a Divide and Conquer – Debugging', require('./testy').debug, module.exports);
}
