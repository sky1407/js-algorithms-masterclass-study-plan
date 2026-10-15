/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  13 HASH TABLES – DEBUGGING (príklady 1–3)                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Hašovacia tabuľka z kurzu: pole keyMap, kľúč → _hash → index,
 * kolízie riešime SEPARATE CHAINING – na indexe je pole dvojíc [kľúč, hodnota].
 *
 * Metódy označené ⚠ majú CHYBY. Testy príkladov 2 a 3 používajú správnu
 * _hash, takže ich môžeš opravovať v ľubovoľnom poradí.
 *
 * Spustenie:
 *   node 1-debug.js      → všetky príklady
 *   node 1-debug.js 2    → len príklad 2
 */
'use strict';

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 1) _hash – z kľúča (reťazec malými písmenami) spraví index
  //    0 … keyMap.length - 1. Berie najviac prvých 100 znakov,
  //    'a' = 1, 'b' = 2, ... a násobí prvočíslom 31 (menej kolízií).
  // ───────────────────────────────────────────────────────────────────
  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i <= Math.min(key.length, 100); i++) {
      const value = key.charCodeAt(i) - 96;
      total = total * PRIME + value;
    }
    return total;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 2) set – uloží [kľúč, hodnota] do „vedra“ na indexe, vráti this
  //      get – vráti HODNOTU pre kľúč, alebo undefined
  //      (Viac kľúčov môže mať rovnaký index – kolízia!)
  // ───────────────────────────────────────────────────────────────────
  set(key, value) {
    const index = this._hash(key);
    this.keyMap[index] = [[key, value]];
    return this;
  }

  get(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return undefined;
    for (const pair of bucket) {
      if (pair[0] === key) return pair;
    }
    return undefined;
  }

  // ───────────────────────────────────────────────────────────────────
  // ⚠ 3) keys / values – všetky kľúče / hodnoty BEZ duplicít
  // ───────────────────────────────────────────────────────────────────
  keys() {
    const result = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        result.push(this.keyMap[i][j][0]);
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (!this.keyMap[i]) continue;
      for (let j = 0; j < this.keyMap[i].length; j++) {
        result.push(this.keyMap[i][j][1]);
      }
    }
    return result;
  }
}

module.exports = { HashTable };

if (require.main === module) {
  require('../../lib/test-runner').spusti('13 Hash Tables – Debugging', require('./testy').debug, module.exports);
}
