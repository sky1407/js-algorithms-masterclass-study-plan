/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  04 REKURZIA – HĽADANIE CHÝB (príklady 7–9)                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na „bežných“ vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Napr. pre f(a, b) zápis [[1], { x: 1 }] znamená volanie f([1], { x: 1 }).
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) isPalindrome – číta sa reťazec rovnako spredu aj zozadu?
//    isPalindrome('tacocat') → true
// ─────────────────────────────────────────────────────────────────────
function isPalindrome(str) {
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) stringifyNumbers – vráti NOVÝ objekt, kde sú všetky čísla prevedené
//    na reťazce, aj vo vnorených objektoch.
//    Polia a null nechaj tak, ako sú.
//    stringifyNumbers({ a: 1, b: { c: 2 } }) → { a: '1', b: { c: '2' } }
// ─────────────────────────────────────────────────────────────────────
function stringifyNumbers(obj) {
  const result = {};
  for (const key in obj) {
    const v = obj[key];
    if (typeof v === 'number') result[key] = String(v);
    else if (typeof v === 'object') result[key] = stringifyNumbers(v);
    else result[key] = v;
  }
  return result;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) deepEqual – hĺbkové porovnanie dvoch hodnôt (JSON-like dáta:
//    čísla, reťazce, boolean, null, polia, objekty).
//    deepEqual({ a: [1, 2] }, { a: [1, 2] }) → true
//    Pole a objekt nie sú nikdy rovnaké, aj keby mali rovnaké kľúče.
// ─────────────────────────────────────────────────────────────────────
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) if (!deepEqual(a[k], b[k])) return false;
  return true;
}
const protipriklad9 = ___;

module.exports = { isPalindrome, protipriklad7, stringifyNumbers, protipriklad8, deepEqual, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('04 Rekurzia – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
