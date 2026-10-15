/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  14 GRAFY – DOPLŇ KÓD (príklady 4–6)                             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    return this;
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
    return this;
  }

  // ───────────────────────────────────────────────────────────────────
  // 4) breadthFirst – BFS: najprv všetci susedia, potom susedia susedov...
  //    FRONTA: berieš zo začiatku, pridávaš na koniec.
  //    Vrchol označ ako navštívený už pri PRIDANÍ do fronty.
  // ───────────────────────────────────────────────────────────────────
  breadthFirst(start) {
    if (!this.adjacencyList[start]) return [];
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
    while (queue.length) {
      const vertex = queue[___]();
      result.push(vertex);
      for (const neighbor of this.adjacencyList[___]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  // ───────────────────────────────────────────────────────────────────
  // 5) depthFirstIterative – DFS bez rekurzie, s vlastným ZÁSOBNÍKOM.
  //    Berieš z KONCA → poradie bude iné ako pri rekurzívnom DFS.
  // ───────────────────────────────────────────────────────────────────
  depthFirstIterative(start) {
    if (!this.adjacencyList[start]) return [];
    const stack = [start];
    const result = [];
    const visited = { [start]: true };
    while (stack.length) {
      const vertex = stack[___]();
      result.push(___);
      for (const neighbor of this.adjacencyList[___]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }
    return result;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 6) countComponents – n vrcholov (0 … n-1) a zoznam hrán [a, b].
//    Koľko je súvislých komponentov („ostrovčekov“ grafu)?
//    countComponents(5, [[0, 1], [1, 2], [3, 4]]) → 2
// ─────────────────────────────────────────────────────────────────────
function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(___);
  }
  const visited = new Array(n).fill(false);
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    count += ___;
    const stack = [i];
    visited[i] = true;
    while (stack.length) {
      const v = stack.pop();
      for (const w of adj[v]) {
        if (!visited[w]) {
          visited[w] = true;
          stack.push(w);
        }
      }
    }
  }
  return count;
}

module.exports = { Graph, countComponents };

if (require.main === module) {
  require('../../lib/test-runner').spusti('14 Grafy – Doplň kód', require('./testy').doplnenie, module.exports);
}
