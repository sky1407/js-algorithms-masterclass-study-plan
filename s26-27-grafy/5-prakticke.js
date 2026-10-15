/*
 * s26-27 Grafy – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej metódy sám. Graf je neorientovaný, uložený ako zoznam susedov:
 * this.adjacencyList = { A: ['B', 'C'], B: ['A'], … }
 * Testy si graf pripravia samy, takže poradie úloh je jedno
 * (úloha 8 môže použiť tvoje bfs z úlohy 7).
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

class GraphP {
  constructor() {
    this.adjacencyList = {};
  }

  // 1) addVertex(vertex) – pridá vrchol s prázdnym zoznamom; existujúci neprepíše
  addVertex(vertex) {

  }

  // 2) addEdge(v1, v2) – neorientovaná hrana
  addEdge(v1, v2) {

  }

  // 3) removeEdge(v1, v2) – odstráni hranu z oboch zoznamov
  removeEdge(v1, v2) {

  }

  // 4) removeVertex(vertex) – odstráni vrchol aj všetky hrany, ktoré k nemu vedú
  removeVertex(vertex) {

  }

  // 5) dfsRecursive(start) – pole vrcholov v poradí DFS (rekurzívne)
  dfsRecursive(start) {

  }

  // 6) dfsIterative(start) – pole vrcholov v poradí DFS so zásobníkom
  dfsIterative(start) {

  }

  // 7) bfs(start) – pole vrcholov v poradí BFS
  bfs(start) {

  }

  // 8) hasPath(a, b) – existuje cesta z a do b? (true / false)
  hasPath(a, b) {

  }

  // 9) countComponents() – počet oddelených častí („ostrovov“) grafu
  countComponents() {

  }

  // 10) shortestPathLength(a, b) – najmenší počet hrán z a do b; ak cesta nie je, -1
  shortestPathLength(a, b) {

  }
}

module.exports = { GraphP };

if (require.main === module) {
  require('../lib/test-runner').spusti('s26-27 Grafy – Praktické úlohy', require('./testy').prakticke, module.exports);
}
