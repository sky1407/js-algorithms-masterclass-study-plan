/*
 * RIEŠENIA – 15 Dijkstrov algoritmus
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

class PriorityQueue {
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

class HeapQueue {
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
    if (v.length === 0) return undefined;
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
    this.adjacencyList[v2].push({ node: v1, weight });
    return this;
  }

  dijkstra(start, finish) {
    const distances = {};
    const previous = {};
    const queue = new HeapQueue();
    for (const v of Object.keys(this.adjacencyList)) {
      distances[v] = v === start ? 0 : Infinity;
      previous[v] = null;
    }
    if (!(start in distances) || !(finish in distances)) return [];
    queue.enqueue(start, 0);
    while (queue.size > 0) {
      const { val: current, priority } = queue.dequeue();
      if (priority > distances[current]) continue;
      if (current === finish) break;
      for (const { node, weight } of this.adjacencyList[current]) {
        const candidate = distances[current] + weight;
        if (candidate < distances[node]) {
          distances[node] = candidate;
          previous[node] = current;
          queue.enqueue(node, candidate);
        }
      }
    }
    if (distances[finish] === Infinity) return [];
    const path = [];
    for (let v = finish; v !== null; v = previous[v]) path.push(v);
    return path.reverse();
  }
}

function dijkstraDistances(graph, start) {
  const distances = {};
  for (const v of Object.keys(graph)) distances[v] = Infinity;
  distances[start] = 0;
  const queue = new HeapQueue();
  queue.enqueue(start, 0);
  while (queue.size > 0) {
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

function buildPath(previous, start, end) {
  if (start === end) return [start];
  if (previous[end] === null || previous[end] === undefined) return null;
  const path = [];
  for (let v = end; v !== null && v !== undefined; v = previous[v]) path.push(v);
  return path.reverse();
}

function networkDelayTime(times, n, k) {
  const graph = {};
  for (let i = 1; i <= n; i++) graph[i] = [];
  for (const [u, v, w] of times) graph[u].push({ node: v, weight: w });
  const distances = dijkstraDistances(graph, k);
  const max = Math.max(...Object.values(distances));
  return max === Infinity ? -1 : max;
}

function countShortestPaths(graph, start, end) {
  const dist = {};
  const ways = {};
  for (const v of Object.keys(graph)) {
    dist[v] = Infinity;
    ways[v] = 0;
  }
  dist[start] = 0;
  ways[start] = 1;
  const queue = new HeapQueue();
  queue.enqueue(start, 0);
  while (queue.size > 0) {
    const { val: current, priority } = queue.dequeue();
    if (priority > dist[current]) continue;
    for (const { node, weight } of graph[current]) {
      const candidate = priority + weight;
      if (candidate < dist[node]) {
        dist[node] = candidate;
        ways[node] = ways[current];
        queue.enqueue(node, candidate);
      } else if (candidate === dist[node]) {
        ways[node] += ways[current];
      }
    }
  }
  return ways[end] || 0;
}

function shortestDistances(graph, start) {
  return dijkstraDistances(graph, start);
}
const protipriklad7 = [{ A: [{ node: 'B', weight: 1 }, { node: 'C', weight: 10 }], B: [{ node: 'C', weight: 1 }], C: [] }, 'A'];

function dijkstraPath(graph, start, end) {
  if (!(start in graph) || !(end in graph)) return null;
  const distances = {};
  const previous = {};
  for (const v of Object.keys(graph)) {
    distances[v] = Infinity;
    previous[v] = null;
  }
  distances[start] = 0;
  const queue = new HeapQueue();
  queue.enqueue(start, 0);
  while (queue.size > 0) {
    const { val: current, priority } = queue.dequeue();
    if (priority > distances[current]) continue;
    for (const { node, weight } of graph[current]) {
      const candidate = distances[current] + weight;
      if (candidate < distances[node]) {
        distances[node] = candidate;
        previous[node] = current;
        queue.enqueue(node, candidate);
      }
    }
  }
  if (distances[end] === Infinity) return null;
  const path = [];
  for (let v = end; v !== null; v = previous[v]) path.push(v);
  return path.reverse();
}
const protipriklad8 = [{ A: [] }, 'A', 'A'];

function minCostPath(grid) {
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;
  if (rows === 0 || cols === 0) return 0;
  const dist = grid.map((row) => row.map(() => Infinity));
  dist[0][0] = grid[0][0];
  const queue = new HeapQueue();
  queue.enqueue([0, 0], grid[0][0]);
  while (queue.size > 0) {
    const { val: [r, c], priority } = queue.dequeue();
    if (priority > dist[r][c]) continue;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const candidate = priority + grid[nr][nc];
      if (candidate < dist[nr][nc]) {
        dist[nr][nc] = candidate;
        queue.enqueue([nr, nc], candidate);
      }
    }
  }
  return dist[rows - 1][cols - 1];
}
const protipriklad9 = [[[1, 1, 1], [9, 9, 1], [1, 1, 1], [1, 9, 9], [1, 1, 1]]];

function fastDijkstra(graph, start) {
  return dijkstraDistances(graph, start);
}

function minimumEffort(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const effort = heights.map((row) => row.map(() => Infinity));
  effort[0][0] = 0;
  const queue = new HeapQueue();
  queue.enqueue([0, 0], 0);
  while (queue.size > 0) {
    const { val: [r, c], priority } = queue.dequeue();
    if (priority > effort[r][c]) continue;
    if (r === rows - 1 && c === cols - 1) return priority;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const candidate = Math.max(priority, Math.abs(heights[nr][nc] - heights[r][c]));
      if (candidate < effort[nr][nc]) {
        effort[nr][nc] = candidate;
        queue.enqueue([nr, nc], candidate);
      }
    }
  }
  return effort[rows - 1][cols - 1];
}

function nearestHospital(graph, hospitals) {
  const distances = {};
  for (const v of Object.keys(graph)) distances[v] = Infinity;
  const queue = new HeapQueue();
  for (const h of hospitals) {
    distances[h] = 0;
    queue.enqueue(h, 0);
  }
  while (queue.size > 0) {
    const { val: current, priority } = queue.dequeue();
    if (priority > distances[current]) continue;
    for (const { node, weight } of graph[current]) {
      const candidate = priority + weight;
      if (candidate < distances[node]) {
        distances[node] = candidate;
        queue.enqueue(node, candidate);
      }
    }
  }
  return distances;
}

function fastestRoute(roads, from, to) {
  const graph = {};
  const add = (a, b, minutes) => {
    if (!graph[a]) graph[a] = [];
    graph[a].push({ node: b, weight: minutes });
  };
  for (const r of roads) {
    const minutes = (r.km / r.speed) * 60;
    add(r.from, r.to, minutes);
    add(r.to, r.from, minutes);
  }
  if (!graph[from] || !graph[to]) return from === to ? { minutes: 0, route: [from] } : null;
  const route = dijkstraPath(graph, from, to);
  if (!route) return null;
  let minutes = 0;
  for (let i = 0; i + 1 < route.length; i++) {
    minutes += Math.min(...graph[route[i]].filter((e) => e.node === route[i + 1]).map((e) => e.weight));
  }
  return { minutes: Math.round(minutes), route };
}

function deliveryOrder(graph, depot) {
  const distances = dijkstraDistances(graph, depot);
  const reachable = Object.keys(distances)
    .filter((v) => v !== depot && distances[v] !== Infinity)
    .sort((a, b) => distances[a] - distances[b] || (a < b ? -1 : 1))
    .map((v) => ({ customer: v, distance: distances[v] }));
  const unreachable = Object.keys(distances).filter((v) => distances[v] === Infinity).sort();
  return { order: reachable, unreachable };
}

module.exports = {
  PriorityQueue, WeightedGraph, dijkstraDistances,
  buildPath, networkDelayTime, countShortestPaths,
  shortestDistances, protipriklad7, dijkstraPath, protipriklad8, minCostPath, protipriklad9,
  fastDijkstra, minimumEffort, nearestHospital,
  fastestRoute, deliveryOrder,
};
