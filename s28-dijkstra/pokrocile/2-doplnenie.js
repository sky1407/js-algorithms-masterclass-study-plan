/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  15 DIJKSTROV ALGORITMUS – DOPLŇ KÓD (príklady 4–6)              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 * MinPQ (binárna min-halda) je hotová a správna.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

class MinPQ {
  constructor() {
    this.values = [];
  }

  get size() {
    return this.values.length;
  }

  enqueue(val, priority) {
    const v = this.values;
    v.push({ val, priority });
    let i = v.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (v[p].priority <= v[i].priority) break;
      [v[p], v[i]] = [v[i], v[p]];
      i = p;
    }
  }

  dequeue() {
    const v = this.values;
    const top = v[0];
    const end = v.pop();
    if (v.length > 0) {
      v[0] = end;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let best = i;
        if (l < v.length && v[l].priority < v[best].priority) best = l;
        if (r < v.length && v[r].priority < v[best].priority) best = r;
        if (best === i) break;
        [v[best], v[i]] = [v[i], v[best]];
        i = best;
      }
    }
    return top;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 4) dijkstraDistances – najkratšia vzdialenosť zo start do KAŽDÉHO vrcholu
//    (nedosiahnuteľný → Infinity). Do fronty môže ten istý vrchol prísť
//    viackrát – zastarané záznamy (priority > distances) preskočíme.
// ─────────────────────────────────────────────────────────────────────
function dijkstraDistances(graph, start) {
  const distances = {};
  for (const v of Object.keys(graph)) distances[v] = ___;
  distances[start] = ___;
  const queue = new MinPQ();
  queue.enqueue(start, 0);
  while (queue.size > 0) {
    const { val: current, priority } = queue.dequeue();
    if (priority > distances[current]) continue;
    for (const { node, weight } of graph[current]) {
      const candidate = distances[current] + ___;
      if (candidate < distances[node]) {
        distances[node] = candidate;
        queue.enqueue(node, ___);
      }
    }
  }
  return distances;
}

// ─────────────────────────────────────────────────────────────────────
// 5) buildPath – z objektu previous (vrchol → predchodca na najkratšej
//    ceste; štart má null) poskladaj cestu [start, ..., end].
//    start === end → [start];  nedosiahnuteľný end → null
// ─────────────────────────────────────────────────────────────────────
function buildPath(previous, start, end) {
  if (start === end) return [___];
  if (previous[end] === null || previous[end] === undefined) return ___;
  const path = [];
  for (let v = end; v !== null && v !== undefined; v = previous[___]) path.push(v);
  return path.reverse();
}

// ─────────────────────────────────────────────────────────────────────
// 6) countShortestPaths – koľko RÔZNYCH najkratších ciest vedie zo start do end?
//    ways[v] = počet najkratších ciest do v.
//    Našiel si KRATŠIU cestu → ways sa prepíše; ROVNAKO dlhú → pripočíta.
// ─────────────────────────────────────────────────────────────────────
function countShortestPaths(graph, start, end) {
  const dist = {};
  const ways = {};
  for (const v of Object.keys(graph)) {
    dist[v] = Infinity;
    ways[v] = 0;
  }
  dist[start] = 0;
  ways[start] = ___;
  const queue = new MinPQ();
  queue.enqueue(start, 0);
  while (queue.size > 0) {
    const { val: current, priority } = queue.dequeue();
    if (priority > dist[current]) continue;
    for (const { node, weight } of graph[current]) {
      const candidate = priority + weight;
      if (candidate < dist[node]) {
        dist[node] = candidate;
        ways[node] = ways[___];
        queue.enqueue(node, candidate);
      } else if (candidate === dist[node]) {
        ways[node] += ___;
      }
    }
  }
  return ways[end] || 0;
}

module.exports = { dijkstraDistances, buildPath, countShortestPaths };

if (require.main === module) {
  require('../../lib/test-runner').spusti('15 Dijkstra – Doplň kód', require('./testy').doplnenie, module.exports);
}
