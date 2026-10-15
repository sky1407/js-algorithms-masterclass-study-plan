/*
 * s10 Vyhľadávanie – DEBUGGING (10 úloh)
 *
 * Každá funkcia má presne JEDNU chybu. Nájdi ju a oprav.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: klikni vľavo od čísla riadku (červená bodka) a stlač F5 → Node.js.
 */
'use strict';

// 1) linearSearch – index x v poli, inak -1
//    linearSearch([5, 8], 5) → 0
function linearSearch(arr, x) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}

// 2) includesValue – je x v poli? (true / false)
//    includesValue([1, 2, 3], 3) → true
function includesValue(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      return true;
    } else {
      return false;
    }
  }
}

// 3) indexOfLast – index POSLEDNÉHO výskytu x, inak -1
//    indexOfLast([1, 2, 1], 1) → 2,   indexOfLast([1, 2, 3], 1) → 0
function indexOfLast(arr, x) {
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] === x) return i;
  }
  return -1;
}

// 4) binarySearch – index x v zotriedenom poli, inak -1
//    binarySearch([1, 2, 3, 4], 4) → 3
function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = (left + right) / 2;
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// 5) naiveSearch – koľkokrát je pattern v texte
//    naiveSearch('lorie loled', 'lol') → 1
function naiveSearch(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[i]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

// 6) countPattern – koľkokrát je pattern v texte
//    countPattern('wowomgzomg', 'omg') → 2
function countPattern(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length) count++;
    }
  }
  return count;
}

// 7) findFirstBig – prvé číslo, ktoré je VÄČŠIE ako limit (inak undefined)
//    findFirstBig([1, 5, 10], 5) → 10
function findFirstBig(arr, limit) {
  return arr.find(x => x >= limit);
}

// 8) findUser – vráti objekt používateľa s daným menom (inak undefined)
//    findUser([{ name: 'Eva', age: 20 }, { name: 'Adam', age: 30 }], 'Adam') → { name: 'Adam', age: 30 }
function findUser(users, name) {
  return users.findIndex(u => u.name === name);
}

// 9) searchSorted – index x v ZOTRIEDENOM poli; keď už sme za ním, skončí skôr (-1)
//    searchSorted([1, 3, 5], 5) → 2,   searchSorted([1, 3, 5], 4) → -1
function searchSorted(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
    if (arr[i] < x) return -1;
  }
  return -1;
}

// 10) firstMatchIndex – index, kde v texte prvýkrát začína pattern, inak -1
//     firstMatchIndex('ahoj svet', 'svet') → 5
function firstMatchIndex(text, pattern) {
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) return j;
    }
  }
  return -1;
}

module.exports = {
  linearSearch, includesValue, indexOfLast, binarySearch, naiveSearch, countPattern, findFirstBig, findUser, searchSorted, firstMatchIndex,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s10 Vyhľadávanie – Debugging', require('./testy').debug, module.exports);
}
