/*
 * s10 Vyhľadávanie – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 */
'use strict';

// ───────────── 2-debug.js ─────────────

function linearSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function includesValue(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      return true;
    }
  }
  return false;
}

function indexOfLast(arr, x) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function binarySearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function naiveSearch(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

function countPattern(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

function findFirstBig(arr, limit) {
  return arr.find(x => x > limit);
}

function findUser(users, name) {
  return users.find(u => u.name === name);
}

function searchSorted(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
    if (arr[i] > x) return -1;
  }
  return -1;
}

function firstMatchIndex(text, pattern) {
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) return i;
    }
  }
  return -1;
}

// ───────────── 3-doplnenie.js ─────────────

function linSearch(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function linSearchMissing(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function hasItem(arr, x) {
  return arr.indexOf(x) !== -1;
}

function findAbove(arr, limit) {
  return arr.find(x => x > limit);
}

function binFind(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function binHas(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return true;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}

function naiveCount(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

function naiveCount2(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

function naiveCount3(text, pattern) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

function findAllIndexes(arr, x) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) result.push(i);
  }
  return result;
}

// ───────────── 5-prakticke.js ─────────────

function linearSearchP(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function containsValue(arr, x) {
  for (const y of arr) {
    if (y === x) return true;
  }
  return false;
}

function countValue(arr, x) {
  let pocet = 0;
  for (const y of arr) {
    if (y === x) pocet++;
  }
  return pocet;
}

function findAllPositions(arr, x) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) result.push(i);
  }
  return result;
}

function lastIndex(arr, x) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === x) return i;
  }
  return -1;
}

function binarySearchP(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function firstGreater(arr, limit) {
  return arr.find(x => x > limit);
}

function findByName(people, name) {
  for (const p of people) {
    if (p.name === name) return p;
  }
  return null;
}

function naiveStringSearch(long, short) {
  let count = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (long[i + j] !== short[j]) break;
      if (j === short.length - 1) count++;
    }
  }
  return count;
}

function findWordIndex(text, word) {
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < word.length; j++) {
      if (text[i + j] !== word[j]) break;
      if (j === word.length - 1) return i;
    }
  }
  return -1;
}

module.exports = {
  linearSearch, includesValue, indexOfLast, binarySearch, naiveSearch, countPattern, findFirstBig, findUser, searchSorted, firstMatchIndex,
  linSearch, linSearchMissing, hasItem, findAbove, binFind, binHas, naiveCount, naiveCount2, naiveCount3, findAllIndexes,
  linearSearchP, containsValue, countValue, findAllPositions, lastIndex, binarySearchP, firstGreater, findByName, naiveStringSearch, findWordIndex,
};
