/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  06 ZÁKLADNÉ TRIEDENIA – DOPLŇ KÓD (príklady 4–6)                ║
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
// 4) bubbleSortOptimized – ak počas celého prechodu nenastala ŽIADNA
//    výmena, pole je zoradené a môžeš skončiť.
//    cmp(a, b) > 0 znamená „a patrí za b“ (rovnako ako pri Array.sort).
// ─────────────────────────────────────────────────────────────────────
function bubbleSortOptimized(arr, cmp = (a, b) => a - b) {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = ___;
    for (let j = 0; j < i - 1; j++) {
      if (cmp(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = ___;
      }
    }
    if (noSwaps) return ___;
  }
  return arr;
}

// ─────────────────────────────────────────────────────────────────────
// 5) insertionSortCmp – insertion sort s vlastnou porovnávacou funkciou
//    insertionSortCmp([3, 1, 2], (a, b) => b - a) → [3, 2, 1]
// ─────────────────────────────────────────────────────────────────────
function insertionSortCmp(arr, cmp) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && cmp(arr[j], current) > ___) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = ___;
  }
  return arr;
}

// ─────────────────────────────────────────────────────────────────────
// 6) sortBy – selection sort poľa objektov podľa hodnoty kľúča
//    sortBy([{ cena: 5 }, { cena: 1 }], 'cena') → [{ cena: 1 }, { cena: 5 }]
// ─────────────────────────────────────────────────────────────────────
function sortBy(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j][___] < arr[lowest][key]) lowest = ___;
    }
    [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
  }
  return arr;
}

module.exports = { bubbleSortOptimized, insertionSortCmp, sortBy };

if (require.main === module) {
  require('../../lib/test-runner').spusti('06 Základné triedenia – Doplň kód', require('./testy').doplnenie, module.exports);
}
