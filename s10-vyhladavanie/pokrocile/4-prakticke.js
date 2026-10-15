/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  05 VYHĽADÁVANIE – PRAKTICKÉ ÚLOHY (príklady 10–12)              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly. Testy počítajú, koľkokrát sa pozrieš do poľa,
 * takže lineárny prechod neprejde.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) searchRange – [prvý index, posledný index] hodnoty target
//     v ZORADENOM poli, alebo [-1, -1]. O(log n).
//     searchRange([5, 7, 7, 8, 8, 10], 8) → [3, 4]
// ─────────────────────────────────────────────────────────────────────
function searchRange(arr, target) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) findPeak – pole najprv OSTRO rastie, potom OSTRO klesá
//     (niektorá časť môže chýbať). Vráť index najväčšieho prvku v O(log n).
//     findPeak([0, 2, 5, 3, 1]) → 2
//     Tip: porovnaj arr[mid] s arr[mid + 1] – stúpaš, alebo klesáš?
// ─────────────────────────────────────────────────────────────────────
function findPeak(arr) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) minEatingSpeed – „binárne vyhľadávanie odpovede“
//     Máš kôpky úloh piles (počty úloh) a hours hodín. Za hodinu spravíš
//     najviac k úloh, a to len z JEDNEJ kôpky (zvyšok hodiny prepadne).
//     Aké je najmenšie celé k, aby si všetko stihol?
//     minEatingSpeed([3, 6, 7, 11], 8) → 4
//     Tip: ak to stihneš rýchlosťou k, stihneš to aj k + 1 → monotónnosť.
// ─────────────────────────────────────────────────────────────────────
function minEatingSpeed(piles, hours) {
}

module.exports = { searchRange, findPeak, minEatingSpeed };

if (require.main === module) {
  require('../../lib/test-runner').spusti('05 Vyhľadávanie – Praktické úlohy', require('./testy').prakticke, module.exports);
}
