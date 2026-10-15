/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  13 HASH TABLES – PRAKTICKÉ ÚLOHY (príklady 10–12)               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Používaj Map / Set (to sú hašovacie tabuľky v JS). Cieľ: O(n).
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) firstUniqueChar – index prvého znaku, ktorý sa v reťazci
//     vyskytuje len raz, alebo -1.
//     firstUniqueChar('loveleetcode') → 2
// ─────────────────────────────────────────────────────────────────────
function firstUniqueChar(s) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) longestConsecutive – dĺžka najdlhšej postupnosti po sebe idúcich
//     celých čísel (v poli môžu byť v ľubovoľnom poradí).
//     [100, 4, 200, 1, 3, 2] → 4   (1, 2, 3, 4)
//     Bez triedenia, O(n).
// ─────────────────────────────────────────────────────────────────────
function longestConsecutive(nums) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) subarraySum – koľko SÚVISLÝCH úsekov má súčet presne k?
//     (Čísla môžu byť aj záporné → sliding window tu nefunguje!)
//     subarraySum([1, 1, 1], 2) → 2
//     Tip: prefixový súčet. Ak je súčet po i-ty prvok S, hľadáš, koľkokrát
//     sa predtým objavil prefixový súčet S - k.
// ─────────────────────────────────────────────────────────────────────
function subarraySum(nums, k) {
}

module.exports = { firstUniqueChar, longestConsecutive, subarraySum };

if (require.main === module) {
  require('../../lib/test-runner').spusti('13 Hash Tables – Praktické úlohy', require('./testy').prakticke, module.exports);
}
