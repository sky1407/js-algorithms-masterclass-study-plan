/*
 * s07-09 Rekurzia – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) sumTo – súčet 1 + … + n
//    sumTo(4) → 10
function sumTo(n) {
  if (n === ___) return 0;
  return n + sumTo(n - 1);
}

// 2) fact – faktoriál
//    fact(5) → 120
function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - ___);
}

// 3) pow – b na e
//    pow(2, 4) → 16
function pow(b, e) {
  if (e === 0) return ___;
  return b * pow(b, e - 1);
}

// 4) product – súčin čísel v poli
//    product([2, 3, 4]) → 24
function product(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * product(arr.___(1));
}

// 5) fibo – Fibonacci
//    fibo(7) → 13
function fibo(n) {
  if (n <= 2) return 1;
  return fibo(n - 1) + fibo(n - ___);
}

// 6) rev – otoč text
//    rev('abc') → 'cba'
function rev(str) {
  if (str.length <= 1) return str;
  return rev(str.slice(1)) + str[___];
}

// 7) range – pole [1, 2, …, n]
//    range(4) → [1, 2, 3, 4]
function range(n) {
  if (n === 0) return [];
  return range(n - 1).concat(___);
}

// 8) deepCount – koľko obyčajných prvkov je v poli (aj vo vnorených poliach)
//    deepCount([1, [2, 3], [[4]]]) → 4
function deepCount(arr) {
  let count = 0;
  for (const x of arr) {
    if (Array.isArray(x)) count += deepCount(___);
    else count++;
  }
  return count;
}

// 9) capitalizeFirst – každé slovo s veľkým prvým písmenom
//    capitalizeFirst(['auto', 'bicykel']) → ['Auto', 'Bicykel']
function capitalizeFirst(arr) {
  if (arr.length === 0) return [];
  const prve = arr[0][0].toUpperCase() + arr[0].slice(___);
  return [prve].concat(capitalizeFirst(arr.slice(1)));
}

// 10) collectStrings – všetky texty z objektu, aj z vnorených objektov (dve ___)
//     collectStrings({ a: 'x', b: { c: 2, d: 'y' } }) → ['x', 'y']
function collectStrings(obj) {
  const result = ___;
  function helper(o) {
    for (const v of Object.values(o)) {
      if (typeof v === 'string') result.___(v);
      else if (typeof v === 'object') helper(v);
    }
  }
  helper(obj);
  return result;
}

module.exports = { sumTo, fact, pow, product, fibo, rev, range, deepCount, capitalizeFirst, collectStrings };

if (require.main === module) {
  require('../lib/test-runner').spusti('s07-09 Rekurzia – Doplň kód', require('./testy').doplnenie, module.exports);
}
