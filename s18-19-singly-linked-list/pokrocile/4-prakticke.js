/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  08 SINGLY LINKED LIST – PRAKTICKÉ ÚLOHY (príklady 10–12)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Funkcie dostávajú HEAD zoznamu – obyčajné objekty { val, next }.
 * Prázdny zoznam = null. Nepoužívaj pole ako pomôcku – pracuj s uzlami.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) findMiddle – hodnota stredného uzla JEDNÝM prechodom
//     (bez zisťovania dĺžky). Pri párnom počte vráť druhý zo stredných.
//     1→2→3→4→5 → 3,   1→2→3→4 → 3,   null → null
//     Tip: pomalý ukazovateľ ide po 1, rýchly po 2.
// ─────────────────────────────────────────────────────────────────────
function findMiddle(head) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) hasCycle – ukazuje niektorý next späť na skorší uzol?
//     Pamäť O(1) – žiadna Set ani pole (Floyd: „korytnačka a zajac“).
// ─────────────────────────────────────────────────────────────────────
function hasCycle(head) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) mergeTwoSorted – spoj dva zoradené zoznamy do jedného zoradeného.
//     NEvytváraj nové uzly – len prepoj next ukazovatele. Vráť nový head.
//     1→3→5 + 2→4 ⇒ 1→2→3→4→5
//     Tip: pomocný „dummy“ uzol na začiatku zjednoduší kód.
// ─────────────────────────────────────────────────────────────────────
function mergeTwoSorted(a, b) {
}

module.exports = { findMiddle, hasCycle, mergeTwoSorted };

if (require.main === module) {
  require('../../lib/test-runner').spusti('08 Singly Linked List – Praktické úlohy', require('./testy').prakticke, module.exports);
}
