/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  10 STACK A QUEUE – SCENÁRE Z PRAXE (príklady 13–14)             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) Editor – textový editor s Ctrl+Z / Ctrl+Y.
//
//     type(chars)    – pripíše text na koniec, vráti celý text
//     deleteChars(n) – zmaže n znakov z konca (najviac všetky), vráti text
//     undo()         – vráti sa o jeden krok späť, vráti text
//     redo()         – zopakuje vrátený krok, vráti text
//
//     Každé type/deleteChars je jeden krok. Nová úprava po undo
//     zmaže možnosť redo (ako v každom editore).
//     Tip: dva zásobníky – undoStack a redoStack.
// ─────────────────────────────────────────────────────────────────────
class Editor {
}

// ─────────────────────────────────────────────────────────────────────
// 14) roundRobin – plánovač procesov v operačnom systéme.
//     tasks = [{ id: 'A', time: 3 }, ...]  (time = potrebný čas CPU)
//     Procesor berie úlohy z FRONTY, každej dá najviac `quantum` času.
//     Ak úloha ešte nie je hotová, zaradí sa na KONIEC fronty.
//     Vráť poradie, v akom sa úlohy dokončili (ich id).
//
//     tasks A=3, B=1, C=2, quantum 1 → ['B', 'C', 'A']
//     Vstupné objekty nemeň.
// ─────────────────────────────────────────────────────────────────────
function roundRobin(tasks, quantum) {
}

module.exports = { Editor, roundRobin };

if (require.main === module) {
  require('../../lib/test-runner').spusti('10 Stack a Queue – Scenáre z praxe', require('./testy').scenare, module.exports);
}
