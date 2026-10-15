/*
 * s25 Hash Table – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Testy si tabuľku pripravia samy, takže poradie úloh je jedno.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) letterValue – a = 1, b = 2, …
function letterValue(ch) {
  return ch.charCodeAt(0) - ___;
}

// 2) hashA – Coltova hash funkcia
function hashA(key, arrayLen) {
  let total = 0;
  for (let i = 0; i < Math.min(key.length, ___); i++) {
    total = (total * 31 + key.charCodeAt(i) - 96) % arrayLen;
  }
  return total;
}

// 3) hashB – Coltova hash funkcia
function hashB(key, arrayLen) {
  let total = 0;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    total = (total * 31 + key.charCodeAt(i) - 96) % ___;
  }
  return total;
}

class Table {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      total = (total * 31 + key.charCodeAt(i) - 96) % this.keyMap.length;
    }
    return total;
  }

  // 4) set
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = ___;
    this.keyMap[index].push([key, value]);
  }

  // 5) set2 – to isté, iná medzera
  set2(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    this.keyMap[index].push([key, ___]);
  }

  // 6) get
  get(key) {
    const index = this._hash(___);
    const bucket = this.keyMap[index];
    if (bucket) {
      for (const pair of bucket) {
        if (pair[0] === key) return pair[1];
      }
    }
    return undefined;
  }

  // 7) get2 – to isté, iná medzera
  get2(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (bucket) {
      for (const pair of bucket) {
        if (pair[0] === key) return pair[___];
      }
    }
    return undefined;
  }

  // 8) keys
  keys() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const pair of bucket) result.push(pair[___]);
    }
    return result;
  }
}

// 9) firstSeenTwice – prvá hodnota, ktorá sa objaví druhýkrát (inak undefined)
//    firstSeenTwice([3, 1, 4, 1, 3]) → 1
function firstSeenTwice(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.___(x)) return x;
    seen.add(x);
  }
  return undefined;
}

// 10) countOf – koľkokrát je slovo word v poli words (dve ___)
//     countOf(['pes', 'mačka', 'pes'], 'pes') → 2
function countOf(words, word) {
  const m = new Map();
  for (const w of words) {
    m.set(w, (m.___(w) || 0) + 1);
  }
  return m.get(word) || ___;
}

module.exports = { letterValue, hashA, hashB, Table, firstSeenTwice, countOf };

if (require.main === module) {
  require('../lib/test-runner').spusti('s25 Hash Table – Doplň kód', require('./testy').doplnenie, module.exports);
}
