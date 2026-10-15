/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  07 MERGE, QUICK A RADIX SORT – SCENÁRE Z PRAXE (13–14)          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Vstavané .sort() je zakázané.
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) mergeLogs – každý server má svoje logy UŽ zoradené podľa času:
//       servers = [
//         [{ time: 1, msg: 'A1' }, { time: 5, msg: 'A5' }],   // server 0
//         [{ time: 2, msg: 'B2' }, { time: 5, msg: 'B5' }],   // server 1
//       ]
//     Spoj ich do jedného chronologického zoznamu.
//     Pri rovnakom čase ide skôr log zo servera s menším indexom.
//
//     200 serverov × 500 logov do 400 ms.
//     Tip: spájaj servery po dvojiciach ako v merge sorte (divide and conquer),
//     nie jeden za druhým do čoraz dlhšieho výsledku.
// ─────────────────────────────────────────────────────────────────────
function mergeLogs(servers) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) sortOrderIds – čísla objednávok sú nezáporné celé čísla (max. 10 cifier).
//     Zoraď 200 000 objednávok vzostupne. Vráť zoradené pole.
//     Ideálny kandidát na radix sort: O(n·k), kde k = počet cifier.
// ─────────────────────────────────────────────────────────────────────
function sortOrderIds(ids) {
}

module.exports = { mergeLogs, sortOrderIds };

if (require.main === module) {
  require('../../lib/test-runner').spusti('07 Merge, Quick, Radix – Scenáre z praxe', require('./testy').scenare, module.exports);
}
