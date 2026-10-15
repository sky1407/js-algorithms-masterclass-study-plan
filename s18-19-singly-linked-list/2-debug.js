/*
 * s18-19 Triedy a Singly Linked List – DEBUGGING (10 úloh)
 *
 * Každá úloha (trieda alebo metóda) má presne JEDNU chybu. Nájdi ju a oprav.
 * Testy každej metódy si zoznam pripravia samy, takže poradie úloh je jedno.
 *
 *   node 2-debug.js                 → všetky úlohy
 *   node 2-debug.js 3               → len úloha 3
 *   node 2-debug.js 3 --napoveda 2  → 2. nápoveda k úlohe 3 (sú tri)
 *
 * Tip: breakpoint do metódy + F5 → Node.js. Vo Variables rozbaľ this → head → next → next…
 */
'use strict';

// 1) Counter – počítadlo; increment() zvýši count o 1 a vráti ho
//    const c = new Counter(); c.increment(); c.increment() → 2
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    count++;
    return this.count;
  }
}

// 2) Rectangle – obdĺžnik; area() vráti obsah
//    new Rectangle(3, 4).area() → 12
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.width;
  }
}

// pomocná – správna: uzol zoznamu
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 3) až 10) – metódy jednosmerného spájaného zoznamu
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 3) push – pridá hodnotu na koniec, vráti this
  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  // 4) pop – odoberie posledný uzol a vráti ho
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
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
    return newTail;
  }

  // 5) shift – odoberie prvý uzol a vráti ho
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    return this.head;
  }

  // 6) unshift – pridá hodnotu na začiatok, vráti this
  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.tail;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // 7) get – vráti uzol na indexe, mimo rozsahu null
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter <= index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  // 8) set – zmení hodnotu uzla na indexe; true ak sa podarilo, inak false
  set(index, val) {
    if (index < 0 || index >= this.length) return false;
    let node = this.head;
    for (let i = 0; i < index; i++) node = node.next;
    node.value = val;
    return true;
  }

  // 9) insert – vloží hodnotu na index (tu len do stredu zoznamu), vráti true
  insert(index, val) {
    if (index <= 0 || index >= this.length) return false;
    const node = new Node(val);
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;
    prev.next = node;
    node.next = prev.next;
    this.length++;
    return true;
  }

  // 10) reverse – otočí zoznam na mieste, vráti this
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = next;
      prev = node;
      node = next;
    }
    return this;
  }
}

module.exports = { Counter, Rectangle, SinglyLinkedList };

if (require.main === module) {
  require('../lib/test-runner').spusti('s18-19 Singly Linked List – Debugging', require('./testy').debug, module.exports);
}
