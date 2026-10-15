/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  03 SLIDING WINDOW A DIVIDE AND CONQUER – DEBUGGING (1–3)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU (často viac). Spusti testy, prečítaj si, čo zlyhalo,
 * a oprav kód. Kde je premenná `zlozitostX`, doplň časovú zložitosť.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) maxSubarraySum – najväčší súčet num SUSEDNÝCH prvkov (sliding window)
//    maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) → 10
//    maxSubarraySum([-3, -1, -4, -2], 2)      → -4
//    maxSubarraySum([], 4)                    → null
// ─────────────────────────────────────────────────────────────────────
function maxSubarraySum(arr, num) {
  if (arr.length < num) return null;
  let maxSum = 0;
  let tempSum = 0;
  for (let i = 0; i < num; i++) tempSum += arr[i];
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num - 1] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
const zlozitost1 = '___';

// ─────────────────────────────────────────────────────────────────────
// 2) countZeroes – pole obsahuje najprv jednotky, potom nuly.
//    Vráť počet núl. Musí to byť rýchlejšie ako O(n)!
//    countZeroes([1, 1, 1, 1, 0, 0]) → 2
//    countZeroes([1, 1, 1, 1])       → 0
// ─────────────────────────────────────────────────────────────────────
function countZeroes(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 1) left = mid + 1;
    else right = mid;
  }
  return arr.length - left;
}
const zlozitost2 = '___';

// ─────────────────────────────────────────────────────────────────────
// 3) findLongestSubstring – dĺžka najdlhšieho úseku bez opakujúcich sa znakov
//    findLongestSubstring('rithmschool') → 7   ('rithmsc')
//    findLongestSubstring('abba')        → 2
// ─────────────────────────────────────────────────────────────────────
function findLongestSubstring(str) {
  const seen = {};
  let start = 0;
  let longest = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen[ch]) start = seen[ch] + 1;
    seen[ch] = i;
    longest = Math.max(longest, i - start);
  }
  return longest;
}

module.exports = { maxSubarraySum, zlozitost1, countZeroes, zlozitost2, findLongestSubstring };

if (require.main === module) {
  require('../../lib/test-runner').spusti('03 Sliding Window a D&C – Debugging', require('./testy').debug, module.exports);
}
