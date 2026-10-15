/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  12 BINARY HEAP A PRIORITY QUEUE – DEBUGGING (príklady 1–3)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Halda je uložená v POLI. Pre prvok na indexe i:
 *   ľavé dieťa  = 2i + 1
 *   pravé dieťa = 2i + 2
 *   rodič       = Math.floor((i - 1) / 2)
 * Max-halda: rodič ≥ deti.  Min-halda: rodič ≤ deti.
 *
 * Testy porovnávajú aj obsah poľa values, takže drž sa postupu z kurzu
 * (pri rovnakých deťoch sa vymieňa s ĽAVÝM).
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 1) insert – pridá na koniec a „vybuble“ hore, kým je väčší ako rodič.
  //      Vráti this.
  // ───────────────────────────────────────────────────────────────────
  insert(value) {
    this.values.push(value);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor(idx / 2);
      if (this.values[idx] <= this.values[parentIdx]) break;
      swap(this.values, idx, parentIdx);
      idx = parentIdx;
    }
    return this.values;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 2) extractMax – vráti koreň (maximum). Posledný prvok presunie
  //      na koreň a nechá ho „klesnúť“ (sink down) na správne miesto.
  //      Prázdna halda → undefined.
  // ───────────────────────────────────────────────────────────────────
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx = null;
      if (leftIdx < length && this.values[leftIdx] > element) swapIdx = leftIdx;
      if (
        rightIdx < length &&
        ((swapIdx === null && this.values[rightIdx] > element) ||
          (swapIdx !== null && this.values[rightIdx] > this.values[leftIdx]))
      ) {
        swapIdx = rightIdx;
      }
      if (swapIdx === null) break;
      this.values[idx] = this.values[swapIdx];
      idx = swapIdx;
    }
    return max;
  }
}

// ─────────────────────────────────────────────────────────────────────
// ⚠ 3) PriorityQueue – MIN-halda uzlov { val, priority }.
//      Menšie číslo priority = dôležitejšie (1 = urgentné).
//      enqueue(val, priority) vráti this, dequeue() vráti uzol alebo undefined.
// ─────────────────────────────────────────────────────────────────────
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push(new Node(val, priority));
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx].priority <= this.values[parentIdx].priority) break;
      swap(this.values, idx, parentIdx);
      idx = parentIdx;
    }
    return this;
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;
    let idx = 0;
    const length = this.values.length;
    while (true) {
      const l = 2 * idx + 1;
      const r = 2 * idx + 2;
      let s = null;
      if (l < length && this.values[l].priority < this.values[idx].priority) s = l;
      if (r < length && this.values[r].priority < (s === null ? this.values[idx] : this.values[l]).priority) s = r;
      if (s === null) break;
      swap(this.values, idx, s);
      idx = s;
    }
    return min;
  }
}

module.exports = { MaxBinaryHeap, PriorityQueue };

if (require.main === module) {
  require('../../lib/test-runner').spusti('12 Binary Heap – Debugging', require('./testy').debug, module.exports);
}
