/*
 * s18-19 Triedy a Singly Linked List – DOPLŇ KÓD (10 úloh)
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

// 1) ListNode – uzol
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = ___;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 2) push – pridá na koniec
  push(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.___ = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // 3) pop – odoberie z konca
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.___) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // 4) shift – odoberie zo začiatku
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.___;
    this.length--;
    if (this.length === 0) this.tail = null;
    return oldHead;
  }

  // 5) unshift – pridá na začiatok
  unshift(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.___;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // 6) get – uzol na indexe
  get(index) {
    if (index < 0 || index >= this.___) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) current = current.next;
    return current;
  }

  // 7) set – zmení hodnotu na indexe
  set(index, val) {
    if (index < 0 || index >= this.length) return false;
    let node = this.head;
    for (let i = 0; i < index; i++) node = node.next;
    node.___ = val;
    return true;
  }

  // 8) insert – vloží do stredu zoznamu
  insert(index, val) {
    if (index <= 0 || index >= this.length) return false;
    const node = new ___(val);
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return true;
  }

  // 9) remove – odoberie uzol zo stredu zoznamu
  remove(index) {
    if (index <= 0 || index >= this.length - 1) return undefined;
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;
    const removed = prev.next;
    prev.next = removed.___;
    this.length--;
    return removed;
  }

  // 10) reverse – otočí zoznam (dve ___)
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = ___;
      prev = ___;
      node = next;
    }
    return this;
  }
}

module.exports = { ListNode, LinkedList };

if (require.main === module) {
  require('../lib/test-runner').spusti('s18-19 Singly Linked List – Doplň kód', require('./testy').doplnenie, module.exports);
}
