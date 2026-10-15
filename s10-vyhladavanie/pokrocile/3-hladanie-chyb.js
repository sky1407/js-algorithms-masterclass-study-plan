/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  05 VYHĽADÁVANIE – HĽADANIE CHÝB (príklady 7–9)                  ║
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
// 7) lastIndexOf – index POSLEDNÉHO výskytu val v ZORADENOM poli, alebo -1.
//    O(log n).
//    lastIndexOf([1, 2, 3, 4], 3) → 2
// ─────────────────────────────────────────────────────────────────────
function lastIndexOf(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return mid;
    if (arr[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) containsValue – obsahuje NEZORADENÉ pole čísel hodnotu val?
//    (Zoradí si kópiu a hľadá binárne. Vstupné pole nemení.)
//    containsValue([5, 3, 8, 1], 8) → true
// ─────────────────────────────────────────────────────────────────────
function containsValue(arr, val) {
  const sorted = [...arr].sort();
  let left = 0;
  let right = sorted.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sorted[mid] === val) return true;
    if (sorted[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) findClosest – hodnota v ZORADENOM poli najbližšia k target.
//    Pri rovnakej vzdialenosti vráť menšiu. Prázdne pole → null.
//    findClosest([1, 5, 10], 9) → 10
// ─────────────────────────────────────────────────────────────────────
function findClosest(arr, target) {
  if (arr.length === 0) return null;
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return arr[left];
}
const protipriklad9 = ___;

module.exports = { lastIndexOf, protipriklad7, containsValue, protipriklad8, findClosest, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('05 Vyhľadávanie – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
