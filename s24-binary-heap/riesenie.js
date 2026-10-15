/*
 * s24 Binary Heap a Priority Queue – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * MaxBinaryHeap (2-debug), MaxHeap (3-doplnenie) a MaxHeapP (5-prakticke) sú ten istý heap.
 * PriorityQueue, PQ a PriorityQ sú ten istý prioritný rad.
 */
'use strict';

function parentIdx(i) {
  return Math.floor((i - 1) / 2);
}

function childIdxs(i) {
  return [2 * i + 1, 2 * i + 2];
}

class MaxHeapP {
  constructor() {
    this.values = [];
  }

  insert(element) {
    this.values.push(element);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[pIdx];
      if (element <= parent) break;
      this.values[pIdx] = element;
      this.values[idx] = parent;
      idx = pIdx;
    }
    return this;
  }

  insert2(element) {
    return this.insert(element);
  }

  insert3(element) {
    return this.insert(element);
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  extractMax2() {
    return this.extractMax();
  }

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
        if ((swap === null && right > element) || (swap !== null && right > this.values[leftIdx])) {
          swap = rightIdx;
        }
      }
      if (swap === null) break;
      [this.values[idx], this.values[swap]] = [this.values[swap], this.values[idx]];
      idx = swap;
    }
  }

  sinkDown2() {
    this.sinkDown();
  }

  peek() {
    return this.values[0];
  }
}

function isMaxHeapArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < arr.length && arr[left] > arr[i]) return false;
    if (right < arr.length && arr[right] > arr[i]) return false;
  }
  return true;
}

class PNode {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQ {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const node = new PNode(val, priority);
    this.values.push(node);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const pIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[pIdx];
      if (node.priority >= parent.priority) break;
      this.values[pIdx] = node;
      this.values[idx] = parent;
      idx = pIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
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

function heapSortDesc(arr) {
  const h = new MaxHeapP();
  for (const x of arr) h.insert(x);
  const v = [];
  while (h.values.length) v.push(h.extractMax());
  return v;
}

function topK(nums, k) {
  const h = new MaxHeapP();
  for (const x of nums) h.insert(x);
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(h.extractMax());
  }
  return result;
}

module.exports = {
  parentIndex: parentIdx,
  leftChildIndex: (i) => 2 * i + 1,
  MaxBinaryHeap: MaxHeapP,
  PriorityQueue: PriorityQ,
  isMaxHeap: isMaxHeapArr,
  topK,
  parent: parentIdx,
  rightChild: (i) => 2 * i + 2,
  MaxHeap: MaxHeapP,
  PQ: PriorityQ,
  parentIdx, childIdxs, MaxHeapP, isMaxHeapArr, PNode, PriorityQ, heapSortDesc,
};
