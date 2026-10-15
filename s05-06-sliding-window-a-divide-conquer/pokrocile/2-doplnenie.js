/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  03 SLIDING WINDOW A DIVIDE AND CONQUER – DOPLŇ KÓD (4–6)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom a doplň zložitosti ('___').
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) minSubArrayLen – dĺžka najkratšieho súvislého úseku kladných čísel,
//    ktorého súčet je ≥ sum. Ak taký neexistuje, vráť 0.
//    minSubArrayLen([2, 3, 1, 2, 4, 3], 7) → 2   ([4, 3])
//    (Okno sa rozširuje vpravo a kým môže, zmenšuje zľava.)
// ─────────────────────────────────────────────────────────────────────
function minSubArrayLen(nums, sum) {
  let start = 0;
  let total = 0;
  let minLen = Infinity;
  for (let end = 0; end < nums.length; end++) {
    total += nums[end];
    while (total >= ___) {
      minLen = Math.min(minLen, end - start + ___);
      total -= nums[start];
      start++;
    }
  }
  return minLen === Infinity ? ___ : minLen;
}

// ─────────────────────────────────────────────────────────────────────
// 5) sortedFrequency – koľkokrát je num v ZORADENOM poli? (-1 ak nie je)
//    Dve binárne vyhľadávania: prvý a posledný výskyt.
//    sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2) → 4
// ─────────────────────────────────────────────────────────────────────
function bound(arr, num, first) {
  let lo = 0;
  let hi = arr.length - 1;
  let result = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === num) {
      result = mid;
      if (first) hi = mid - 1;
      else lo = ___;
    } else if (arr[mid] < num) {
      lo = mid + 1;
    } else {
      hi = ___;
    }
  }
  return result;
}

function sortedFrequency(arr, num) {
  const first = bound(arr, num, true);
  if (first === -1) return -1;
  const last = bound(arr, num, false);
  return last - first + ___;
}
const zlozitost5 = '___';

// ─────────────────────────────────────────────────────────────────────
// 6) insertPosition – na aký index vložiť x, aby pole ostalo zoradené?
//    Ak už x v poli je, vráť index jeho PRVÉHO výskytu.
//    insertPosition([1, 3, 5, 6], 5) → 2
//    insertPosition([1, 3, 5, 6], 7) → 4
// ─────────────────────────────────────────────────────────────────────
function insertPosition(arr, x) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < x) lo = mid + ___;
    else hi = ___;
  }
  return lo;
}
const zlozitost6 = '___';

module.exports = { minSubArrayLen, sortedFrequency, zlozitost5, insertPosition, zlozitost6 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('03 Sliding Window a D&C – Doplň kód', require('./testy').doplnenie, module.exports);
}
