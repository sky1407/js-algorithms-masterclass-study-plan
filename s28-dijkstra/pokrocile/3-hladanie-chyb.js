/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  15 DIJKSTROV ALGORITMUS – HĽADANIE CHÝB (príklady 7–9)          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Vážený graf zapíš ako objekt (hrany môžu byť aj jednosmerné):
 *        [{ A: [{ node: 'B', weight: 2 }], B: [] }, 'A']
 *      Mriežku ako pole riadkov: [[[1, 2], [3, 4]]]
 *   2. Oprav funkciu.
 *
 * SimplePQ je správna.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

class SimplePQ {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.values.shift();
  }
}

// ─────────────────────────────────────────────────────────────────────
// 7) shortestDistances – vzdialenosti zo start do všetkých vrcholov.
//    „Aby sme vrchol nespracovali dvakrát, označíme ho hneď, ako ho nájdeme.“
// ─────────────────────────────────────────────────────────────────────
function shortestDistances(graph, start) {
  const distances = {};
  for (const v of Object.keys(graph)) distances[v] = Infinity;
  distances[start] = 0;
  const done = new Set([start]);
  const queue = new SimplePQ();
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
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) dijkstraPath – najkratšia cesta [start, ..., end].
//    start === end → [start];  nedosiahnuteľný alebo neexistujúci → null
// ─────────────────────────────────────────────────────────────────────
function dijkstraPath(graph, start, end) {
  if (!(start in graph) || !(end in graph)) return null;
  const distances = {};
  const previous = {};
  for (const v of Object.keys(graph)) {
    distances[v] = Infinity;
    previous[v] = null;
  }
  distances[start] = 0;
  const queue = new SimplePQ();
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
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) minCostPath – mriežka cien políčok. Začínaš vľavo hore, končíš
//    vpravo dole, hýbať sa môžeš do VŠETKÝCH 4 smerov.
//    Cena cesty = súčet cien všetkých navštívených políčok (aj prvého).
//    (Pôvodný autor to riešil dynamickým programovaním...)
// ─────────────────────────────────────────────────────────────────────
function minCostPath(grid) {
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
}
const protipriklad9 = ___;

module.exports = { shortestDistances, protipriklad7, dijkstraPath, protipriklad8, minCostPath, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('15 Dijkstra – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
