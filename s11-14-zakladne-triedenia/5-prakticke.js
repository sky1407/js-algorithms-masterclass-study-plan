/*
 * s11-14 Základné triedenia – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. V úlohách 3, 6 a 8 nesmieš použiť .sort().
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) swapP – vymení prvky na indexoch i a j, vráti pole
//    swapP([1, 2, 3], 0, 1) → [2, 1, 3]
function swapP(arr, i, j) {

}

// 2) isSorted – je pole zotriedené vzostupne? (rovnaké susedné čísla sú OK)
//    isSorted([1, 2, 2, 5]) → true,   isSorted([1, 3, 2]) → false
function isSorted(arr) {

}

// 3) bubbleSortP – Bubble Sort (bez .sort())
//    bubbleSortP([37, 45, 29, 8]) → [8, 29, 37, 45]
function bubbleSortP(arr) {

}

// 4) countSwapsBubble – koľko výmen urobí Bubble Sort pri triedení poľa
//    countSwapsBubble([3, 2, 1]) → 3
function countSwapsBubble(arr) {

}

// 5) findMinIndex – index najmenšieho prvku, hľadá sa od indexu start do konca
//    findMinIndex([5, 2, 9, 1], 0) → 3
function findMinIndex(arr, start) {

}

// 6) selectionSortP – Selection Sort (bez .sort())
//    selectionSortP([0, 2, 34, 22, 10, 19, 17]) → [0, 2, 10, 17, 19, 22, 34]
function selectionSortP(arr) {

}

// 7) insertIntoSorted – vloží x do zotriedeného poľa na správne miesto, vráti pole
//    insertIntoSorted([1, 3, 5], 4) → [1, 3, 4, 5]
function insertIntoSorted(arr, x) {

}

// 8) insertionSortP – Insertion Sort (bez .sort())
//    insertionSortP([8, 1, 2, 3, 4, 5, 6, 7]) → [1, 2, 3, 4, 5, 6, 7, 8]
function insertionSortP(arr) {

}

// 9) sortDescending – čísla od najväčšieho (tu .sort() použiť môžeš)
//    sortDescending([2, 30, 4]) → [30, 4, 2]
function sortDescending(arr) {

}

// 10) sortStudents – študenti od najviac bodov (points) po najmenej
//     sortStudents([{ name: 'Eva', points: 70 }, { name: 'Ján', points: 95 }]) → Ján, Eva
function sortStudents(students) {

}

module.exports = {
  swapP, isSorted, bubbleSortP, countSwapsBubble, findMinIndex, selectionSortP, insertIntoSorted, insertionSortP, sortDescending, sortStudents,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s11-14 Základné triedenia – Praktické úlohy', require('./testy').prakticke, module.exports);
}
