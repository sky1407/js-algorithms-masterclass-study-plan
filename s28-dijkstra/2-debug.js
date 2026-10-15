/*
 * s28 Dijkstrov algoritmus – DEBUGGING (10 úloh)
 *
 * Každá úloha má presne JEDNU chybu. Nájdi ju a oprav.
 * Funkcie označené „pomocná – správna“ sú v poriadku.
 * Testovací graf: A-B 4, A-C 2, B-E 3, C-D 2, C-F 4, D-E 3, D-F 1, E-F 1
 * Najkratšia cesta A → E je A, C, D, F, E (dĺžka 6).
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: breakpoint do cyklu while + F5 → Node.js. Sleduj distances, previous a smallest.
 */
'use strict';

// 3) – 4) jednoduchý prioritný rad
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  // 3) enqueue – pridá a zotriedi (najmenšia priorita dopredu)
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => b.priority - a.priority);
  }

  // 4) dequeue – vyberie prvok s najmenšou prioritou
  dequeue() {
    return this.values.pop();
  }
}

// pomocná – správna: prioritný rad
class HotovyPQ {
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

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  // 1) addEdge – vážená neorientovaná hrana
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v2, weight });
  }

  // 2) neighbors – pole mien susedov vrcholu
  neighbors(vertex) {
    return this.adjacencyList[vertex].map(e => e.weight);
  }

  // pomocná – správna: pripraví pq, distances a previous
  _priprav(start) {
    const pq = new HotovyPQ();
    const distances = {};
    const previous = {};
    for (const v in this.adjacencyList) {
      distances[v] = v === start ? 0 : Infinity;
      pq.enqueue(v, distances[v]);
      previous[v] = null;
    }
    return { pq, distances, previous };
  }

  // 5) dijkstra – najkratšia cesta zo start do finish
  dijkstra(start, finish) {
    const pq = new HotovyPQ();
    const distances = {};
    const previous = {};
    const path = [];
    for (const v in this.adjacencyList) {
      if (v === start) {
        distances[v] = 0;
        pq.enqueue(v, 0);
      } else {
        distances[v] = 0;
        pq.enqueue(v, 0);
      }
      previous[v] = null;
    }
    while (pq.values.length) {
      let smallest = pq.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest).reverse();
      }
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return path;
  }

  // 6) dijkstra2 – najkratšia cesta zo start do finish
  dijkstra2(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    const path = [];
    while (pq.values.length) {
      let smallest = pq.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest).reverse();
      }
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[neighbor.node] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return path;
  }

  // 7) dijkstra3 – najkratšia cesta zo start do finish
  dijkstra3(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    const path = [];
    while (pq.values.length) {
      let smallest = pq.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest).reverse();
      }
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate > distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return path;
  }

  // 8) dijkstra4 – najkratšia cesta zo start do finish
  dijkstra4(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    const path = [];
    while (pq.values.length) {
      let smallest = pq.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest);
      }
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return path;
  }

  // 9) shortestDistance – dĺžka najkratšej cesty zo start do finish
  shortestDistance(start, finish) {
    const { pq, distances } = this._priprav(start);
    while (pq.values.length) {
      const smallest = pq.dequeue().val;
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return distances[start];
  }

  // 10) pathCost – súčet váh hrán pozdĺž zadanej cesty
  pathCost(path) {
    let spolu = 0;
    for (let i = 1; i < path.length - 1; i++) {
      const hrana = this.adjacencyList[path[i]].find(e => e.node === path[i + 1]);
      spolu += hrana.weight;
    }
    return spolu;
  }
}

module.exports = { PriorityQueue, WeightedGraph };

if (require.main === module) {
  require('../lib/test-runner').spusti('s28 Dijkstra – Debugging', require('./testy').debug, module.exports);
}
