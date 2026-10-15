/*
 * s26-27 Grafy – DEBUGGING (10 úloh)
 *
 * Každá metóda má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy si graf pripravia samy, takže poradie úloh je jedno.
 * Testovací graf (z teórie):
 *        A
 *      /   \
 *     B     C
 *     |     |
 *     D --- E
 *      \   /
 *        F
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1) addVertex – pridá vrchol; existujúci vrchol (a jeho hrany) neprepíše
  addVertex(vertex) {
    this.adjacencyList[vertex] = [];
  }

  // 2) addEdge – neorientovaná hrana medzi v1 a v2
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v2);
  }

  // 3) removeEdge – odstráni hranu medzi v1 a v2
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v === v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v === v1);
  }

  // 4) removeVertex – odstráni vrchol aj všetky jeho hrany
  removeVertex(vertex) {
    for (const sused of this.adjacencyList[vertex]) {
      this.adjacencyList[sused] = this.adjacencyList[sused].filter(v => v !== vertex);
    }
    this.adjacencyList[vertex] = undefined;
  }

  // 5) dfsRecursive – DFS rekurzívne od start
  dfsRecursive(start) {
    const result = [];
    const visited = {};
    const adj = this.adjacencyList;
    (function dfs(vertex) {
      visited[vertex] = true;
      result.push(vertex);
      adj[vertex].forEach(sused => {
        if (visited[sused]) dfs(sused);
      });
    })(start);
    return result;
  }

  // 6) dfsRecursive2 – DFS rekurzívne od start
  dfsRecursive2(start) {
    const result = [];
    const visited = {};
    const adj = this.adjacencyList;
    (function dfs(vertex) {
      visited[vertex] = false;
      result.push(vertex);
      adj[vertex].forEach(sused => {
        if (!visited[sused]) dfs(sused);
      });
    })(start);
    return result;
  }

  // 7) dfsIterative – DFS so zásobníkom
  dfsIterative(start) {
    const stack = [start];
    const result = [];
    const visited = { [start]: true };
    while (stack.length) {
      const vertex = stack.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach(sused => {
        if (!visited[sused]) {
          visited[sused] = true;
          stack.push(sused);
        }
      });
    }
    return result;
  }

  // 8) bfs – BFS s frontom
  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
    while (queue.length) {
      const vertex = queue.pop();
      result.push(vertex);
      this.adjacencyList[vertex].forEach(sused => {
        if (!visited[sused]) {
          visited[sused] = true;
          queue.push(sused);
        }
      });
    }
    return result;
  }

  // 9) bfs2 – BFS s frontom
  bfs2(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach(sused => {
        if (!visited[sused]) {
          visited[sused] = true;
          queue.push(sused);
        }
      });
    }
    return result;
  }

  // 10) countEdges – počet hrán neorientovaného grafu
  countEdges() {
    let spolu = 0;
    for (const susedia of Object.values(this.adjacencyList)) {
      spolu += susedia.length;
    }
    return spolu;
  }
}

module.exports = { Graph };

if (require.main === module) {
  require('../lib/test-runner').spusti('s26-27 Grafy – Debugging', require('./testy').debug, module.exports);
}
