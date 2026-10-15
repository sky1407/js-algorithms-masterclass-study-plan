/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  03 SLIDING WINDOW A DIVIDE AND CONQUER – PRAKTICKÉ (10–12)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly. Testy kontrolujú aj rýchlosť (O(n) / O(log n)).
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) longestSubarrayWithSumAtMost – pole NEZÁPORNÝCH čísel.
//     Vráť dĺžku najdlhšieho súvislého úseku so súčtom ≤ limit.
//     longestSubarrayWithSumAtMost([1, 2, 1, 0, 1, 1, 0], 4) → 5
//     (Okno s premenlivou dĺžkou, O(n).)
// ─────────────────────────────────────────────────────────────────────
function longestSubarrayWithSumAtMost(nums, limit) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) findRotatedIndex – otočené zoradené pole RÔZNYCH čísel.
//     Vráť index num alebo -1. Musí to byť O(log n)!
//     findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) → 2
//     Tip: po rozdelení na polovice je VŽDY aspoň jedna polovica zoradená.
// ─────────────────────────────────────────────────────────────────────
function findRotatedIndex(arr, num) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) sqrtFloor – celá časť druhej odmocniny nezáporného celého čísla n
//     BEZ Math.sqrt (binárne vyhľadávanie odpovede).
//     sqrtFloor(8) → 2,  sqrtFloor(16) → 4,  sqrtFloor(1e12) → 1000000
// ─────────────────────────────────────────────────────────────────────
function sqrtFloor(n) {
}

module.exports = { longestSubarrayWithSumAtMost, findRotatedIndex, sqrtFloor };

if (require.main === module) {
  require('../../lib/test-runner').spusti('03 Sliding Window a D&C – Praktické úlohy', require('./testy').prakticke, module.exports);
}
