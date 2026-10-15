/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  06 ZÁKLADNÉ TRIEDENIA – SCENÁRE Z PRAXE (príklady 13–14)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Vstavané .sort() je zakázané – vyber si vhodný z troch základných algoritmov.
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) leaderboard – rebríček hráčov v hre.
//     players = [{ name: 'ada', score: 900, time: 95 }, ...]
//
//     Poradie: vyššie skóre vyhráva; pri rovnosti rýchlejší čas (menší time);
//     pri rovnosti aj času meno abecedne.
//     Vráť pole reťazcov: ['1. cyril (1200)', '2. marek (1200)', ...]
//     Vstupné pole nemeň.
// ─────────────────────────────────────────────────────────────────────
function leaderboard(players) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) sortNearlySorted – senzor posiela merania s časovou značkou, ale
//     sieť občas prehodí poradie – každý prvok je najviac pár pozícií
//     od svojho správneho miesta. Zoraď pole NA MIESTE.
//
//     Pre 40 000 meraní musí byť hotovo do 150 ms.
//     Ktorý z bubble / selection / insertion sortu je na takéto dáta najlepší
//     a prečo? (Selection sort to nestihne – prečo?)
// ─────────────────────────────────────────────────────────────────────
function sortNearlySorted(arr) {
}

module.exports = { leaderboard, sortNearlySorted };

if (require.main === module) {
  require('../../lib/test-runner').spusti('06 Základné triedenia – Scenáre z praxe', require('./testy').scenare, module.exports);
}
