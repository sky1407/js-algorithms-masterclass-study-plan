/*
 * s24 Binary Heap a Priority Queue – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Testy si pole values pripravia samy, takže poradie úloh je jedno.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) parent – index rodiča
function parent(i) {
  return Math.floor((i - 1) / ___);
}

// 2) rightChild – index pravého dieťaťa
function rightChild(i) {
  return 2 * i + ___;
}

class MaxHeap {
  constructor() {
    this.values = [];
  }

  // 3) insert
  insert(element) {
    this.values.___(element);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return this;
  }

  // 4) insert2 – to isté, iná medzera
  insert2(element) {
    this.values.push(element);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element <= ___) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return this;
  }

  // 5) insert3 – to isté, iná medzera
  insert3(element) {
    this.values.push(element);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = ___;
    }
    return this;
  }

  // 6) extractMax
  extractMax() {
    const max = this.values[0];
    const end = this.values.___();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown2();
    }
    return max;
  }

  // 7) sinkDown
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftIdx = 2 * idx + ___;
      const rightIdx = 2 * idx + 2;
      let swap = null;
      if (leftIdx < length && this.values[leftIdx] > element) swap = leftIdx;
      if (rightIdx < length) {
        const right = this.values[rightIdx];
        if ((swap === null && right > element) || (swap !== null && right > this.values[leftIdx])) swap = rightIdx;
      }
      if (swap === null) break;
      [this.values[idx], this.values[swap]] = [this.values[swap], this.values[idx]];
      idx = swap;
    }
  }

  // 8) sinkDown2 – to isté, iná medzera
  sinkDown2() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swap = null;
      if (leftIdx < length && this.values[leftIdx] > element) swap = leftIdx;
      if (rightIdx < length) {
        const right = this.values[rightIdx];
        if ((swap === null && right > element) || (swap !== null && right > this.values[leftIdx])) swap = rightIdx;
      }
      if (swap === null) break;
      [this.values[idx], this.values[swap]] = [this.values[swap], this.values[___]];
      idx = swap;
    }
  }
}

class PQ {
  constructor() {
    this.values = [];
  }

  // 9) enqueue
  enqueue(val, priority) {
    const node = { val, priority };
    this.values.push(node);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (node.___ >= parent.priority) break;
      this.values[parentIdx] = node;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  // 10) dequeue (dve ___)
  dequeue() {
    const min = this.values[___];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = ___;
      let idx = 0;
      const length = this.values.length;
      while (true) {
        const l = 2 * idx + 1;
        const r = 2 * idx + 2;
        let swap = null;
        if (l < length && this.values[l].priority < end.priority) swap = l;
        if (r < length && this.values[r].priority < (swap === null ? end.priority : this.values[l].priority)) swap = r;
        if (swap === null) break;
        [this.values[idx], this.values[swap]] = [this.values[swap], this.values[idx]];
        idx = swap;
      }
    }
    return min;
  }
}

module.exports = { parent, rightChild, MaxHeap, PQ };

if (require.main === module) {
  require('../lib/test-runner').spusti('s24 Binary Heap – Doplň kód', require('./testy').doplnenie, module.exports);
}
