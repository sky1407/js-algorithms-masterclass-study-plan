/*
 * s03 Polia a objekty – DEBUGGING (10 úloh)
 *
 * Každá funkcia má presne JEDNU chybu. Nájdi ju a oprav.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: klikni vľavo od čísla riadku (červená bodka) a stlač F5 → Node.js.
 *      Program sa tam zastaví a vľavo uvidíš hodnoty premenných.
 */
'use strict';

// 1) lastItem – vráti posledný prvok poľa
//    lastItem([1, 2, 3]) → 3
function lastItem(arr) {
  return arr[arr.length];
}

// 2) total – sčíta všetky čísla v poli
//    total([5, 1]) → 6
function total(arr) {
  let s = 0;
  for (let i = 1; i < arr.length; i++) {
    s = s + arr[i];
  }
  return s;
}

// 3) countItem – koľkokrát je x v poli
//    countItem([1, 2, 1], 1) → 2
function countItem(arr, x) {
  let pocet = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] = x) {
      pocet++;
    }
  }
  return pocet;
}

// 4) findMax – najväčšie číslo v poli
//    findMax([3, 9, 2]) → 9,   findMax([-5, -2, -9]) → -2
function findMax(arr) {
  let best = 0;
  for (const x of arr) {
    if (x > best) {
      best = x;
    }
  }
  return best;
}

// 5) getValue – vráti hodnotu objektu pod kľúčom key
//    getValue({ meno: 'Eva' }, 'meno') → 'Eva'
function getValue(obj, key) {
  return obj.key;
}

// 6) addItem – pridá tovar na KONIEC košíka a vráti košík
//    addItem(['chlieb'], 'mlieko') → ['chlieb', 'mlieko']
function addItem(cart, item) {
  cart.unshift(item);
  return cart;
}

// 7) frequency – spočíta, koľkokrát je ktorý prvok v poli
//    frequency(['a', 'b', 'a']) → { a: 2, b: 1 }
function frequency(arr) {
  const counts = {};
  for (const x of arr) {
    counts[x] = counts[x] + 1;
  }
  return counts;
}

// 8) hasKey – je kľúč key v objekte? (true / false)
//    hasKey({ pocet: 0 }, 'pocet') → true
function hasKey(obj, key) {
  return obj[key] ? true : false;
}

// 9) reverseCopy – vráti otočenú KÓPIU, pôvodné pole sa nesmie zmeniť
//    reverseCopy([1, 2, 3]) → [3, 2, 1]
function reverseCopy(arr) {
  return arr.reverse();
}

// 10) sortNumbers – zoradí čísla od najmenšieho po najväčšie
//     sortNumbers([10, 1, 2]) → [1, 2, 10]
function sortNumbers(arr) {
  return arr.sort();
}

module.exports = { lastItem, total, countItem, findMax, getValue, addItem, frequency, hasKey, reverseCopy, sortNumbers };

if (require.main === module) {
  require('../lib/test-runner').spusti('s03 Polia a objekty – Debugging', require('./testy').debug, module.exports);
}
