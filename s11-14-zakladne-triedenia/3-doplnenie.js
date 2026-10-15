/*
 * s11-14 Základné triedenia – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) swapTemp – výmena dvoch prvkov
//    swapTemp([1, 2, 3], 0, 2) → [3, 2, 1]
function swapTemp(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = ___;
  return arr;
}

// 2) bubble – bubble sort
//    bubble([3, 2, 1]) → [1, 2, 3]
function bubble(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + ___]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 3) bubbleNoSwaps – bubble sort s predčasným koncom (noSwaps)
//    bubbleNoSwaps([2, 1, 3, 4]) → [1, 2, 3, 4]
function bubbleNoSwaps(arr) {
  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;
    for (let j = 0; j < i - ___; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

// 4) selection – selection sort
//    selection([4, 2, 3, 1]) → [1, 2, 3, 4]
function selection(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = ___;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

// 5) selectionSwap – selection sort
//    selectionSwap([3, 1, 2]) → [1, 2, 3]
function selectionSwap(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[___]];
  }
  return arr;
}

// 6) insertion – insertion sort
//    insertion([3, 1, 2]) → [1, 2, 3]
function insertion(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[___];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// 7) insertionPlace – insertion sort
//    insertionPlace([5, 4, 3]) → [3, 4, 5]
function insertionPlace(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + ___] = current;
  }
  return arr;
}

// 8) sortAsc – vzostupne cez sort
//    sortAsc([20, 3, 100]) → [3, 20, 100]
function sortAsc(arr) {
  return arr.sort((a, b) => ___ - b);
}

// 9) sortByPrice – tovar od najlacnejšieho
//    sortByPrice([{ name: 'syr', price: 3 }, { name: 'chlieb', price: 1 }]) → chlieb, syr
function sortByPrice(items) {
  return items.sort((a, b) => a.___ - b.price);
}

// 10) insertionFull – insertion sort (dve ___)
//     insertionFull([4, 1, 3, 2]) → [1, 2, 3, 4]
function insertionFull(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= ___ && arr[j] > current) {
      arr[j + 1] = arr[j];
      j = j - ___;
    }
    arr[j + 1] = current;
  }
  return arr;
}

module.exports = { swapTemp, bubble, bubbleNoSwaps, selection, selectionSwap, insertion, insertionPlace, sortAsc, sortByPrice, insertionFull };

if (require.main === module) {
  require('../lib/test-runner').spusti('s11-14 Základné triedenia – Doplň kód', require('./testy').doplnenie, module.exports);
}
