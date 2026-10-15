/*
 * s20 Doubly Linked List – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej metódy sám. Úlohy 2–10 potrebujú hotovú triedu Node (úloha 1).
 * Vždy nastav obe šípky: ak A.next = B, tak aj B.prev = A.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) Node – uzol s vlastnosťami val, next a prev (next a prev sú na začiatku null)
class Node {
  constructor(val) {

  }
}

// 2) až 10) – obojsmerný spájaný zoznam
class DLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 2) push(val) – pridá na koniec, vráti this
  push(val) {

  }

  // 3) pop() – odoberie posledný uzol a vráti ho (odpojený: prev = null); prázdny → undefined
  pop() {

  }

  // 4) shift() – odoberie prvý uzol a vráti ho (odpojený: next = null); prázdny → undefined
  shift() {

  }

  // 5) unshift(val) – pridá na začiatok, vráti this
  unshift(val) {

  }

  // 6) get(index) – uzol na indexe, začni od bližšieho konca; mimo rozsahu null
  get(index) {

  }

  // 7) set(index, val) – zmení hodnotu; true ak uzol existuje, inak false
  set(index, val) {

  }

  // 8) insert(index, val) – vloží na index (0 až length), vráti true; mimo rozsahu false
  insert(index, val) {

  }

  // 9) remove(index) – odoberie uzol na indexe a vráti ho (odpojený); mimo rozsahu undefined
  remove(index) {

  }

  // 10) reverse() – otočí zoznam, vráti this
  reverse() {

  }
}

module.exports = { Node, DLL };

if (require.main === module) {
  require('../lib/test-runner').spusti('s20 Doubly Linked List – Praktické úlohy', require('./testy').prakticke, module.exports);
}
