/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  03 SLIDING WINDOW A DIVIDE AND CONQUER – HĽADANIE CHÝB (7–9)    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na „bežných“ vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Napr. pre f(arr, x) zápis [[1, 2, 3], 2] znamená volanie f([1, 2, 3], 2).
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) containsNearbyDuplicate – existujú indexy i ≠ j, kde nums[i] === nums[j]
//    a |i - j| <= k ?  (okno = množina posledných k prvkov)
//    containsNearbyDuplicate([1, 2, 3, 1], 3) → true
// ─────────────────────────────────────────────────────────────────────
function containsNearbyDuplicate(nums, k) {
  const window = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (i >= k) window.delete(nums[i - k]);
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
  }
  return false;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) findMin – zoradené pole RÔZNYCH čísel bolo „otočené“
//    (napr. [0, 1, 2, 4, 5, 6, 7] → [4, 5, 6, 7, 0, 1, 2]). Nájdi minimum v O(log n).
//    findMin([4, 5, 6, 7, 0, 1, 2]) → 0
// ─────────────────────────────────────────────────────────────────────
function findMin(arr) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > arr[hi]) lo = mid + 1;
    else hi = mid - 1;
  }
  return arr[lo];
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) countInRange – koľko hodnôt ZORADENÉHO poľa leží v intervale [low, high]
//    (vrátane okrajov)? Dve binárne vyhľadávania → O(log n).
//    countInRange([1, 3, 3, 5, 8, 8, 8, 10], 2, 7) → 3
// ─────────────────────────────────────────────────────────────────────
function countInRange(arr, low, high) {
  const lowerBound = (x) => {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  if (low > high) return 0;
  return lowerBound(high) - lowerBound(low);
}
const protipriklad9 = ___;

module.exports = { containsNearbyDuplicate, protipriklad7, findMin, protipriklad8, countInRange, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('03 Sliding Window a D&C – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
