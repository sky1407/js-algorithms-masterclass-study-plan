/*
 * RIEŠENIA – 12 Binary Heap a Priority Queue
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function sinkDownMax(values, idx, length) {
  const element = values[idx];
  while (true) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let swapIdx = null;
    if (leftIdx < length && values[leftIdx] > element) swapIdx = leftIdx;
    if (
      rightIdx < length &&
      ((swapIdx === null && values[rightIdx] > element) || (swapIdx !== null && values[rightIdx] > values[leftIdx]))
    ) {
      swapIdx = rightIdx;
    }
    if (swapIdx === null) return;
    swap(values, idx, swapIdx);
    idx = swapIdx;
  }
}

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
      sinkDownMax(this.values, 0, this.values.length);
    }
    return max;
  }
}

class PriorityQueue {
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
        let s = null;
        if (l < length && this.values[l].priority < this.values[idx].priority) s = l;
        if (r < length && this.values[r].priority < (s === null ? this.values[idx] : this.values[l]).priority) s = r;
        if (s === null) break;
        swap(this.values, idx, s);
        idx = s;
      }
    }
    return min;
  }
}

function kthLargest(arr, k) {
  const heap = new MinHeap();
  for (const x of arr) {
    heap.insert(x);
    if (heap.size() > k) heap.extractMin();
  }
  return heap.peek();
}
const zlozitost4 = 'O(n log k)';

function heapify(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) sinkDownMax(arr, i, arr.length);
  return arr;
}
const zlozitost5 = 'O(n)';

function heapSort(arr) {
  heapify(arr);
  for (let end = arr.length - 1; end > 0; end--) {
    swap(arr, 0, end);
    sinkDownMax(arr, 0, end);
  }
  return arr;
}
const zlozitost6 = 'O(n log n)';

class StablePriorityQueue {
  constructor() {
    this.values = [];
    this.counter = 0;
  }

  before(a, b) {
    return a.priority < b.priority || (a.priority === b.priority && a.seq < b.seq);
  }

  enqueue(val, priority) {
    this.values.push({ val, priority, seq: this.counter++ });
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (!this.before(this.values[idx], this.values[parentIdx])) break;
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
        if (l < length && this.before(this.values[l], this.values[best])) best = l;
        if (r < length && this.before(this.values[r], this.values[best])) best = r;
        if (best === idx) break;
        swap(this.values, idx, best);
        idx = best;
      }
    }
    return min.val;
  }
}
const protipriklad7 = [['insert', 10], ['insert', 9], ['insert', 8], ['insert', 1], ['extractMax'], ['extractMax']];
const protipriklad8 = [['enqueue', 'a', 1], ['enqueue', 'b', 1], ['enqueue', 'c', 1], ['dequeue'], ['dequeue'], ['dequeue']];

function isMaxHeap(arr) {
  for (let i = 0; i < arr.length; i++) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < arr.length && arr[i] < arr[l]) return false;
    if (r < arr.length && arr[i] < arr[r]) return false;
  }
  return true;
}
const protipriklad9 = [[5, 3]];

class MinHeap {
  constructor(cmp = (a, b) => a - b) {
    this.values = [];
    this.cmp = cmp;
  }

  size() {
    return this.values.length;
  }

  peek() {
    return this.values.length > 0 ? this.values[0] : undefined;
  }

  insert(value) {
    this.values.push(value);
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.cmp(this.values[idx], this.values[parentIdx]) >= 0) break;
      swap(this.values, idx, parentIdx);
      idx = parentIdx;
    }
    return this.values.length;
  }

  extractMin() {
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
        if (l < length && this.cmp(this.values[l], this.values[best]) < 0) best = l;
        if (r < length && this.cmp(this.values[r], this.values[best]) < 0) best = r;
        if (best === idx) break;
        swap(this.values, idx, best);
        idx = best;
      }
    }
    return min;
  }
}

function kClosest(points, k) {
  const farther = (a, b) => {
    const da = a.p[0] ** 2 + a.p[1] ** 2;
    const db = b.p[0] ** 2 + b.p[1] ** 2;
    return da !== db ? db - da : b.i - a.i;
  };
  const heap = new MinHeap(farther);
  points.forEach((p, i) => {
    heap.insert({ p, i });
    if (heap.size() > k) heap.extractMin();
  });
  const result = [];
  while (heap.size() > 0) result.push(heap.extractMin().p);
  return result.reverse();
}

function mergeKSorted(arrays) {
  const heap = new MinHeap((a, b) => a.value - b.value || a.list - b.list);
  arrays.forEach((arr, list) => {
    if (arr.length > 0) heap.insert({ value: arr[0], list, idx: 0 });
  });
  const result = [];
  while (heap.size() > 0) {
    const { value, list, idx } = heap.extractMin();
    result.push(value);
    if (idx + 1 < arrays[list].length) heap.insert({ value: arrays[list][idx + 1], list, idx: idx + 1 });
  }
  return result;
}

function minMeetingRooms(meetings) {
  const starts = new MinHeap((a, b) => a[0] - b[0]);
  for (const m of meetings) starts.insert(m);
  const ends = new MinHeap();
  let rooms = 0;
  while (starts.size() > 0) {
    const [start, end] = starts.extractMin();
    while (ends.size() > 0 && ends.peek() <= start) ends.extractMin();
    ends.insert(end);
    rooms = Math.max(rooms, ends.size());
  }
  return rooms;
}

function topKHashtags(tags, k) {
  const counts = new Map();
  for (const t of tags) counts.set(t, (counts.get(t) || 0) + 1);
  const worse = (a, b) => a.count - b.count || (a.tag > b.tag ? -1 : a.tag < b.tag ? 1 : 0);
  const heap = new MinHeap(worse);
  for (const [tag, count] of counts) {
    heap.insert({ tag, count });
    if (heap.size() > k) heap.extractMin();
  }
  const result = [];
  while (heap.size() > 0) result.push(heap.extractMin().tag);
  return result.reverse();
}

module.exports = {
  MaxBinaryHeap, PriorityQueue,
  kthLargest, zlozitost4, heapify, zlozitost5, heapSort, zlozitost6,
  StablePriorityQueue, protipriklad7, protipriklad8, isMaxHeap, protipriklad9,
  MinHeap, kClosest, mergeKSorted,
  minMeetingRooms, topKHashtags,
};
