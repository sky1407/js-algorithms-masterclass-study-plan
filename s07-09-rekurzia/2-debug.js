/*
 * s07-09 Rekurzia – DEBUGGING (10 úloh)
 *
 * Každá funkcia má presne JEDNU chybu. Nájdi ju a oprav.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: daj breakpoint do funkcie a stlač F5 → Node.js. Vľavo v paneli Call Stack
 *      uvidíš, koľko volaní je práve na sebe (kôpka tanierov).
 */
'use strict';

// 1) countDown – vráti pole [n, n-1, …, 1]
//    countDown(3) → [3, 2, 1]
function countDown(n) {
  if (n === 1) return [];
  return [n].concat(countDown(n - 1));
}

// 2) sumRange – súčet 1 + 2 + … + n
//    sumRange(3) → 6
function sumRange(n) {
  if (n === 1) return 1;
  return n + sumRange(n);
}

// 3) factorial – n! = n · (n-1) · … · 1, pričom 0! = 1
//    factorial(4) → 24
function factorial(n) {
  if (n <= 1) return 0;
  return n * factorial(n - 1);
}

// 4) power – base umocnené na exp
//    power(2, 3) → 8
function power(base, exp) {
  if (exp === 0) return 1;
  return base + power(base, exp - 1);
}

// 5) productOfArray – súčin všetkých čísel v poli
//    productOfArray([1, 2, 3]) → 6
function productOfArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] * productOfArray(arr.slice(1));
}

// 6) fib – n-té Fibonacciho číslo (1, 1, 2, 3, 5, 8, …)
//    fib(4) → 3,   fib(10) → 55
function fib(n) {
  if (n <= 1) return 1;
  return fib(n - 1) + fib(n - 2);
}

// 7) reverse – otočí text
//    reverse('ahoj') → 'joha'
function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[1];
}

// 8) isPalindrome – číta sa text rovnako spredu aj zozadu?
//    isPalindrome('abba') → true,   isPalindrome('ab') → false
function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1));
}

// 9) flatten – rozbalí vnorené polia do jedného
//    flatten([1, [2, [3]]]) → [1, 2, 3]
function flatten(arr) {
  let result = [];
  for (const x of arr) {
    if (Array.isArray(x)) result = result.concat(x);
    else result.push(x);
  }
  return result;
}

// 10) nestedEvenSum – súčet všetkých párnych čísel v objekte (aj vo vnorených objektoch)
//     nestedEvenSum({ a: 2, b: { c: 4 }, d: 6 }) → 12
function nestedEvenSum(obj) {
  let sum = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object') sum = nestedEvenSum(v);
    else if (typeof v === 'number' && v % 2 === 0) sum += v;
  }
  return sum;
}

module.exports = { countDown, sumRange, factorial, power, productOfArray, fib, reverse, isPalindrome, flatten, nestedEvenSum };

if (require.main === module) {
  require('../lib/test-runner').spusti('s07-09 Rekurzia – Debugging', require('./testy').debug, module.exports);
}
