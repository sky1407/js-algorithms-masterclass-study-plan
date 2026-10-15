/*
 * s03 Polia a objekty – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie sám. Idú od najľahšej po ťažšiu.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) count – vráti počet prvkov v poli
//    count([1, 2, 3]) → 3,   count([]) → 0
function count(arr) {

}

// 2) firstAndLast – vráti pole [prvý, posledný]
//    firstAndLast([1, 2, 3]) → [1, 3],   firstAndLast(['a']) → ['a', 'a']
function firstAndLast(arr) {

}

// 3) sum – súčet všetkých čísel
//    sum([1, 2, 3]) → 6,   sum([]) → 0
function sum(arr) {

}

// 4) countEven – koľko je v poli párnych čísel
//    countEven([1, 2, 3, 4]) → 2
function countEven(arr) {

}

// 5) onlyPositive – vráti NOVÉ pole len s kladnými číslami (väčšími ako 0)
//    onlyPositive([3, -1, 0, 5]) → [3, 5]
function onlyPositive(arr) {

}

// 6) doubleAll – vráti NOVÉ pole, kde je každé číslo dvakrát väčšie
//    doubleAll([1, 2, 3]) → [2, 4, 6]   (pôvodné pole sa nemení)
function doubleAll(arr) {

}

// 7) makePerson – vráti objekt s kľúčmi name a age
//    makePerson('Eva', 20) → { name: 'Eva', age: 20 }
function makePerson(name, age) {

}

// 8) countLetters – koľkokrát je ktoré písmeno v slove
//    countLetters('mama') → { m: 2, a: 2 }
function countLetters(word) {

}

// 9) sumValues – súčet všetkých hodnôt v objekte
//    sumValues({ jablka: 3, hrusky: 2 }) → 5
function sumValues(obj) {

}

// 10) mostCommon – vráti prvok, ktorý je v poli najčastejšie
//     pri zhode vyhrá ten, ktorý je v poli skôr
//     mostCommon(['a', 'b', 'b', 'c']) → 'b',   mostCommon([1, 2, 2, 1, 3]) → 1
function mostCommon(arr) {

}

module.exports = { count, firstAndLast, sum, countEven, onlyPositive, doubleAll, makePerson, countLetters, sumValues, mostCommon };

if (require.main === module) {
  require('../lib/test-runner').spusti('s03 Polia a objekty – Praktické úlohy', require('./testy').prakticke, module.exports);
}
