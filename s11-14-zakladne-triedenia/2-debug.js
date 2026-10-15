/*
 * s11-14 Základné triedenia – DEBUGGING (10 úloh)
 *
 * Každá funkcia má presne JEDNU chybu. Nájdi ju a oprav.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: klikni vľavo od čísla riadku (červená bodka) a stlač F5 → Node.js.
 *      Pri triedení sleduj vo Variables pole arr a indexy i, j.
 */
'use strict';

// 1) swap – vymení prvky na indexoch i a j, vráti pole
//    swap([1, 2], 0, 1) → [2, 1]
function swap(arr, i, j) {
  arr[i] = arr[j];
  arr[j] = arr[i];
  return arr;
}

// 2) bubbleSort – zotriedi pole vzostupne
//    bubbleSort([5, 3, 4, 1]) → [1, 3, 4, 5]
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 3) bubbleSortFast – bubble sort, ktorý skončí, keď v prechode nebola výmena
//    bubbleSortFast([5, 1, 4, 2, 8]) → [1, 2, 4, 5, 8]
function bubbleSortFast(arr) {
  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = true;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

// 4) selectionSort – zotriedi pole vzostupne
//    selectionSort([5, 3, 4, 1, 2]) → [1, 2, 3, 4, 5]
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = i;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

// 5) selectionSortB – zotriedi pole vzostupne
//    selectionSortB([3, 1, 2]) → [1, 2, 3]
function selectionSortB(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = 0;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

// 6) insertionSort – zotriedi pole vzostupne
//    insertionSort([2, 5, 4, 1]) → [1, 2, 4, 5]
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j] = current;
  }
  return arr;
}

// 7) insertionSortB – zotriedi pole vzostupne
//    insertionSortB([3, 1, 2]) → [1, 2, 3]
function insertionSortB(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j > 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// 8) sortNumbersAsc – zotriedi čísla vzostupne pomocou sort
//    sortNumbersAsc([3, 10, 1]) → [1, 3, 10]
function sortNumbersAsc(arr) {
  return arr.sort((a, b) => b - a);
}

// 9) sortByAge – zotriedi ľudí podľa veku od najmladšieho
//    sortByAge([{ name: 'A', age: 30 }, { name: 'B', age: 20 }]) → B, A
function sortByAge(people) {
  return people.sort((a, b) => a.age > b.age);
}

// 10) sortByLength – zotriedi slová od najkratšieho
//     sortByLength(['ccc', 'a', 'bb']) → ['a', 'bb', 'ccc']
function sortByLength(words) {
  return words.sort((a, b) => a - b);
}

module.exports = {
  swap, bubbleSort, bubbleSortFast, selectionSort, selectionSortB, insertionSort, insertionSortB, sortNumbersAsc, sortByAge, sortByLength,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s11-14 Základné triedenia – Debugging', require('./testy').debug, module.exports);
}
