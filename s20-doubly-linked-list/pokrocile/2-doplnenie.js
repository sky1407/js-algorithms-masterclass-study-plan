/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  09 DOUBLY LINKED LIST – DOPLŇ KÓD (príklady 4–6)                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Nahraď každé  ___  v metódach insert, remove a reverse.
 * Ostatné metódy sú hotové a správne.
 *
 * Spustenie:
 *   node 2-doplnenie.js      → všetky príklady
 *   node 2-doplnenie.js 5    → len príklad 5
 */
'use strict';

const ___ = undefined;

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

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    const popped = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = popped.prev;
      this.tail.next = null;
      popped.prev = null;
    }
    this.length--;
    return popped;
  }

  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current;
    if (index <= this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) current = current.next;
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) current = current.prev;
    }
    return current;
  }

  // ───────────────────────────────────────────────────────────────────
  // 4) insert – vloží hodnotu na index, vráti true/false
  //    before ⇄ node ⇄ after   (4 ukazovatele!)
  // ───────────────────────────────────────────────────────────────────
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const before = this.get(index - 1);
    const after = before.___;
    const node = new Node(val);
    node.prev = ___;
    node.next = after;
    before.next = node;
    after.prev = ___;
    this.length++;
    return true;
  }

  // ───────────────────────────────────────────────────────────────────
  // 5) remove – odstráni uzol na indexe a vráti ho (neplatný → undefined)
  //    V DLL netreba hľadať predchodcu – uzol ho pozná cez prev.
  // ───────────────────────────────────────────────────────────────────
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const removed = this.get(index);
    removed.prev.next = removed.___;
    removed.next.prev = removed.___;
    removed.next = null;
    removed.prev = null;
    this.length--;
    return removed;
  }

  // ───────────────────────────────────────────────────────────────────
  // 6) reverse – otočí zoznam na mieste: v každom uzle vymeň next a prev
  // ───────────────────────────────────────────────────────────────────
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = ___;
    while (current) {
      const next = current.next;
      current.next = current.___;
      current.prev = ___;
      current = next;
    }
    return this;
  }
}

module.exports = { DoublyLinkedList };

if (require.main === module) {
  require('../../lib/test-runner').spusti('09 Doubly Linked List – Doplň kód', require('./testy').doplnenie, module.exports);
}
