/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  04 REKURZIA – DOPLŇ KÓD (príklady 4–6)                          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 * Kým nie je base case doplnený, uvidíš „Maximum call stack size exceeded“ –
 * to je presne chyba, keď rekurzia nemá kde skončiť.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 4) power – base na exp (exp je nezáporné celé číslo), bez Math.pow a **
//    power(2, 4) → 16,  power(2, 0) → 1
// ─────────────────────────────────────────────────────────────────────
function power(base, exp) {
  if (exp === ___) return ___;
  return base * power(base, exp - ___);
}

// ─────────────────────────────────────────────────────────────────────
// 5) reverse – otočí reťazec, bez .reverse() a bez cyklov
//    reverse('awesome') → 'emosewa'
// ─────────────────────────────────────────────────────────────────────
function reverse(str) {
  if (str.length <= ___) return str;
  return reverse(str.slice(___)) + str[___];
}

// ─────────────────────────────────────────────────────────────────────
// 6) nestedEvenSum – súčet všetkých PÁRNYCH čísel v ľubovoľne vnorenom objekte
//    nestedEvenSum({ a: 2, b: { c: 4, d: 'x' } }) → 6
// ─────────────────────────────────────────────────────────────────────
function nestedEvenSum(obj) {
  let sum = 0;
  for (const key in obj) {
    const v = obj[key];
    if (typeof v === 'object' && v !== ___) sum += ___(v);
    else if (typeof v === 'number' && v % 2 === ___) sum += v;
  }
  return sum;
}

module.exports = { power, reverse, nestedEvenSum };

if (require.main === module) {
  require('../../lib/test-runner').spusti('04 Rekurzia – Doplň kód', require('./testy').doplnenie, module.exports);
}
