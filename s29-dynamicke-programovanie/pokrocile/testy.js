'use strict';
const spravne = require('./riesenie');

const povodne = {
  minCoins(coins, amount) {
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
  },
  knapsack01(weights, values, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
      for (let c = weights[i]; c <= capacity; c++) {
        dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
      }
    }
    return dp[capacity];
  },
  countCombinations(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for (let a = 1; a <= amount; a++) {
      for (const c of coins) if (c <= a) dp[a] += dp[a - c];
    }
    return dp[amount];
  },
};

function rychlo(fn, limitMs, sprava, pravda) {
  const start = Date.now();
  const vysledok = fn();
  const trvanie = Date.now() - start;
  pravda(trvanie < limitMs, `${sprava} (trvalo ${trvanie} ms)`);
  return vysledok;
}

const debug = [
  {
    id: 1,
    nazov: 'climbStairs – memoizácia',
    testy: (m, { rovne, pravda, zlozitost }) => {
      for (const [n, r] of [[1, 1], [2, 2], [3, 3], [4, 5], [5, 8], [10, 89]]) rovne(m.climbStairs(n), r, `climbStairs(${n})`);
      const r = rychlo(() => m.climbStairs(35), 50, 'climbStairs(35) je pomalé – zdieľaš memo medzi rekurzívnymi volaniami?', pravda);
      rovne(r, 14930352, 'climbStairs(35)');
      rovne(m.climbStairs(70), 308061521170129, 'climbStairs(70)');
      zlozitost(m.zlozitost1, 'O(n)');
    },
  },
  {
    id: 2,
    nazov: 'fibTab – tabulácia (zdola nahor)',
    testy: (m, { rovne, pravda }) => {
      const volania = String(m.fibTab).match(/fibTab\s*\(/g) || [];
      pravda(volania.length <= 1, 'tabulácia = bez rekurzie, len cyklus a pole');
      for (const [n, r] of [[0, 0], [1, 1], [2, 1], [3, 2], [10, 55], [50, 12586269025], [78, 8944394323791464]]) {
        rovne(m.fibTab(n), r, `fibTab(${n})`);
      }
    },
  },
  {
    id: 3,
    nazov: 'coinChangeMin – najmenej mincí',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.coinChangeMin([1, 2, 5], 11), 3, 'coinChangeMin([1, 2, 5], 11)');
      rovne(m.coinChangeMin([2], 3), -1, 'coinChangeMin([2], 3)');
      rovne(m.coinChangeMin([1], 0), 0, 'coinChangeMin([1], 0)');
      rovne(m.coinChangeMin([2, 5, 10, 20, 50], 63), 6, 'coinChangeMin([2, 5, 10, 20, 50], 63)');
      rovne(m.coinChangeMin([186, 419, 83, 408], 6249), 20, 'coinChangeMin([186, 419, 83, 408], 6249)');
      zlozitost(m.zlozitost3, 'O(n * k)');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'uniquePaths – počet ciest mriežkou s prekážkami',
    testy: (m, { rovne }) => {
      rovne(m.uniquePaths([[0, 0, 0], [0, 1, 0], [0, 0, 0]]), 2, 'uniquePaths(3×3 s prekážkou v strede)');
      rovne(m.uniquePaths([[0, 0, 0], [0, 0, 0]]), 3, 'uniquePaths(2×3)');
      rovne(m.uniquePaths(Array.from({ length: 10 }, () => new Array(10).fill(0))), 48620, 'uniquePaths(10×10)');
      rovne(m.uniquePaths([[0, 1], [1, 0]]), 0, 'uniquePaths(zablokované)');
      rovne(m.uniquePaths([[1]]), 0, 'uniquePaths([[1]]) – prekážka na štarte');
      rovne(m.uniquePaths([[0]]), 1, 'uniquePaths([[0]])');
    },
  },
  {
    id: 5,
    nazov: 'lcsLength – najdlhšia spoločná podpostupnosť',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.lcsLength('abcde', 'ace'), 3, "lcsLength('abcde', 'ace')");
      rovne(m.lcsLength('abc', 'abc'), 3, "lcsLength('abc', 'abc')");
      rovne(m.lcsLength('abc', 'def'), 0, "lcsLength('abc', 'def')");
      rovne(m.lcsLength('AGGTAB', 'GXTXAYB'), 4, "lcsLength('AGGTAB', 'GXTXAYB')");
      rovne(m.lcsLength('', 'abc'), 0, "lcsLength('', 'abc')");
      zlozitost(m.zlozitost5, 'O(n * m)');
    },
  },
  {
    id: 6,
    nazov: 'knapsack – batoh 0/1',
    testy: (m, { rovne }) => {
      rovne(m.knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7), 9, 'knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)');
      rovne(m.knapsack([10, 20, 30], [60, 100, 120], 50), 220, 'knapsack([10, 20, 30], [60, 100, 120], 50)');
      rovne(m.knapsack([5], [10], 4), 0, 'knapsack([5], [10], 4)');
      rovne(m.knapsack([2], [3], 10), 3, 'knapsack([2], [3], 10) – každú vec len raz');
      rovne(m.knapsack([], [], 10), 0, 'knapsack([], [], 10)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'minCoins – greedy nestačí',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.minCoins, spravne.minCoins);
      rovne(m.minCoins([1, 2, 5, 10], 18), 4, 'minCoins([1, 2, 5, 10], 18)');
      rovne(m.minCoins([1, 5, 6, 9], 11), 2, 'minCoins([1, 5, 6, 9], 11)');
      rovne(m.minCoins([5, 7], 3), -1, 'minCoins([5, 7], 3)');
      rovne(m.minCoins([25, 10, 1], 30), 3, 'minCoins([25, 10, 1], 30)');
    },
  },
  {
    id: 8,
    nazov: 'knapsack01 – každá vec najviac raz',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.knapsack01, spravne.knapsack01);
      rovne(m.knapsack01([1, 3, 4, 5], [1, 4, 5, 7], 7), 9, 'knapsack01([1, 3, 4, 5], [1, 4, 5, 7], 7)');
      rovne(m.knapsack01([2, 3], [5, 6], 4), 6, 'knapsack01([2, 3], [5, 6], 4)');
      rovne(m.knapsack01([1, 1, 1], [2, 2, 2], 2), 4, 'knapsack01([1, 1, 1], [2, 2, 2], 2)');
    },
  },
  {
    id: 9,
    nazov: 'countCombinations – koľkými spôsobmi zaplatiť sumu',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.countCombinations, spravne.countCombinations);
      rovne(m.countCombinations([1, 2, 5], 5), 4, 'countCombinations([1, 2, 5], 5)');
      rovne(m.countCombinations([2], 3), 0, 'countCombinations([2], 3)');
      rovne(m.countCombinations([10], 10), 1, 'countCombinations([10], 10)');
      rovne(m.countCombinations([1, 5, 10, 25], 100), 242, 'countCombinations([1, 5, 10, 25], 100)');
      rovne(m.countCombinations([3, 7], 0), 1, 'countCombinations([3, 7], 0)');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'lisLength – najdlhšia rastúca podpostupnosť',
    testy: (m, { rovne, pravda }) => {
      rovne(m.lisLength([10, 9, 2, 5, 3, 7, 101, 18]), 4, 'lisLength([10, 9, 2, 5, 3, 7, 101, 18])');
      rovne(m.lisLength([0, 1, 0, 3, 2, 3]), 4, 'lisLength([0, 1, 0, 3, 2, 3])');
      rovne(m.lisLength([7, 7, 7, 7]), 1, 'lisLength([7, 7, 7, 7]) – PRÍSNE rastúca');
      rovne(m.lisLength([]), 0, 'lisLength([])');
      const data = Array.from({ length: 3000 }, (_, i) => (i * 7919) % 3001);
      const r = rychlo(() => m.lisLength(data), 500, 'príliš pomalé pre 3000 prvkov', pravda);
      rovne(r, spravne.lisLength(data), 'lisLength(3000 prvkov)');
    },
  },
  {
    id: 11,
    nazov: 'editDistance – Levenshteinova vzdialenosť',
    testy: (m, { rovne }) => {
      rovne(m.editDistance('horse', 'ros'), 3, "editDistance('horse', 'ros')");
      rovne(m.editDistance('intention', 'execution'), 5, "editDistance('intention', 'execution')");
      rovne(m.editDistance('kitten', 'sitting'), 3, "editDistance('kitten', 'sitting')");
      rovne(m.editDistance('', 'abc'), 3, "editDistance('', 'abc')");
      rovne(m.editDistance('same', 'same'), 0, "editDistance('same', 'same')");
    },
  },
  {
    id: 12,
    nazov: 'rob – zlodej nesmie vykradnúť dva susedné domy',
    testy: (m, { rovne }) => {
      rovne(m.rob([1, 2, 3, 1]), 4, 'rob([1, 2, 3, 1])');
      rovne(m.rob([2, 7, 9, 3, 1]), 12, 'rob([2, 7, 9, 3, 1])');
      rovne(m.rob([2, 1, 1, 2]), 4, 'rob([2, 1, 1, 2])');
      rovne(m.rob([5]), 5, 'rob([5])');
      rovne(m.rob([]), 0, 'rob([])');
      rovne(m.rob(Array.from({ length: 10000 }, (_, i) => i % 10)), spravne.rob(Array.from({ length: 10000 }, (_, i) => i % 10)), 'rob(10 000 domov)');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'atmWithdraw – bankomat s obmedzenými bankovkami',
    testy: (m, { rovne }) => {
      rovne(m.atmWithdraw([50, 20], 60), [20, 20, 20], 'atmWithdraw([50, 20], 60) – greedy by vydal 50 a zasekol sa');
      rovne(m.atmWithdraw([5, 10, 20, 50, 100], 185), [100, 50, 20, 10, 5], 'atmWithdraw([5, 10, 20, 50, 100], 185)');
      rovne(m.atmWithdraw([50, 20], 130), [50, 20, 20, 20, 20], 'atmWithdraw([50, 20], 130)');
      rovne(m.atmWithdraw([20, 50], 30), null, 'atmWithdraw([20, 50], 30)');
      rovne(m.atmWithdraw([10], 0), [], 'atmWithdraw([10], 0)');
    },
  },
  {
    id: 14,
    nazov: 'maxProfitJobs – freelancer vyberá zákazky',
    testy: (m, { rovne, pravda }) => {
      const jobs = [
        { start: 1, end: 3, profit: 50 },
        { start: 2, end: 4, profit: 10 },
        { start: 3, end: 5, profit: 40 },
        { start: 3, end: 6, profit: 70 },
      ];
      rovne(m.maxProfitJobs(jobs), 120, 'maxProfitJobs(4 zákazky)');
      rovne(
        m.maxProfitJobs([
          { start: 1, end: 2, profit: 50 },
          { start: 2, end: 5, profit: 20 },
          { start: 6, end: 19, profit: 100 },
          { start: 2, end: 100, profit: 200 },
        ]),
        250,
        'maxProfitJobs(dlhá zákazka sa oplatí)',
      );
      rovne(m.maxProfitJobs([{ start: 1, end: 5, profit: 9 }, { start: 1, end: 5, profit: 7 }]), 9, 'maxProfitJobs(rovnaký čas)');
      rovne(m.maxProfitJobs([]), 0, 'maxProfitJobs([])');
      rovne(jobs[0].start, 1, 'vstup sa nesmie zmeniť');
      const velke = Array.from({ length: 20000 }, (_, i) => ({ start: i, end: i + 1 + (i % 7), profit: (i * 31) % 97 }));
      const r = rychlo(() => m.maxProfitJobs(velke), 300, 'príliš pomalé pre 20 000 zákaziek – zoraď podľa konca a predchodcu hľadaj binárne', pravda);
      rovne(r, spravne.maxProfitJobs(velke), 'maxProfitJobs(20 000 zákaziek)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
