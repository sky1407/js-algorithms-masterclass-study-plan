/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  12 BINARY HEAP A PRIORITY QUEUE – HĽADANIE CHÝB (7–9)           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš vstup, na ktorom pôvodný kód zlyhá:
 *      - pre triedy POLE OPERÁCIÍ: [['insert', 5], ['extractMax']]
 *      - pre funkciu POLE ARGUMENTOV: [[9, 4, 7]]
 *   2. Oprav kód.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// ─────────────────────────────────────────────────────────────────────
// 7) MaxBinaryHeap – insert je správny, chyba je v extractMax.
//    Pri sink down sa má prvok vymeniť s VÄČŠÍM z detí
//    (pri rovnosti s ľavým).
// ─────────────────────────────────────────────────────────────────────
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx] <= this.values[parentIdx]) break;
      swap(this.values, idx, parentIdx);
      idx = parentIdx;
    }
    return this;
  }

  extractMax() {
    if (this.values.length === 0) return undefined;
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      const length = this.values.length;
      while (true) {
        const leftIdx = 2 * idx + 1;
        const rightIdx = 2 * idx + 2;
        let swapIdx = null;
        if (leftIdx < length && this.values[leftIdx] > this.values[idx]) swapIdx = leftIdx;
        if (rightIdx < length && this.values[rightIdx] > this.values[idx]) swapIdx = rightIdx;
        if (swapIdx === null) break;
        swap(this.values, idx, swapIdx);
        idx = swapIdx;
      }
    }
    return max;
  }
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) StablePriorityQueue – urgentný príjem v nemocnici.
//    Menšie číslo = urgentnejšie. Pacienti s ROVNAKOU prioritou musia
//    ísť v poradí, v akom prišli (FIFO). dequeue() vracia len val.
//    Tip na opravu: pridaj každému uzlu poradové číslo príchodu.
// ─────────────────────────────────────────────────────────────────────
class StablePriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx].priority >= this.values[parentIdx].priority) break;
      swap(this.values, idx, parentIdx);
      idx = parentIdx;
    }
    return this;
  }

  dequeue() {
    if (this.values.length === 0) return undefined;
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      const length = this.values.length;
      while (true) {
        const l = 2 * idx + 1;
        const r = 2 * idx + 2;
        let best = idx;
        if (l < length && this.values[l].priority < this.values[best].priority) best = l;
        if (r < length && this.values[r].priority < this.values[best].priority) best = r;
        if (best === idx) break;
        swap(this.values, idx, best);
        idx = best;
      }
    }
    return min.val;
  }
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) isMaxHeap – spĺňa pole vlastnosť max-haldy (rodič ≥ každé dieťa)?
// ─────────────────────────────────────────────────────────────────────
function isMaxHeap(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    if (!(arr[i] >= arr[2 * i + 1] && arr[i] >= arr[2 * i + 2])) return false;
  }
  return true;
}
const protipriklad9 = ___;

module.exports = { MaxBinaryHeap, protipriklad7, StablePriorityQueue, protipriklad8, isMaxHeap, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('12 Binary Heap – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
