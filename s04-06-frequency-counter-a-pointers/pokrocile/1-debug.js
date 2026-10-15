/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  02 FREQUENCY COUNTER A MULTIPLE POINTERS – DEBUGGING (1–3)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Každá funkcia má CHYBU (niekedy viac). Spusti testy, prečítaj si, čo zlyhalo,
 * a oprav kód. Kde je premenná `zlozitostX`, doplň časovú zložitosť.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────
// 1) same – vráti true, ak pre každú hodnotu v arr1 je jej DRUHÁ MOCNINA
//    v arr2, a to s rovnakou frekvenciou (poradie nehrá rolu).
//    same([1, 2, 3], [4, 1, 9]) → true
//    same([1, 2, 2], [1, 4, 1]) → false   (4 je len raz, 1 je dvakrát)
// ─────────────────────────────────────────────────────────────────────
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const f1 = {};
  const f2 = {};
  for (const v of arr1) f1[v] = (f1[v] || 0) + 1;
  for (const v of arr2) f2[v] = (f2[v] || 0) + 1;
  for (const key in f1) {
    if (!(key ** 2 in f2)) return false;
    if (f2[key ** 2] !== f1[key]) return true;
  }
  return true;
}
const zlozitost1 = '___';

// ─────────────────────────────────────────────────────────────────────
// 2) countUniqueValues – počet rôznych hodnôt v ZORADENOM poli
//    countUniqueValues([1, 1, 1, 2])  → 2
//    countUniqueValues([])            → 0
//    Vstupné pole sa NESMIE zmeniť.
// ─────────────────────────────────────────────────────────────────────
function countUniqueValues(arr) {
  let i = 0;
  for (let j = 1; j <= arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

// ─────────────────────────────────────────────────────────────────────
// 3) sumZero – v ZORADENOM poli nájdi prvý pár (dva rôzne prvky),
//    ktorého súčet je 0. Ak neexistuje, vráť undefined.
//    sumZero([-3, -2, -1, 0, 1, 2, 3]) → [-3, 3]
//    sumZero([0])                      → undefined
// ─────────────────────────────────────────────────────────────────────
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const sum = arr[left] + arr[right];
    if (sum === 0) return [arr[left], arr[right]];
    if (sum > 0) left++;
    else right--;
  }
  return undefined;
}
const zlozitost3 = '___';

module.exports = { same, zlozitost1, countUniqueValues, sumZero, zlozitost3 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('02 Frequency Counter a Pointers – Debugging', require('./testy').debug, module.exports);
}
