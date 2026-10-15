/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  16 DYNAMICKÉ PROGRAMOVANIE – DEBUGGING (príklady 1–3)           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * DP = problém sa dá rozložiť na PREKRÝVAJÚCE sa podproblémy
 * a optimálne riešenie sa skladá z optimálnych riešení podproblémov.
 *   Memoizácia  = rekurzia zhora nadol + pamäť (memo)
 *   Tabulácia   = cyklus zdola nahor + tabuľka (pole)
 *
 * Každá funkcia má CHYBY.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) climbStairs – schody s n schodmi, naraz vyjdeš 1 alebo 2 schody.
//    Koľkými spôsobmi sa dostaneš hore?
//    climbStairs(1) → 1,  climbStairs(2) → 2,  climbStairs(3) → 3
//    Musí zvládnuť aj n = 70 okamžite.
// ─────────────────────────────────────────────────────────────────────
function climbStairs(n, memo = {}) {
  if (n <= 2) return 2;
  if (memo[n]) return memo[n];
  memo[n] = climbStairs(n - 1) + climbStairs(n - 2);
  return memo[n];
}
const zlozitost1 = '___';

// ─────────────────────────────────────────────────────────────────────
// 2) fibTab – n-té Fibonacciho číslo TABULÁCIOU (bez rekurzie)
//    fibTab(0) → 0,  fibTab(1) → 1,  fibTab(10) → 55
// ─────────────────────────────────────────────────────────────────────
function fibTab(n) {
  if (n <= 2) return 1;
  const table = new Array(n).fill(0);
  table[1] = 1;
  table[2] = 1;
  for (let i = 3; i < n; i++) table[i] = table[i - 1] + table[i - 2];
  return table[n];
}

// ─────────────────────────────────────────────────────────────────────
// 3) coinChangeMin – najmenší počet mincí (každej nominálnej hodnoty
//    je neobmedzene), ktorými zaplatíš presne amount. Nedá sa → -1.
//    dp[a] = najmenej mincí na sumu a
//    coinChangeMin([1, 2, 5], 11) → 3   (5 + 5 + 1)
//    Zložitosť zapíš ako O(n * k): n = amount, k = počet druhov mincí.
// ─────────────────────────────────────────────────────────────────────
function coinChangeMin(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount];
}
const zlozitost3 = '___';

module.exports = { climbStairs, zlozitost1, fibTab, coinChangeMin, zlozitost3 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('16 Dynamické programovanie – Debugging', require('./testy').debug, module.exports);
}
