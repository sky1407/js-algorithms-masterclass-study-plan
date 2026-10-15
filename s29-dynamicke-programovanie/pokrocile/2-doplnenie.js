/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  16 DYNAMICKÉ PROGRAMOVANIE – DOPLŇ KÓD (príklady 4–6)           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom a doplň zložitosti ('___').
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) uniquePaths – robot ide z ľavého horného rohu do pravého dolného,
//    len DOPRAVA alebo DOLE. 1 = prekážka, 0 = voľno. Koľko je ciest?
//    dp[r][c] = počet ciest do políčka = zhora + zľava
// ─────────────────────────────────────────────────────────────────────
function uniquePaths(grid) {
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;
  if (!rows || !cols || grid[0][0] === 1) return 0;
  const dp = grid.map((row) => row.map(() => 0));
  dp[0][0] = ___;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        dp[r][c] = ___;
        continue;
      }
      if (r > 0) dp[r][c] += dp[r - 1][___];
      if (c > 0) dp[r][c] += dp[___][c - 1];
    }
  }
  return dp[rows - 1][cols - 1];
}

// ─────────────────────────────────────────────────────────────────────
// 5) lcsLength – dĺžka najdlhšej spoločnej PODPOSTUPNOSTI
//    (znaky nemusia ísť za sebou, ale v rovnakom poradí)
//    lcsLength('abcde', 'ace') → 3
//    dp[i][j] = LCS prvých i znakov a a prvých j znakov b
//    Zložitosť zapíš ako O(n * m): n, m = dĺžky reťazcov.
// ─────────────────────────────────────────────────────────────────────
function lcsLength(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + ___;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][___]);
    }
  }
  return dp[a.length][___];
}
const zlozitost5 = '___';

// ─────────────────────────────────────────────────────────────────────
// 6) knapsack – batoh s nosnosťou capacity, vec i má hmotnosť weights[i]
//    a hodnotu values[i]. Každú vec najviac RAZ. Maximálna hodnota?
//    dp[c] = najlepšia hodnota pri nosnosti c.
//    Pozor na SMER vnútorného cyklu – inak by sa vec použila viackrát!
// ─────────────────────────────────────────────────────────────────────
function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let c = ___; c >= weights[i]; c--) {
      dp[c] = Math.max(dp[c], dp[c - weights[i]] + ___);
    }
  }
  return dp[capacity];
}

module.exports = { uniquePaths, lcsLength, zlozitost5, knapsack };

if (require.main === module) {
  require('../../lib/test-runner').spusti('16 Dynamické programovanie – Doplň kód', require('./testy').doplnenie, module.exports);
}
