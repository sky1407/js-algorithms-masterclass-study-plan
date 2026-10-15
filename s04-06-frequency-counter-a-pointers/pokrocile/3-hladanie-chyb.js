/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  02 FREQUENCY COUNTER A MULTIPLE POINTERS – HĽADANIE CHÝB (7–9)  ║
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
// 7) sameFrequency – majú dve kladné celé čísla rovnaké cifry
//    s rovnakou frekvenciou?
//    sameFrequency(182, 281) → true
//    sameFrequency(34, 14)   → false
// ─────────────────────────────────────────────────────────────────────
function sameFrequency(a, b) {
  const s1 = String(a);
  const s2 = String(b);
  if (s1.length !== s2.length) return false;
  for (const d of s1) if (!s2.includes(d)) return false;
  return true;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) averagePair – existuje v ZORADENOM poli dvojica DVOCH RÔZNYCH prvkov,
//    ktorej priemer je target?
//    averagePair([1, 2, 3], 2.5) → true
// ─────────────────────────────────────────────────────────────────────
function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    if (avg < target) left++;
    else right--;
  }
  return false;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) findPair – existujú v (nezoradenom) poli DVA RÔZNE prvky (rôzne indexy),
//    ktorých rozdiel je n?
//    findPair([6, 1, 4, 10, 2, 4], 2) → true
//    findPair([4, -2, 3, 10], -6)     → true
// ─────────────────────────────────────────────────────────────────────
function findPair(arr, n) {
  const seen = new Set(arr);
  for (const x of arr) if (seen.has(x + n)) return true;
  return false;
}
const protipriklad9 = ___;

module.exports = { sameFrequency, protipriklad7, averagePair, protipriklad8, findPair, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('02 Frequency Counter a Pointers – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
