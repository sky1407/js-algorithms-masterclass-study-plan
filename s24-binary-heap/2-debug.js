/*
 * s24 Binary Heap a Priority Queue – DEBUGGING (10 úloh)
 *
 * Každá úloha má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy si pole values pripravia samy, takže poradie úloh je jedno.
 * Testovací heap: [41, 39, 33, 18, 27, 12]
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: breakpoint + F5 → Node.js. Vo Variables sleduj this.values, idx a swap.
 */
'use strict';

// 1) parentIndex – index rodiča prvku na indexe i
//    parentIndex(5) → 2
function parentIndex(i) {
  return Math.floor(i / 2);
}

// 2) leftChildIndex – index ľavého dieťaťa prvku na indexe i
//    leftChildIndex(1) → 3
function leftChildIndex(i) {
  return 2 * i + 2;
}

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  // 3) insert – pridá prvok a nechá ho vybublať hore
  insert(element) {
    this.values.push(element);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element >= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return this;
  }

  // 4) extractMax – vyberie a vráti najväčší prvok
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return this.values[0];
  }

  // 5) extractMax2 – to isté ako extractMax (iná chyba)
  extractMax2() {
    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;
    this.sinkDown();
    return max;
  }

  // 6) sinkDown – nechá koreň klesnúť na správne miesto
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swap = null;
      if (leftIdx < length && this.values[leftIdx] > element) {
        swap = leftIdx;
      }
      if (rightIdx < length) {
        const right = this.values[rightIdx];
        if ((swap === null && right > element) || (swap !== null && right < this.values[leftIdx])) {
          swap = rightIdx;
        }
      }
      if (swap === null) break;
      [this.values[idx], this.values[swap]] = [this.values[swap], this.values[idx]];
      idx = swap;
    }
  }
}

// pomocná – správna: prvok prioritného radu
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

// 7) – 8) prioritný rad (min heap podľa priority – menšie číslo ide prvé)
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  // 7) enqueue – pridá prvok s prioritou
  enqueue(val, priority) {
    const node = new Node(val, priority);
    this.values.push(node);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (node.val >= parent.val) break;
      this.values[parentIdx] = node;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  // 8) dequeue – vyberie a vráti prvok s najmenšou prioritou
  dequeue() {
    const min = this.values[this.values.length - 1];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
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

// 9) isMaxHeap – je pole platný max heap?
//    isMaxHeap([10, 9, 8, 7]) → true,   isMaxHeap([10, 3, 8, 7]) → false
function isMaxHeap(arr) {
  for (let i = 0; i < arr.length; i++) {
    const left = 2 * i;
    const right = 2 * i + 2;
    if (left < arr.length && arr[left] > arr[i]) return false;
    if (right < arr.length && arr[right] > arr[i]) return false;
  }
  return true;
}

// pomocná – správna: max heap s insert a extractMax
class HotovyHeap {
  constructor() {
    this.values = [];
  }

  insert(x) {
    this.values.push(x);
    let i = this.values.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.values[i] <= this.values[p]) break;
      [this.values[i], this.values[p]] = [this.values[p], this.values[i]];
      i = p;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let s = i;
        if (l < this.values.length && this.values[l] > this.values[s]) s = l;
        if (r < this.values.length && this.values[r] > this.values[s]) s = r;
        if (s === i) break;
        [this.values[i], this.values[s]] = [this.values[s], this.values[i]];
        i = s;
      }
    }
    return max;
  }
}

// 10) topK – k najväčších čísel od najväčšieho
//     topK([5, 1, 9, 3], 2) → [9, 5]
function topK(nums, k) {
  const h = new HotovyHeap();
  for (const x of nums) h.insert(x);
  const result = [];
  for (let i = 0; i <= k; i++) {
    result.push(h.extractMax());
  }
  return result;
}

module.exports = { parentIndex, leftChildIndex, MaxBinaryHeap, PriorityQueue, isMaxHeap, topK };

if (require.main === module) {
  require('../lib/test-runner').spusti('s24 Binary Heap – Debugging', require('./testy').debug, module.exports);
}
