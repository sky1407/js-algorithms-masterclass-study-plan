/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  02 FREQUENCY COUNTER A MULTIPLE POINTERS – DOPLŇ KÓD (4–6)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom a doplň zložitosti ('___').
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) validAnagram – sú dva reťazce anagramy? (frequency counter)
//    validAnagram('anagram', 'nagaram') → true
// ─────────────────────────────────────────────────────────────────────
function validAnagram(a, b) {
  if (a.length !== b.length) return ___;
  const lookup = {};
  for (const ch of a) lookup[ch] = (lookup[ch] || ___) + 1;
  for (const ch of b) {
    if (!lookup[ch]) return false;
    lookup[ch] -= ___;
  }
  return true;
}
const zlozitost4 = '___';

// ─────────────────────────────────────────────────────────────────────
// 5) areThereDuplicates – je medzi argumentmi duplikát?
//    Riešenie cez TRIEDENIE + dva ukazovatele idúce vedľa seba.
//    areThereDuplicates(1, 2, 2) → true
// ─────────────────────────────────────────────────────────────────────
function areThereDuplicates(...args) {
  args.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  let start = 0;
  let next = ___;
  while (next < args.length) {
    if (args[start] === args[___]) return true;
    start++;
    next++;
  }
  return false;
}
const zlozitost5 = '___';

// ─────────────────────────────────────────────────────────────────────
// 6) isSubsequence – sú znaky s obsiahnuté v t v rovnakom poradí?
//    (nemusia ísť hneď za sebou)
//    isSubsequence('sing', 'sting') → true
//    isSubsequence('abc', 'acb')    → false
// ─────────────────────────────────────────────────────────────────────
function isSubsequence(s, t) {
  let i = 0;
  let j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] === t[___]) i += ___;
    j++;
  }
  return i === ___;
}

module.exports = { validAnagram, zlozitost4, areThereDuplicates, zlozitost5, isSubsequence };

if (require.main === module) {
  require('../../lib/test-runner').spusti('02 Frequency Counter a Pointers – Doplň kód', require('./testy').doplnenie, module.exports);
}
