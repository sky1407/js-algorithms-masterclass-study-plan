/*
 * s28 Dijkstrov algoritmus – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * PriorityQueue (2-debug), PQ (3-doplnenie) a NaivePQ (5-prakticke) sú ten istý rad.
 * WeightedGraph (2-debug), WG (3-doplnenie) a WGraph (5-prakticke) sú ten istý graf.
 * Všetky varianty dijkstra, dijkstra2 … dijkstra6 sú opravené verzie metódy dijkstraPath.
 */
'use strict';

class NaivePQ {
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

  isEmpty() {
    return this.values.length === 0;
  }
}

class WGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  addEdge2(v1, v2, weight) {
    this.addEdge(v1, v2, weight);
  }

  neighbors(vertex) {
    return this.adjacencyList[vertex].map(e => e.node);
  }

  dijkstraDistances(start) {
    const pq = new NaivePQ();
    const distances = {};
    for (const v in this.adjacencyList) {
      distances[v] = v === start ? 0 : Infinity;
    }
    pq.enqueue(start, 0);
    while (!pq.isEmpty()) {
      const { val: smallest, priority } = pq.dequeue();
      if (priority > distances[smallest]) continue;
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return distances;
  }

  dijkstraPath(start, finish) {
    const pq = new NaivePQ();
    const distances = {};
    const previous = {};
    const path = [];
    for (const v in this.adjacencyList) {
      if (v === start) {
        distances[v] = 0;
        pq.enqueue(v, 0);
      } else {
        distances[v] = Infinity;
        pq.enqueue(v, Infinity);
      }
      previous[v] = null;
    }
    while (pq.values.length) {
      let smallest = pq.dequeue().val;
      if (smallest === finish) {
        if (distances[smallest] === Infinity) return [];
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest).reverse();
      }
      if (distances[smallest] === Infinity) continue;
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return [];
  }

  dijkstra(start, finish) {
    return this.dijkstraPath(start, finish);
  }

  dijkstra2(start, finish) {
    return this.dijkstraPath(start, finish);
  }

  dijkstra3(start, finish) {
    return this.dijkstraPath(start, finish);
  }

  dijkstra4(start, finish) {
    return this.dijkstraPath(start, finish);
  }

  dijkstra5(start, finish) {
    return this.dijkstraPath(start, finish);
  }

  dijkstra6(start, finish) {
    return this.dijkstraPath(start, finish);
  }

  shortestDistance(start, finish) {
    return this.dijkstraDistances(start)[finish];
  }

  pathCost(path) {
    let spolu = 0;
    for (let i = 0; i < path.length - 1; i++) {
      spolu += this.adjacencyList[path[i]].find(e => e.node === path[i + 1]).weight;
    }
    return spolu;
  }

  nearestNeighbor(vertex) {
    let best = null;
    let bestWeight = Infinity;
    for (const e of this.adjacencyList[vertex]) {
      if (e.weight < bestWeight) {
        bestWeight = e.weight;
        best = e.node;
      }
    }
    return best;
  }

  reachableWithin(start, maxDist) {
    const d = this.dijkstraDistances(start);
    return Object.keys(d).filter(v => d[v] <= maxDist).sort();
  }
}

module.exports = {
  PriorityQueue: NaivePQ, WeightedGraph: WGraph,
  PQ: NaivePQ, WG: WGraph,
  NaivePQ, WGraph,
};
