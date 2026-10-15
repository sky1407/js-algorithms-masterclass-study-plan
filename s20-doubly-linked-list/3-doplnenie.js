/*
 * s20 Doubly Linked List – DOPLŇ KÓD (10 úloh)
 *
 * Nahraď každé  ___  správnou vecou. Úlohy 1–9 majú jedno ___, úloha 10 má dve.
 * Testy každej metódy si zoznam pripravia samy, takže poradie úloh je jedno.
 *
 *   node 3-doplnenie.js                 → všetky úlohy
 *   node 3-doplnenie.js 3               → len úloha 3
 *   node 3-doplnenie.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 */
'use strict';

const ___ = undefined;

// 1) DNode – uzol
class DNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = ___;
  }
}

class DList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 2) push – pridá na koniec
  push(val) {
    const node = new DNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.___ = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // 3) pop – odoberie z konca
  pop() {
    if (!this.head) return undefined;
    const oldTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = oldTail.___;
      this.tail.next = null;
      oldTail.prev = null;
    }
    this.length--;
    return oldTail;
  }

  // 4) popB – odoberie z konca (iná medzera)
  popB() {
    if (!this.head) return undefined;
    const oldTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = oldTail.prev;
      this.tail.next = ___;
      oldTail.prev = null;
    }
    this.length--;
    return oldTail;
  }

  // 5) shift – odoberie zo začiatku
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.___ = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  // 6) unshift – pridá na začiatok
  unshift(val) {
    const node = new DNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = ___;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // 7) get – od bližšieho konca
  get(index) {
    if (index < 0 || index >= this.length) return null;
    if (index <= this.length / 2) {
      let current = this.head;
      for (let i = 0; i < index; i++) current = current.next;
      return current;
    }
    let current = this.tail;
    let count = this.length - ___;
    while (count !== index) {
      current = current.prev;
      count--;
    }
    return current;
  }

  // 8) insert – vloží do stredu
  insert(index, val) {
    if (index <= 0 || index >= this.length) return false;
    const node = new DNode(val);
    let before = this.head;
    for (let i = 0; i < index - 1; i++) before = before.next;
    const after = before.next;
    before.next = node;
    node.prev = before;
    node.next = after;
    after.prev = ___;
    this.length++;
    return true;
  }

  // 9) a 10) remove – odoberie uzol zo stredu
  remove(index) {
    if (index <= 0 || index >= this.length - 1) return undefined;
    let removed = this.head;
    for (let i = 0; i < index; i++) removed = removed.next;
    removed.prev.next = removed.___;
    removed.next.prev = removed.prev;
    removed.next = ___;
    removed.prev = ___;
    this.length--;
    return removed;
  }
}

module.exports = { DNode, DList };

if (require.main === module) {
  require('../lib/test-runner').spusti('s20 Doubly Linked List – Doplň kód', require('./testy').doplnenie, module.exports);
}
