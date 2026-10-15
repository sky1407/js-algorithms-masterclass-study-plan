/*
 * s25 Hash Table – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej funkcie / metódy sám.
 * Metóda _hash v HashTableP je hotová – používaj ju.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) charValue2 – a = 1, b = 2, … z = 26
function charValue2(ch) {

}

// 2) simpleHash – Coltova hash funkcia (PRIME 31, najviac 100 znakov, výsledok 0 … arrayLen - 1)
//    simpleHash('pink', 10) → vždy to isté číslo od 0 do 9
function simpleHash(key, arrayLen) {

}

// 3) – 8) hash table so separate chaining: keyMap[index] = [[kľúč, hodnota], …]
class HashTableP {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  // hotová: index pre kľúč
  _hash(key) {
    let total = 0;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      total = (total * 31 + key.charCodeAt(i) - 96) % this.keyMap.length;
    }
    return total;
  }

  // 3) set(key, value) – pridá dvojicu; ak kľúč už existuje, len zmení hodnotu
  set(key, value) {

  }

  // 4) get(key) – hodnota pre kľúč, inak undefined
  get(key) {

  }

  // 5) has(key) – je kľúč v tabuľke? (pozor, hodnota môže byť aj 0)
  has(key) {

  }

  // 6) keys() – pole všetkých kľúčov
  keys() {

  }

  // 7) values() – pole hodnôt, každá len raz
  values() {

  }

  // 8) remove(key) – odstráni dvojicu; true ak existovala, inak false
  remove(key) {

  }
}

// 9) firstRepeated – prvý prvok, ktorý sa v poli objaví druhýkrát (použi Set), inak undefined
//    firstRepeated(['a', 'b', 'c', 'b', 'a']) → 'b'
function firstRepeated(arr) {

}

// 10) twoSum – indexy [i, j] (i < j) dvoch čísel so súčtom target (použi Map), inak null
//     twoSum([2, 7, 11, 15], 9) → [0, 1]
function twoSum(nums, target) {

}

module.exports = { charValue2, simpleHash, HashTableP, firstRepeated, twoSum };

if (require.main === module) {
  require('../lib/test-runner').spusti('s25 Hash Table – Praktické úlohy', require('./testy').prakticke, module.exports);
}
