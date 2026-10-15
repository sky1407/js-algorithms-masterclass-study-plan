'use strict';
const spravne = require('./riesenie');
const { DoublyLinkedList: Vzor } = spravne;

class PovodnaDLL extends Vzor {
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length) return this.pop();
    const removed = this.get(index);
    removed.prev.next = removed.next;
    removed.next.prev = removed.prev;
    removed.next = null;
    removed.prev = null;
    this.length--;
    return removed;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    const before = this.get(index - 1);
    const after = before.next;
    const node = { val, prev: before, next: after };
    before.next = node;
    after.prev = node;
    this.length++;
    return true;
  }

  set(index, val) {
    const node = this.get(index);
    if (node) node.val = val;
    return true;
  }
}

function stav(x, navrat) {
  if (navrat) return x && typeof x === 'object' && 'val' in x ? { uzol: x.val } : x;
  const hodnoty = [];
  let posledny = null;
  let prevSedia = true;
  let n = x.head;
  let kroky = 0;
  while (n && kroky++ < 1000) {
    hodnoty.push(n.val);
    if (n.prev !== posledny) prevSedia = false;
    posledny = n;
    n = n.next;
  }
  const dozadu = [];
  kroky = 0;
  for (let t = x.tail; t && kroky++ < 1000; t = t.prev) dozadu.push(t.val);
  return {
    hodnoty,
    dozadu,
    length: x.length,
    tailJePoslednyUzol: x.tail === posledny,
    prevSedia,
  };
}

function overOps(Trieda, scenare, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', 'trieda DoublyLinkedList nie je exportovaná');
  for (const ops of scenare) {
    const popis = ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
    rovne(prehraj(Trieda, ops, stav), prehraj(Vzor, ops, stav), popis);
  }
}

function hladanieTest(cislo, scenare) {
  return (m, p) => {
    const ops = m[`protipriklad${cislo}`];
    if (!Array.isArray(ops)) {
      throw new p.TestChyba("protipríklad ešte nie je doplnený – zadaj pole operácií, napr. [['push', 1], ['pop']]");
    }
    p.protipriklad([ops], (o) => p.prehraj(PovodnaDLL, o, stav), (o) => p.prehraj(Vzor, o, stav));
    overOps(m.DoublyLinkedList, scenare, p);
  };
}

function dll(hodnoty) {
  const list = { head: null, tail: null, length: 0 };
  for (const val of hodnoty) {
    const node = { val, prev: list.tail, next: null };
    if (list.tail) list.tail.next = node;
    else list.head = node;
    list.tail = node;
    list.length++;
  }
  return list;
}

const P = (...vals) => vals.map((v) => ['push', v]);

const debug = [
  {
    id: 1,
    nazov: 'pop',
    testy: (m, p) => overOps(m.DoublyLinkedList, [
      [...P(1, 2, 3), ['pop']],
      [...P(1, 2), ['pop'], ['push', 9]],
      [...P(1), ['pop'], ['push', 5]],
      [['pop']],
    ], p),
  },
  {
    id: 2,
    nazov: 'unshift a shift',
    testy: (m, p) => overOps(m.DoublyLinkedList, [
      [['unshift', 3], ['unshift', 2], ['unshift', 1]],
      [...P(2, 3), ['unshift', 1]],
      [...P(1, 2, 3), ['shift']],
      [...P(1), ['shift'], ['unshift', 7]],
      [['shift']],
    ], p),
  },
  {
    id: 3,
    nazov: 'get – hľadanie z bližšieho konca',
    testy: (m, p) => overOps(m.DoublyLinkedList, [
      [...P('a', 'b', 'c', 'd', 'e'), ['get', 0], ['get', 1], ['get', 2], ['get', 3], ['get', 4]],
      [...P('a', 'b', 'c', 'd'), ['get', 2], ['get', 3], ['get', 4], ['get', -1]],
      [...P('a'), ['get', 0]],
    ], p),
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'insert',
    testy: (m, p) => overOps(m.DoublyLinkedList, [
      [...P(1, 3), ['insert', 1, 2]],
      [...P(1, 2, 4, 5), ['insert', 2, 3]],
      [...P(2), ['insert', 0, 1], ['insert', 2, 3]],
      [...P(1), ['insert', 3, 'x']],
    ], p),
  },
  {
    id: 5,
    nazov: 'remove',
    testy: (m, p) => overOps(m.DoublyLinkedList, [
      [...P(1, 2, 3), ['remove', 1]],
      [...P(1, 2, 3, 4, 5), ['remove', 3]],
      [...P(1, 2, 3), ['remove', 0], ['remove', 1]],
      [...P(1), ['remove', 5]],
    ], p),
  },
  {
    id: 6,
    nazov: 'reverse',
    testy: (m, p) => overOps(m.DoublyLinkedList, [
      [...P(1, 2, 3, 4), ['reverse']],
      [...P(1, 2), ['reverse'], ['push', 0], ['unshift', 3]],
      [...P(1), ['reverse']],
      [['reverse']],
    ], p),
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'remove – odstránenie na indexe',
    testy: hladanieTest(7, [
      [...P(1, 2, 3), ['remove', 1]],
      [...P(1, 2, 3), ['remove', 2], ['push', 4]],
      [...P(1, 2, 3), ['remove', 3]],
      [...P(1), ['remove', 0]],
    ]),
  },
  {
    id: 8,
    nazov: 'insert – vloženie na index',
    testy: hladanieTest(8, [
      [...P(1, 3), ['insert', 1, 2]],
      [...P(2, 3), ['insert', 0, 1]],
      [['insert', 0, 1]],
      [...P(1), ['insert', -1, 0]],
    ]),
  },
  {
    id: 9,
    nazov: 'set – zmena hodnoty na indexe',
    testy: hladanieTest(9, [
      [...P(1, 2, 3), ['set', 1, 'x']],
      [...P(1, 2, 3), ['set', 3, 'x'], ['set', -1, 'y']],
      [['set', 0, 'x']],
    ]),
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'isPalindromeList – dva ukazovatele z oboch koncov',
    testy: (m, { rovne }) => {
      rovne(m.isPalindromeList(dll([1, 2, 3, 2, 1])), true, 'isPalindromeList(1⇄2⇄3⇄2⇄1)');
      rovne(m.isPalindromeList(dll(['a', 'b', 'b', 'a'])), true, "isPalindromeList(a⇄b⇄b⇄a)");
      rovne(m.isPalindromeList(dll([1, 2, 3])), false, 'isPalindromeList(1⇄2⇄3)');
      rovne(m.isPalindromeList(dll([1, 2, 1, 1])), false, 'isPalindromeList(1⇄2⇄1⇄1)');
      rovne(m.isPalindromeList(dll([7])), true, 'isPalindromeList(7)');
      rovne(m.isPalindromeList(dll([])), true, 'isPalindromeList(prázdny)');
    },
  },
  {
    id: 11,
    nazov: 'insertSorted – vloženie do zoradeného zoznamu',
    testy: (m, { rovne }) => {
      const over = (vstup, val, popis) => {
        const list = dll(vstup);
        rovne(stav(m.insertSorted(list, val) || list, false), stav(dll([...vstup, val].sort((a, b) => a - b)), false), popis);
      };
      over([1, 3, 5], 4, 'insertSorted(1⇄3⇄5, 4)');
      over([1, 3, 5], 0, 'insertSorted(1⇄3⇄5, 0)');
      over([1, 3, 5], 9, 'insertSorted(1⇄3⇄5, 9)');
      over([2, 2], 2, 'insertSorted(2⇄2, 2)');
      over([], 1, 'insertSorted(prázdny, 1)');
    },
  },
  {
    id: 12,
    nazov: 'partitionList – menšie ako x dopredu, poradie zachovaj',
    testy: (m, { rovne, pravda }) => {
      const over = (vstup, x, ocakavane) => {
        const list = dll(vstup);
        const uzly = new Set();
        for (let n = list.head; n; n = n.next) uzly.add(n);
        const out = m.partitionList(list, x) || list;
        rovne(stav(out, false), stav(dll(ocakavane), false), `partitionList(${vstup.join('⇄')}, ${x})`);
        for (let n = out.head; n; n = n.next) pravda(uzly.has(n), 'nevytváraj nové uzly – len ich prepoj');
      };
      over([1, 4, 3, 2, 5, 2], 3, [1, 2, 2, 4, 3, 5]);
      over([5, 6, 7], 3, [5, 6, 7]);
      over([1, 2], 3, [1, 2]);
      over([3, 1], 3, [1, 3]);
      over([], 3, []);
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'BrowserHistory – tlačidlá Späť a Dopredu',
    testy: (m, { rovne, pravda }) => {
      pravda(typeof m.BrowserHistory === 'function', 'chýba trieda BrowserHistory');
      const h = new m.BrowserHistory('google.com');
      h.visit('youtube.com');
      h.visit('github.com');
      h.visit('stackoverflow.com');
      rovne(h.back(1), 'github.com', 'back(1)');
      rovne(h.back(1), 'youtube.com', 'back(1)');
      rovne(h.forward(1), 'github.com', 'forward(1)');
      h.visit('linkedin.com');
      rovne(h.forward(2), 'linkedin.com', 'forward(2) po novej návšteve (dopredná história sa zmaže)');
      rovne(h.back(2), 'youtube.com', 'back(2)');
      rovne(h.back(7), 'google.com', 'back(7) – ďalej ako na začiatok sa nedá');
      rovne(h.forward(10), 'linkedin.com', 'forward(10)');
    },
  },
  {
    id: 14,
    nazov: 'LRUCache – cache s vyhadzovaním najdlhšie nepoužitého',
    testy: (m, { rovne, pravda }) => {
      pravda(typeof m.LRUCache === 'function', 'chýba trieda LRUCache');
      const c = new m.LRUCache(2);
      c.put(1, 'A');
      c.put(2, 'B');
      rovne(c.get(1), 'A', 'get(1)');
      c.put(3, 'C');
      rovne(c.get(2), -1, 'get(2) – kľúč 2 bol najdlhšie nepoužitý, mal vypadnúť');
      c.put(4, 'D');
      rovne(c.get(1), -1, 'get(1)');
      rovne(c.get(3), 'C', 'get(3)');
      rovne(c.get(4), 'D', 'get(4)');
      c.put(3, 'C2');
      c.put(5, 'E');
      rovne(c.get(4), -1, 'get(4) – put(3) obnovil kľúč 3, takže vypadol 4');
      rovne(c.get(3), 'C2', 'get(3) po aktualizácii');
      const velka = new m.LRUCache(1000);
      const start = Date.now();
      for (let i = 0; i < 200000; i++) {
        velka.put(i % 3000, i);
        velka.get((i * 7) % 3000);
      }
      pravda(Date.now() - start < 500, 'príliš pomalé – get aj put majú byť O(1)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
