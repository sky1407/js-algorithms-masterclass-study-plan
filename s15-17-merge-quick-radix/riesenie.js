/*
 * s15-17 Merge, Quick, Radix Sort – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 */
'use strict';

// ───────────── 2-debug.js ─────────────

function merge(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }
  while (i < a.length) {
    result.push(a[i]);
    i++;
  }
  while (j < b.length) {
    result.push(b[j]);
    j++;
  }
  return result;
}

function mergeB(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]); i++; }
  while (j < b.length) { result.push(b[j]); j++; }
  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function mergeSortB(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortB(arr.slice(0, mid));
  const right = mergeSortB(arr.slice(mid));
  return merge(left, right);
}

function pivot(arr, start = 0, end = arr.length - 1) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
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

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / 10 ** i) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let max = 0;
  for (const n of nums) {
    max = Math.max(max, digitCount(n));
  }
  return max;
}

function radixSort(nums) {
  const kola = mostDigits(nums);
  for (let k = 0; k < kola; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const n of nums) {
      buckets[getDigit(n, k)].push(n);
    }
    nums = [].concat(...buckets);
  }
  return nums;
}

// ───────────── 3-doplnenie.js ─────────────

function mergeX(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]); i++; }
  while (j < b.length) { result.push(b[j]); j++; }
  return result;
}

function mergeRest(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]); i++; }
  while (j < b.length) { result.push(b[j]); j++; }
  return result;
}

function mergeSortMid(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSortMid(arr.slice(0, mid)), mergeSortMid(arr.slice(mid)));
}

function mergeSortJoin(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortJoin(arr.slice(0, mid));
  const right = mergeSortJoin(arr.slice(mid));
  return merge(left, right);
}

function pivotSwap(arr, start = 0, end = arr.length - 1) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
}

function quick(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const p = pivot(arr, left, right);
    quick(arr, left, p - 1);
    quick(arr, p + 1, right);
  }
  return arr;
}

function digitAt(num, i) {
  return Math.floor(Math.abs(num) / 10 ** i) % 10;
}

function countDigits0(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function makeBuckets() {
  return Array.from({ length: 10 }, () => []);
}

function radix(nums) {
  let kola = 0;
  for (const n of nums) kola = Math.max(kola, String(n).length);
  for (let k = 0; k < kola; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const n of nums) {
      buckets[getDigit(n, k)].push(n);
    }
    nums = [].concat(...buckets);
  }
  return nums;
}

// ───────────── 5-prakticke.js ─────────────

function mergeSorted(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]); i++; }
  while (j < b.length) { result.push(b[j]); j++; }
  return result;
}

function mergeSortP(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return mergeSorted(mergeSortP(arr.slice(0, mid)), mergeSortP(arr.slice(mid)));
}

function pivotP(arr, start, end) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
}

function quickSortP(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const p = pivotP(arr, left, right);
    quickSortP(arr, left, p - 1);
    quickSortP(arr, p + 1, right);
  }
  return arr;
}

function getDigitP(num, i) {
  return Math.floor(Math.abs(num) / 10 ** i) % 10;
}

function digitCountP(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigitsP(nums) {
  let max = 0;
  for (const n of nums) max = Math.max(max, digitCountP(n));
  return max;
}

function radixSortP(nums) {
  const kola = mostDigitsP(nums);
  for (let k = 0; k < kola; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const n of nums) {
      buckets[getDigitP(n, k)].push(n);
    }
    nums = [].concat(...buckets);
  }
  return nums;
}

function mergeUnique(a, b) {
  const spojene = mergeSorted(a, b);
  const result = [];
  for (const x of spojene) {
    if (result[result.length - 1] !== x) result.push(x);
  }
  return result;
}

function mergeSortPeople(people) {
  if (people.length <= 1) return people;
  const mid = Math.floor(people.length / 2);
  const l = mergeSortPeople(people.slice(0, mid));
  const r = mergeSortPeople(people.slice(mid));
  const result = [];
  let i = 0;
  let j = 0;
  while (i < l.length && j < r.length) {
    if (l[i].age < r[j].age) { result.push(l[i]); i++; }
    else { result.push(r[j]); j++; }
  }
  while (i < l.length) { result.push(l[i]); i++; }
  while (j < r.length) { result.push(r[j]); j++; }
  return result;
}

module.exports = {
  merge, mergeB, mergeSort, mergeSortB, pivot, quickSort, getDigit, digitCount, mostDigits, radixSort,
  mergeX, mergeRest, mergeSortMid, mergeSortJoin, pivotSwap, quick, digitAt, countDigits0, makeBuckets, radix,
  mergeSorted, mergeSortP, pivotP, quickSortP, getDigitP, digitCountP, mostDigitsP, radixSortP, mergeUnique, mergeSortPeople,
};
