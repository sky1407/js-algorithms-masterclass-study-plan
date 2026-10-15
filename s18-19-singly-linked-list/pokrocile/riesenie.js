/*
 * RIEŠENIA – 08 Singly Linked List
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
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
      this.tail = node;
    }
    this.length++;
    return this;
  }

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
    return current;
  }

  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    this.length--;
    if (this.length === 0) this.tail = null;
    return oldHead;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) current = current.next;
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
    const prev = this.get(index - 1);
    const node = new Node(val);
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    removed.next = null;
    this.length--;
    return removed;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    while (node) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  removeAll(val) {
    let removed = 0;
    while (this.head && this.head.val === val) {
      this.head = this.head.next;
      removed++;
    }
    let current = this.head;
    while (current && current.next) {
      if (current.next.val === val) {
        current.next = current.next.next;
        removed++;
      } else {
        current = current.next;
      }
    }
    this.tail = current;
    this.length -= removed;
    return removed;
  }

  rotate(k) {
    if (this.length <= 1) return this;
    const steps = ((k % this.length) + this.length) % this.length;
    for (let i = 0; i < steps; i++) {
      const node = this.shift();
      this.push(node.val);
    }
    return this;
  }
}

const protipriklad7 = [['push', 1], ['push', 2], ['remove', 1], ['push', 3]];
const protipriklad8 = [['push', 1], ['insert', 5, 'x']];
const protipriklad9 = [['push', 1], ['push', 2], ['push', 3], ['rotate', -1]];

function findMiddle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow ? slow.val : null;
}

function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

function mergeTwoSorted(a, b) {
  const dummy = { val: null, next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}

class Playlist {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(song) {
    const node = { val: song, next: null };
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
    return this.length;
  }

  playNext(song) {
    const node = { val: song, next: this.head };
    this.head = node;
    if (!this.tail) this.tail = node;
    this.length++;
    return this.length;
  }

  play() {
    if (!this.head) return null;
    const song = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return song;
  }

  removeSong(song) {
    let prev = null;
    let current = this.head;
    while (current && current.val !== song) {
      prev = current;
      current = current.next;
    }
    if (!current) return false;
    if (prev) prev.next = current.next;
    else this.head = current.next;
    if (current === this.tail) this.tail = prev;
    this.length--;
    return true;
  }

  toArray() {
    const out = [];
    for (let n = this.head; n; n = n.next) out.push(n.val);
    return out;
  }
}

function addBigNumbers(a, b) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  let carry = 0;
  while (a || b || carry) {
    const sum = (a ? a.val : 0) + (b ? b.val : 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = { val: sum % 10, next: null };
    tail = tail.next;
    a = a && a.next;
    b = b && b.next;
  }
  return dummy.next;
}

module.exports = {
  Node, SinglyLinkedList,
  protipriklad7, protipriklad8, protipriklad9,
  findMiddle, hasCycle, mergeTwoSorted,
  Playlist, addBigNumbers,
};
