/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  13 HASH TABLES – SCENÁRE Z PRAXE (príklady 13–14)               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) RateLimiter – ochrana API: každý používateľ smie urobiť najviac
//     `limit` requestov v ľubovoľnom okne dĺžky `windowMs`.
//
//     new RateLimiter(3, 1000)
//     allow(userId, time) → true (request prejde a započíta sa)
//                           false (zamietnutý, NEzapočíta sa)
//
//     Request v čase t sa „počíta“ pre všetky časy < t + windowMs.
//     Čas `time` (ms) volania prichádza vzostupne.
//     Používatelia sú navzájom nezávislí.
// ─────────────────────────────────────────────────────────────────────
class RateLimiter {
}

// ─────────────────────────────────────────────────────────────────────
// 14) findDuplicateFiles – upratovanie disku: nájdi súbory s rovnakým
//     obsahom.
//     files = [{ path: '/fotky/a.jpg', content: 'abc123' }, ...]
//
//     Vráť skupiny ciest (len skupiny s 2+ súbormi). Cesty v skupine
//     zoradené abecedne, skupiny zoradené podľa svojej prvej cesty.
// ─────────────────────────────────────────────────────────────────────
function findDuplicateFiles(files) {
}

module.exports = { RateLimiter, findDuplicateFiles };

if (require.main === module) {
  require('../../lib/test-runner').spusti('13 Hash Tables – Scenáre z praxe', require('./testy').scenare, module.exports);
}
