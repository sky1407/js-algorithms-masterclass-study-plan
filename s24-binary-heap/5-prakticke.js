/*
 * s24 Binary Heap a Priority Queue – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie / metódy sám.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) parentIdx – index rodiča prvku na indexe i
//    parentIdx(9) → 4
function parentIdx(i) {

}

// 2) childIdxs – pole [index ľavého dieťaťa, index pravého dieťaťa]
//    childIdxs(3) → [7, 8]
function childIdxs(i) {

}

// 3) – 5) max binary heap v poli this.values
class MaxHeapP {
  constructor() {
    this.values = [];
  }

  // 3) insert(x) – pridá prvok (bubble up), vráti this
  insert(x) {

  }

  // 4) extractMax() – vyberie a vráti najväčší prvok (sink down); prázdny → undefined
  extractMax() {

  }

  // 5) peek() – najväčší prvok bez odobratia; prázdny → undefined
  peek() {

  }
}

// 6) isMaxHeapArr – je pole platný max heap? (každý rodič >= jeho deti)
//    isMaxHeapArr([41, 39, 33, 18, 27, 12]) → true,   isMaxHeapArr([5, 6]) → false
function isMaxHeapArr(arr) {

}

// 7) PNode – prvok prioritného radu s vlastnosťami val a priority
class PNode {
  constructor(val, priority) {

  }
}

// 8) – 9) prioritný rad: min heap podľa priority (menšie číslo = dôležitejšie)
class PriorityQ {
  constructor() {
    this.values = [];
  }

  // 8) enqueue(val, priority) – pridá prvok na správne miesto
  enqueue(val, priority) {

  }

  // 9) dequeue() – vyberie a vráti uzol s najmenšou prioritou; prázdny → undefined
  dequeue() {

  }
}

// 10) heapSortDesc – zoradí čísla od najväčšieho pomocou MaxHeapP (bez .sort())
//     heapSortDesc([3, 9, 1, 7, 5]) → [9, 7, 5, 3, 1]
function heapSortDesc(arr) {

}

module.exports = { parentIdx, childIdxs, MaxHeapP, isMaxHeapArr, PNode, PriorityQ, heapSortDesc };

if (require.main === module) {
  require('../lib/test-runner').spusti('s24 Binary Heap – Praktické úlohy', require('./testy').prakticke, module.exports);
}
