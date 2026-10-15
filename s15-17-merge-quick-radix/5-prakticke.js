/*
 * s15-17 Merge, Quick, Radix Sort – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. .sort() nepoužívaj.
 * Neskoršie úlohy môžu používať tvoje funkcie z predchádzajúcich úloh.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) mergeSorted – spojí dve zotriedené polia do jedného zotriedeného
//    mergeSorted([1, 3, 5], [2, 4, 6, 8]) → [1, 2, 3, 4, 5, 6, 8]
function mergeSorted(a, b) {

}

// 2) mergeSortP – Merge Sort (rekurzívne, použi mergeSorted)
//    mergeSortP([10, 24, 76, 73, 72, 1, 9]) → [1, 9, 10, 24, 72, 73, 76]
function mergeSortP(arr) {

}

// 3) pivotP – rozdelí arr[start..end] okolo arr[start], vráti index pivota
//    pivotP([4, 8, 2, 1, 5, 7, 6, 3], 0, 7) → 3
function pivotP(arr, start, end) {

}

// 4) quickSortP – Quick Sort (rekurzívne, použi pivotP)
//    quickSortP([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]) → [-3, 1, 2, 2, 3, 4, 5, 6, 9, 23, 100]
function quickSortP(arr, left = 0, right = arr.length - 1) {

}

// 5) getDigitP – i-ta číslica sprava (i = 0 sú jednotky), funguje aj pre záporné čísla
//    getDigitP(12345, 1) → 4,   getDigitP(12345, 7) → 0
function getDigitP(num, i) {

}

// 6) digitCountP – počet číslic (0 má 1 číslicu, mínus sa nepočíta)
//    digitCountP(21388) → 5,   digitCountP(-45) → 2
function digitCountP(num) {

}

// 7) mostDigitsP – najväčší počet číslic v poli (prázdne pole → 0)
//    mostDigitsP([23, 567, 89, 12234324, 90]) → 8
function mostDigitsP(nums) {

}

// 8) radixSortP – Radix Sort pre nezáporné celé čísla
//    radixSortP([902, 4, 7, 408, 29]) → [4, 7, 29, 408, 902]
function radixSortP(nums) {

}

// 9) mergeUnique – spojí dve zotriedené polia, každé číslo vo výsledku len raz
//    mergeUnique([1, 2, 4], [2, 3, 4, 5]) → [1, 2, 3, 4, 5]
function mergeUnique(a, b) {

}

// 10) mergeSortPeople – zoradí ľudí podľa veku (age) od najmladšieho Merge Sortom
//     mergeSortPeople([{ n: 'A', age: 40 }, { n: 'B', age: 18 }]) → B, A
function mergeSortPeople(people) {

}

module.exports = {
  mergeSorted, mergeSortP, pivotP, quickSortP, getDigitP, digitCountP, mostDigitsP, radixSortP, mergeUnique, mergeSortPeople,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s15-17 Merge, Quick, Radix – Praktické úlohy', require('./testy').prakticke, module.exports);
}
