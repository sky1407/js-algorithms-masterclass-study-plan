'use strict';
const spravne = require('./riesenie');

const povodne = {
  shortestDistances(graph, start) {
    const distances = {};
    for (const v of Object.keys(graph)) distances[v] = Infinity;
    distances[start] = 0;
    const done = new Set([start]);
    const queue = new spravne.PriorityQueue();
    queue.enqueue(start, 0);
    while (queue.values.length) {
      const { val: current } = queue.dequeue();
      for (const { node, weight } of graph[current]) {
        if (done.has(node)) continue;
        done.add(node);
        distances[node] = distances[current] + weight;
        queue.enqueue(node, distances[node]);
      }
    }
    return distances;
  },
  dijkstraPath(graph, start, end) {
    if (!(start in graph) || !(end in graph)) return null;
    const distances = {};
    const previous = {};
    for (const v of Object.keys(graph)) {
      distances[v] = Infinity;
      previous[v] = null;
    }
    distances[start] = 0;
    const queue = new spravne.PriorityQueue();
    queue.enqueue(start, 0);
    while (queue.values.length) {
      const { val: current, priority } = queue.dequeue();
      if (priority > distances[current]) continue;
      for (const { node, weight } of graph[current]) {
        const candidate = distances[current] + weight;
        if (candidate < distances[node]) {
          distances[node] = candidate;
          previous[node] = current;
          queue.enqueue(node, candidate);
        }
      }
    }
    const path = [];
    let v = end;
    while (previous[v] !== null) {
      path.push(v);
      v = previous[v];
    }
    if (path.length) path.push(start);
    return path.reverse();
  },
  minCostPath(grid) {
    const rows = grid.length;
    const cols = rows ? grid[0].length : 0;
    if (!rows || !cols) return 0;
    const dp = grid.map((r) => r.map(() => 0));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const up = r > 0 ? dp[r - 1][c] : Infinity;
        const left = c > 0 ? dp[r][c - 1] : Infinity;
        dp[r][c] = grid[r][c] + (r === 0 && c === 0 ? 0 : Math.min(up, left));
      }
    }
    return dp[rows - 1][cols - 1];
  },
};

function wg(hrany, orientovany = false) {
  const g = {};
  for (const [a, b, w] of hrany) {
    if (!g[a]) g[a] = [];
    if (!g[b]) g[b] = [];
    g[a].push({ node: b, weight: w });
    if (!orientovany) g[b].push({ node: a, weight: w });
  }
  return g;
}

const KURZ = [['A', 'B', 4], ['A', 'C', 2], ['B', 'E', 3], ['C', 'D', 2], ['C', 'F', 4], ['D', 'E', 3], ['D', 'F', 1], ['E', 'F', 1]];

function normalizuj(x) {
  if (Array.isArray(x)) return x.map(normalizuj);
  if (x && typeof x === 'object') {
    if ('priority' in x) return { val: x.val, priority: x.priority };
    if ('node' in x) return { node: x.node, weight: x.weight };
    const out = {};
    for (const [k, v] of Object.entries(x)) out[k] = normalizuj(v);
    return out;
  }
  return x;
}

const stavPQ = (x, navrat) => normalizuj(navrat ? x : x.values);
const stavGrafu = (x, navrat) => normalizuj(navrat ? x : x.adjacencyList);

function popisOps(ops) {
  return ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
}

function overOps(Trieda, Vzor, scenare, stav, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', `trieda ${Vzor.name} nie je exportovaná`);
  for (const ops of scenare) rovne(prehraj(Trieda, ops, stav), prehraj(Vzor, ops, stav), popisOps(ops));
}

function velkyGraf(n, m, seed) {
  let x = seed;
  const rnd = (k) => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x % k;
  };
  const hrany = [];
  for (let i = 1; i < n; i++) hrany.push([`v${i}`, `v${rnd(i)}`, 1 + rnd(100)]);
  for (let i = 0; i < m; i++) hrany.push([`v${rnd(n)}`, `v${rnd(n)}`, 1 + rnd(100)]);
  return wg(hrany);
}

const debug = [
  {
    id: 1,
    nazov: 'PriorityQueue (naivná verzia z kurzu)',
    testy: (m, p) => overOps(m.PriorityQueue, spravne.PriorityQueue, [
      [['enqueue', 'B', 3], ['enqueue', 'C', 5], ['enqueue', 'D', 2], ['enqueue', 'Q', 20]],
      [['enqueue', 'B', 3], ['enqueue', 'C', 5], ['enqueue', 'D', 2], ['dequeue'], ['dequeue'], ['dequeue'], ['dequeue']],
    ], stavPQ, p),
  },
  {
    id: 2,
    nazov: 'WeightedGraph – addEdge a dijkstra',
    testy: (m, p) => overOps(m.WeightedGraph, spravne.WeightedGraph, [
      [...KURZ.map(([a, b, w]) => ['addEdge', a, b, w])],
      [...KURZ.map(([a, b, w]) => ['addEdge', a, b, w]), ['dijkstra', 'A', 'E'], ['dijkstra', 'E', 'A'], ['dijkstra', 'B', 'C'], ['dijkstra', 'A', 'A']],
      [['addEdge', 'X', 'Y', 5], ['addVertex', 'Z'], ['dijkstra', 'X', 'Z']],
    ], stavGrafu, p),
  },
  {
    id: 3,
    nazov: 'networkDelayTime – za ako dlho dostanú signál všetky servery',
    testy: (m, { rovne }) => {
      rovne(m.networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2), 2, 'networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)');
      rovne(m.networkDelayTime([[1, 2, 1]], 2, 1), 1, 'networkDelayTime([[1, 2, 1]], 2, 1)');
      rovne(m.networkDelayTime([[1, 2, 1]], 2, 2), -1, 'networkDelayTime([[1, 2, 1]], 2, 2) – spoje sú JEDNOSMERNÉ');
      rovne(m.networkDelayTime([[1, 2, 5], [1, 3, 1], [3, 2, 1]], 3, 1), 2, 'networkDelayTime([[1, 2, 5], [1, 3, 1], [3, 2, 1]], 3, 1)');
      rovne(m.networkDelayTime([], 1, 1), 0, 'networkDelayTime([], 1, 1)');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'dijkstraDistances – vzdialenosti do všetkých vrcholov',
    testy: (m, { rovne }) => {
      rovne(m.dijkstraDistances(wg(KURZ), 'A'), { A: 0, B: 4, C: 2, D: 4, E: 6, F: 5 }, "dijkstraDistances(graf z kurzu, 'A')");
      rovne(m.dijkstraDistances(wg([['a', 'b', 7], ['c', 'd', 1]]), 'a'), { a: 0, b: 7, c: Infinity, d: Infinity }, "dijkstraDistances(dva komponenty, 'a')");
      rovne(m.dijkstraDistances(wg([['s', 't', 10], ['s', 'u', 1], ['u', 't', 2]], true), 's'), { s: 0, t: 3, u: 1 }, "dijkstraDistances(orientovaný, 's')");
    },
  },
  {
    id: 5,
    nazov: 'buildPath – poskladanie cesty z previous',
    testy: (m, { rovne }) => {
      const previous = { A: null, B: 'A', C: 'A', D: 'C', E: 'F', F: 'D', Z: null };
      rovne(m.buildPath(previous, 'A', 'E'), ['A', 'C', 'D', 'F', 'E'], "buildPath(previous, 'A', 'E')");
      rovne(m.buildPath(previous, 'A', 'B'), ['A', 'B'], "buildPath(previous, 'A', 'B')");
      rovne(m.buildPath(previous, 'A', 'A'), ['A'], "buildPath(previous, 'A', 'A')");
      rovne(m.buildPath(previous, 'A', 'Z'), null, "buildPath(previous, 'A', 'Z') – nedosiahnuteľný");
    },
  },
  {
    id: 6,
    nazov: 'countShortestPaths – koľko je rôznych najkratších ciest',
    testy: (m, { rovne }) => {
      const stvorec = wg([['A', 'B', 1], ['A', 'C', 1], ['B', 'D', 1], ['C', 'D', 1]]);
      rovne(m.countShortestPaths(stvorec, 'A', 'D'), 2, "countShortestPaths(štvorec, 'A', 'D')");
      rovne(m.countShortestPaths(wg(KURZ), 'A', 'E'), 1, "countShortestPaths(kurz, 'A', 'E')");
      const mriezka = wg([['a', 'b', 1], ['a', 'c', 1], ['b', 'd', 1], ['c', 'd', 1], ['d', 'e', 1], ['d', 'f', 1], ['e', 'g', 1], ['f', 'g', 1], ['a', 'g', 9]]);
      rovne(m.countShortestPaths(mriezka, 'a', 'g'), 4, "countShortestPaths(dva štvorce za sebou, 'a', 'g')");
      rovne(m.countShortestPaths(wg([['x', 'y', 1], ['z', 'w', 1]]), 'x', 'z'), 0, 'countShortestPaths(nedosiahnuteľný)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'shortestDistances – kedy je vzdialenosť „hotová“?',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.shortestDistances, spravne.shortestDistances);
      rovne(m.shortestDistances(wg(KURZ), 'A'), { A: 0, B: 4, C: 2, D: 4, E: 6, F: 5 }, "shortestDistances(kurz, 'A')");
      rovne(m.shortestDistances(wg([['s', 'a', 7], ['s', 'b', 2], ['b', 'a', 3], ['a', 'c', 1]]), 's'), { s: 0, a: 5, b: 2, c: 6 }, "shortestDistances(obchádzka, 's')");
    },
  },
  {
    id: 8,
    nazov: 'dijkstraPath – cesta ako pole vrcholov',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.dijkstraPath, spravne.dijkstraPath);
      const g = wg(KURZ);
      rovne(m.dijkstraPath(g, 'A', 'E'), ['A', 'C', 'D', 'F', 'E'], "dijkstraPath(kurz, 'A', 'E')");
      rovne(m.dijkstraPath(g, 'C', 'C'), ['C'], "dijkstraPath(kurz, 'C', 'C')");
      rovne(m.dijkstraPath({ ...wg([['a', 'b', 1]]), z: [] }, 'a', 'z'), null, "dijkstraPath(..., 'a', 'z') – nedosiahnuteľný");
      rovne(m.dijkstraPath(g, 'A', 'Q'), null, "dijkstraPath(kurz, 'A', 'Q') – neexistuje");
    },
  },
  {
    id: 9,
    nazov: 'minCostPath – najlacnejšia cesta mriežkou (všetky 4 smery)',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.minCostPath, spravne.minCostPath);
      rovne(m.minCostPath([[1, 3, 1], [1, 5, 1], [4, 2, 1]]), 7, 'minCostPath([[1, 3, 1], [1, 5, 1], [4, 2, 1]])');
      rovne(m.minCostPath([[1, 50, 1, 1, 1], [1, 50, 1, 50, 1], [1, 1, 1, 50, 1]]), 11, 'minCostPath(had)');
      rovne(m.minCostPath([[5]]), 5, 'minCostPath([[5]])');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'fastDijkstra – Dijkstra s binárnou haldou',
    testy: (m, { rovne, pravda }) => {
      rovne(m.fastDijkstra(wg(KURZ), 'A'), { A: 0, B: 4, C: 2, D: 4, E: 6, F: 5 }, "fastDijkstra(kurz, 'A')");
      const g = velkyGraf(20000, 80000, 42);
      const start = Date.now();
      const out = m.fastDijkstra(g, 'v0');
      const trvanie = Date.now() - start;
      rovne(out, spravne.fastDijkstra(g, 'v0'), 'fastDijkstra(20 000 vrcholov, 100 000 hrán)');
      pravda(trvanie < 600, `trvalo ${trvanie} ms – naivná prioritná fronta s .sort() je pomalá, použi binárnu haldu`);
    },
  },
  {
    id: 11,
    nazov: 'minimumEffort – cesta s najmenším najväčším stúpaním',
    testy: (m, { rovne }) => {
      rovne(m.minimumEffort([[1, 2, 2], [3, 8, 2], [5, 3, 5]]), 2, 'minimumEffort([[1, 2, 2], [3, 8, 2], [5, 3, 5]])');
      rovne(m.minimumEffort([[1, 2, 3], [3, 8, 4], [5, 3, 5]]), 1, 'minimumEffort([[1, 2, 3], [3, 8, 4], [5, 3, 5]])');
      rovne(
        m.minimumEffort([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]),
        0,
        'minimumEffort(bludisko)',
      );
      rovne(m.minimumEffort([[5]]), 0, 'minimumEffort([[5]])');
    },
  },
  {
    id: 12,
    nazov: 'nearestHospital – vzdialenosť k najbližšej nemocnici',
    testy: (m, { rovne }) => {
      const mapa = wg([['Lieskovec', 'Zvolen', 5], ['Zvolen', 'BB', 20], ['Zvolen', 'Detva', 25], ['BB', 'Brezno', 40], ['Detva', 'Brezno', 50], ['Hriňová', 'Detva', 12]]);
      mapa.Osada = [];
      rovne(
        m.nearestHospital(mapa, ['BB', 'Detva']),
        { Lieskovec: 25, Zvolen: 20, BB: 0, Detva: 0, Brezno: 40, 'Hriňová': 12, Osada: Infinity },
        "nearestHospital(mapa, ['BB', 'Detva'])",
      );
      rovne(m.nearestHospital(mapa, []).Zvolen, Infinity, 'bez nemocníc');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'fastestRoute – navigácia podľa času, nie kilometrov',
    testy: (m, { rovne }) => {
      const roads = [
        { from: 'BA', to: 'TT', km: 60, speed: 120 },
        { from: 'TT', to: 'NR', km: 50, speed: 100 },
        { from: 'BA', to: 'NR', km: 90, speed: 60 },
        { from: 'NR', to: 'ZV', km: 110, speed: 100 },
        { from: 'TT', to: 'TN', km: 80, speed: 120 },
        { from: 'KE', to: 'PO', km: 36, speed: 90 },
      ];
      rovne(m.fastestRoute(roads, 'BA', 'ZV'), { minutes: 126, route: ['BA', 'TT', 'NR', 'ZV'] }, "fastestRoute(roads, 'BA', 'ZV')");
      rovne(m.fastestRoute(roads, 'TN', 'BA'), { minutes: 70, route: ['TN', 'TT', 'BA'] }, "fastestRoute(roads, 'TN', 'BA')");
      rovne(m.fastestRoute(roads, 'BA', 'KE'), null, "fastestRoute(roads, 'BA', 'KE')");
      rovne(m.fastestRoute(roads, 'NR', 'NR'), { minutes: 0, route: ['NR'] }, "fastestRoute(roads, 'NR', 'NR')");
    },
  },
  {
    id: 14,
    nazov: 'deliveryOrder – kuriér zoradí zákazníkov podľa vzdialenosti',
    testy: (m, { rovne }) => {
      const g = wg([['depo', 'A', 4], ['depo', 'B', 1], ['A', 'B', 2], ['A', 'C', 5], ['B', 'D', 8], ['C', 'D', 3]]);
      g.E = [];
      rovne(
        m.deliveryOrder(g, 'depo'),
        {
          order: [{ customer: 'B', distance: 1 }, { customer: 'A', distance: 3 }, { customer: 'C', distance: 8 }, { customer: 'D', distance: 9 }],
          unreachable: ['E'],
        },
        "deliveryOrder(g, 'depo')",
      );
      rovne(m.deliveryOrder({ depo: [] }, 'depo'), { order: [], unreachable: [] }, 'deliveryOrder(len depo)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
