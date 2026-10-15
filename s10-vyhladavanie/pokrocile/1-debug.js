/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  05 VYHĽADÁVANIE – DEBUGGING (príklady 1–3)                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU (niekedy viac). Spusti testy, prečítaj si, čo zlyhalo,
 * a oprav kód. Kde je premenná `zlozitostX`, doplň časovú zložitosť.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 *
 * Tip: pri binárnom vyhľadávaní si na papier píš left / mid / right v každom kroku.
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) linearSearch – index hodnoty v poli, alebo -1
//    linearSearch([10, 15, 20, 25, 30], 15) → 1
// ─────────────────────────────────────────────────────────────────────
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
    else return -1;
  }
}
const zlozitost1 = '___';

// ─────────────────────────────────────────────────────────────────────
// 2) binarySearch – index hodnoty v ZORADENOM poli, alebo -1
//    binarySearch([1, 2, 3, 4, 5], 5) → 4
//    binarySearch([7], 7)             → 0
// ─────────────────────────────────────────────────────────────────────
function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return mid;
    if (arr[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
const zlozitost2 = '___';

// ─────────────────────────────────────────────────────────────────────
// 3) naiveCount – koľkokrát sa short nachádza v long (aj prekrývajúco sa)
//    naiveCount('lorie loled', 'lol') → 1
//    naiveCount('aaaa', 'aa')         → 3
//    naiveCount('abc', '')            → 0   (prázdny reťazec nepočítame)
// ─────────────────────────────────────────────────────────────────────
function naiveCount(long, short) {
  let count = 0;
  for (let i = 0; i < long.length - short.length; i++) {
    let j = 0;
    while (j < short.length && long[i + j] === short[j]) j++;
    if (j === short.length) count++;
  }
  return count;
}

module.exports = { linearSearch, zlozitost1, binarySearch, zlozitost2, naiveCount };

if (require.main === module) {
  require('../../lib/test-runner').spusti('05 Vyhľadávanie – Debugging', require('./testy').debug, module.exports);
}
