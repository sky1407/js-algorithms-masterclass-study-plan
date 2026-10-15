/*
 * s25 Hash Table – DEBUGGING (10 úloh)
 *
 * Každá úloha má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy si tabuľku pripravia samy, takže poradie úloh je jedno.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: breakpoint + F5 → Node.js. Vo Variables rozbaľ this.keyMap.
 */
'use strict';

// 1) hash – index pre kľúč v poli dĺžky arrayLen (0 … arrayLen - 1)
function hash(key, arrayLen) {
  let total = 0;
  const PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    const value = key.charCodeAt(i) - 96;
    total = total * PRIME + value;
  }
  return total;
}

// 2) charValue – hodnota písmena: a = 1, b = 2, … z = 26
function charValue(ch) {
  return ch.charCodeAt(0) - 97;
}

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  // pomocná – správna: index pre kľúč
  _hash(key) {
    let total = 0;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      total = (total * 31 + key.charCodeAt(i) - 96) % this.keyMap.length;
    }
    return total;
  }

  // 3) set – pridá dvojicu [key, value] na háčik
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    this.keyMap[index] = [key, value];
  }

  // 4) setB – pridá dvojicu [key, value] na háčik
  setB(key, value) {
    const index = this._hash(key);
    if (this.keyMap[index]) this.keyMap[index] = [];
    this.keyMap[index].push([key, value]);
  }

  // 5) get – hodnota pre kľúč, inak undefined
  get(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (bucket) {
      for (const pair of bucket) {
        if (pair[0] === key) return pair[0];
      }
    }
    return undefined;
  }

  // 6) getB – hodnota pre kľúč, inak undefined
  getB(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return undefined;
    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      } else {
        return undefined;
      }
    }
    return undefined;
  }

  // 7) keys – pole všetkých kľúčov
  keys() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const pair of bucket) result.push(pair[1]);
    }
    return result;
  }

  // 8) values – pole hodnôt, každá len raz
  values() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const pair of bucket) {
        if (result.includes(pair[1])) result.push(pair[1]);
      }
    }
    return result;
  }

  // 9) setOrUpdate – ak kľúč existuje, zmení hodnotu; inak pridá dvojicu
  setOrUpdate(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    for (const pair of this.keyMap[index]) {
      if (pair[1] === key) {
        pair[1] = value;
        return;
      }
    }
    this.keyMap[index].push([key, value]);
  }
}

// 10) countWordsMap – Map: slovo → koľkokrát sa vyskytuje
//     countWordsMap(['a', 'b', 'a']).get('a') → 2
function countWordsMap(words) {
  const map = new Map();
  for (const w of words) {
    map.set(w, map.get(w) + 1);
  }
  return map;
}

module.exports = { hash, charValue, HashTable, countWordsMap };

if (require.main === module) {
  require('../lib/test-runner').spusti('s25 Hash Table – Debugging', require('./testy').debug, module.exports);
}
