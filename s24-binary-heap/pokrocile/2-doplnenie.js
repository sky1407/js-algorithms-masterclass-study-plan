/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  12 BINARY HEAP A PRIORITY QUEUE – DOPLŇ KÓD (príklady 4–6)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom a doplň zložitosti ('___').
 * Pomocné MinHeap a sinkDownMax sú hotové a správne.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

class MinHeap {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  peek() {
    return this.values[0];
  }

  insert(value) {
    this.values.push(value);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx] >= this.values[parentIdx]) break;
      swap(this.values, idx, parentIdx);
      idx = parentIdx;
    }
  }

  extractMin() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      while (true) {
        const l = 2 * idx + 1;
        const r = 2 * idx + 2;
        let best = idx;
        if (l < this.values.length && this.values[l] < this.values[best]) best = l;
        if (r < this.values.length && this.values[r] < this.values[best]) best = r;
        if (best === idx) break;
        swap(this.values, idx, best);
        idx = best;
      }
    }
    return min;
  }
}

// Nechá prvok na indexe idx „klesnúť“ v max-halde, ktorá zaberá arr[0 .. length-1].
function sinkDownMax(arr, idx, length) {
  const element = arr[idx];
  while (true) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let swapIdx = null;
    if (leftIdx < length && arr[leftIdx] > element) swapIdx = leftIdx;
    if (rightIdx < length && ((swapIdx === null && arr[rightIdx] > element) || (swapIdx !== null && arr[rightIdx] > arr[leftIdx]))) {
      swapIdx = rightIdx;
    }
    if (swapIdx === null) return;
    swap(arr, idx, swapIdx);
    idx = swapIdx;
  }
}

// ─────────────────────────────────────────────────────────────────────
// 4) kthLargest – k-ty najväčší prvok. Trik: drž MIN-haldu s k
//    najväčšími prvkami, ktoré si zatiaľ videl. Jej koreň je k-ty najväčší.
//    kthLargest([3, 2, 1, 5, 6, 4], 2) → 5
// ─────────────────────────────────────────────────────────────────────
function kthLargest(arr, k) {
  const heap = new MinHeap();
  for (const x of arr) {
    heap.insert(x);
    if (heap.size() > ___) heap[___]();
  }
  return heap[___]();
}
const zlozitost4 = '___';

// ─────────────────────────────────────────────────────────────────────
// 5) heapify – premení ľubovoľné pole na max-haldu NA MIESTE.
//    Listy (druhá polovica poľa) sú už haldy, takže stačí sinkDown
//    pre všetkých rodičov – od posledného rodiča po koreň.
//    Prekvapivo je to O(n), nie O(n log n)!
// ─────────────────────────────────────────────────────────────────────
function heapify(arr) {
  for (let i = Math.floor(arr.length / 2) - ___; i >= 0; i--) sinkDownMax(arr, i, ___);
  return arr;
}
const zlozitost5 = '___';

// ─────────────────────────────────────────────────────────────────────
// 6) heapSort – zoraď vzostupne NA MIESTE (používa tvoje heapify z príkladu 5):
//    1. heapify → maximum je na indexe 0
//    2. vymeň ho s posledným prvkom „haldovej“ časti (tam už ostane)
//    3. halda sa zmenšila o 1 → sinkDown koreňa, opakuj
// ─────────────────────────────────────────────────────────────────────
function heapSort(arr) {
  heapify(arr);
  for (let end = arr.length - 1; end > 0; end--) {
    swap(arr, 0, ___);
    sinkDownMax(arr, 0, ___);
  }
  return arr;
}
const zlozitost6 = '___';

module.exports = { kthLargest, zlozitost4, heapify, zlozitost5, heapSort, zlozitost6 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('12 Binary Heap – Doplň kód', require('./testy').doplnenie, module.exports);
}
