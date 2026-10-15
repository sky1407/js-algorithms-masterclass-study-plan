/*
 * s29 Dynamické programovanie – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * Varianty z 2-debug.js a 3-doplnenie.js (fibMemo, fibM, fibTab, fibT, …) sú opravené
 * verzie funkcií nižšie – mapovanie je v module.exports na konci súboru.
 */
'use strict';

function fibMemoP(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibMemoP(n - 1, memo) + fibMemoP(n - 2, memo);
  return memo[n];
}

function fibTabP(n) {
  if (n <= 2) return 1;
  const table = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}

function climbStairsP(n) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

function climbStairs3(n) {
  const dp = [1, 1, 2];
  for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  return dp[n];
}

function coinWaysP(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }
  return dp[amount];
}

function minCoinsP(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

function gridPathsP(r, c, memo = {}) {
  const key = r + ',' + c;
  if (key in memo) return memo[key];
  if (r === 1 || c === 1) return 1;
  memo[key] = gridPathsP(r - 1, c, memo) + gridPathsP(r, c - 1, memo);
  return memo[key];
}

function maxSubarrayP(arr) {
  let cur = arr[0];
  let best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    cur = Math.max(arr[i], cur + arr[i]);
    best = Math.max(best, cur);
  }
  return best;
}

function houseRobberP(houses) {
  let prev2 = 0;
  let prev1 = 0;
  for (const x of houses) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}

function lcsLength(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

module.exports = {
  fibMemo: fibMemoP, fibTab: fibTabP, fibTab2: fibTabP, climbStairs: climbStairsP, climbStairsTab: climbStairsP,
  coinWays: coinWaysP, minCoins: minCoinsP, gridPaths: gridPathsP, maxSubarray: maxSubarrayP, houseRobber: houseRobberP,
  fibM: fibMemoP, fibM2: fibMemoP, fibT: fibTabP, fibT2: fibTabP, stairsMemo: climbStairsP,
  waysToPay: coinWaysP, waysToPay2: coinWaysP, fewestCoins: minCoinsP, paths: gridPathsP, kadane: maxSubarrayP,
  fibMemoP, fibTabP, climbStairsP, climbStairs3, coinWaysP, minCoinsP, gridPathsP, maxSubarrayP, houseRobberP, lcsLength,
};
