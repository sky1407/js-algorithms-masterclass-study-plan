/*
 * s07-09 Rekurzia – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 */
'use strict';

// ───────────── 2-debug.js ─────────────

function countDown(n) {
  if (n === 0) return [];
  return [n].concat(countDown(n - 1));
}

function sumRange(n) {
  if (n === 1) return 1;
  return n + sumRange(n - 1);
}

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}

function productOfArray(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}

function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

function flatten(arr) {
  let result = [];
  for (const x of arr) {
    if (Array.isArray(x)) result = result.concat(flatten(x));
    else result.push(x);
  }
  return result;
}

function nestedEvenSum(obj) {
  let sum = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object') sum += nestedEvenSum(v);
    else if (typeof v === 'number' && v % 2 === 0) sum += v;
  }
  return sum;
}

// ───────────── 3-doplnenie.js ─────────────

function sumTo(n) {
  if (n === 0) return 0;
  return n + sumTo(n - 1);
}

function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}

function pow(b, e) {
  if (e === 0) return 1;
  return b * pow(b, e - 1);
}

function product(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * product(arr.slice(1));
}

function fibo(n) {
  if (n <= 2) return 1;
  return fibo(n - 1) + fibo(n - 2);
}

function rev(str) {
  if (str.length <= 1) return str;
  return rev(str.slice(1)) + str[0];
}

function range(n) {
  if (n === 0) return [];
  return range(n - 1).concat(n);
}

function deepCount(arr) {
  let count = 0;
  for (const x of arr) {
    if (Array.isArray(x)) count += deepCount(x);
    else count++;
  }
  return count;
}

function capitalizeFirst(arr) {
  if (arr.length === 0) return [];
  const prve = arr[0][0].toUpperCase() + arr[0].slice(1);
  return [prve].concat(capitalizeFirst(arr.slice(1)));
}

function collectStrings(obj) {
  const result = [];
  function helper(o) {
    for (const v of Object.values(o)) {
      if (typeof v === 'string') result.push(v);
      else if (typeof v === 'object') helper(v);
    }
  }
  helper(obj);
  return result;
}

// ───────────── 5-prakticke.js ─────────────

function sumToN(n) {
  if (n === 0) return 0;
  return n + sumToN(n - 1);
}

function factorialR(n) {
  if (n <= 1) return 1;
  return n * factorialR(n - 1);
}

function powerR(base, exp) {
  if (exp === 0) return 1;
  return base * powerR(base, exp - 1);
}

function productR(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * productR(arr.slice(1));
}

function countDigits(n) {
  if (n < 10) return 1;
  return 1 + countDigits(Math.floor(n / 10));
}

function fibR(n) {
  if (n <= 2) return 1;
  return fibR(n - 1) + fibR(n - 2);
}

function reverseR(str) {
  if (str.length <= 1) return str;
  return reverseR(str.slice(1)) + str[0];
}

function palindromeR(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return palindromeR(str.slice(1, -1));
}

function flattenR(arr) {
  let result = [];
  for (const x of arr) {
    if (Array.isArray(x)) result = result.concat(flattenR(x));
    else result.push(x);
  }
  return result;
}

function capitalizeAll(arr) {
  if (arr.length === 0) return [];
  return [arr[0].toUpperCase()].concat(capitalizeAll(arr.slice(1)));
}

module.exports = {
  countDown, sumRange, factorial, power, productOfArray, fib, reverse, isPalindrome, flatten, nestedEvenSum,
  sumTo, fact, pow, product, fibo, rev, range, deepCount, capitalizeFirst, collectStrings,
  sumToN, factorialR, powerR, productR, countDigits, fibR, reverseR, palindromeR, flattenR, capitalizeAll,
};
