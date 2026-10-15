/*
 * s07-09 Rekurzia – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. Všetky musia byť REKURZÍVNE (volať samy seba),
 * test to kontroluje. Vždy začni base case-om!
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) sumToN – súčet 1 + 2 + … + n
//    sumToN(5) → 15,   sumToN(0) → 0
function sumToN(n) {

}

// 2) factorialR – n!
//    factorialR(5) → 120,   factorialR(0) → 1
function factorialR(n) {

}

// 3) powerR – base umocnené na exp
//    powerR(2, 10) → 1024,   powerR(9, 0) → 1
function powerR(base, exp) {

}

// 4) productR – súčin všetkých čísel v poli (prázdne pole → 1)
//    productR([2, 5, 3]) → 30
function productR(arr) {

}

// 5) countDigits – koľko číslic má kladné celé číslo
//    countDigits(1234) → 4
function countDigits(n) {

}

// 6) fibR – n-té Fibonacciho číslo (fibR(1) = 1, fibR(2) = 1)
//    fibR(6) → 8
function fibR(n) {

}

// 7) reverseR – otočí text
//    reverseR('rithmschool') → 'loohcsmhtir'
function reverseR(str) {

}

// 8) palindromeR – je text palindróm?
//    palindromeR('tacocat') → true,   palindromeR('awesome') → false
function palindromeR(str) {

}

// 9) flattenR – rozbalí vnorené polia do jedného
//    flattenR([1, [2, [3, 4], [[5]]]]) → [1, 2, 3, 4, 5]
function flattenR(arr) {

}

// 10) capitalizeAll – všetky slová v poli VEĽKÝMI písmenami
//     capitalizeAll(['ahoj', 'svet']) → ['AHOJ', 'SVET']
function capitalizeAll(arr) {

}

module.exports = { sumToN, factorialR, powerR, productR, countDigits, fibR, reverseR, palindromeR, flattenR, capitalizeAll };

if (require.main === module) {
  require('../lib/test-runner').spusti('s07-09 Rekurzia – Praktické úlohy', require('./testy').prakticke, module.exports);
}
