/*
 * s10 Vyhľadávanie – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. Idú od najľahšej po ťažšiu.
 * Pri niektorých úlohách test kontroluje, že nepoužívaš hotové metódy (indexOf, includes…).
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) linearSearchP – index x v poli, inak -1 (bez indexOf)
//    linearSearchP([10, 15, 20, 25, 30], 15) → 1
function linearSearchP(arr, x) {

}

// 2) containsValue – je x v poli? true / false (bez includes)
//    containsValue([3, 1], 1) → true
function containsValue(arr, x) {

}

// 3) countValue – koľkokrát je x v poli
//    countValue([1, 2, 1, 1], 1) → 3
function countValue(arr, x) {

}

// 4) findAllPositions – pole všetkých indexov, kde je x
//    findAllPositions(['a', 'b', 'a'], 'a') → [0, 2]
function findAllPositions(arr, x) {

}

// 5) lastIndex – index posledného výskytu x, inak -1
//    lastIndex([4, 5, 4, 6], 4) → 2
function lastIndex(arr, x) {

}

// 6) binarySearchP – index x v ZOTRIEDENOM poli binárnym vyhľadávaním, inak -1
//    binarySearchP([1, 2, 3, 4, 5], 1) → 0
function binarySearchP(arr, x) {

}

// 7) firstGreater – prvý prvok väčší ako limit, inak undefined
//    firstGreater([1, 8, 3, 9], 5) → 8
function firstGreater(arr, limit) {

}

// 8) findByName – objekt z poľa people, ktorý má name rovné name, inak null
//    findByName([{ name: 'Eva', city: 'Bánovce' }], 'Eva') → { name: 'Eva', city: 'Bánovce' }
function findByName(people, name) {

}

// 9) naiveStringSearch – koľkokrát je short v long (dvoma cyklami)
//    naiveStringSearch('omgomgomg', 'omg') → 3
function naiveStringSearch(long, short) {

}

// 10) findWordIndex – index, kde v texte prvýkrát začína word, inak -1 (dvoma cyklami)
//     findWordIndex('dobrý deň', 'deň') → 6
function findWordIndex(text, word) {

}

module.exports = {
  linearSearchP, containsValue, countValue, findAllPositions, lastIndex, binarySearchP, firstGreater, findByName, naiveStringSearch, findWordIndex,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s10 Vyhľadávanie – Praktické úlohy', require('./testy').prakticke, module.exports);
}
