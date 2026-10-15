/*
 * s28 Dijkstrov algoritmus – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej metódy sám.
 * Graf: this.adjacencyList = { A: [{ node: 'B', weight: 4 }, …], … }
 * Testy si graf pripravia samy. Úlohy 6, 7 a 10 sa zídu s NaivePQ (úlohy 3 – 5).
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 3) – 5) jednoduchý prioritný rad (values je pole { val, priority } zotriedené podľa priority)
class NaivePQ {
  constructor() {
    this.values = [];
  }

  // 3) enqueue(val, priority) – pridá a zotriedi vzostupne podľa priority
  enqueue(val, priority) {

  }

  // 4) dequeue() – vyberie a vráti { val, priority } s najmenšou prioritou
  dequeue() {

  }

  // 5) isEmpty() – true, ak je rad prázdny
  isEmpty() {

  }
}

class WGraph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1) addVertex(vertex) – pridá vrchol s prázdnym zoznamom; existujúci neprepíše
  addVertex(vertex) {

  }

  // 2) addEdge(v1, v2, weight) – vážená neorientovaná hrana
  addEdge(v1, v2, weight) {

  }

  // 6) dijkstraDistances(start) – objekt { vrchol: najkratšia vzdialenosť zo start }
  //    nedosiahnuteľné vrcholy majú Infinity
  dijkstraDistances(start) {

  }

  // 7) dijkstraPath(start, finish) – pole vrcholov najkratšej cesty; ak cesta nie je, []
  dijkstraPath(start, finish) {

  }

  // 8) pathCost(path) – súčet váh hrán pozdĺž cesty (napr. ['A', 'C', 'D'] → 4)
  pathCost(path) {

  }

  // 9) nearestNeighbor(vertex) – meno suseda s najmenšou váhou hrany; bez susedov null
  nearestNeighbor(vertex) {

  }

  // 10) reachableWithin(start, maxDist) – abecedne zoradené vrcholy so vzdialenosťou <= maxDist
  reachableWithin(start, maxDist) {

  }
}

module.exports = { NaivePQ, WGraph };

if (require.main === module) {
  require('../lib/test-runner').spusti('s28 Dijkstra – Praktické úlohy', require('./testy').prakticke, module.exports);
}
