/*
 * s20 Doubly Linked List – DEBUGGING (10 úloh)
 *
 * Každá metóda má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy každej metódy si zoznam pripravia samy a kontrolujú ho spredu aj odzadu.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: breakpoint do metódy + F5 → Node.js. Vo Variables sleduj next aj prev.
 */
'use strict';

// pomocná – správna: uzol
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // pomocná – správna: uzol na indexe (alebo null)
  uzol(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) current = current.next;
    return current;
  }

  // 1) push – pridá na koniec, vráti this
  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.head;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // 2) pop – odoberie posledný uzol a vráti ho
  pop() {
    if (!this.head) return undefined;
    const oldTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = oldTail.next;
      this.tail.next = null;
      oldTail.prev = null;
    }
    this.length--;
    return oldTail;
  }

  // 3) shift – odoberie prvý uzol a vráti ho
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = oldHead;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  // 4) unshift – pridá na začiatok, vráti this
  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.next = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // 5) get – uzol na indexe, začne od bližšieho konca
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) current = current.next;
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) current = current.next;
    }
    return current;
  }

  // 6) set – zmení hodnotu na indexe; true / false
  set(index, val) {
    const node = this.uzol(index);
    if (!node) {
      node.val = val;
      return true;
    }
    return false;
  }

  // 7) insert – vloží hodnotu do stredu zoznamu, vráti true
  insert(index, val) {
    if (index <= 0 || index >= this.length) return false;
    const node = new Node(val);
    const before = this.uzol(index - 1);
    const after = before.next;
    before.next = node;
    node.prev = before;
    node.next = after;
    after.prev = before;
    this.length++;
    return true;
  }

  // 8) remove – odoberie uzol zo stredu zoznamu a vráti ho
  remove(index) {
    if (index <= 0 || index >= this.length - 1) return undefined;
    const removed = this.uzol(index);
    removed.prev.next = removed.next;
    removed.next.prev = removed;
    removed.next = null;
    removed.prev = null;
    this.length--;
    return removed;
  }

  // 9) reverse – otočí zoznam, vráti this
  reverse() {
    let current = this.head;
    while (current) {
      [current.next, current.prev] = [current.prev, current.next];
      current = current.next;
    }
    [this.head, this.tail] = [this.tail, this.head];
    return this;
  }

  // 10) toArrayReverse – pole hodnôt od konca po začiatok
  toArrayReverse() {
    const result = [];
    let current = this.tail;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }
}

module.exports = { DoublyLinkedList };

if (require.main === module) {
  require('../lib/test-runner').spusti('s20 Doubly Linked List – Debugging', require('./testy').debug, module.exports);
}
