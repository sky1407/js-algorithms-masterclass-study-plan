/*
 * s15-17 Merge, Quick, Radix Sort – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Funkcie označené „pomocná – správna“ sú v poriadku.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// pomocná – správna: spojí dve zotriedené polia
function spoj(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return result.concat(a.slice(i), b.slice(j));
}

// pomocná – správna: rozdelí časť poľa okolo pivota a vráti jeho index
function rozdel(arr, start, end) {
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

// pomocná – správna: i-ta číslica sprava
function cislica(num, i) {
  return Math.floor(Math.abs(num) / 10 ** i) % 10;
}

// 1) mergeX – spojí dve zotriedené polia
//    mergeX([1, 5], [2, 3]) → [1, 2, 3, 5]
function mergeX(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[___]);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]); i++; }
  while (j < b.length) { result.push(b[j]); j++; }
  return result;
}

// 2) mergeRest – spojí dve zotriedené polia
//    mergeRest([5, 6], [1]) → [1, 5, 6]
function mergeRest(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) { result.push(a[i]); i++; }
    else { result.push(b[j]); j++; }
  }
  while (i < ___.length) { result.push(a[i]); i++; }
  while (j < b.length) { result.push(b[j]); j++; }
  return result;
}

// 3) mergeSortMid – merge sort
//    mergeSortMid([3, 1, 2]) → [1, 2, 3]
function mergeSortMid(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / ___);
  return spoj(mergeSortMid(arr.slice(0, mid)), mergeSortMid(arr.slice(mid)));
}

// 4) mergeSortJoin – merge sort
//    mergeSortJoin([9, 7, 8]) → [7, 8, 9]
function mergeSortJoin(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortJoin(arr.slice(0, mid));
  const right = mergeSortJoin(arr.slice(mid));
  return spoj(left, ___);
}

// 5) pivotSwap – rozdelí pole okolo prvého prvku, vráti index pivota
//    pivotSwap([4, 8, 2, 1, 5, 7, 6, 3]) → 3
function pivotSwap(arr, start = 0, end = arr.length - 1) {
  const p = arr[start];
  let swapIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (p > arr[i]) {
      swapIdx++;
      [arr[swapIdx], arr[i]] = [arr[i], arr[___]];
    }
  }
  [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
  return swapIdx;
}

// 6) quick – quick sort
//    quick([5, 2, 8, 1, 9]) → [1, 2, 5, 8, 9]
function quick(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const p = rozdel(arr, left, right);
    quick(arr, left, p - ___);
    quick(arr, p + 1, right);
  }
  return arr;
}

// 7) digitAt – i-ta číslica sprava
//    digitAt(7323, 2) → 3
function digitAt(num, i) {
  return Math.floor(Math.abs(num) / 10 ** i) % ___;
}

// 8) countDigits0 – počet číslic
//    countDigits0(0) → 1,   countDigits0(99) → 2
function countDigits0(num) {
  if (num === 0) return ___;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// 9) makeBuckets – pole prázdnych košíkov, jeden pre každú číslicu
//    makeBuckets() → [[], [], [], [], [], [], [], [], [], []]
function makeBuckets() {
  return Array.from({ length: ___ }, () => []);
}

// 10) radix – radix sort (dve ___)
//     radix([902, 4, 7, 408, 29]) → [4, 7, 29, 408, 902]
function radix(nums) {
  let kola = 0;
  for (const n of nums) kola = Math.max(kola, String(n).length);
  for (let k = 0; k < kola; k++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const n of nums) {
      buckets[cislica(n, k)].___(n);
    }
    nums = [].concat(...___);
  }
  return nums;
}

module.exports = { mergeX, mergeRest, mergeSortMid, mergeSortJoin, pivotSwap, quick, digitAt, countDigits0, makeBuckets, radix };

if (require.main === module) {
  require('../lib/test-runner').spusti('s15-17 Merge, Quick, Radix – Doplň kód', require('./testy').doplnenie, module.exports);
}
