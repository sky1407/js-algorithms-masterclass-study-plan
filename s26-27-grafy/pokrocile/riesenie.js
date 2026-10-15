/*
 * RIEŠENIA – 14 Grafy a prechádzanie grafu
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

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

  removeEdge(v1, v2) {
    if (this.adjacencyList[v1]) this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2);
    if (this.adjacencyList[v2]) this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1);
    return this;
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return this;
    while (this.adjacencyList[vertex].length) {
      const adjacent = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacent);
    }
    delete this.adjacencyList[vertex];
    return this;
  }

  depthFirstRecursive(start) {
    const result = [];
    const visited = {};
    const dfs = (vertex) => {
      visited[vertex] = true;
      result.push(vertex);
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) dfs(neighbor);
      }
    };
    if (this.adjacencyList[start]) dfs(start);
    return result;
  }

  depthFirstIterative(start) {
    if (!this.adjacencyList[start]) return [];
    const stack = [start];
    const result = [];
    const visited = { [start]: true };
    while (stack.length) {
      const vertex = stack.pop();
      result.push(vertex);
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }
    return result;
  }

  breadthFirst(start) {
    if (!this.adjacencyList[start]) return [];
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
    let head = 0;
    while (head < queue.length) {
      const vertex = queue[head++];
      result.push(vertex);
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
}

function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const visited = new Array(n).fill(false);
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    count++;
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

function shortestPathLength(graph, start, end) {
  if (!(start in graph) || !(end in graph)) return -1;
  const dist = { [start]: 0 };
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const v = queue[head++];
    if (v === end) return dist[v];
    for (const w of graph[v]) {
      if (!(w in dist)) {
        dist[w] = dist[v] + 1;
        queue.push(w);
      }
    }
  }
  return -1;
}
const protipriklad7 = [{ A: ['B', 'D'], B: ['A', 'C'], C: ['B', 'D'], D: ['C', 'A'] }, 'A', 'D'];

function hasCycle(graph) {
  const visited = new Set();
  const dfs = (v, parent) => {
    visited.add(v);
    for (const w of graph[v]) {
      if (w === parent) continue;
      if (visited.has(w) || dfs(w, v)) return true;
    }
    return false;
  };
  for (const v of Object.keys(graph)) {
    if (!visited.has(v) && dfs(v, null)) return true;
  }
  return false;
}
const protipriklad8 = [{ A: ['B'], B: ['A'], C: ['D', 'E'], D: ['C', 'E'], E: ['C', 'D'] }];

function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) adj[pre].push(course);
  const state = new Array(numCourses).fill(0);
  const dfs = (v) => {
    state[v] = 1;
    for (const w of adj[v]) {
      if (state[w] === 1) return false;
      if (state[w] === 0 && !dfs(w)) return false;
    }
    state[v] = 2;
    return true;
  };
  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0 && !dfs(i)) return false;
  }
  return true;
}
const protipriklad9 = [4, [[1, 0], [2, 0], [3, 1], [3, 2]]];

function numIslands(grid) {
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;
  const seen = grid.map((row) => row.map(() => false));
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1' || seen[r][c]) continue;
      count++;
      const stack = [[r, c]];
      seen[r][c] = true;
      while (stack.length) {
        const [y, x] = stack.pop();
        for (const [dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] === '1' && !seen[ny][nx]) {
            seen[ny][nx] = true;
            stack.push([ny, nx]);
          }
        }
      }
    }
  }
  return count;
}

function shortestPath(graph, start, end) {
  if (!(start in graph) || !(end in graph)) return null;
  const parent = { [start]: null };
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const v = queue[head++];
    if (v === end) {
      const path = [];
      for (let x = end; x !== null; x = parent[x]) path.push(x);
      return path.reverse();
    }
    for (const w of graph[v]) {
      if (!(w in parent)) {
        parent[w] = v;
        queue.push(w);
      }
    }
  }
  return null;
}

function topologicalSort(tasks, deps) {
  const indegree = new Map(tasks.map((t) => [t, 0]));
  const next = new Map(tasks.map((t) => [t, []]));
  for (const [before, after] of deps) {
    next.get(before).push(after);
    indegree.set(after, indegree.get(after) + 1);
  }
  const ready = tasks.filter((t) => indegree.get(t) === 0).sort();
  const order = [];
  while (ready.length) {
    const t = ready.shift();
    order.push(t);
    for (const n of next.get(t)) {
      indegree.set(n, indegree.get(n) - 1);
      if (indegree.get(n) === 0) {
        ready.push(n);
        ready.sort();
      }
    }
  }
  return order.length === tasks.length ? order : null;
}

function suggestFriends(graph, user) {
  const friends = new Set(graph[user] || []);
  const mutual = new Map();
  for (const f of friends) {
    for (const ff of graph[f] || []) {
      if (ff === user || friends.has(ff)) continue;
      mutual.set(ff, (mutual.get(ff) || 0) + 1);
    }
  }
  return [...mutual]
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .map(([name, count]) => ({ name, mutual: count }));
}

function spreadTime(graph, start) {
  const dist = { [start]: 0 };
  const queue = [start];
  let head = 0;
  let days = 0;
  while (head < queue.length) {
    const v = queue[head++];
    days = Math.max(days, dist[v]);
    for (const w of graph[v] || []) {
      if (!(w in dist)) {
        dist[w] = dist[v] + 1;
        queue.push(w);
      }
    }
  }
  const unreachable = Object.keys(graph).filter((v) => !(v in dist)).sort();
  return { days, unreachable };
}

module.exports = {
  Graph, countComponents,
  shortestPathLength, protipriklad7, hasCycle, protipriklad8, canFinish, protipriklad9,
  numIslands, shortestPath, topologicalSort,
  suggestFriends, spreadTime,
};
