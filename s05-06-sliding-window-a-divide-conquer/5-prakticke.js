/*
 * s05-06 Sliding Window a Divide and Conquer – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. Idú od najľahšej po ťažšiu.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) sumFirstK – súčet prvých k čísel
//    sumFirstK([4, 1, 7, 2], 2) → 5
function sumFirstK(arr, k) {

}

// 2) allWindowSums – pole súčtov všetkých okien veľkosti k
//    allWindowSums([1, 2, 3, 4], 2) → [3, 5, 7]
function allWindowSums(arr, k) {

}

// 3) maxWindowSum – najväčší súčet k susedných čísel, null ak je pole kratšie ako k
//    maxWindowSum([100, 200, 300, 400], 2) → 700
function maxWindowSum(arr, k) {

}

// 4) minWindowSum – najmenší súčet k susedných čísel
//    minWindowSum([4, 2, 1, 6], 2) → 3
function minWindowSum(arr, k) {

}

// 5) linearSearch – index x v poli (prvok po prvku), inak -1
//    linearSearch([9, 4, 7], 7) → 2
function linearSearch(arr, x) {

}

// 6) binSearch – index x v ZOTRIEDENOM poli binárnym vyhľadávaním, inak -1
//    binSearch([1, 2, 3, 4, 5, 6, 7, 8], 7) → 6
function binSearch(arr, x) {

}

// 7) countHalvings – koľkokrát treba n deliť 2, kým nie je 1 alebo menej
//    countHalvings(32) → 5
function countHalvings(n) {

}

// 8) smallestSubarray – dĺžka najkratšieho kusu so súčtom aspoň target, inak 0
//    smallestSubarray([2, 1, 6, 5, 4], 9) → 2
function smallestSubarray(arr, target) {

}

// 9) longestUniqueSubstring – dĺžka najdlhšieho kusu textu bez opakovaného písmena
//    longestUniqueSubstring('rithmschool') → 7
function longestUniqueSubstring(str) {

}

// 10) maxConsecutiveOnes – najdlhšia séria jednotiek za sebou
//     maxConsecutiveOnes([1, 1, 0, 1, 1, 1]) → 3
function maxConsecutiveOnes(arr) {

}

module.exports = {
  sumFirstK, allWindowSums, maxWindowSum, minWindowSum, linearSearch, binSearch, countHalvings, smallestSubarray, longestUniqueSubstring, maxConsecutiveOnes,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s05-06 Sliding Window a Divide and Conquer – Praktické úlohy', require('./testy').prakticke, module.exports);
}
