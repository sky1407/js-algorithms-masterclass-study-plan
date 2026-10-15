/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  16 DYNAMICKÉ PROGRAMOVANIE – SCENÁRE Z PRAXE (príklady 13–14)   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Spustenie:
 *   node 5-scenare.js       → všetky príklady
 *   node 5-scenare.js 13    → len príklad 13
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 13) atmWithdraw – bankomat má len niektoré druhy bankoviek
//     (každej dosť kusov). Vydaj sumu NAJMENŠÍM počtom bankoviek.
//     Vráť zoznam bankoviek zoradený zostupne, alebo null, ak sa nedá.
//
//     atmWithdraw([50, 20], 60) → [20, 20, 20]
//     (Greedy by vydal 50 a zostalo by 10, ktoré sa vydať nedá!)
//     Tip: popri dp[a] si pamätaj, ktorú bankovku si pridal naposledy.
// ─────────────────────────────────────────────────────────────────────
function atmWithdraw(notes, amount) {
}

// ─────────────────────────────────────────────────────────────────────
// 14) maxProfitJobs – freelancer dostal ponuky zákaziek
//     { start, end, profit }. Naraz robí len jednu; zákazka končiaca
//     v čase t a ďalšia začínajúca v čase t sa NEprekrývajú.
//     Aký najväčší zisk môže dosiahnuť? Vstup nemeň.
//
//     Tip: zoraď podľa konca. dp[i] = najlepší zisk z prvých i zákaziek
//     = max(bez i-tej, s i-tou + dp[poslednej kompatibilnej]).
//     Kompatibilnú hľadaj binárne → O(n log n). 20 000 zákaziek do 300 ms.
// ─────────────────────────────────────────────────────────────────────
function maxProfitJobs(jobs) {
}

module.exports = { atmWithdraw, maxProfitJobs };

if (require.main === module) {
  require('../../lib/test-runner').spusti('16 Dynamické programovanie – Scenáre z praxe', require('./testy').scenare, module.exports);
}
