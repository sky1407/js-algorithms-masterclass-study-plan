/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  12 BINARY HEAP A PRIORITY QUEUE – SCENÁRE Z PRAXE (13–14)       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Vstavané .sort() je zakázané. Skopíruj si sem svoju MinHeap
 * z 4-prakticke.js (alebo napíš novú).
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) minMeetingRooms – firma plánuje stretnutia [začiatok, koniec].
//     Koľko zasadačiek treba, aby sa žiadne dve prekrývajúce stretnutia
//     nekonali v tej istej? (Stretnutie končiace o 10:00 a začínajúce
//     o 10:00 sa neprekrývajú.)
//     minMeetingRooms([[0, 30], [5, 10], [15, 20]]) → 2
//     Tip: stretnutia spracuj podľa začiatku; v min-halde drž časy
//     KONCA práve bežiacich stretnutí.
// ─────────────────────────────────────────────────────────────────────
function minMeetingRooms(meetings) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) topKHashtags – k najpoužívanejších hashtagov.
//     Pri rovnakom počte rozhoduje abecedné poradie.
//     Výsledok od najpopulárnejšieho.
//     ['#js', '#ai', '#js', '#ai', '#css'], k = 2 → ['#ai', '#js']
//     Tip: spočítaj (Map), potom min-halda veľkosti k.
// ─────────────────────────────────────────────────────────────────────
function topKHashtags(tags, k) {
}

module.exports = { minMeetingRooms, topKHashtags };

if (require.main === module) {
  require('../../lib/test-runner').spusti('12 Binary Heap – Scenáre z praxe', require('./testy').scenare, module.exports);
}
