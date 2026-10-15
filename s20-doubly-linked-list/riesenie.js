/*
 * s20 Doubly Linked List – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * Trieda DLL obsahuje všetky metódy. DoublyLinkedList (2-debug.js) a DList (3-doplnenie.js)
 * sú tie isté metódy – opravené verzie nájdeš v DLL.
 */
'use strict';

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DLL {
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
    const oldTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = oldTail.prev;
      this.tail.next = null;
      oldTail.prev = null;
    }
    this.length--;
    return oldTail;
  }

  popB() {
    return this.pop();
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

  set(index, val) {
    const node = this.get(index);
    if (!node) return false;
    node.val = val;
    return true;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const node = new Node(val);
    const before = this.get(index - 1);
    const after = before.next;
    before.next = node;
    node.prev = before;
    node.next = after;
    after.prev = node;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const removed = this.get(index);
    removed.prev.next = removed.next;
    removed.next.prev = removed.prev;
    removed.next = null;
    removed.prev = null;
    this.length--;
    return removed;
  }

  reverse() {
    let current = this.head;
    while (current) {
      [current.next, current.prev] = [current.prev, current.next];
      current = current.prev;
    }
    [this.head, this.tail] = [this.tail, this.head];
    return this;
  }

  toArrayReverse() {
    const result = [];
    let current = this.tail;
    while (current) {
      result.push(current.val);
      current = current.prev;
    }
    return result;
  }
}

const DNode = Node;
const DoublyLinkedList = DLL;
const DList = DLL;

module.exports = { Node, DLL, DNode, DList, DoublyLinkedList };
