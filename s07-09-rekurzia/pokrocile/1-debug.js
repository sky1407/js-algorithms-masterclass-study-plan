/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  04 REKURZIA – DEBUGGING (príklady 1–3)                          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU. Spusti testy, prečítaj si, čo zlyhalo, a oprav kód.
 * Pri rekurzii si vždy polož dve otázky:
 *   1. Aký je ZÁKLADNÝ PRÍPAD (base case) a vracia správnu hodnotu?
 *   2. Približuje sa každé volanie k základnému prípadu?
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: vo VS Code debuggeri sleduj panel CALL STACK – vidíš každé rekurzívne volanie.
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) productOfArray – súčin všetkých prvkov poľa
//    productOfArray([1, 2, 3, 10]) → 60
//    productOfArray([])            → 1   (neutrálny prvok násobenia)
// ─────────────────────────────────────────────────────────────────────
function productOfArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] * productOfArray(arr.slice(1));
}

// ─────────────────────────────────────────────────────────────────────
// 2) flatten – sploští ľubovoľne vnorené pole
//    flatten([1, [2, [3, 4], [[5]]]]) → [1, 2, 3, 4, 5]
// ─────────────────────────────────────────────────────────────────────
function flatten(arr) {
  const result = [];
  for (const x of arr) {
    if (Array.isArray(x)) result.concat(flatten(x));
    else result.push(x);
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────
// 3) fib – n-té Fibonacciho číslo: 0, 1, 1, 2, 3, 5, 8, 13, ...
//    fib(0) → 0,  fib(1) → 1,  fib(10) → 55
//    Funkcia musí zvládnuť aj fib(70) okamžite → memoizácia.
//    Aká je zložitosť PO oprave?
// ─────────────────────────────────────────────────────────────────────
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
const zlozitost3 = '___';

module.exports = { productOfArray, flatten, fib, zlozitost3 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('04 Rekurzia – Debugging', require('./testy').debug, module.exports);
}
