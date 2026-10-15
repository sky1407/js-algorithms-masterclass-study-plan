/*
 * s25 Hash Table – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * HashTable (2-debug), Table (3-doplnenie) a HashTableP (5-prakticke) sú tá istá tabuľka.
 */
'use strict';

function charValue2(ch) {
  return ch.charCodeAt(0) - 96;
}

function simpleHash(key, arrayLen) {
  let total = 0;
  const PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    const value = key.charCodeAt(i) - 96;
    total = (total * PRIME + value) % arrayLen;
  }
  return total;
}

class HashTableP {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    return simpleHash(key, this.keyMap.length);
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    for (const pair of this.keyMap[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (bucket) {
      for (const pair of bucket) {
        if (pair[0] === key) return pair[1];
      }
    }
    return undefined;
  }

  has(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return false;
    return bucket.some(pair => pair[0] === key);
  }

  keys() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const pair of bucket) result.push(pair[0]);
    }
    return result;
  }

  values() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const pair of bucket) {
        if (!result.includes(pair[1])) result.push(pair[1]);
      }
    }
    return result;
  }

  remove(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return false;
    const i = bucket.findIndex(pair => pair[0] === key);
    if (i === -1) return false;
    bucket.splice(i, 1);
    return true;
  }

  setB(key, value) {
    this.set(key, value);
  }

  set2(key, value) {
    this.set(key, value);
  }

  setOrUpdate(key, value) {
    this.set(key, value);
  }

  getB(key) {
    return this.get(key);
  }

  get2(key) {
    return this.get(key);
  }
}

function firstRepeated(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return undefined;
}

function twoSum(nums, target) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    const d = target - nums[i];
    if (m.has(d)) return [m.get(d), i];
    m.set(nums[i], i);
  }
  return null;
}

function countWordsMap(words) {
  const map = new Map();
  for (const w of words) {
    map.set(w, (map.get(w) || 0) + 1);
  }
  return map;
}

function countOf(words, word) {
  return countWordsMap(words).get(word) || 0;
}

module.exports = {
  hash: simpleHash, charValue: charValue2, HashTable: HashTableP, countWordsMap,
  letterValue: charValue2, hashA: simpleHash, hashB: simpleHash, Table: HashTableP, firstSeenTwice: firstRepeated, countOf,
  charValue2, simpleHash, HashTableP, firstRepeated, twoSum,
};
