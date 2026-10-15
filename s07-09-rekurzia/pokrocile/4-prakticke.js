/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  04 REKURZIA – PRAKTICKÉ ÚLOHY (príklady 10–12)                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly – REKURZÍVNE.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) someRecursive – vráti true, ak aspoň jeden prvok spĺňa cb.
//     Bez .some() a bez cyklov.
//     someRecursive([4, 6, 8, 9], x => x % 2 !== 0) → true
// ─────────────────────────────────────────────────────────────────────
function someRecursive(arr, cb) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) collectStrings – vráti všetky reťazce z ľubovoľne vnoreného objektu
//     (aj z polí) v poradí, v akom sa v ňom nachádzajú.
//     collectStrings({ a: 'x', b: { c: 'y' } }) → ['x', 'y']
// ─────────────────────────────────────────────────────────────────────
function collectStrings(obj) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) permutations – všetky RÔZNE permutácie reťazca, abecedne zoradené
//     permutations('abc') → ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
//     permutations('aab') → ['aab', 'aba', 'baa']
//     permutations('')    → ['']
// ─────────────────────────────────────────────────────────────────────
function permutations(str) {
}

module.exports = { someRecursive, collectStrings, permutations };

if (require.main === module) {
  require('../../lib/test-runner').spusti('04 Rekurzia – Praktické úlohy', require('./testy').prakticke, module.exports);
}
