/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  06 ZÁKLADNÉ TRIEDENIA – PRAKTICKÉ ÚLOHY (príklady 10–12)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly. Vstavané .sort() je zakázané.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) bubbleSortCmp – bubble sort s komparátorom (ako Array.sort):
//     cmp(a, b) < 0 → a ide pred b,  > 0 → a ide za b,  0 → nemeň poradie.
//     Triedi NA MIESTE, vracia to isté pole a musí byť STABILNÝ.
//     Pridaj optimalizáciu „žiadna výmena → koniec“.
// ─────────────────────────────────────────────────────────────────────
function bubbleSortCmp(arr, cmp) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) countSwaps – koľko výmen urobí bubble sort, kým pole zoradí?
//     (Vstupné pole nemeň.)
//     countSwaps([3, 2, 1]) → 3
//     Zaujímavosť: výsledok = počet „inverzií“ (dvojíc i < j, kde arr[i] > arr[j]).
// ─────────────────────────────────────────────────────────────────────
function countSwaps(arr) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) sortColors – pole obsahuje len 0, 1 a 2. Zoraď ho NA MIESTE
//     v JEDNOM prechode, O(n) (Dijkstrova „holandská vlajka“).
//     sortColors([2, 0, 2, 1, 1, 0]) → [0, 0, 1, 1, 2, 2]
//     Tip: tri ukazovatele low, mid, high.
// ─────────────────────────────────────────────────────────────────────
function sortColors(arr) {
}

module.exports = { bubbleSortCmp, countSwaps, sortColors };

if (require.main === module) {
  require('../../lib/test-runner').spusti('06 Základné triedenia – Praktické úlohy', require('./testy').prakticke, module.exports);
}
