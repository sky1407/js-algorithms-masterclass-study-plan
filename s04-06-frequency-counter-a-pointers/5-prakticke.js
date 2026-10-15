/*
 * s04-06 Frequency Counter a Multiple Pointers – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. Idú od najľahšej po ťažšiu.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) countChar – koľkokrát je písmeno ch v texte str
//    countChar('banana', 'a') → 3
function countChar(str, ch) {

}

// 2) charFrequency – objekt s počtom každého písmena
//    charFrequency('aab') → { a: 2, b: 1 }
function charFrequency(str) {

}

// 3) isPermutation – sú dve slová anagramy?
//    isPermutation('anagram', 'nagaram') → true,   isPermutation('rat', 'car') → false
function isPermutation(a, b) {

}

// 4) sameSquared – obsahuje b druhé mocniny čísel z a v rovnakom počte?
//    sameSquared([1, 2, 3], [4, 1, 9]) → true,   sameSquared([1, 2, 1], [4, 4, 1]) → false
function sameSquared(a, b) {

}

// 5) hasDuplicates – je v poli nejaká hodnota viac ako raz?
//    hasDuplicates([1, 2, 1]) → true
function hasDuplicates(arr) {

}

// 6) pairToZero – v ZOTRIEDENOM poli vráť prvú dvojicu so súčtom 0, inak undefined
//    pairToZero([-4, -3, -2, -1, 0, 1, 2, 5]) → [-2, 2]
function pairToZero(arr) {

}

// 7) howManyUnique – koľko rôznych čísel je v ZOTRIEDENOM poli
//    howManyUnique([1, 1, 1, 1, 2]) → 2
function howManyUnique(arr) {

}

// 8) isSubseq – sú písmená slova a v slove b v rovnakom poradí?
//    isSubseq('ace', 'abcde') → true,   isSubseq('aec', 'abcde') → false
function isSubseq(a, b) {

}

// 9) pairAverage – je v ZOTRIEDENOM poli dvojica s priemerom target?
//    pairAverage([1, 2, 3], 2.5) → true
function pairAverage(arr, target) {

}

// 10) commonElements – prvky prvého poľa, ktoré sú aj v druhom (bez opakovania, v poradí prvého poľa)
//     commonElements([1, 2, 3, 4], [4, 2, 9]) → [2, 4]
function commonElements(a, b) {

}

module.exports = {
  countChar, charFrequency, isPermutation, sameSquared, hasDuplicates, pairToZero, howManyUnique, isSubseq, pairAverage, commonElements,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s04-06 Frequency Counter a Pointers – Praktické úlohy', require('./testy').prakticke, module.exports);
}
