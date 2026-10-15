/*
 * s04-06 Frequency Counter a Multiple Pointers – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) tallyChars – koľkokrát je ktoré písmeno
//    tallyChars('hello') → { h: 1, e: 1, l: 2, o: 1 }
function tallyChars(str) {
  const c = {};
  for (const ch of str) {
    c[ch] = (c[ch] || ___) + 1;
  }
  return c;
}

// 2) validAnagram – sú slová anagramy?
//    validAnagram('rat', 'tar') → true,   validAnagram('ab', 'abc') → false
function validAnagram(a, b) {
  if (a.length !== b.length) return ___;
  const c = {};
  for (const ch of a) c[ch] = (c[ch] || 0) + 1;
  for (const ch of b) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - 1;
  }
  return true;
}

// 3) canBuild – dá sa slovo word poskladať z písmen letters? (každé písmeno len raz)
//    canBuild('aab', 'abab') → true,   canBuild('aa', 'ab') → false
function canBuild(word, letters) {
  const c = {};
  for (const ch of letters) c[ch] = (c[ch] || 0) + 1;
  for (const ch of word) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - ___;
  }
  return true;
}

// 4) zeroPair – prvá dvojica so súčtom 0 v zotriedenom poli
//    zeroPair([-3, -1, 0, 2, 3]) → [-3, 3]
function zeroPair(arr) {
  let left = 0;
  let right = arr.length - ___;
  while (left < right) {
    const s = arr[left] + arr[right];
    if (s === 0) return [arr[left], arr[right]];
    if (s > 0) right--;
    else left++;
  }
  return undefined;
}

// 5) pairSum – prvá dvojica so súčtom target v zotriedenom poli
//    pairSum([1, 2, 4, 7], 9) → [2, 7]
function pairSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const s = arr[left] + arr[right];
    if (s === target) return [arr[left], arr[___]];
    if (s > target) right--;
    else left++;
  }
  return undefined;
}

// 6) uniqueCount – koľko rôznych čísel je v zotriedenom poli
//    uniqueCount([1, 2, 2, 5, 7, 7, 99]) → 5
function uniqueCount(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[___];
    }
  }
  return i + 1;
}

// 7) subsequence – sú písmená slova a v slove b v rovnakom poradí?
//    subsequence('sing', 'sting') → true
function subsequence(a, b) {
  let i = 0;
  for (const ch of b) {
    if (ch === a[i]) i++;
  }
  return i === ___.length;
}

// 8) digitsMatch – majú čísla rovnaké číslice?
//    digitsMatch(3589, 5983) → true
function digitsMatch(n1, n2) {
  const a = String(___);
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

// 9) maxFrequency – koľkokrát je v poli ten najčastejší prvok
//    maxFrequency(['a', 'b', 'a', 'a']) → 3
function maxFrequency(arr) {
  const c = {};
  for (const x of arr) c[x] = (c[x] || 0) + 1;
  let best = 0;
  for (const pocet of Object.___(c)) {
    if (pocet > best) best = pocet;
  }
  return best;
}

// 10) avgPair – je v zotriedenom poli dvojica s priemerom target? (dve ___)
//     avgPair([1, 2, 3], 2.5) → true
function avgPair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / ___;
    if (avg === target) return true;
    if (avg < target) ___++;
    else right--;
  }
  return false;
}

module.exports = { tallyChars, validAnagram, canBuild, zeroPair, pairSum, uniqueCount, subsequence, digitsMatch, maxFrequency, avgPair };

if (require.main === module) {
  require('../lib/test-runner').spusti('s04-06 Frequency Counter a Pointers – Doplň kód', require('./testy').doplnenie, module.exports);
}
