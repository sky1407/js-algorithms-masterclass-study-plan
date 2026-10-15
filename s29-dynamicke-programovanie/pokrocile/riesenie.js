/*
 * RIEŠENIA – 16 Dynamické programovanie
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function climbStairs(n, memo = {}) {
  if (n <= 1) return 1;
  if (n in memo) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}
const zlozitost1 = 'O(n)';

function fibTab(n) {
  if (n <= 1) return n;
  const table = new Array(n + 1).fill(0);
  table[1] = 1;
  for (let i = 2; i <= n; i++) table[i] = table[i - 1] + table[i - 2];
  return table[n];
}

function coinChangeMin(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
const zlozitost3 = 'O(n * k)';

function uniquePaths(grid) {
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;
  if (!rows || !cols || grid[0][0] === 1) return 0;
  const dp = grid.map((row) => row.map(() => 0));
  dp[0][0] = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        dp[r][c] = 0;
        continue;
      }
      if (r > 0) dp[r][c] += dp[r - 1][c];
      if (c > 0) dp[r][c] += dp[r][c - 1];
    }
  }
  return dp[rows - 1][cols - 1];
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
const zlozitost5 = 'O(n * m)';

function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let c = capacity; c >= weights[i]; c--) {
      dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}

function minCoins(coins, amount) {
  return coinChangeMin(coins, amount);
}
const protipriklad7 = [[1, 3, 4], 6];

function knapsack01(weights, values, capacity) {
  return knapsack(weights, values, capacity);
}
const protipriklad8 = [[1], [10], 2];

function countCombinations(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  }
  return dp[amount];
}
const protipriklad9 = [[1, 2], 3];

function lisLength(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => {
    const row = new Array(b.length + 1).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function rob(houses) {
  let prev = 0;
  let curr = 0;
  for (const h of houses) {
    const next = Math.max(curr, prev + h);
    prev = curr;
    curr = next;
  }
  return curr;
}

function atmWithdraw(notes, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  const last = new Array(amount + 1).fill(null);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const n of notes) {
      if (n <= a && dp[a - n] + 1 < dp[a]) {
        dp[a] = dp[a - n] + 1;
        last[a] = n;
      }
    }
  }
  if (dp[amount] === Infinity) return null;
  const result = [];
  for (let a = amount; a > 0; a -= last[a]) result.push(last[a]);
  return result.sort((x, y) => y - x);
}

function maxProfitJobs(jobs) {
  const sorted = [...jobs].sort((a, b) => a.end - b.end);
  const dp = new Array(sorted.length + 1).fill(0);
  for (let i = 1; i <= sorted.length; i++) {
    const job = sorted[i - 1];
    let lo = 0;
    let hi = i - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (sorted[mid - 1].end <= job.start) lo = mid;
      else hi = mid - 1;
    }
    dp[i] = Math.max(dp[i - 1], dp[lo] + job.profit);
  }
  return dp[sorted.length];
}

module.exports = {
  climbStairs, zlozitost1, fibTab, coinChangeMin, zlozitost3,
  uniquePaths, lcsLength, zlozitost5, knapsack,
  minCoins, protipriklad7, knapsack01, protipriklad8, countCombinations, protipriklad9,
  lisLength, editDistance, rob,
  atmWithdraw, maxProfitJobs,
};
