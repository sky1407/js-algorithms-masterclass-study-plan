/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  01 POLIA A OBJEKTY – PRAKTICKÉ ÚLOHY (príklady 10–12)           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Napíš funkcie od nuly. Pozor na okrajové prípady (prázdne vstupy,
 * nemeniť vstupné dáta, ...).
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) Big O kvíz – doplň zložitosť každej operácie
//     (n = počet prvkov v poli / kľúčov v objekte)
// ─────────────────────────────────────────────────────────────────────
const zlozitosti = {
  objektVlozenie: '___',         // obj.novy = 1
  objektPristupKlucom: '___',    // obj.meno
  objektHladanieHodnoty: '___',  // Object.values(obj).includes('Eva')
  objectKeys: '___',             // Object.keys(obj)
  poleIndex: '___',              // arr[42]
  polePush: '___',               // arr.push(x)
  polePop: '___',                // arr.pop()
  poleUnshift: '___',            // arr.unshift(x)
  poleShift: '___',              // arr.shift()
  poleIncludes: '___',           // arr.includes(x)
  poleSort: '___',               // arr.sort((a, b) => a - b)
};

// ─────────────────────────────────────────────────────────────────────
// 11) rotateLeft – vráti NOVÉ pole otočené o k pozícií doľava
//     rotateLeft([1, 2, 3, 4, 5], 2) → [3, 4, 5, 1, 2]
//     k môže byť väčšie ako dĺžka poľa: rotateLeft([1..5], 7) = rotateLeft([1..5], 2)
// ─────────────────────────────────────────────────────────────────────
function rotateLeft(arr, k) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) diffObjects – porovná dva objekty a vráti abecedne zoradené kľúče:
//     added   – kľúče, ktoré sú len v b
//     removed – kľúče, ktoré sú len v a
//     changed – kľúče v oboch, ale s inou hodnotou (porovnávaj cez ===)
//     diffObjects({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5 })
//       → { added: ['d'], removed: ['a'], changed: ['c'] }
//     Pozor: kľúč s hodnotou undefined stále existuje!
// ─────────────────────────────────────────────────────────────────────
function diffObjects(a, b) {
}

module.exports = { zlozitosti, rotateLeft, diffObjects };

if (require.main === module) {
  require('../../lib/test-runner').spusti('01 Polia a objekty – Praktické úlohy', require('./testy').prakticke, module.exports);
}
