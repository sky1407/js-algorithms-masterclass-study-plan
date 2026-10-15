/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  07 MERGE, QUICK A RADIX SORT – HĽADANIE CHÝB (príklady 7–9)     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na „bežných“ vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá
 *      (zlý výsledok ALEBO pád programu).
 *      Napr. pre f(arr, key) zápis [[{ v: 1 }], 'v'] znamená f([{ v: 1 }], 'v').
 *      Protipríklad môžeš aj vygenerovať: [Array.from({ length: 5 }, (_, i) => i)]
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) mergeSortBy – zoradí objekty podľa kľúča. Musí byť STABILNÝ
//    (to je hlavná výhoda merge sortu oproti quick sortu!).
// ─────────────────────────────────────────────────────────────────────
function mergeSortBy(arr, key) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortBy(arr.slice(0, mid), key);
  const right = mergeSortBy(arr.slice(mid), key);
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i][key] < right[j][key]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) quickSortSafe – quick sort, ktorý má zvládnuť aj VEĽKÉ už zoradené
//    alebo opačne zoradené polia (napr. 50 000 prvkov).
//    Tip na opravu: pivot nevyberaj naslepo z okraja – vyber náhodný prvok
//    a vymeň ho s prvým.
// ─────────────────────────────────────────────────────────────────────
function quickSortSafe(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pv = arr[left];
    let p = left;
    for (let i = left + 1; i <= right; i++) {
      if (pv > arr[i]) {
        p++;
        [arr[p], arr[i]] = [arr[i], arr[p]];
      }
    }
    [arr[left], arr[p]] = [arr[p], arr[left]];
    quickSortSafe(arr, left, p - 1);
    quickSortSafe(arr, p + 1, right);
  }
  return arr;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) radixSortSigned – radix sort pre CELÉ čísla (aj záporné)
//    radixSortSigned([3, -20, 15]) → [-20, 3, 15]
// ─────────────────────────────────────────────────────────────────────
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function radixSortSigned(nums) {
  let maxDigits = 0;
  for (const n of nums) maxDigits = Math.max(maxDigits, digitCount(n));
  for (let k = 0; k < maxDigits; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const n of nums) buckets[getDigit(n, k)].push(n);
    nums = [].concat(...buckets);
  }
  return nums;
}
const protipriklad9 = ___;

module.exports = { mergeSortBy, protipriklad7, quickSortSafe, protipriklad8, radixSortSigned, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('07 Merge, Quick, Radix – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
