/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  13 HASH TABLES – HĽADANIE CHÝB (príklady 7–9)                   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Kód vyzerá správne a na bežných vstupoch funguje. Nájdi skrytú chybu:
 *   1. Do `protipriklad` napíš vstup, na ktorom pôvodný kód zlyhá:
 *      - príklad 7 (trieda): POLE OPERÁCIÍ: [['set', 'kluc', 1], ['keys']]
 *      - príklady 8, 9 (funkcie): POLE ARGUMENTOV: [[1, 2, 3], 4]
 *   2. Oprav kód.
 *
 * Spustenie:
 *   node 3-hladanie-chyb.js      → všetky príklady
 *   node 3-hladanie-chyb.js 8    → len príklad 8
 */
'use strict';

const ___ = undefined;

// ─────────────────────────────────────────────────────────────────────
// 7) HashTable – set/get/keys/values sú správne. Pre kľúče z malých
//    písmen všetko funguje. Ale tabuľka má zvládnuť AKÝKOĽVEK reťazec...
//    Pozor: chyba sa neprejaví v get – ale v keys().
// ─────────────────────────────────────────────────────────────────────
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const value = key.charCodeAt(i) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    const bucket = this.keyMap[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return this;
      }
    }
    bucket.push([key, value]);
    return this;
  }

  get(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return undefined;
    for (const [k, v] of bucket) if (k === key) return v;
    return undefined;
  }

  keys() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const [k] of bucket) if (!result.includes(k)) result.push(k);
    }
    return result;
  }

  values() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const [, v] of bucket) if (!result.includes(v)) result.push(v);
    }
    return result;
  }
}
const protipriklad7 = ___;

// ─────────────────────────────────────────────────────────────────────
// 8) twoSum – vráť [i, j] (i < j) dvoch RÔZNYCH prvkov so súčtom target,
//    alebo null. Hash mapa → O(n).
//    twoSum([2, 7, 11, 15], 9) → [0, 1]
// ─────────────────────────────────────────────────────────────────────
function twoSum(nums, target) {
  const seen = new Map();
  nums.forEach((n, i) => seen.set(n, i));
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [i, seen.get(need)];
  }
  return null;
}
const protipriklad8 = ___;

// ─────────────────────────────────────────────────────────────────────
// 9) groupAnagrams – zoskupí slová, ktoré sú navzájom anagramami.
//    Skupiny v poradí prvého výskytu, slová v skupine v poradí vstupu.
//    ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
//      → [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
//    (Kľúč skupiny je vlastne „hašovacia funkcia“ – musí byť bez kolízií!)
// ─────────────────────────────────────────────────────────────────────
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    let key = 0;
    for (const ch of w) key += ch.charCodeAt(0);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
const protipriklad9 = ___;

module.exports = { HashTable, protipriklad7, twoSum, protipriklad8, groupAnagrams, protipriklad9 };

if (require.main === module) {
  require('../../lib/test-runner').spusti('13 Hash Tables – Hľadanie chýb', require('./testy').hladanie, module.exports);
}
