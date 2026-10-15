/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  15 DIJKSTROV ALGORITMUS – DEBUGGING (príklady 1–3)              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Vážený graf: { A: [{ node: 'B', weight: 4 }, ...], ... }
 * Dijkstra: vždy spracuj NEspracovaný vrchol s najmenšou známou
 * vzdialenosťou a skús cez neho skrátiť cestu k susedom („relaxácia“).
 * Funguje len pre NEZÁPORNÉ váhy.
 *
 * Triedy / funkcie označené ⚠ majú CHYBY. SimplePQ je správna.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// ⚠ 1) PriorityQueue – naivná verzia z kurzu: po každom vložení zoradí
//      pole podľa priority VZOSTUPNE, dequeue vyberie prvok s NAJMENŠOU
//      prioritou (zo začiatku poľa) a vráti celý uzol { val, priority }.
// ─────────────────────────────────────────────────────────────────────
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority > b.priority);
  }

  dequeue() {
    return this.values.pop();
  }
}

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
// ⚠ 2) WeightedGraph – NEORIENTOVANÝ vážený graf
//      addEdge(v1, v2, weight) – hrana v oboch smeroch, vráti this
//      dijkstra(start, finish) – najkratšia cesta ako pole vrcholov
//                                [start, ..., finish]; nedosiahnuteľný → []
// ─────────────────────────────────────────────────────────────────────
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    return this;
  }

  addEdge(v1, v2, weight) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList[v1].push({ node: v2, weight });
    return this;
  }

  dijkstra(start, finish) {
    const nodes = new SimplePQ();
    const distances = {};
    const previous = {};
    for (const v in this.adjacencyList) {
      distances[v] = v === start ? 0 : Infinity;
      previous[v] = null;
      nodes.enqueue(v, distances[v]);
    }
    const path = [];
    while (nodes.values.length) {
      let smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (distances[smallest] !== Infinity) {
        for (const neighbor of this.adjacencyList[smallest]) {
          const candidate = distances[smallest] + neighbor.weight;
          if (candidate < distances[neighbor.node]) {
            distances[neighbor.node] = candidate;
            nodes.enqueue(neighbor.node, candidate);
          }
        }
      }
    }
    return path.reverse();
  }
}

// ─────────────────────────────────────────────────────────────────────
// ⚠ 3) networkDelayTime – n serverov (1 … n), times = [[u, v, w], ...]
//      znamená JEDNOSMERNÝ spoj z u do v s oneskorením w ms.
//      Server k vyšle signál. Za koľko ms ho dostanú VŠETKY servery?
//      Ak niektorý nikdy → -1.
//      (Pomocná dijkstraDistances je správna.)
// ─────────────────────────────────────────────────────────────────────
function dijkstraDistances(graph, start) {
  const distances = {};
  for (const v of Object.keys(graph)) distances[v] = Infinity;
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
        queue.enqueue(node, candidate);
      }
    }
  }
  return distances;
}

function networkDelayTime(times, n, k) {
  const graph = {};
  for (let i = 1; i <= n; i++) graph[i] = [];
  for (const [u, v, w] of times) {
    graph[u].push({ node: v, weight: w });
    graph[v].push({ node: u, weight: w });
  }
  const distances = dijkstraDistances(graph, k);
  return Math.max(...Object.values(distances));
}

module.exports = { PriorityQueue, WeightedGraph, networkDelayTime };

if (require.main === module) {
  require('../../lib/test-runner').spusti('15 Dijkstra – Debugging', require('./testy').debug, module.exports);
}
