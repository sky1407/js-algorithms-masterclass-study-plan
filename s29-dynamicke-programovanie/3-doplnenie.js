/*
 * s29 Dynamické programovanie – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) fibM – Fibonacci s memo
//    fibM(20) → 6765
function fibM(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= ___) return 1;
  memo[n] = fibM(n - 1, memo) + fibM(n - 2, memo);
  return memo[n];
}

// 2) fibM2 – Fibonacci s memo
//    fibM2(30) → 832040
function fibM2(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibM2(n - 1, memo) + fibM2(n - 2, memo);
  return ___[n];
}

// 3) fibT – Fibonacci tabuláciou
//    fibT(10) → 55
function fibT(n) {
  const table = [0, 1, ___];
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}

// 4) fibT2 – Fibonacci tabuláciou
//    fibT2(12) → 144
function fibT2(n) {
  const table = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 1] + table[i - ___];
  }
  return table[n];
}

// 5) stairsMemo – schody po 1 alebo 2 s memo
//    stairsMemo(4) → 5
function stairsMemo(n, memo = {}) {
  if (n <= 1) return 1;
  if (n in memo) return memo[___];
  memo[n] = stairsMemo(n - 1, memo) + stairsMemo(n - 2, memo);
  return memo[n];
}

// 6) waysToPay – počet spôsobov zaplatenia
//    waysToPay([1, 2, 5], 5) → 4
function waysToPay(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = ___;
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) dp[a] += dp[a - coin];
  }
  return dp[amount];
}

// 7) waysToPay2 – počet spôsobov zaplatenia
//    waysToPay2([1, 2, 5], 5) → 4
function waysToPay2(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) dp[a] += dp[a - ___];
  }
  return dp[amount];
}

// 8) fewestCoins – najmenej mincí, inak -1
//    fewestCoins([1, 2, 5], 11) → 3
function fewestCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + ___);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 9) paths – cesty v mriežke r × c
//    paths(3, 3) → 6
function paths(r, c, memo = {}) {
  const key = r + ',' + ___;
  if (key in memo) return memo[key];
  if (r === 1 || c === 1) return 1;
  memo[key] = paths(r - 1, c, memo) + paths(r, c - 1, memo);
  return memo[key];
}

// 10) kadane – najväčší súčet súvislého úseku (dve ___)
//     kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6
function kadane(arr) {
  let cur = arr[0];
  let best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const x = arr[i];
    cur = Math.max(x, cur + ___);
    best = Math.___(best, cur);
  }
  return best;
}

module.exports = { fibM, fibM2, fibT, fibT2, stairsMemo, waysToPay, waysToPay2, fewestCoins, paths, kadane };

if (require.main === module) {
  require('../lib/test-runner').spusti('s29 Dynamické programovanie – Doplň kód', require('./testy').doplnenie, module.exports);
}
