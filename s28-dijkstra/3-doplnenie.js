/*
 * s28 Dijkstrov algoritmus – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Funkcie označené „pomocná – správna“ sú v poriadku.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

class PQ {
  constructor() {
    this.values = [];
  }

  // 3) enqueue
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority - b.___);
  }

  // 4) dequeue
  dequeue() {
    return this.values.___();
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

class WG {
  constructor() {
    this.adjacencyList = {};
  }

  // 1) addEdge
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight: ___ });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  // 2) addEdge2 – to isté, iná medzera
  addEdge2(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: ___, weight });
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

  // pomocná – správna: poskladá cestu z previous
  _cesta(previous, finish) {
    const path = [];
    let v = finish;
    while (previous[v]) {
      path.push(v);
      v = previous[v];
    }
    return path.concat(v).reverse();
  }

  // 5) dijkstra
  dijkstra(start, finish) {
    const pq = new HotovyPQ();
    const distances = {};
    const previous = {};
    for (const v in this.adjacencyList) {
      distances[v] = v === start ? 0 : ___;
      pq.enqueue(v, distances[v]);
      previous[v] = null;
    }
    while (pq.values.length) {
      const smallest = pq.dequeue().val;
      if (smallest === finish) return this._cesta(previous, finish);
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

  // 6) dijkstra2
  dijkstra2(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    while (pq.values.length) {
      const smallest = pq.dequeue().val;
      if (smallest === finish) return this._cesta(previous, finish);
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.___;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return [];
  }

  // 7) dijkstra3
  dijkstra3(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    while (pq.values.length) {
      const smallest = pq.dequeue().val;
      if (smallest === finish) return this._cesta(previous, finish);
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.___]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = smallest;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return [];
  }

  // 8) dijkstra4
  dijkstra4(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    while (pq.values.length) {
      const smallest = pq.dequeue().val;
      if (smallest === finish) return this._cesta(previous, finish);
      for (const neighbor of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = ___;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }
    return [];
  }

  // 9) dijkstra5 – vlastné skladanie cesty
  dijkstra5(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    while (pq.values.length) {
      let smallest = pq.dequeue().val;
      if (smallest === finish) {
        const path = [];
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        return path.concat(smallest).___();
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
    return [];
  }

  // 10) dijkstra6 (dve ___)
  dijkstra6(start, finish) {
    const { pq, distances, previous } = this._priprav(start);
    while (pq.values.length) {
      const smallest = pq.dequeue().___;
      if (smallest === ___) return this._cesta(previous, finish);
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
}

module.exports = { PQ, WG };

if (require.main === module) {
  require('../lib/test-runner').spusti('s28 Dijkstra – Doplň kód', require('./testy').doplnenie, module.exports);
}
