/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  03 SLIDING WINDOW A DIVIDE AND CONQUER – SCENÁRE (13–14)        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) peakTraffic – monitoring servera.
//     requests[i] = počet requestov v i-tej minúte.
//     Nájdi úsek `minutes` po sebe idúcich minút s najväčším súčtom.
//     Vráť { start: <index prvej minúty>, total: <súčet> }.
//     Pri zhode vráť najskorší úsek. Ak je dát málo, vráť null.
//
//     peakTraffic([5, 8, 3, 10, 12, 4], 2) → { start: 3, total: 22 }
//
//     Dáta za mesiac = 43 200 minút, okno 60 minút → žiadne vnorené cykly.
// ─────────────────────────────────────────────────────────────────────
function peakTraffic(requests, minutes) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) findFirstBadDeploy – „git bisect“
//     deploys = verzie v poradí, ako išli na produkciu: ['v1', 'v2', ...]
//     isBroken(verzia) → true/false. Keď sa raz niečo pokazilo,
//     všetky ďalšie verzie sú tiež pokazené.
//     Vráť PRVÚ pokazenú verziu, alebo null, ak sú všetky v poriadku.
//
//     Jeden test (isBroken) trvá 10 minút → pri 1000 verziách
//     ho smieš zavolať najviac 11×.
// ─────────────────────────────────────────────────────────────────────
function findFirstBadDeploy(deploys, isBroken) {
}

module.exports = { peakTraffic, findFirstBadDeploy };

if (require.main === module) {
  require('../../lib/test-runner').spusti('03 Sliding Window a D&C – Scenáre z praxe', require('./testy').scenare, module.exports);
}
