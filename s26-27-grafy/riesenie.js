/*
 * s26-27 Grafy – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * Graph (2-debug), G (3-doplnenie) a GraphP (5-prakticke) sú ten istý graf.
 */
'use strict';

class GraphP {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  addEdge2(v1, v2) {
    this.addEdge(v1, v2);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const sused = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, sused);
    }
    delete this.adjacencyList[vertex];
  }

  dfsRecursive(start) {
    const result = [];
    const visited = {};
    const adj = this.adjacencyList;
    (function dfs(vertex) {
      visited[vertex] = true;
      result.push(vertex);
      adj[vertex].forEach(sused => {
        if (!visited[sused]) dfs(sused);
      });
    })(start);
    return result;
  }

  dfsRecursive2(start) {
    return this.dfsRecursive(start);
  }

  dfsIterative(start) {
    const stack = [start];
    const result = [];
    const visited = { [start]: true };
    while (stack.length) {
      const vertex = stack.pop();
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

  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
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

  bfs2(start) {
    return this.bfs(start);
  }

  countEdges() {
    let spolu = 0;
    for (const susedia of Object.values(this.adjacencyList)) spolu += susedia.length;
    return spolu / 2;
  }

  hasPath(a, b) {
    return this.bfs(a).includes(b);
  }

  countComponents() {
    const visited = {};
    let pocet = 0;
    for (const v of Object.keys(this.adjacencyList)) {
      if (visited[v]) continue;
      pocet++;
      const stack = [v];
      visited[v] = true;
      while (stack.length) {
        const x = stack.pop();
        for (const s of this.adjacencyList[x]) {
          if (!visited[s]) {
            visited[s] = true;
            stack.push(s);
          }
        }
      }
    }
    return pocet;
  }

  shortestPathLength(a, b) {
    if (a === b) return 0;
    const visited = { [a]: true };
    const queue = [[a, 0]];
    while (queue.length) {
      const [v, d] = queue.shift();
      for (const s of this.adjacencyList[v]) {
        if (s === b) return d + 1;
        if (!visited[s]) {
          visited[s] = true;
          queue.push([s, d + 1]);
        }
      }
    }
    return -1;
  }
}

module.exports = { GraphP, Graph: GraphP, G: GraphP };
