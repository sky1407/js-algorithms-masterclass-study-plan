/*
 * RIEŠENIA – 10 Stack a Queue
 * Pozri sem až keď to skúsiš sám!
 */
'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const node = new Node(value);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
    return ++this.size;
  }

  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (['+', '-', '*', '/'].includes(t)) {
      const b = stack.pop();
      const a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack.pop();
}

function isBalanced(str) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of str) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
    else if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}

function removeAdjacentDuplicates(str) {
  const stack = [];
  for (const ch of str) {
    if (stack.length > 0 && stack[stack.length - 1] === ch) stack.pop();
    else stack.push(ch);
  }
  return stack.join('');
}

class QueueFromStacks {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(value) {
    this.inbox.push(value);
    return this.size();
  }

  dequeue() {
    if (this.outbox.length === 0) {
      while (this.inbox.length > 0) this.outbox.push(this.inbox.pop());
    }
    return this.outbox.length > 0 ? this.outbox.pop() : null;
  }

  size() {
    return this.inbox.length + this.outbox.length;
  }
}

const protipriklad7 = [['enqueue', 1], ['enqueue', 2], ['dequeue'], ['enqueue', 3]];

function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = [];
  for (let i = 0; i < temps.length; i++) {
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = i - j;
    }
    stack.push(i);
  }
  return result;
}
const protipriklad8 = [[70, 70]];

class MinStack {
  constructor() {
    this.items = [];
    this.mins = [];
  }

  push(value) {
    this.items.push(value);
    if (this.mins.length === 0 || value <= this.mins[this.mins.length - 1]) this.mins.push(value);
  }

  pop() {
    if (this.items.length === 0) return null;
    const value = this.items.pop();
    if (value === this.mins[this.mins.length - 1]) this.mins.pop();
    return value;
  }

  getMin() {
    return this.mins.length > 0 ? this.mins[this.mins.length - 1] : null;
  }
}
const protipriklad9 = [['push', 2], ['push', 1], ['pop'], ['getMin']];

function decodeString(s) {
  const counts = [];
  const parts = [];
  let current = '';
  let num = 0;
  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch);
    } else if (ch === '[') {
      counts.push(num);
      parts.push(current);
      current = '';
      num = 0;
    } else if (ch === ']') {
      current = parts.pop() + current.repeat(counts.pop());
    } else {
      current += ch;
    }
  }
  return current;
}

function slidingWindowMax(nums, k) {
  const result = [];
  const deque = [];
  let head = 0;
  for (let i = 0; i < nums.length; i++) {
    if (head < deque.length && deque[head] <= i - k) head++;
    while (deque.length > head && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[head]]);
  }
  return result;
}

class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.head = 0;
    this.count = 0;
  }

  enqueue(value) {
    if (this.isFull()) return false;
    this.items[(this.head + this.count) % this.capacity] = value;
    this.count++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.items[this.head];
    this.items[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return value;
  }

  front() {
    return this.isEmpty() ? null : this.items[this.head];
  }

  rear() {
    return this.isEmpty() ? null : this.items[(this.head + this.count - 1) % this.capacity];
  }

  isEmpty() {
    return this.count === 0;
  }

  isFull() {
    return this.count === this.capacity;
  }
}

class Editor {
  constructor() {
    this.text = '';
    this.undoStack = [];
    this.redoStack = [];
  }

  type(chars) {
    this.undoStack.push(this.text);
    this.redoStack = [];
    this.text += chars;
    return this.text;
  }

  deleteChars(n) {
    this.undoStack.push(this.text);
    this.redoStack = [];
    this.text = this.text.slice(0, Math.max(0, this.text.length - n));
    return this.text;
  }

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.text);
      this.text = this.undoStack.pop();
    }
    return this.text;
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.text);
      this.text = this.redoStack.pop();
    }
    return this.text;
  }
}

function roundRobin(tasks, quantum) {
  const queue = new Queue();
  for (const t of tasks) queue.enqueue({ id: t.id, left: t.time });
  const finished = [];
  while (queue.size > 0) {
    const task = queue.dequeue();
    task.left -= quantum;
    if (task.left > 0) queue.enqueue(task);
    else finished.push(task.id);
  }
  return finished;
}

module.exports = {
  Stack, Queue, evalRPN,
  isBalanced, removeAdjacentDuplicates, QueueFromStacks,
  protipriklad7, dailyTemperatures, protipriklad8, MinStack, protipriklad9,
  decodeString, slidingWindowMax, CircularQueue,
  Editor, roundRobin,
};
