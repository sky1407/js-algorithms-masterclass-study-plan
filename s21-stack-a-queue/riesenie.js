/*
 * s21 Stack a Queue – VZOROVÉ RIEŠENIA
 * Pozri sa sem, až keď úlohu vyriešiš alebo si naozaj zaseknutý.
 *
 * Stack, StackD a LinkedStack sú ten istý zásobník; Queue, QueueD a LinkedQueue ten istý rad.
 */
'use strict';

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedStack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      const temp = this.first;
      this.first = node;
      this.first.next = temp;
    }
    return ++this.size;
  }

  push2(val) {
    return this.push(val);
  }

  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }

  pop2() {
    return this.pop();
  }

  peek() {
    return this.first ? this.first.val : null;
  }
}

class LinkedQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return ++this.size;
  }

  enqueue2(val) {
    return this.enqueue(val);
  }

  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }

  front() {
    return this.first ? this.first.val : null;
  }
}

class ArrayStack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    return this.items.pop();
  }
}

class ArrayQueue {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    return this.items.shift();
  }
}

function isBalanced(str) {
  const pary = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch in pary) {
      if (stack.pop() !== pary[ch]) return false;
    }
  }
  return stack.length === 0;
}

function reverseString(str) {
  const stack = [];
  for (const ch of str) stack.push(ch);
  let result = '';
  while (stack.length > 0) {
    result += stack.pop();
  }
  return result;
}

function backTo(history, steps) {
  const stack = history.slice();
  for (let i = 0; i < steps; i++) {
    stack.pop();
  }
  return stack[stack.length - 1];
}

function removeAdjacentDuplicates(str) {
  const s = [];
  for (const ch of str) {
    if (s[s.length - 1] === ch) s.pop();
    else s.push(ch);
  }
  return s.join('');
}

module.exports = {
  Node,
  Stack: LinkedStack, Queue: LinkedQueue, ArrayStack, ArrayQueue, isBalanced, reverseString, backTo,
  StackD: LinkedStack, QueueD: LinkedQueue, ArrStack: ArrayStack, ArrQueue: ArrayQueue, balanced: isBalanced,
  LinkedStack, LinkedQueue, reverseWithStack: reverseString, balancedBrackets: isBalanced, removeAdjacentDuplicates,
};
