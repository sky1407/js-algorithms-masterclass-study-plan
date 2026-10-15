/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  04 REKURZIA – SCENÁRE Z PRAXE (príklady 13–14)                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Stromové dáta sú v praxi všade: súbory, kategórie, komentáre, menu, JSON z API.
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) folderSizes – ako príkaz `du`: veľkosť každého priečinka.
//
//     Súbor:     { name: 'app.js', size: 40 }
//     Priečinok: { name: 'src', children: [ ...súbory a priečinky ] }
//
//     Vráť objekt  cesta → celková veľkosť  pre KAŽDÝ priečinok (aj koreň).
//     Cesta = mená spojené lomkou: 'projekt/src/utils'
//
//     { name: 'p', children: [{ name: 'a.txt', size: 3 }, { name: 'd', children: [] }] }
//       → { p: 3, 'p/d': 0 }
// ─────────────────────────────────────────────────────────────────────
function folderSizes(tree) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) findPath – breadcrumb navigácia e-shopu
//     („Elektronika › Počítače › Notebooky“).
//
//     categories = [{ id: 1, name: 'Elektronika', children: [...] }, ...]
//     (children môže chýbať alebo byť prázdne pole)
//
//     Vráť pole mien od koreňa po kategóriu s daným id, alebo null.
//     findPath(categories, 3) → ['Elektronika', 'Počítače', 'Notebooky']
// ─────────────────────────────────────────────────────────────────────
function findPath(categories, id) {
}

module.exports = { folderSizes, findPath };

if (require.main === module) {
  require('../../lib/test-runner').spusti('04 Rekurzia – Scenáre z praxe', require('./testy').scenare, module.exports);
}
