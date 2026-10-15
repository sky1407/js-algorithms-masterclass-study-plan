/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  15 DIJKSTROV ALGORITMUS – PRAKTICKÉ ÚLOHY (príklady 10–12)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Vážený graf: { A: [{ node: 'B', weight: 4 }, ...], ... }
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) fastDijkstra – vzdialenosti zo start do všetkých vrcholov
//     (nedosiahnuteľný → Infinity), ale RÝCHLO: prioritná fronta ako
//     BINÁRNA HALDA (z témy 12), nie pole so .sort() po každom vložení.
//     Test: 20 000 vrcholov a 100 000 hrán do 600 ms.
// ─────────────────────────────────────────────────────────────────────
function fastDijkstra(graph, start) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) minimumEffort – turistická mapa výšok. Ideš z ľavého horného rohu
//     do pravého dolného (4 smery). „Námaha“ cesty = NAJVÄČŠÍ výškový
//     rozdiel medzi dvoma susednými políčkami na ceste. Nájdi minimum.
//     [[1, 2, 2], [3, 8, 2], [5, 3, 5]] → 2
//     Tip: Dijkstra, ale „vzdialenosť“ = max(doterajšia, |rozdiel|),
//     nie súčet.
// ─────────────────────────────────────────────────────────────────────
function minimumEffort(heights) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) nearestHospital – pre KAŽDÚ obec vzdialenosť k NAJBLIŽŠEJ nemocnici.
//     hospitals = zoznam obcí s nemocnicou. Bez nemocnice → Infinity.
//     Tip: „multi-source“ Dijkstra – na začiatku daj do fronty
//     VŠETKY nemocnice so vzdialenosťou 0. Jeden beh stačí.
// ─────────────────────────────────────────────────────────────────────
function nearestHospital(graph, hospitals) {
}

module.exports = { fastDijkstra, minimumEffort, nearestHospital };

if (require.main === module) {
  require('../../lib/test-runner').spusti('15 Dijkstra – Praktické úlohy', require('./testy').prakticke, module.exports);
}
