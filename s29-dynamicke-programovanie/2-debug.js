/*
 * s29 Dynamické programovanie – DEBUGGING (10 úloh)
 *
 * Každá funkcia má presne JEDNU chybu. Nájdi ju a oprav.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: breakpoint + F5 → Node.js. Vo Variables sleduj memo alebo pole dp.
 */
'use strict';

// 1) fibMemo – Fibonacci s memoizáciou
//    fibMemo(10) → 55
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 1, memo);
  return memo[n];
}

// 2) fibTab – Fibonacci tabuláciou
//    fibTab(6) → 8
function fibTab(n) {
  if (n <= 2) return 1;
  const table = [0, 1, 1];
  for (let i = 3; i < n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}

// 3) fibTab2 – Fibonacci tabuláciou
//    fibTab2(10) → 55
function fibTab2(n) {
  const table = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}

// 4) climbStairs – koľkými spôsobmi vyjdeš n schodov po 1 alebo 2 (s memo)
//    climbStairs(4) → 5
function climbStairs(n, memo = {}) {
  if (n <= 1) return 0;
  if (n in memo) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

// 5) climbStairsTab – to isté tabuláciou
//    climbStairsTab(5) → 8
function climbStairsTab(n) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 1];
  }
  return dp[n];
}

// 6) coinWays – koľkými spôsobmi zaplatíš amount mincami coins
//    coinWays([1, 2, 5], 5) → 4
function coinWays(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 0;
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }
  return dp[amount];
}

// 7) minCoins – najmenší počet mincí na zaplatenie amount; ak sa nedá, -1
//    minCoins([1, 2, 5], 11) → 3
function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.max(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 8) gridPaths – počet ciest z ľavého horného do pravého dolného rohu mriežky r × c
//    gridPaths(3, 3) → 6
function gridPaths(r, c, memo = {}) {
  const key = String(r);
  if (key in memo) return memo[key];
  if (r === 1 || c === 1) return 1;
  memo[key] = gridPaths(r - 1, c, memo) + gridPaths(r, c - 1, memo);
  return memo[key];
}

// 9) maxSubarray – najväčší súčet súvislého úseku poľa (Kadane)
//    maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6
function maxSubarray(arr) {
  let cur = arr[0];
  let best = 0;
  for (let i = 1; i < arr.length; i++) {
    cur = Math.max(arr[i], cur + arr[i]);
    best = Math.max(best, cur);
  }
  return best;
}

// 10) houseRobber – najviac peňazí, keď nesmieš vykradnúť dva susedné domy
//     houseRobber([2, 7, 9, 3, 1]) → 12   (2 + 9 + 1)
function houseRobber(houses) {
  let prev2 = 0;
  let prev1 = 0;
  for (const x of houses) {
    const cur = Math.max(prev1, prev1 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}

module.exports = { fibMemo, fibTab, fibTab2, climbStairs, climbStairsTab, coinWays, minCoins, gridPaths, maxSubarray, houseRobber };

if (require.main === module) {
  require('../lib/test-runner').spusti('s29 Dynamické programovanie – Debugging', require('./testy').debug, module.exports);
}
