/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  12 BINARY HEAP A PRIORITY QUEUE – PRAKTICKÉ ÚLOHY (10–12)       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Vstavané .sort() je zakázané – na to máš haldu.
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) MinHeap – min-halda od nuly.
//     new MinHeap(cmp?)  – cmp(a, b) < 0 znamená „a má byť bližšie ku koreňu“
//                          (predvolene (a, b) => a - b)
//     insert(x)    → nová veľkosť
//     extractMin() → najmenší prvok alebo undefined
//     peek()       → najmenší prvok bez odobratia alebo undefined
//     size()       → počet prvkov
//     (Komparátor sa ti zíde v úlohách 11 a 12 aj v scenároch.)
// ─────────────────────────────────────────────────────────────────────
class MinHeap {
}

// ─────────────────────────────────────────────────────────────────────
// 11) kClosest – k bodov [x, y] najbližšie k počiatku [0, 0].
//     Výsledok zoradený od najbližšieho; pri rovnakej vzdialenosti
//     podľa poradia vo vstupe.
//     Tip: MAX-halda veľkosti k (najvzdialenejší na vrchu → vyhadzuj ho).
//     kClosest([[3, 3], [5, -1], [-2, 4]], 2) → [[3, 3], [-2, 4]]
// ─────────────────────────────────────────────────────────────────────
function kClosest(points, k) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) mergeKSorted – spoj k zoradených polí do jedného zoradeného.
//     V min-halde drž vždy len „aktuálny“ prvok z každého poľa → O(N log k).
//     mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]) → [1, 1, 2, 3, 4, 4, 5, 6]
// ─────────────────────────────────────────────────────────────────────
function mergeKSorted(arrays) {
}

module.exports = { MinHeap, kClosest, mergeKSorted };

if (require.main === module) {
  require('../../lib/test-runner').spusti('12 Binary Heap – Praktické úlohy', require('./testy').prakticke, module.exports);
}
