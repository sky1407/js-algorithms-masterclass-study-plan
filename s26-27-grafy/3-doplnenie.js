/*
 * s26-27 Grafy – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Testy si graf pripravia samy, takže poradie úloh je jedno.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

class G {
  constructor() {
    this.adjacencyList = {};
  }

  // 1) addVertex
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = ___;
  }

  // 2) addEdge
  addEdge(v1, v2) {
    this.adjacencyList[v1].___(v2);
    this.adjacencyList[v2].push(v1);
  }

  // 3) addEdge2 – to isté, iná medzera
  addEdge2(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(___);
  }

  // 4) removeEdge
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== ___);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  // 5) removeVertex
  removeVertex(vertex) {
    for (const sused of this.adjacencyList[vertex]) {
      this.adjacencyList[sused] = this.adjacencyList[sused].filter(v => v !== vertex);
    }
    delete this.adjacencyList[___];
  }

  // 6) dfsRecursive
  dfsRecursive(start) {
    const result = [];
    const visited = {};
    const adj = this.adjacencyList;
    (function dfs(vertex) {
      visited[vertex] = ___;
      result.push(vertex);
      adj[vertex].forEach(sused => {
        if (!visited[sused]) dfs(sused);
      });
    })(start);
    return result;
  }

  // 7) dfsRecursive2 – to isté, iná medzera
  dfsRecursive2(start) {
    const result = [];
    const visited = {};
    const adj = this.adjacencyList;
    (function dfs(vertex) {
      visited[vertex] = true;
      result.push(vertex);
      adj[vertex].forEach(sused => {
        if (!visited[sused]) ___(sused);
      });
    })(start);
    return result;
  }

  // 8) dfsIterative
  dfsIterative(start) {
    const stack = [start];
    const result = [];
    const visited = { [start]: true };
    while (stack.length) {
      const vertex = stack.___();
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

  // 9) bfs
  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
    while (queue.length) {
      const vertex = queue.___();
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

  // 10) bfs2 (dve ___)
  bfs2(start) {
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach(sused => {
        if (!visited[sused]) {
          visited[sused] = ___;
          queue.___(sused);
        }
      });
    }
    return result;
  }
}

module.exports = { G };

if (require.main === module) {
  require('../lib/test-runner').spusti('s26-27 Grafy – Doplň kód', require('./testy').doplnenie, module.exports);
}
