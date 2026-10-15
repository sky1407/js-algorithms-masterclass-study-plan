/*
 * s04-06 Frequency Counter a Multiple Pointers – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 */
'use strict';

// ───────────── 2-debug.js ─────────────

function charCount(str) {
  const counts = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
}

function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const c = {};
  for (const ch of a) c[ch] = (c[ch] || 0) + 1;
  for (const ch of b) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - 1;
  }
  return true;
}

function same(a, b) {
  if (a.length !== b.length) return false;
  const c = {};
  for (const x of a) {
    const mocnina = x * x;
    c[mocnina] = (c[mocnina] || 0) + 1;
  }
  for (const y of b) {
    if (!c[y]) return false;
    c[y] = c[y] - 1;
  }
  return true;
}

function sameFrequency(n1, n2) {
  const a = String(n1);
  const b = String(n2);
  if (a.length !== b.length) return false;
  const c = {};
  for (const d of a) c[d] = (c[d] || 0) + 1;
  for (const d of b) {
    if (!c[d]) return false;
    c[d] = c[d] - 1;
  }
  return true;
}

function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const s = arr[left] + arr[right];
    if (s === 0) return [arr[left], arr[right]];
    if (s > 0) right--;
    else left++;
  }
  return undefined;
}

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    if (avg < target) left++;
    else right--;
  }
  return false;
}

function isSubsequence(a, b) {
  let i = 0;
  for (const ch of b) {
    if (ch === a[i]) i++;
  }
  return i === a.length;
}

function areThereDuplicates(...args) {
  const seen = {};
  for (const x of args) {
    if (seen[x]) return true;
    seen[x] = true;
  }
  return false;
}

function firstRepeatedChar(str) {
  const seen = {};
  for (const ch of str) {
    if (seen[ch]) return ch;
    seen[ch] = true;
  }
  return null;
}

// ───────────── 3-doplnenie.js ─────────────

function tallyChars(str) {
  const c = {};
  for (const ch of str) {
    c[ch] = (c[ch] || 0) + 1;
  }
  return c;
}

function validAnagram(a, b) {
  if (a.length !== b.length) return false;
  const c = {};
  for (const ch of a) c[ch] = (c[ch] || 0) + 1;
  for (const ch of b) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - 1;
  }
  return true;
}

function canBuild(word, letters) {
  const c = {};
  for (const ch of letters) c[ch] = (c[ch] || 0) + 1;
  for (const ch of word) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - 1;
  }
  return true;
}

function zeroPair(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const s = arr[left] + arr[right];
    if (s === 0) return [arr[left], arr[right]];
    if (s > 0) right--;
    else left++;
  }
  return undefined;
}

function pairSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const s = arr[left] + arr[right];
    if (s === target) return [arr[left], arr[right]];
    if (s > target) right--;
    else left++;
  }
  return undefined;
}

function uniqueCount(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

function subsequence(a, b) {
  let i = 0;
  for (const ch of b) {
    if (ch === a[i]) i++;
  }
  return i === a.length;
}

function digitsMatch(n1, n2) {
  const a = String(n1);
  const b = String(n2);
  if (a.length !== b.length) return false;
  const c = {};
  for (const d of a) c[d] = (c[d] || 0) + 1;
  for (const d of b) {
    if (!c[d]) return false;
    c[d] = c[d] - 1;
  }
  return true;
}

function maxFrequency(arr) {
  const c = {};
  for (const x of arr) c[x] = (c[x] || 0) + 1;
  let best = 0;
  for (const pocet of Object.values(c)) {
    if (pocet > best) best = pocet;
  }
  return best;
}

function avgPair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    if (avg < target) left++;
    else right--;
  }
  return false;
}

// ───────────── 5-prakticke.js ─────────────

function countChar(str, ch) {
  let pocet = 0;
  for (const c of str) {
    if (c === ch) pocet++;
  }
  return pocet;
}

function charFrequency(str) {
  const c = {};
  for (const ch of str) {
    c[ch] = (c[ch] || 0) + 1;
  }
  return c;
}

function isPermutation(a, b) {
  if (a.length !== b.length) return false;
  const c = {};
  for (const ch of a) c[ch] = (c[ch] || 0) + 1;
  for (const ch of b) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - 1;
  }
  return true;
}

function sameSquared(a, b) {
  if (a.length !== b.length) return false;
  const c = {};
  for (const x of a) c[x * x] = (c[x * x] || 0) + 1;
  for (const y of b) {
    if (!c[y]) return false;
    c[y] = c[y] - 1;
  }
  return true;
}

function hasDuplicates(arr) {
  const seen = {};
  for (const x of arr) {
    if (seen[x]) return true;
    seen[x] = true;
  }
  return false;
}

function pairToZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const s = arr[left] + arr[right];
    if (s === 0) return [arr[left], arr[right]];
    if (s > 0) right--;
    else left++;
  }
  return undefined;
}

function howManyUnique(arr) {
  if (arr.length === 0) return 0;
  let pocet = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) pocet++;
  }
  return pocet;
}

function isSubseq(a, b) {
  let i = 0;
  for (const ch of b) {
    if (ch === a[i]) i++;
  }
  return i === a.length;
}

function pairAverage(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    if (avg < target) left++;
    else right--;
  }
  return false;
}

function commonElements(a, b) {
  const vB = {};
  for (const x of b) vB[x] = true;
  const pridane = {};
  const v = [];
  for (const x of a) {
    if (vB[x] && !pridane[x]) {
      v.push(x);
      pridane[x] = true;
    }
  }
  return v;
}

module.exports = {
  charCount, isAnagram, same, sameFrequency, sumZero, countUniqueValues, averagePair, isSubsequence, areThereDuplicates, firstRepeatedChar,
  tallyChars, validAnagram, canBuild, zeroPair, pairSum, uniqueCount, subsequence, digitsMatch, maxFrequency, avgPair,
  countChar, charFrequency, isPermutation, sameSquared, hasDuplicates, pairToZero, howManyUnique, isSubseq, pairAverage, commonElements,
};
