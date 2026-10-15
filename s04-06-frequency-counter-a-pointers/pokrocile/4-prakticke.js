/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  02 FREQUENCY COUNTER A MULTIPLE POINTERS – PRAKTICKÉ (10–12)    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly. Cieľ: O(n) (alebo O(n) po zoradení), žiadne
 * vnorené cykly.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) constructNote – dá sa správa message poskladať z písmen letters?
//     Každé písmeno z letters sa dá použiť len raz.
//     constructNote('aa', 'abc')   → false
//     constructNote('abc', 'dcba') → true
// ─────────────────────────────────────────────────────────────────────
function constructNote(message, letters) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) findAllDuplicates – vráti všetky hodnoty, ktoré sa v poli opakujú,
//     každú len raz, zoradené vzostupne.
//     findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1]) → [2, 3]
// ─────────────────────────────────────────────────────────────────────
function findAllDuplicates(arr) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) countPairsWithSum – ZORADENÉ pole RÔZNYCH čísel. Koľko dvojíc
//     (i < j) má súčet target? Použi dva ukazovatele.
//     countPairsWithSum([1, 2, 3, 4, 5, 6], 7) → 3   (1+6, 2+5, 3+4)
// ─────────────────────────────────────────────────────────────────────
function countPairsWithSum(arr, target) {
}

module.exports = { constructNote, findAllDuplicates, countPairsWithSum };

if (require.main === module) {
  require('../../lib/test-runner').spusti('02 Frequency Counter a Pointers – Praktické úlohy', require('./testy').prakticke, module.exports);
}
