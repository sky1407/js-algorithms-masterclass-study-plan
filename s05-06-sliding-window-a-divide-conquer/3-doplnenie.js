/*
 * s05-06 Sliding Window a Divide and Conquer – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) firstWindowSum – súčet prvých k čísel
//    firstWindowSum([5, 1, 3, 9], 3) → 9
function firstWindowSum(arr, k) {
  let sum = 0;
  for (let i = 0; i < ___; i++) {
    sum += arr[i];
  }
  return sum;
}

// 2) slideMax – najväčší súčet k susedných čísel
//    slideMax([1, 2, 5, 2, 8, 1, 5], 2) → 10
function slideMax(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - ___] + arr[i];
    max = Math.max(max, sum);
  }
  return max;
}

// 3) bestWindow – najväčší súčet k susedných čísel
//    bestWindow([4, 2, 1, 6], 1) → 6
function bestWindow(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    best = Math.___(best, sum);
  }
  return best;
}

// 4) shortestSum – dĺžka najkratšieho kusu so súčtom aspoň target, inak 0
//    shortestSum([2, 1, 6, 5, 4], 9) → 2,   shortestSum([1, 2], 50) → 0
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
  return minLen === Infinity ? ___ : minLen;
}

// 5) searchMid – binárne vyhľadávanie, index alebo -1
//    searchMid([2, 4, 6, 8], 4) → 1
function searchMid(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.___((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// 6) searchFound – binárne vyhľadávanie, index alebo -1
//    searchFound([10, 20, 30, 40, 50], 40) → 3
function searchFound(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return ___;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// 7) searchRight – binárne vyhľadávanie, index alebo -1
//    searchRight([1, 2, 3, 4, 5, 6], 6) → 5
function searchRight(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + ___;
    else right = mid - 1;
  }
  return -1;
}

// 8) halvings – koľkokrát sa dá n rozpoliť, kým nie je 1
//    halvings(16) → 4
function halvings(n) {
  let kroky = 0;
  while (n > 1) {
    n = Math.floor(n / ___);
    kroky++;
  }
  return kroky;
}

// 9) longestNoRepeat – najdlhší kus textu bez opakovaného písmena
//    longestNoRepeat('thisisawesome') → 6
function longestNoRepeat(str) {
  let start = 0;
  let best = 0;
  const seen = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch] !== undefined) start = Math.max(start, seen[ch] + 1);
    best = Math.max(best, i - start + ___);
    seen[ch] = i;
  }
  return best;
}

// 10) windowAverages – priemer každého okna veľkosti k (dve ___)
//     windowAverages([1, 3, 5, 7], 2) → [2, 4, 6]
function windowAverages(arr, k) {
  let sum = ___;
  for (let i = 0; i < k; i++) sum += arr[i];
  const result = [sum / k];
  for (let i = k; i < arr.length; i++) {
    sum = sum - arr[i - k] + arr[i];
    result.push(sum / ___);
  }
  return result;
}

module.exports = {
  firstWindowSum, slideMax, bestWindow, shortestSum, searchMid, searchFound, searchRight, halvings, longestNoRepeat, windowAverages,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s05-06 Sliding Window a Divide and Conquer – Doplň kód', require('./testy').doplnenie, module.exports);
}
