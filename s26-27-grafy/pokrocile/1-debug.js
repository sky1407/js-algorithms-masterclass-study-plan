/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  14 GRAFY – DEBUGGING (príklady 1–3)                             ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * NEORIENTOVANÝ graf uložený ako ZOZNAM SUSEDOV (adjacency list):
 *   { A: ['B', 'C'], B: ['A'], C: ['A'] }
 * Hrana A–B musí byť zapísaná na OBOCH stranách.
 *
 * Metódy označené ⚠ majú CHYBY. Testy príkladov 2 a 3 si graf postavia
 * samy, takže ich môžeš opravovať v ľubovoľnom poradí.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 1) addVertex – pridá vrchol (ak už existuje, NIČ nezmení)
  //      addEdge – pridá hranu (chýbajúce vrcholy vytvorí). Obe vracajú this.
  // ───────────────────────────────────────────────────────────────────
  addVertex(vertex) {
    this.adjacencyList[vertex] = [];
    return this;
  }

  addEdge(v1, v2) {
    if (!this.adjacencyList[v1]) this.addVertex(v1);
    if (!this.adjacencyList[v2]) this.addVertex(v2);
    this.adjacencyList[v1].push(v2);
    return this;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 2) removeEdge – odstráni hranu (z oboch strán)
  //      removeVertex – odstráni vrchol aj VŠETKY hrany, ktoré k nemu vedú.
  //      Neexistujúci vrchol → nič sa nestane. Obe vracajú this.
  // ───────────────────────────────────────────────────────────────────
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2);
    return this;
  }

  removeVertex(vertex) {
    delete this.adjacencyList[vertex];
    return this;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 3) depthFirstRecursive – DFS: choď čo najhlbšie, potom sa vráť.
  //      Susedov skúšaj v poradí, v akom sú v zozname.
  //      Vráti pole navštívených vrcholov; neexistujúci štart → [].
  // ───────────────────────────────────────────────────────────────────
  depthFirstRecursive(start) {
    const result = [];
    const visited = {};
    const dfs = (vertex) => {
      visited[vertex] = true;
      result.push(vertex);
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) return dfs(neighbor);
      }
    };
    dfs(start);
    return result;
  }
}

module.exports = { Graph };

if (require.main === module) {
  require('../../lib/test-runner').spusti('14 Grafy – Debugging', require('./testy').debug, module.exports);
}
