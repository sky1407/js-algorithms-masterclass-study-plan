/*
 * s15-17 Merge, Quick, Radix Sort – DEBUGGING (10 úloh)
 *
 * Každá úloha má presne JEDNU chybu. Nájdi ju a oprav.
 * Funkcie označené „pomocná – správna“ sú v poriadku, tie neopravuj.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: klikni vľavo od čísla riadku (červená bodka) a stlač F5 → Node.js.
 */
'use strict';

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

// pomocná – správna: počet číslic
function pocetCislic(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// 1) merge – spojí dve zotriedené polia do jedného zotriedeného
//    merge([1, 10, 50], [2, 14, 99, 100]) → [1, 2, 10, 14, 50, 99, 100]
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
    result.push(b[i]);
    j++;
  }
  return result;
}

// 2) mergeB – spojí dve zotriedené polia do jedného zotriedeného
//    mergeB([1, 3], [2, 4]) → [1, 2, 3, 4]
function mergeB(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] > b[j]) {
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

// 3) mergeSort – merge sort
//    mergeSort([8, 3, 5, 1]) → [1, 3, 5, 8]
function mergeSort(arr) {
  if (arr.length === 0) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return spoj(left, right);
}

// 4) mergeSortB – merge sort
//    mergeSortB([5, 4, 3, 2, 1]) → [1, 2, 3, 4, 5]
function mergeSortB(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortB(arr.slice(0, mid));
  const right = mergeSortB(arr.slice(mid + 1));
  return spoj(left, right);
}

// 5) pivot – rozdelí pole okolo prvého prvku a vráti index, kde pivot skončil
//    pivot([4, 8, 2, 1, 5, 7, 6, 3]) → 3
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
  return start;
}

// 6) quickSort – quick sort
//    quickSort([4, 6, 9, 1, 2, 5, 3]) → [1, 2, 3, 4, 5, 6, 9]
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const p = rozdel(arr, left, right);
    quickSort(arr, left, p - 1);
    quickSort(arr, p, right);
  }
  return arr;
}

// 7) getDigit – i-ta číslica sprava (i = 0 sú jednotky)
//    getDigit(12345, 2) → 3
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / (10 * i)) % 10;
}

// 8) digitCount – koľko číslic má číslo
//    digitCount(423) → 3
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num)));
}

// 9) mostDigits – najväčší počet číslic spomedzi čísel v poli
//    mostDigits([1234, 56, 7]) → 4
function mostDigits(nums) {
  let max = Infinity;
  for (const n of nums) {
    max = Math.min(max, pocetCislic(n));
  }
  return max;
}

// 10) radixSort – radix sort
//     radixSort([23, 345, 5467, 12, 2345, 9852]) → [12, 23, 345, 2345, 5467, 9852]
function radixSort(nums) {
  let kola = 0;
  for (const n of nums) kola = Math.max(kola, pocetCislic(n));
  const buckets = Array.from({ length: 10 }, () => []);
  for (let k = 0; k < kola; k++) {
    for (const n of nums) {
      buckets[cislica(n, k)].push(n);
    }
    nums = [].concat(...buckets);
  }
  return nums;
}

module.exports = { merge, mergeB, mergeSort, mergeSortB, pivot, quickSort, getDigit, digitCount, mostDigits, radixSort };

if (require.main === module) {
  require('../lib/test-runner').spusti('s15-17 Merge, Quick, Radix – Debugging', require('./testy').debug, module.exports);
}
