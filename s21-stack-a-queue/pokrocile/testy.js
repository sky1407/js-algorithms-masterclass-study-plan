'use strict';
const spravne = require('./riesenie');

class PovodnaQueue extends spravne.Queue {
  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    this.first = this.first.next;
    if (this.first === this.last) this.last = null;
    this.size--;
    return temp.value;
  }
}

class PovodnyMinStack {
  constructor() {
    this.items = [];
    this.min = null;
  }

  push(value) {
    this.items.push(value);
    if (this.min === null || value < this.min) this.min = value;
  }

  pop() {
    if (this.items.length === 0) return null;
    return this.items.pop();
  }

  getMin() {
    return this.min;
  }
}

const povodne = {
  dailyTemperatures(temps) {
    const result = new Array(temps.length).fill(0);
    const stack = [];
    for (let i = 0; i < temps.length; i++) {
      while (stack.length > 0 && temps[i] >= temps[stack[stack.length - 1]]) {
        const j = stack.pop();
        result[j] = i - j;
      }
      stack.push(i);
    }
    return result;
  },
};

function stavZoznamu(x, navrat) {
  if (navrat) return x;
  const hodnoty = [];
  let posledny = null;
  let kroky = 0;
  for (let n = x.first; n && kroky++ < 1000; n = n.next) {
    hodnoty.push(n.value);
    posledny = n;
  }
  return { hodnoty, size: x.size, lastJePoslednyUzol: x.last === posledny };
}

const lenNavraty = (x, navrat) => (navrat ? x : null);

function popisOps(ops) {
  return ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
}

function overOps(Trieda, Vzor, scenare, stav, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', `trieda ${Vzor.name} nie je exportovaná`);
  for (const ops of scenare) rovne(prehraj(Trieda, ops, stav), prehraj(Vzor, ops, stav), popisOps(ops));
}

function overProtipriklad(ops, Povodna, Vzor, stav, p) {
  if (!Array.isArray(ops)) {
    throw new p.TestChyba("protipríklad ešte nie je doplnený – zadaj pole operácií, napr. [['push', 1], ['pop']]");
  }
  p.protipriklad([ops], (o) => p.prehraj(Povodna, o, stav), (o) => p.prehraj(Vzor, o, stav));
}

const debug = [
  {
    id: 1,
    nazov: 'Stack – push a pop (spájaný zoznam)',
    testy: (m, p) => overOps(m.Stack, spravne.Stack, [
      [['push', 1], ['push', 2], ['push', 3]],
      [['push', 1], ['push', 2], ['pop'], ['pop'], ['pop']],
      [['push', 'a'], ['pop'], ['push', 'b']],
    ], stavZoznamu, p),
  },
  {
    id: 2,
    nazov: 'Queue – enqueue a dequeue (spájaný zoznam)',
    testy: (m, p) => overOps(m.Queue, spravne.Queue, [
      [['enqueue', 1], ['enqueue', 2], ['enqueue', 3]],
      [['enqueue', 1], ['enqueue', 2], ['dequeue'], ['dequeue'], ['dequeue']],
      [['enqueue', 'a'], ['dequeue'], ['enqueue', 'b'], ['enqueue', 'c']],
    ], stavZoznamu, p),
  },
  {
    id: 3,
    nazov: 'evalRPN – výpočet v postfixovej notácii',
    testy: (m, { rovne }) => {
      rovne(m.evalRPN(['2', '1', '+', '3', '*']), 9, "evalRPN(['2', '1', '+', '3', '*'])");
      rovne(m.evalRPN(['4', '13', '5', '/', '+']), 6, "evalRPN(['4', '13', '5', '/', '+'])");
      rovne(m.evalRPN(['10', '3', '-']), 7, "evalRPN(['10', '3', '-'])");
      rovne(m.evalRPN(['7', '-2', '/']), -3, "evalRPN(['7', '-2', '/'])");
      rovne(
        m.evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']),
        22,
        'evalRPN(dlhý výraz)',
      );
      rovne(m.evalRPN(['42']), 42, "evalRPN(['42'])");
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'isBalanced – sedia zátvorky?',
    testy: (m, { rovne }) => {
      for (const [s, r] of [['()', true], ['()[]{}', true], ['{[()()]}', true], ['(]', false], ['([)]', false], ['((', false], ['))', false], ['', true], ['f(x[0]) + {a: 1}', true]]) {
        rovne(m.isBalanced(s), r, `isBalanced('${s}')`);
      }
    },
  },
  {
    id: 5,
    nazov: 'removeAdjacentDuplicates – mazanie susedných dvojíc',
    testy: (m, { rovne }) => {
      rovne(m.removeAdjacentDuplicates('abbaca'), 'ca', "removeAdjacentDuplicates('abbaca')");
      rovne(m.removeAdjacentDuplicates('azxxzy'), 'ay', "removeAdjacentDuplicates('azxxzy')");
      rovne(m.removeAdjacentDuplicates('aaa'), 'a', "removeAdjacentDuplicates('aaa')");
      rovne(m.removeAdjacentDuplicates('abc'), 'abc', "removeAdjacentDuplicates('abc')");
      rovne(m.removeAdjacentDuplicates(''), '', "removeAdjacentDuplicates('')");
    },
  },
  {
    id: 6,
    nazov: 'QueueFromStacks – fronta z dvoch zásobníkov',
    testy: (m, p) => {
      overOps(m.QueueFromStacks, spravne.QueueFromStacks, [
        [['enqueue', 1], ['enqueue', 2], ['enqueue', 3], ['dequeue'], ['dequeue']],
        [['enqueue', 1], ['dequeue'], ['enqueue', 2], ['enqueue', 3], ['dequeue'], ['enqueue', 4], ['dequeue'], ['dequeue'], ['dequeue']],
        [['dequeue'], ['size']],
      ], lenNavraty, p);
      const q = new m.QueueFromStacks();
      p.pravda(!('items' in q) && Object.values(q).filter(Array.isArray).length === 2, 'použi presne dve polia ako zásobníky (inbox, outbox)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'Queue.dequeue',
    testy: (m, p) => {
      overProtipriklad(m.protipriklad7, PovodnaQueue, spravne.Queue, stavZoznamu, p);
      overOps(m.Queue, spravne.Queue, [
        [['enqueue', 1], ['enqueue', 2], ['dequeue'], ['enqueue', 3], ['dequeue'], ['dequeue']],
        [['enqueue', 1], ['dequeue'], ['enqueue', 2]],
        [['dequeue']],
      ], stavZoznamu, p);
    },
  },
  {
    id: 8,
    nazov: 'dailyTemperatures – koľko dní do teplejšieho dňa',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.dailyTemperatures, spravne.dailyTemperatures);
      rovne(m.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0], 'dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])');
      rovne(m.dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0], 'dailyTemperatures([30, 40, 50, 60])');
      rovne(m.dailyTemperatures([20, 20, 25]), [2, 1, 0], 'dailyTemperatures([20, 20, 25])');
      rovne(m.dailyTemperatures([]), [], 'dailyTemperatures([])');
    },
  },
  {
    id: 9,
    nazov: 'MinStack – minimum v O(1)',
    testy: (m, p) => {
      overProtipriklad(m.protipriklad9, PovodnyMinStack, spravne.MinStack, lenNavraty, p);
      overOps(m.MinStack, spravne.MinStack, [
        [['push', 5], ['push', 3], ['push', 7], ['getMin'], ['pop'], ['getMin'], ['pop'], ['getMin']],
        [['push', 2], ['push', 2], ['push', 1], ['pop'], ['getMin'], ['pop'], ['getMin']],
        [['getMin'], ['pop']],
      ], lenNavraty, p);
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'decodeString – rozbalenie k[text]',
    testy: (m, { rovne }) => {
      rovne(m.decodeString('3[a]2[bc]'), 'aaabcbc', "decodeString('3[a]2[bc]')");
      rovne(m.decodeString('3[a2[c]]'), 'accaccacc', "decodeString('3[a2[c]]')");
      rovne(m.decodeString('2[abc]3[cd]ef'), 'abcabccdcdcdef', "decodeString('2[abc]3[cd]ef')");
      rovne(m.decodeString('10[x]'), 'xxxxxxxxxx', "decodeString('10[x]')");
      rovne(m.decodeString('abc'), 'abc', "decodeString('abc')");
      rovne(m.decodeString(''), '', "decodeString('')");
    },
  },
  {
    id: 11,
    nazov: 'slidingWindowMax – maximum každého okna v O(n)',
    testy: (m, { rovne, pravda }) => {
      rovne(m.slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7], 'slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3)');
      rovne(m.slidingWindowMax([9, 8, 7, 6], 2), [9, 8, 7], 'slidingWindowMax([9, 8, 7, 6], 2)');
      rovne(m.slidingWindowMax([4, 4, 4], 2), [4, 4], 'slidingWindowMax([4, 4, 4], 2)');
      rovne(m.slidingWindowMax([1], 1), [1], 'slidingWindowMax([1], 1)');
      const data = Array.from({ length: 200000 }, (_, i) => (i * 7919) % 100003);
      const start = Date.now();
      rovne(m.slidingWindowMax(data, 5000), spravne.slidingWindowMax(data, 5000), 'slidingWindowMax(200 000 prvkov, 5000)');
      pravda(Date.now() - start < 300, 'príliš pomalé – použi deque (monotónnu frontu)');
    },
  },
  {
    id: 12,
    nazov: 'CircularQueue – kruhový buffer',
    testy: (m, { rovne, prehraj, pravda }) => {
      pravda(typeof m.CircularQueue === 'function', 'chýba trieda CircularQueue');
      const ops = [
        ['enqueue', 1], ['enqueue', 2], ['enqueue', 3], ['enqueue', 4], ['rear'], ['isFull'],
        ['dequeue'], ['enqueue', 4], ['rear'], ['front'], ['dequeue'], ['dequeue'], ['dequeue'],
        ['dequeue'], ['isEmpty'], ['front'], ['rear'], ['enqueue', 9], ['front'], ['rear'],
      ];
      const Trieda = class extends m.CircularQueue {
        constructor() {
          super(3);
        }
      };
      const Vzor = class extends spravne.CircularQueue {
        constructor() {
          super(3);
        }
      };
      rovne(prehraj(Trieda, ops, lenNavraty), prehraj(Vzor, ops, lenNavraty), popisOps(ops));
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'Editor – undo a redo',
    testy: (m, { rovne, pravda }) => {
      pravda(typeof m.Editor === 'function', 'chýba trieda Editor');
      const e = new m.Editor();
      rovne(e.type('Ahoj'), 'Ahoj', "type('Ahoj')");
      rovne(e.type(' svet'), 'Ahoj svet', "type(' svet')");
      rovne(e.deleteChars(5), 'Ahoj', 'deleteChars(5)');
      rovne(e.undo(), 'Ahoj svet', 'undo()');
      rovne(e.undo(), 'Ahoj', 'undo()');
      rovne(e.redo(), 'Ahoj svet', 'redo()');
      rovne(e.type('!'), 'Ahoj svet!', "type('!')");
      rovne(e.redo(), 'Ahoj svet!', 'redo() po novom písaní nič nerobí');
      rovne(e.undo(), 'Ahoj svet', 'undo()');
      rovne(e.undo(), 'Ahoj', 'undo()');
      rovne(e.undo(), '', 'undo()');
      rovne(e.undo(), '', 'undo() na začiatku histórie');
      rovne(e.deleteChars(3), '', 'deleteChars(3) na prázdnom texte');
    },
  },
  {
    id: 14,
    nazov: 'roundRobin – plánovač procesov',
    testy: (m, { rovne }) => {
      const tasks = [{ id: 'A', time: 3 }, { id: 'B', time: 1 }, { id: 'C', time: 2 }];
      rovne(m.roundRobin(tasks, 1), ['B', 'C', 'A'], 'roundRobin(tasks, 1)');
      rovne(m.roundRobin(tasks, 2), ['B', 'C', 'A'], 'roundRobin(tasks, 2)');
      rovne(m.roundRobin(tasks, 5), ['A', 'B', 'C'], 'roundRobin(tasks, 5)');
      rovne(tasks[0].time, 3, 'vstupné úlohy sa nesmú zmeniť');
      rovne(
        m.roundRobin([{ id: 1, time: 5 }, { id: 2, time: 2 }, { id: 3, time: 4 }, { id: 4, time: 1 }], 2),
        [2, 4, 3, 1],
        'roundRobin(4 úlohy, 2)',
      );
      rovne(m.roundRobin([], 3), [], 'roundRobin([], 3)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
