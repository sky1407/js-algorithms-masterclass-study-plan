/*
 * s04-06 Frequency Counter a Multiple Pointers – DEBUGGING (10 úloh)
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

// 1) charCount – koľkokrát je ktoré písmeno v texte
//    charCount('aab') → { a: 2, b: 1 }
function charCount(str) {
  const counts = {};
  for (let i = 0; i <= str.length; i++) {
    const ch = str[i];
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
}

// 2) isAnagram – sú dve slová anagramy? (rovnaké písmená, iné poradie)
//    isAnagram('listen', 'silent') → true,   isAnagram('ab', 'abc') → false
function isAnagram(a, b) {
  if (a.length !== b.length) return true;
  const c = {};
  for (const ch of a) c[ch] = (c[ch] || 0) + 1;
  for (const ch of b) {
    if (!c[ch]) return false;
    c[ch] = c[ch] - 1;
  }
  return true;
}

// 3) same – obsahuje b druhé mocniny všetkých čísel z a (v hocijakom poradí)?
//    same([1, 2, 3], [1, 4, 9]) → true
function same(a, b) {
  if (a.length !== b.length) return false;
  const c = {};
  for (const x of a) {
    const mocnina = x * 2;
    c[mocnina] = (c[mocnina] || 0) + 1;
  }
  for (const y of b) {
    if (!c[y]) return false;
    c[y] = c[y] - 1;
  }
  return true;
}

// 4) sameFrequency – majú dve čísla rovnaké číslice v rovnakom počte?
//    sameFrequency(182, 281) → true,   sameFrequency(1234, 123) → false
function sameFrequency(n1, n2) {
  const a = String(n1);
  const b = String(n2);
  if (a.length !== a.length) return false;
  const c = {};
  for (const d of a) c[d] = (c[d] || 0) + 1;
  for (const d of b) {
    if (!c[d]) return false;
    c[d] = c[d] - 1;
  }
  return true;
}

// 5) sumZero – v ZOTRIEDENOM poli nájdi prvú dvojicu so súčtom 0, inak undefined
//    sumZero([-3, -2, -1, 0, 1, 2, 3]) → [-3, 3],   sumZero([-2, 0, 1]) → undefined
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const s = arr[left] + arr[right];
    if (s === 0) return [arr[left], arr[right]];
    if (s > 0) right--;
    else left++;
  }
  return undefined;
}

// 6) countUniqueValues – koľko rôznych čísel je v ZOTRIEDENOM poli
//    countUniqueValues([1, 1, 2, 3, 3]) → 3
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i;
}

// 7) averagePair – je v ZOTRIEDENOM poli dvojica, ktorej priemer je target?
//    averagePair([1, 2, 3], 2.5) → true
function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    if (avg < target) right--;
    else left++;
  }
  return false;
}

// 8) isSubsequence – sú písmená slova a v slove b v rovnakom poradí?
//    isSubsequence('abc', 'abracadabra') → true,   isSubsequence('abc', 'acb') → false
function isSubsequence(a, b) {
  let i = 0;
  for (const ch of b) {
    if (ch === a[i]) i++;
  }
  return i === b.length;
}

// 9) areThereDuplicates – je niektorá z hodnôt viackrát?
//    areThereDuplicates(1, 2, 3) → false,   areThereDuplicates(1, 2, 2) → true
//    (...args znamená: všetky zadané hodnoty sa uložia do poľa args)
function areThereDuplicates(...args) {
  const seen = {};
  for (const x of args) {
    if (seen[x]) return true;
    seen[x] = true;
  }
  return true;
}

// 10) firstRepeatedChar – prvé písmeno, ktoré sa v texte objaví druhýkrát, inak null
//     firstRepeatedChar('abca') → 'a',   firstRepeatedChar('abc') → null
function firstRepeatedChar(str) {
  const seen = {};
  for (const ch of str) {
    if (seen[ch]) return ch;
    seen[ch] = false;
  }
  return null;
}

module.exports = {
  charCount, isAnagram, same, sameFrequency, sumZero, countUniqueValues, averagePair, isSubsequence, areThereDuplicates, firstRepeatedChar,
};

if (require.main === module) {
  require('../lib/test-runner').spusti('s04-06 Frequency Counter a Pointers – Debugging', require('./testy').debug, module.exports);
}
