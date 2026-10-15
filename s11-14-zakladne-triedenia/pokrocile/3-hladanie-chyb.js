/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  06 ZÁKLADNÉ TRIEDENIA – HĽADANIE CHÝB (príklady 7–9)            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na „bežných“ vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš POLE ARGUMENTOV, na ktorých pôvodný kód zlyhá.
 *      Funkcie tu berú jedno pole, takže zápis je napr. [[3, 1, 2]].
 *   2. Oprav funkciu.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) sortByAge – zoradí ľudí podľa veku. Triedenie musí byť STABILNÉ:
//    ľudia s rovnakým vekom ostanú v pôvodnom poradí (napr. v tabuľke
//    najprv zoradenej podľa mena). Vracia nové pole.
// ─────────────────────────────────────────────────────────────────────
function sortByAge(people) {
  const arr = [...people];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j].age >= current.age) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) selectionSortAny – vráti zoradenú kópiu poľa ČÍSEL alebo REŤAZCOV
//    selectionSortAny([3, 1, 2]) → [1, 2, 3]
// ─────────────────────────────────────────────────────────────────────
function selectionSortAny(arr) {
  const result = [...arr];
  for (let i = 0; i < result.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] - result[lowest] < 0) lowest = j;
    }
    [result[i], result[lowest]] = [result[lowest], result[i]];
  }
  return result;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) sortDates – zoradí dátumy vo formáte 'DD.MM.RRRR' od najstaršieho.
//    Vracia nové pole.
//    sortDates(['15.03.2026', '20.03.2026', '10.03.2026'])
//      → ['10.03.2026', '15.03.2026', '20.03.2026']
// ─────────────────────────────────────────────────────────────────────
function sortDates(dates) {
  const arr = [...dates];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
const protipriklad9 = ___;

module.exports = { sortByAge, protipriklad7, selectionSortAny, protipriklad8, sortDates, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('06 Základné triedenia – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
