/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  07 MERGE, QUICK A RADIX SORT – DOPLŇ KÓD (príklady 4–6)         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) Pomocné funkcie pre radix sort
//    getDigit(12345, 0) → 5   (cifra na pozícii i sprava)
//    digitCount(314)    → 3   (počet cifier; digitCount(0) → 1)
//    mostDigits([1, 100, 99]) → 3
// ─────────────────────────────────────────────────────────────────────
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, ___)) % ___;
}

function digitCount(num) {
  if (num === 0) return ___;
  return Math.floor(Math.log10(Math.abs(num))) + ___;
}

function mostDigits(nums) {
  let max = 0;
  for (const n of nums) max = Math.max(max, ___);
  return max;
}

// ─────────────────────────────────────────────────────────────────────
// 5) radixSort – nezáporné celé čísla, triedenie po cifrách (LSD)
//    Používa tvoje funkcie z príkladu 4.
// ─────────────────────────────────────────────────────────────────────
function radixSort(nums) {
  const maxDigits = mostDigits(nums);
  for (let k = 0; k < maxDigits; k++) {
    const buckets = Array.from({ length: ___ }, () => []);
    for (const n of nums) buckets[getDigit(n, ___)].push(n);
    nums = [].concat(...___);
  }
  return nums;
}

// ─────────────────────────────────────────────────────────────────────
// 6) quickSortLomuto – iná schéma partition: pivot = POSLEDNÝ prvok.
//    Všetko menšie ako pivot presunie doľava, pivot dá hneď za to
//    a vráti jeho index.
// ─────────────────────────────────────────────────────────────────────
function partition(arr, lo, hi) {
  const pivotValue = arr[___];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivotValue) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return ___;
}

function quickSortLomuto(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSortLomuto(arr, lo, p - 1);
    quickSortLomuto(arr, p + 1, hi);
  }
  return arr;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort, quickSortLomuto };

if (require.main === module) {
  require('../../lib/test-runner').spusti('07 Merge, Quick, Radix – Doplň kód', require('./testy').doplnenie, module.exports);
}
