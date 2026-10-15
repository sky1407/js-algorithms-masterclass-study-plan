/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  16 DYNAMICKÉ PROGRAMOVANIE – HĽADANIE CHÝB (príklady 7–9)       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Napr. pre f(coins, amount) zápis [[1, 2], 5] znamená f([1, 2], 5).
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) minCoins – najmenej mincí na sumu (neobmedzene kusov), inak -1.
//    „Vždy zober najväčšiu mincu, ktorá sa zmestí“ – pre eurá to funguje...
// ─────────────────────────────────────────────────────────────────────
function minCoins(coins, amount) {
  const sorted = [...coins].sort((a, b) => b - a);
  let count = 0;
  let rest = amount;
  for (const c of sorted) {
    while (rest >= c) {
      rest -= c;
      count++;
    }
  }
  return rest === 0 ? count : -1;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) knapsack01 – batoh, každú vec najviac RAZ.
//    knapsack01([1, 3, 4, 5], [1, 4, 5, 7], 7) → 9
// ─────────────────────────────────────────────────────────────────────
function knapsack01(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let c = weights[i]; c <= capacity; c++) {
      dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) countCombinations – koľkými spôsobmi sa dá zaplatiť suma
//    (neobmedzene kusov z každej mince). Poradie mincí NEHRÁ rolu:
//    1 + 2 a 2 + 1 je ten istý spôsob.
//    countCombinations([1, 2, 5], 5) → 4
// ─────────────────────────────────────────────────────────────────────
function countCombinations(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) if (c <= a) dp[a] += dp[a - c];
  }
  return dp[amount];
}
const protipriklad9 = ___;

module.exports = { minCoins, protipriklad7, knapsack01, protipriklad8, countCombinations, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('16 Dynamické programovanie – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
