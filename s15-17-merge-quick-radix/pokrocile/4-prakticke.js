/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  07 MERGE, QUICK A RADIX SORT – PRAKTICKÉ ÚLOHY (10–12)          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly. Vstavané .sort() je zakázané.
 * Testy merajú čas – O(n²) riešenie neprejde.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) mergeSortFull – merge sort úplne od nuly (aj s merge).
//     Vráti NOVÉ zoradené pole, vstup nemení. 100 000 prvkov do 400 ms.
// ─────────────────────────────────────────────────────────────────────
function mergeSortFull(arr) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) quickSelect – k-ty najmenší prvok (k od 1) BEZ zoradenia celého poľa.
//     Priemerne O(n): partition ako v quick sorte, ale rekurzia (alebo cyklus)
//     pokračuje len do JEDNEJ strany. Vstup nemeň. Neplatné k → undefined.
//     quickSelect([7, 10, 4, 3, 20, 15], 3) → 7
// ─────────────────────────────────────────────────────────────────────
function quickSelect(arr, k) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) countInversions – počet dvojíc i < j, kde arr[i] > arr[j].
//     Naivne O(n²); ty to sprav v O(n log n) – počas merge sortu:
//     keď berieš prvok z PRAVEJ polovice, je menší ako všetky
//     zostávajúce prvky ľavej polovice.
//     countInversions([2, 4, 1, 3, 5]) → 3
// ─────────────────────────────────────────────────────────────────────
function countInversions(arr) {
}

module.exports = { mergeSortFull, quickSelect, countInversions };

if (require.main === module) {
  require('../../lib/test-runner').spusti('07 Merge, Quick, Radix – Praktické úlohy', require('./testy').prakticke, module.exports);
}
