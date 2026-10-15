/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  01 POLIA A OBJEKTY – HĽADANIE CHÝB (príklady 7–9)               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Tento kód vyzerá správne a na „bežných“ vstupoch aj funguje.
 * Ako pri code review – nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Napr. pre funkciu f(arr, x) zápis [[1, 2, 3], 2] znamená volanie f([1, 2, 3], 2).
 *      (Test ho overí na pôvodnej verzii, takže ho vymysli SKÔR, než kód opravíš.)
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) mostFrequent – vráti najčastejší prvok poľa (čísla alebo reťazce).
//    Pri remíze vyhrá ten, ktorý sa v poli objavil skôr.
//    Prázdne pole → undefined.
//    mostFrequent(['a', 'b', 'a']) → 'a'
// ─────────────────────────────────────────────────────────────────────
function mostFrequent(arr) {
  const counts = {};
  for (const x of arr) counts[x] = (counts[x] || 0) + 1;
  let best;
  let bestCount = 0;
  for (const [x, c] of Object.entries(counts)) {
    if (c > bestCount) {
      best = x;
      bestCount = c;
    }
  }
  return best;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) unique – odstráni duplikáty, zachová poradie prvých výskytov
//    unique([1, 2, 1, 3]) → [1, 2, 3]
// ─────────────────────────────────────────────────────────────────────
function unique(arr) {
  const seen = {};
  const result = [];
  for (const x of arr) {
    if (!seen[x]) {
      seen[x] = true;
      result.push(x);
    }
  }
  return result;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) removeValue – zmaže VŠETKY výskyty hodnoty priamo v poli (in-place)
//    a vráti to isté pole.
//    removeValue([1, 2, 3, 2], 2) → [1, 3]
//    Bonus: dokážeš to bez splice v O(n)?
// ─────────────────────────────────────────────────────────────────────
function removeValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) arr.splice(i, 1);
  }
  return arr;
}
const protipriklad9 = ___;

module.exports = { mostFrequent, protipriklad7, unique, protipriklad8, removeValue, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('01 Polia a objekty – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
