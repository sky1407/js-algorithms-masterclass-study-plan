/*
 * s18-19 Triedy a Singly Linked List – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej metódy sám. Úlohy 3–10 potrebujú hotovú triedu Node (úloha 2).
 * Testy každej metódy si zoznam pripravia samy (okrem push a unshift).
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) Point – bod so súradnicami x, y; distanceTo(other) vráti vzdialenosť k inému bodu
//    new Point(0, 0).distanceTo(new Point(3, 4)) → 5
class Point {
  constructor(x, y) {

  }

  distanceTo(other) {

  }
}

// 2) Node – uzol s vlastnosťami val a next (next je na začiatku null)
class Node {
  constructor(val) {

  }
}

// 3) až 10) – jednosmerný spájaný zoznam
class SList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 3) push(val) – pridá na koniec, vráti this
  push(val) {

  }

  // 4) pop() – odoberie posledný uzol a vráti ho (prázdny zoznam → undefined)
  pop() {

  }

  // 5) shift() – odoberie prvý uzol a vráti ho (prázdny zoznam → undefined)
  shift() {

  }

  // 6) unshift(val) – pridá na začiatok, vráti this
  unshift(val) {

  }

  // 7) get(index) – vráti uzol na indexe, mimo rozsahu null
  get(index) {

  }

  // 8) insert(index, val) – vloží na index (0 až length), vráti true; mimo rozsahu false
  insert(index, val) {

  }

  // 9) remove(index) – odoberie uzol na indexe a vráti ho; mimo rozsahu undefined
  remove(index) {

  }

  // 10) reverse() – otočí zoznam na mieste, vráti this
  reverse() {

  }
}

module.exports = { Point, Node, SList };

if (require.main === module) {
  require('../lib/test-runner').spusti('s18-19 Singly Linked List – Praktické úlohy', require('./testy').prakticke, module.exports);
}
