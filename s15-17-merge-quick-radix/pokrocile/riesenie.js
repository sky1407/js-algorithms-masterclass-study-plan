/*
 * RIEŠENIA – 07 Merge sort, Quick sort, Radix sort
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function merge(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);
  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
const zlozitost2 = 'O(n log n)';

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function pivot(arr, start = 0, end = arr.length - 1) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const p = pivot(arr, left, right);
    quickSort(arr, left, p - 1);
    quickSort(arr, p + 1, right);
  }
  return arr;
}
const zlozitost3 = 'O(n^2)';

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let max = 0;
  for (const n of nums) max = Math.max(max, digitCount(n));
  return max;
}

function radixSort(nums) {
  const maxDigits = mostDigits(nums);
  for (let k = 0; k < maxDigits; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const n of nums) buckets[getDigit(n, k)].push(n);
    nums = [].concat(...buckets);
  }
  return nums;
}

function partition(arr, lo, hi) {
  const pivotValue = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivotValue) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

function quickSortLomuto(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSortLomuto(arr, lo, p - 1);
    quickSortLomuto(arr, p + 1, hi);
  }
  return arr;
}

function mergeSortBy(arr, key) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortBy(arr.slice(0, mid), key);
  const right = mergeSortBy(arr.slice(mid), key);
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i][key] <= right[j][key]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
const protipriklad7 = [[{ n: 'a', v: 1 }, { n: 'b', v: 1 }], 'v'];

function quickSortSafe(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    swap(arr, left, left + Math.floor(Math.random() * (right - left + 1)));
    const p = pivot(arr, left, right);
    quickSortSafe(arr, left, p - 1);
    quickSortSafe(arr, p + 1, right);
  }
  return arr;
}
const protipriklad8 = [Array.from({ length: 20000 }, (_, i) => i)];

function radixSortSigned(nums) {
  const negatives = radixSort(nums.filter((n) => n < 0).map((n) => -n)).reverse().map((n) => -n);
  const positives = radixSort(nums.filter((n) => n >= 0));
  return negatives.concat(positives);
}
const protipriklad9 = [[-5, 3]];

function mergeSortFull(arr) {
  if (arr.length <= 1) return [...arr];
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSortFull(arr.slice(0, mid)), mergeSortFull(arr.slice(mid)));
}

function quickSelect(arr, k) {
  if (k < 1 || k > arr.length) return undefined;
  const a = [...arr];
  let lo = 0;
  let hi = a.length - 1;
  const target = k - 1;
  while (true) {
    const r = lo + Math.floor(Math.random() * (hi - lo + 1));
    swap(a, r, hi);
    const p = partition(a, lo, hi);
    if (p === target) return a[p];
    if (p < target) lo = p + 1;
    else hi = p - 1;
  }
}

function countInversions(arr) {
  function sortCount(a) {
    if (a.length <= 1) return { sorted: a, count: 0 };
    const mid = Math.floor(a.length / 2);
    const l = sortCount(a.slice(0, mid));
    const r = sortCount(a.slice(mid));
    const sorted = [];
    let count = l.count + r.count;
    let i = 0;
    let j = 0;
    while (i < l.sorted.length && j < r.sorted.length) {
      if (l.sorted[i] <= r.sorted[j]) {
        sorted.push(l.sorted[i++]);
      } else {
        count += l.sorted.length - i;
        sorted.push(r.sorted[j++]);
      }
    }
    while (i < l.sorted.length) sorted.push(l.sorted[i++]);
    while (j < r.sorted.length) sorted.push(r.sorted[j++]);
    return { sorted, count };
  }
  return sortCount(arr).count;
}

function mergeLogs(servers) {
  if (servers.length === 0) return [];
  if (servers.length === 1) return [...servers[0]];
  const mid = Math.floor(servers.length / 2);
  const left = mergeLogs(servers.slice(0, mid));
  const right = mergeLogs(servers.slice(mid));
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i].time <= right[j].time) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}

function sortOrderIds(ids) {
  return radixSort(ids);
}

module.exports = {
  merge, mergeSort, zlozitost2, quickSort, zlozitost3,
  getDigit, digitCount, mostDigits, radixSort, quickSortLomuto,
  mergeSortBy, protipriklad7, quickSortSafe, protipriklad8, radixSortSigned, protipriklad9,
  mergeSortFull, quickSelect, countInversions,
  mergeLogs, sortOrderIds,
};
