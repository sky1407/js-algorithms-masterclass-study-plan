/*
 * RIEŠENIA – 04 Rekurzia
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

function productOfArray(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}

function flatten(arr) {
  let result = [];
  for (const x of arr) {
    if (Array.isArray(x)) result = result.concat(flatten(x));
    else result.push(x);
  }
  return result;
}

function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
const zlozitost3 = 'O(n)';

function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}

function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}

function nestedEvenSum(obj) {
  let sum = 0;
  for (const key in obj) {
    const v = obj[key];
    if (typeof v === 'object' && v !== null) sum += nestedEvenSum(v);
    else if (typeof v === 'number' && v % 2 === 0) sum += v;
  }
  return sum;
}

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
const protipriklad7 = [''];

function stringifyNumbers(obj) {
  const result = {};
  for (const key in obj) {
    const v = obj[key];
    if (typeof v === 'number') result[key] = String(v);
    else if (typeof v === 'object' && v !== null && !Array.isArray(v)) result[key] = stringifyNumbers(v);
    else result[key] = v;
  }
  return result;
}
const protipriklad8 = [{ a: [1] }];

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) {
    if (!Object.hasOwn(b, k) || !deepEqual(a[k], b[k])) return false;
  }
  return true;
}
const protipriklad9 = [[1], { 0: 1 }];

function someRecursive(arr, cb) {
  if (arr.length === 0) return false;
  if (cb(arr[0])) return true;
  return someRecursive(arr.slice(1), cb);
}

function collectStrings(obj) {
  const strings = [];
  for (const key in obj) {
    const v = obj[key];
    if (typeof v === 'string') strings.push(v);
    else if (typeof v === 'object' && v !== null) strings.push(...collectStrings(v));
  }
  return strings;
}

function permutations(str) {
  if (str.length <= 1) return [str];
  const result = new Set();
  for (let i = 0; i < str.length; i++) {
    const rest = str.slice(0, i) + str.slice(i + 1);
    for (const p of permutations(rest)) result.add(str[i] + p);
  }
  return [...result].sort();
}

function folderSizes(tree) {
  const sizes = {};
  function walk(node, path) {
    const current = path ? `${path}/${node.name}` : node.name;
    if (!node.children) return node.size;
    let total = 0;
    for (const child of node.children) total += walk(child, current);
    sizes[current] = total;
    return total;
  }
  walk(tree, '');
  return sizes;
}

function findPath(categories, id) {
  for (const c of categories) {
    if (c.id === id) return [c.name];
    const sub = findPath(c.children || [], id);
    if (sub) return [c.name, ...sub];
  }
  return null;
}

module.exports = {
  productOfArray, flatten, fib, zlozitost3,
  power, reverse, nestedEvenSum,
  isPalindrome, protipriklad7, stringifyNumbers, protipriklad8, deepEqual, protipriklad9,
  someRecursive, collectStrings, permutations,
  folderSizes, findPath,
};
