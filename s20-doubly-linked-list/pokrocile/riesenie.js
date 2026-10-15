/*
 * RIEŠENIA – 09 Doubly Linked List
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

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
    const before = this.get(index - 1);
    const after = before.next;
    const node = new Node(val);
    node.prev = before;
    node.next = after;
    before.next = node;
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
    this.head = this.tail;
    this.tail = current;
    while (current) {
      const next = current.next;
      current.next = current.prev;
      current.prev = next;
      current = next;
    }
    return this;
  }
}

const protipriklad7 = [['push', 1], ['push', 2], ['remove', 1]];
const protipriklad8 = [['push', 1], ['insert', 0, 'x']];
const protipriklad9 = [['set', 0, 'x']];

function isPalindromeList(list) {
  let left = list.head;
  let right = list.tail;
  while (left && right && left !== right && left.prev !== right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.prev;
  }
  return true;
}

function insertSorted(list, val) {
  const node = { val, prev: null, next: null };
  let current = list.head;
  while (current && current.val <= val) current = current.next;
  if (!current) {
    node.prev = list.tail;
    if (list.tail) list.tail.next = node;
    else list.head = node;
    list.tail = node;
  } else {
    node.next = current;
    node.prev = current.prev;
    if (current.prev) current.prev.next = node;
    else list.head = node;
    current.prev = node;
  }
  list.length++;
  return list;
}

function partitionList(list, x) {
  let lessHead = null;
  let lessTail = null;
  let moreHead = null;
  let moreTail = null;
  let current = list.head;
  while (current) {
    const next = current.next;
    current.next = null;
    if (current.val < x) {
      current.prev = lessTail;
      if (lessTail) lessTail.next = current;
      else lessHead = current;
      lessTail = current;
    } else {
      current.prev = moreTail;
      if (moreTail) moreTail.next = current;
      else moreHead = current;
      moreTail = current;
    }
    current = next;
  }
  if (lessTail) {
    lessTail.next = moreHead;
    if (moreHead) moreHead.prev = lessTail;
    list.head = lessHead;
    list.tail = moreTail || lessTail;
  } else {
    list.head = moreHead;
    list.tail = moreTail;
  }
  return list;
}

class BrowserHistory {
  constructor(homepage) {
    this.current = { url: homepage, prev: null, next: null };
  }

  visit(url) {
    const node = { url, prev: this.current, next: null };
    this.current.next = node;
    this.current = node;
    return url;
  }

  back(steps) {
    while (steps > 0 && this.current.prev) {
      this.current = this.current.prev;
      steps--;
    }
    return this.current.url;
  }

  forward(steps) {
    while (steps > 0 && this.current.next) {
      this.current = this.current.next;
      steps--;
    }
    return this.current.url;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { key: null, prev: null, next: null };
    this.tail = { key: null, prev: this.head, next: null };
    this.head.next = this.tail;
  }

  detach(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  attachFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.detach(node);
    this.attachFront(node);
    return node.value;
  }

  put(key, value) {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.detach(existing);
      this.attachFront(existing);
      return;
    }
    if (this.capacity <= 0) return;
    if (this.map.size === this.capacity) {
      const lru = this.tail.prev;
      this.detach(lru);
      this.map.delete(lru.key);
    }
    const node = { key, value, prev: null, next: null };
    this.attachFront(node);
    this.map.set(key, node);
  }
}

module.exports = {
  Node, DoublyLinkedList,
  protipriklad7, protipriklad8, protipriklad9,
  isPalindromeList, insertSorted, partitionList,
  BrowserHistory, LRUCache,
};
