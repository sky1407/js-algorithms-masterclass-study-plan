/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  16 DYNAMICKÉ PROGRAMOVANIE – PRAKTICKÉ ÚLOHY (príklady 10–12)   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Postup pri DP:
 *   1. Čo presne znamená dp[i] (alebo dp[i][j])?
 *   2. Ako sa dp[i] vypočíta z menších podproblémov?
 *   3. Aké sú základné prípady?
 *   4. V akom poradí plniť tabuľku?
 *
 * Spustenie:
 *   node 4-prakticke.js       → všetky príklady
 *   node 4-prakticke.js 11    → len príklad 11
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 10) lisLength – dĺžka najdlhšej PRÍSNE rastúcej podpostupnosti
//     (prvky nemusia ísť za sebou).
//     [10, 9, 2, 5, 3, 7, 101, 18] → 4   (2, 3, 7, 101)
//     O(n²) prejde; bonus: O(n log n) cez „tails“ + binárne vyhľadávanie.
// ─────────────────────────────────────────────────────────────────────
function lisLength(nums) {
}

// ─────────────────────────────────────────────────────────────────────
// 11) editDistance – najmenší počet operácií (vlož / zmaž / nahraď znak),
//     ktorými zmeníš a na b. (Takto funguje „Mysleli ste…?“ vo vyhľadávaní.)
//     editDistance('horse', 'ros') → 3
// ─────────────────────────────────────────────────────────────────────
function editDistance(a, b) {
}

// ─────────────────────────────────────────────────────────────────────
// 12) rob – v rade domov je v každom suma peňazí. Nesmieš vykradnúť
//     dva SUSEDNÉ domy (spustí sa alarm). Aký je najväčší zisk?
//     rob([2, 7, 9, 3, 1]) → 12   (2 + 9 + 1)
//     Bonus: pamäť O(1) – stačia dve premenné.
// ─────────────────────────────────────────────────────────────────────
function rob(houses) {
}

module.exports = { lisLength, editDistance, rob };

if (require.main === module) {
  require('../../lib/test-runner').spusti('16 Dynamické programovanie – Praktické úlohy', require('./testy').prakticke, module.exports);
}
