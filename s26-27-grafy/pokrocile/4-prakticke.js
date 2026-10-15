/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  14 GRAFY – PRAKTICKÉ ÚLOHY (príklady 10–12)                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) numIslands – mapa ako 2D pole znakov '1' (pevnina) a '0' (voda).
//     Ostrov = pevnina spojená hore/dole/vľavo/vpravo (nie diagonálne).
//     Koľko je ostrovov? Vstupnú mapu NEMEŇ.
//     (Mriežka je graf: políčko = vrchol, susedné políčka = hrany.)
// ─────────────────────────────────────────────────────────────────────
function numIslands(grid) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) shortestPath – najkratšia cesta (najmenej hrán) ako pole vrcholov
//     od start po end, alebo null. Graf = zoznam susedov.
//     Tip: BFS a pre každý vrchol si zapamätaj, odkiaľ si doňho prišiel
//     (parent). Cestu potom poskladaj od konca.
//     Pri viacerých rovnako krátkych cestách vyhrá tá, ktorú BFS nájde
//     prvú (susedov prechádzaj v poradí zo zoznamu).
// ─────────────────────────────────────────────────────────────────────
function shortestPath(graph, start, end) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) topologicalSort – úlohy a závislosti [pred, po] („pred“ musí byť
//     hotové skôr ako „po“). Vráť poradie vykonania, alebo null pri cykle.
//     Ak je naraz pripravených viac úloh, vezmi abecedne prvú.
//     Tip: Kahnov algoritmus – počítaj vstupné stupne, začni úlohami
//     s nulou, po dokončení úlohy zníž stupeň jej nasledovníkom.
// ─────────────────────────────────────────────────────────────────────
function topologicalSort(tasks, deps) {
}

module.exports = { numIslands, shortestPath, topologicalSort };

if (require.main === module) {
  require('../../lib/test-runner').spusti('14 Grafy – Praktické úlohy', require('./testy').prakticke, module.exports);
}
