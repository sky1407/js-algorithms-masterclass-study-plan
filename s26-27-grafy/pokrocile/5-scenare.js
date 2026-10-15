/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  14 GRAFY – SCENÁRE Z PRAXE (príklady 13–14)                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) suggestFriends – „Ľudia, ktorých možno poznáte“.
//     graph = { ja: ['eva', 'adam'], eva: ['ja', 'zuzka'], ... }
//     Navrhni ľudí, ktorí sú priateľmi tvojich priateľov, ale nie tvojimi
//     priateľmi (a nie si to ty). Ku každému počet spoločných priateľov.
//     Zoraď podľa počtu zostupne, pri zhode podľa mena.
//       → [{ name: 'zuzka', mutual: 3 }, ...]
// ─────────────────────────────────────────────────────────────────────
function suggestFriends(graph, user) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) spreadTime – firemná správa sa šíri: každý deň ju každý, kto ju
//     už pozná, povie všetkým svojim kontaktom.
//     V deň 0 ju pozná len `start`.
//     Vráť { days: <po koľkých dňoch ju vedia všetci dosiahnuteľní>,
//            unreachable: <abecedne zoradení, ku ktorým sa nedostane> }
// ─────────────────────────────────────────────────────────────────────
function spreadTime(graph, start) {
}

module.exports = { suggestFriends, spreadTime };

if (require.main === module) {
  require('../../lib/test-runner').spusti('14 Grafy – Scenáre z praxe', require('./testy').scenare, module.exports);
}
