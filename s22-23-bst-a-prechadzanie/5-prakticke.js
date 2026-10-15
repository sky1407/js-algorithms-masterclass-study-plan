/*
 * s22-23 Binary Search Tree a prechádzanie – PRAKTICKÉ ÚLOHY (10 úloh)
 *
 * Napíš telo každej metódy sám. Úloha 2 (insert) potrebuje hotový Node (úloha 1).
 * Ostatné testy si strom pripravia samy.
 *
 *   node 5-prakticke.js                 → všetky úlohy
 *   node 5-prakticke.js 3               → len úloha 3
 *   node 5-prakticke.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

// 1) Node – uzol stromu s vlastnosťami value, left, right (deti sú na začiatku null)
class Node {
  constructor(value) {

  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // 2) insert(value) – vloží hodnotu, vráti this; ak už v strome je, vráti undefined
  insert(value) {

  }

  // 3) find(value) – vráti uzol s hodnotou, inak undefined
  find(value) {

  }

  // 4) contains(value) – true / false
  contains(value) {

  }

  // 5) min() – najmenšia hodnota v strome; prázdny strom → null
  min() {

  }

  // 6) bfs() – pole hodnôt po poschodiach
  bfs() {

  }

  // 7) preOrder() – pole hodnôt: uzol, ľavý, pravý
  preOrder() {

  }

  // 8) postOrder() – pole hodnôt: ľavý, pravý, uzol
  postOrder() {

  }

  // 9) inOrder() – pole hodnôt: ľavý, uzol, pravý
  inOrder() {

  }

  // 10) height() – počet poschodí; prázdny strom → 0
  height() {

  }
}

module.exports = { Node, BST };

if (require.main === module) {
  require('../lib/test-runner').spusti('s22-23 BST a prechádzanie – Praktické úlohy', require('./testy').prakticke, module.exports);
}
