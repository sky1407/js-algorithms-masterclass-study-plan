/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  07 MERGE, QUICK A RADIX SORT – DEBUGGING (príklady 1–3)         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU. Spusti testy, prečítaj si, čo zlyhalo, a oprav kód.
 * Vstavané .sort() je zakázané.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) merge – spojí dve ZORADENÉ polia do jedného zoradeného
//    merge([1, 10, 50], [2, 14, 99, 100]) → [1, 2, 10, 14, 50, 99, 100]
// ─────────────────────────────────────────────────────────────────────
function merge(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < a.length) result.push(a[i++]);
  return result;
}

// ─────────────────────────────────────────────────────────────────────
// 2) mergeSort – rozdeľ na polovice, zoraď každú, spoj (vracia nové pole)
//    Pomocná funkcia mergeCorrect je už v poriadku.
// ─────────────────────────────────────────────────────────────────────
function mergeCorrect(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return result.concat(a.slice(i), b.slice(j));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid + 1));
  return mergeCorrect(left, right);
}
const zlozitost2 = '___';

// ─────────────────────────────────────────────────────────────────────
// 3) quickSort – verzia z kurzu: pivot = prvý prvok, pivot helper vráti
//    jeho konečný index. Triedi NA MIESTE.
//    Zložitosť: aká je v NAJHORŠOM prípade?
// ─────────────────────────────────────────────────────────────────────
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function pivot(arr, start = 0, end = arr.length - 1) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const p = pivot(arr, left, right);
    quickSort(arr, left, p - 1);
    quickSort(arr, p + 1, right);
  }
  return arr;
}
const zlozitost3 = '___';

module.exports = { merge, mergeSort, zlozitost2, quickSort, zlozitost3 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('07 Merge, Quick, Radix – Debugging', require('./testy').debug, module.exports);
}
