/*
 * s03 Polia a objekty – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou (číslo, slovo, premenná…).
 * Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) first – vráti prvý prvok
//    first([7, 8, 9]) → 7
function first(arr) {
  return arr[___];
}

// 2) last – vráti posledný prvok
//    last([7, 8, 9]) → 9
function last(arr) {
  return arr[arr.length - ___];
}

// 3) addToEnd – pridá x na koniec poľa a vráti pole
//    addToEnd([1, 2], 3) → [1, 2, 3]
function addToEnd(arr, x) {
  arr.___(x);
  return arr;
}

// 4) removeFirst – vyberie prvý prvok z poľa a vráti ho
//    removeFirst([5, 6, 7]) → 5   (v poli ostane [6, 7])
function removeFirst(arr) {
  return arr.___();
}

// 5) sumAll – súčet čísel
//    sumAll([1, 2, 3]) → 6
function sumAll(arr) {
  let s = 0;
  for (const x of arr) {
    s = s + ___;
  }
  return s;
}

// 6) getName – vráti meno osoby
//    getName({ name: 'Adam', age: 30 }) → 'Adam'
function getName(person) {
  return person[___];
}

// 7) countKeys – koľko kľúčov má objekt
//    countKeys({ a: 1, b: 2, c: 3 }) → 3
function countKeys(obj) {
  return Object.___(obj).length;
}

// 8) isEmpty – je pole prázdne?
//    isEmpty([]) → true,   isEmpty([1]) → false
function isEmpty(arr) {
  return arr.length === ___;
}

// 9) contains – je x v poli?
//    contains([1, 2, 3], 2) → true
function contains(arr, x) {
  return arr.___(x);
}

// 10) tally – koľkokrát je ktorý prvok (dve ___)
//     tally(['a', 'b', 'a']) → { a: 2, b: 1 }
function tally(arr) {
  const c = {};
  for (const x of arr) {
    c[___] = (c[x] || ___) + 1;
  }
  return c;
}

module.exports = { first, last, addToEnd, removeFirst, sumAll, getName, countKeys, isEmpty, contains, tally };

if (require.main === module) {
  require('../lib/test-runner').spusti('s03 Polia a objekty – Doplň kód', require('./testy').doplnenie, module.exports);
}
