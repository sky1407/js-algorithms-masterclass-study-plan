/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  05 VYHĽADÁVANIE – SCENÁRE Z PRAXE (príklady 13–14)              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) highlight – vyhľadávacie pole na webe zvýrazní nájdené výrazy.
//     Obal každý výskyt query (BEZ ohľadu na veľkosť písmen) tagom <mark>,
//     pričom zachovaj pôvodný zápis z textu. Výskyty sa NEPREKRÝVAJÚ –
//     po nájdení pokračuj za koncom zhody.
//
//     highlight('Java a JavaScript', 'java')
//       → '<mark>Java</mark> a <mark>Java</mark>Script'
//     Prázdne query → text bez zmeny.
//     Bez RegExp, replace, indexOf a split – vlastný naivný string search.
// ─────────────────────────────────────────────────────────────────────
function highlight(text, query) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) valueAt – história cien produktu (zoradená podľa času):
//       [{ time: 100, value: 19.9 }, { time: 250, value: 17.5 }, ...]
//     Aká cena platila v čase `time`? = hodnota POSLEDNÉHO záznamu
//     s time <= zadaný čas. Ak je čas pred prvým záznamom, vráť null.
//
//     Reklamácie sa riešia pre milióny objednávok → O(log n).
// ─────────────────────────────────────────────────────────────────────
function valueAt(history, time) {
}

module.exports = { highlight, valueAt };

if (require.main === module) {
  require('../../lib/test-runner').spusti('05 Vyhľadávanie – Scenáre z praxe', require('./testy').scenare, module.exports);
}
