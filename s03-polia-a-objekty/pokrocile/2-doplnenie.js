/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  01 POLIA A OBJEKTY – DOPLŇ KÓD (príklady 4–6)                   ║
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
// 4) invert – vymení kľúče a hodnoty
//    invert({ a: 'x', b: 'y' }) → { x: 'a', y: 'b' }
// ─────────────────────────────────────────────────────────────────────
function invert(obj) {
  const result = {};
  for (const key of Object[___](obj)) {
    result[___] = key;
  }
  return result;
}
const zlozitost4 = '___';

// ─────────────────────────────────────────────────────────────────────
// 5) groupBy – zoskupí prvky podľa výsledku funkcie keyFn
//    groupBy([1, 2, 3], x => x % 2 === 0 ? 'parne' : 'neparne')
//      → { neparne: [1, 3], parne: [2] }
// ─────────────────────────────────────────────────────────────────────
function groupBy(items, keyFn) {
  const groups = {};
  for (const item of items) {
    const k = ___;
    if (!(k in groups)) groups[k] = ___;
    groups[k].push(item);
  }
  return groups;
}

// ─────────────────────────────────────────────────────────────────────
// 6) removeAt – vráti NOVÉ pole bez prvku na indexe (pôvodné nemení)
//    removeAt([10, 20, 30], 1) → [10, 30]
// ─────────────────────────────────────────────────────────────────────
function removeAt(arr, index) {
  return [...arr.slice(0, ___), ...arr.slice(___)];
}
const zlozitost6 = '___';

module.exports = { invert, zlozitost4, groupBy, removeAt, zlozitost6 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('01 Polia a objekty – Doplň kód', require('./testy').doplnenie, module.exports);
}
