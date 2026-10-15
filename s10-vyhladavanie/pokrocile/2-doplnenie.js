/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  05 VYHĽADÁVANIE – DOPLŇ KÓD (príklady 4–6)                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom a doplň zložitosti ('___').
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) binarySearchRec – binárne vyhľadávanie REKURZIOU
//    binarySearchRec([5, 6, 10, 13], 10) → 2
// ─────────────────────────────────────────────────────────────────────
function binarySearchRec(arr, val, left = 0, right = arr.length - 1) {
  if (left > ___) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === val) return ___;
  if (arr[mid] < val) return binarySearchRec(arr, val, ___, right);
  return binarySearchRec(arr, val, left, ___);
}

// ─────────────────────────────────────────────────────────────────────
// 5) naiveIndexOf – index prvého výskytu short v long, alebo -1
//    (bez vstavaného indexOf / includes)
//    naiveIndexOf('hello world', 'world') → 6
//    naiveIndexOf('abc', '')              → 0
// ─────────────────────────────────────────────────────────────────────
function naiveIndexOf(long, short) {
  for (let i = 0; i <= long.length - short.length; i++) {
    let j = 0;
    while (j < short.length && long[i + j] === short[___]) j++;
    if (j === ___) return i;
  }
  return -1;
}

// ─────────────────────────────────────────────────────────────────────
// 6) searchMatrix – matica, kde je každý riadok zoradený a prvý prvok riadku
//    je väčší ako posledný prvok predošlého riadku. Celú maticu si predstav
//    ako JEDNO zoradené pole dĺžky rows * cols.
//    searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20]], 16) → true
//    Zložitosť zapíš vzhľadom na n = počet všetkých prvkov.
// ─────────────────────────────────────────────────────────────────────
function searchMatrix(matrix, target) {
  const rows = matrix.length;
  const cols = rows ? matrix[0].length : 0;
  let left = 0;
  let right = rows * cols - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = matrix[Math.floor(mid / ___)][mid % ___];
    if (value === target) return true;
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
const zlozitost6 = '___';

module.exports = { binarySearchRec, naiveIndexOf, searchMatrix, zlozitost6 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('05 Vyhľadávanie – Doplň kód', require('./testy').doplnenie, module.exports);
}
