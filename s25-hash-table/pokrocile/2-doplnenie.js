/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  13 HASH TABLES – DOPLŇ KÓD (príklady 4–6)                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  správnym výrazom.
 * _hash, get, keys a values sú hotové a správne.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const value = key.charCodeAt(i) - 96;
      total = (((total * PRIME + value) % this.keyMap.length) + this.keyMap.length) % this.keyMap.length;
    }
    return total;
  }

  // ───────────────────────────────────────────────────────────────────
  // 4) set – ak kľúč vo vedre UŽ JE, len aktualizuj hodnotu;
  //    inak pridaj novú dvojicu. Vráti this.
  // ───────────────────────────────────────────────────────────────────
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];
    const bucket = this.keyMap[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[___] = value;
        return this;
      }
    }
    bucket.push([key, ___]);
    return this;
  }

  get(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return undefined;
    for (const [k, v] of bucket) if (k === key) return v;
    return undefined;
  }

  // ───────────────────────────────────────────────────────────────────
  // 5) delete – odstráni kľúč; vráti true, ak bol v tabuľke, inak false
  // ───────────────────────────────────────────────────────────────────
  delete(key) {
    const bucket = this.keyMap[this._hash(key)];
    if (!bucket) return false;
    const i = bucket.findIndex(([k]) => k === ___);
    if (i === -1) return ___;
    bucket.splice(i, ___);
    return true;
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

// ─────────────────────────────────────────────────────────────────────
// 6) ResizableHashTable – keď je LOAD FACTOR (počet kľúčov / veľkosť
//    keyMap) väčší ako 0.75, zdvojnásob keyMap a všetky dvojice znova
//    vlož (index závisí od veľkosti, takže sa zmení!).
//    count = počet RÔZNYCH kľúčov. Používa tvoj set z príkladu 4.
// ─────────────────────────────────────────────────────────────────────
class ResizableHashTable extends HashTable {
  constructor(size = 4) {
    super(size);
    this.count = 0;
  }

  set(key, value) {
    const exists = this.get(key) !== undefined;
    super.set(key, value);
    if (!exists) this.count++;
    if (this.count / this.keyMap.length > ___) this._resize();
    return this;
  }

  _resize() {
    const old = this.keyMap;
    this.keyMap = new Array(old.length * ___);
    for (const bucket of old) {
      if (!bucket) continue;
      for (const [k, v] of bucket) super.set(k, ___);
    }
  }
}

module.exports = { HashTable, ResizableHashTable };

if (require.main === module) {
  require('../../lib/test-runner').spusti('13 Hash Tables – Doplň kód', require('./testy').doplnenie, module.exports);
}
