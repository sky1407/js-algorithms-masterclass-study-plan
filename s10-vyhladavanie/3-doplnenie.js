/*
 * s10 Vyhľadávanie – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) linSearch – index x, inak -1
//    linSearch([4, 6, 8], 8) → 2
function linSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return ___;
  }
  return -1;
}

// 2) linSearchMissing – index x, inak -1
//    linSearchMissing([4, 6, 8], 1) → -1
function linSearchMissing(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return ___;
}

// 3) hasItem – je x v poli? (cez hotovú metódu, ktorá vracia index alebo -1)
//    hasItem(['a', 'b'], 'b') → true
function hasItem(arr, x) {
  return arr.___(x) !== -1;
}

// 4) findAbove – prvý prvok väčší ako limit
//    findAbove([2, 9, 4], 3) → 9
function findAbove(arr, limit) {
  return arr.find(x => x > ___);
}

// 5) binFind – binárne vyhľadávanie, index alebo -1
//    binFind([1, 4, 9, 16], 16) → 3
function binFind(arr, x) {
  let left = 0;
  let right = arr.length - ___;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// 6) binHas – je x v zotriedenom poli? (true / false)
//    binHas([1, 4, 9], 2) → false
function binHas(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return true;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return ___;
}

// 7) naiveCount – koľkokrát je pattern v texte
//    naiveCount('harold said haha in hamburg', 'ha') → 4
function naiveCount(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < ___.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

// 8) naiveCount2 – koľkokrát je pattern v texte
//    naiveCount2('lorie loled', 'lol') → 1
function naiveCount2(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[___]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

// 9) naiveCount3 – koľkokrát je pattern v texte
//    naiveCount3('abcabc', 'abc') → 2
function naiveCount3(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - ___) count++;
    }
  }
  return count;
}

// 10) findAllIndexes – pole všetkých indexov, kde je x (dve ___)
//     findAllIndexes([1, 2, 1, 3, 1], 1) → [0, 2, 4]
function findAllIndexes(arr, x) {
  const result = ___;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) result.push(___);
  }
  return result;
}

module.exports = { linSearch, linSearchMissing, hasItem, findAbove, binFind, binHas, naiveCount, naiveCount2, naiveCount3, findAllIndexes };

if (require.main === module) {
  require('../lib/test-runner').spusti('s10 Vyhľadávanie – Doplň kód', require('./testy').doplnenie, module.exports);
}
