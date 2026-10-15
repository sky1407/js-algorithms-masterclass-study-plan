'use strict';
const spravne = require('./riesenie');
const { SinglyLinkedList: Vzor } = spravne;

class PovodnaSLL extends Vzor {
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    removed.next = null;
    this.length--;
    return removed;
  }

  insert(index, val) {
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const prev = this.get(index - 1);
    const node = { val, next: prev.next };
    prev.next = node;
    this.length++;
    return true;
  }

  rotate(k) {
    if (this.length <= 1) return this;
    const steps = k % this.length;
    for (let i = 0; i < steps; i++) {
      const node = this.shift();
      this.push(node.val);
    }
    return this;
  }
}

function stav(x, navrat) {
  if (navrat) return x && typeof x === 'object' && 'val' in x ? { uzol: x.val } : x;
  const hodnoty = [];
  let posledny = null;
  let n = x.head;
  let kroky = 0;
  while (n && kroky++ < 1000) {
    hodnoty.push(n.val);
    posledny = n;
    n = n.next;
  }
  return {
    hodnoty,
    length: x.length,
    head: x.head ? x.head.val : null,
    tail: x.tail ? x.tail.val : null,
    tailJePoslednyUzol: x.tail === posledny,
  };
}

function overOps(Trieda, scenare, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', 'trieda SinglyLinkedList nie je exportovaná');
  for (const ops of scenare) {
    const popis = ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
    rovne(prehraj(Trieda, ops, stav), prehraj(Vzor, ops, stav), popis);
  }
}

function zoznam(hodnoty) {
  let head = null;
  for (let i = hodnoty.length - 1; i >= 0; i--) head = { val: hodnoty[i], next: head };
  return head;
}

function naPole(head) {
  const out = [];
  let kroky = 0;
  for (let n = head; n && kroky++ < 10000; n = n.next) out.push(n.val);
  return out;
}

const P = (...vals) => vals.map((v) => ['push', v]);

const debug = [
  {
    id: 1,
    nazov: 'pop – odober posledný uzol',
    testy: (m, p) => overOps(m.SinglyLinkedList, [
      [...P(1, 2, 3), ['pop']],
      [...P(1, 2, 3), ['pop'], ['pop'], ['push', 9]],
      [...P(1), ['pop']],
      [...P(1), ['pop'], ['push', 5], ['push', 6]],
      [['pop']],
    ], p),
  },
  {
    id: 2,
    nazov: 'shift – odober prvý uzol',
    testy: (m, p) => overOps(m.SinglyLinkedList, [
      [...P(1, 2, 3), ['shift']],
      [...P(1, 2), ['shift'], ['shift']],
      [...P(1), ['shift'], ['push', 7]],
      [['shift']],
    ], p),
  },
  {
    id: 3,
    nazov: 'get a insert',
    testy: (m, p) => overOps(m.SinglyLinkedList, [
      [...P('a', 'b', 'c'), ['get', 0], ['get', 2], ['get', 3], ['get', -1]],
      [...P(1, 3), ['insert', 1, 2]],
      [...P(1, 2), ['insert', 2, 3], ['push', 4]],
      [...P(2, 3), ['insert', 0, 1]],
      [['insert', 0, 'x']],
      [...P(1), ['insert', 5, 'x'], ['insert', -1, 'y']],
    ], p),
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'pop – verzia z kurzu',
    testy: (m, p) => overOps(m.SinglyLinkedList, [
      [...P(1, 2, 3), ['pop'], ['pop']],
      [...P(1), ['pop'], ['push', 2]],
      [['pop']],
    ], p),
  },
  {
    id: 5,
    nazov: 'reverse – otočenie na mieste',
    testy: (m, p) => overOps(m.SinglyLinkedList, [
      [...P(1, 2, 3, 4), ['reverse']],
      [...P(1, 2, 3), ['reverse'], ['push', 0]],
      [...P(1), ['reverse']],
      [['reverse']],
    ], p),
  },
  {
    id: 6,
    nazov: 'removeAll – zmaž všetky uzly s hodnotou',
    testy: (m, p) => overOps(m.SinglyLinkedList, [
      [...P(1, 2, 1, 3, 1), ['removeAll', 1]],
      [...P(5, 5, 5), ['removeAll', 5], ['push', 1]],
      [...P(1, 2, 2), ['removeAll', 2], ['push', 3]],
      [...P(1, 2), ['removeAll', 9]],
      [['removeAll', 1]],
    ], p),
  },
];

function hladanieTest(cislo, scenare) {
  return (m, p) => {
    const ops = m[`protipriklad${cislo}`];
    if (!Array.isArray(ops)) {
      throw new p.TestChyba("protipríklad ešte nie je doplnený – zadaj pole operácií, napr. [['push', 1], ['pop']]");
    }
    p.protipriklad([ops], (o) => p.prehraj(PovodnaSLL, o, stav), (o) => p.prehraj(Vzor, o, stav));
    overOps(m.SinglyLinkedList, scenare, p);
  };
}

const hladanie = [
  {
    id: 7,
    nazov: 'remove – odstránenie uzla na indexe',
    testy: hladanieTest(7, [
      [...P(1, 2, 3), ['remove', 1]],
      [...P(1, 2, 3), ['remove', 0]],
      [...P(1, 2, 3), ['remove', 2], ['push', 4]],
      [...P(1), ['remove', 0], ['push', 2]],
      [...P(1), ['remove', 3]],
    ]),
  },
  {
    id: 8,
    nazov: 'insert – vloženie na index',
    testy: hladanieTest(8, [
      [...P(1, 3), ['insert', 1, 2]],
      [...P(1), ['insert', 1, 2], ['insert', 0, 0]],
      [...P(1), ['insert', 3, 'x']],
      [...P(1), ['insert', -1, 'x']],
      [['insert', 1, 'x']],
    ]),
  },
  {
    id: 9,
    nazov: 'rotate – otočenie zoznamu o k pozícií',
    testy: hladanieTest(9, [
      [...P(1, 2, 3, 4, 5), ['rotate', 2]],
      [...P(1, 2, 3, 4, 5), ['rotate', -1]],
      [...P(1, 2, 3, 4, 5), ['rotate', 7]],
      [...P(1, 2, 3, 4, 5), ['rotate', -6]],
      [...P(1, 2, 3), ['rotate', 3], ['push', 4]],
      [['rotate', 2]],
    ]),
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'findMiddle – stred zoznamu jedným prechodom',
    testy: (m, { rovne }) => {
      rovne(m.findMiddle(zoznam([1, 2, 3, 4, 5])), 3, 'findMiddle(1→2→3→4→5)');
      rovne(m.findMiddle(zoznam([1, 2, 3, 4])), 3, 'findMiddle(1→2→3→4) – pri párnom počte druhý zo stredných');
      rovne(m.findMiddle(zoznam([7])), 7, 'findMiddle(7)');
      rovne(m.findMiddle(null), null, 'findMiddle(null)');
    },
  },
  {
    id: 11,
    nazov: 'hasCycle – je v zozname cyklus? (Floydov algoritmus)',
    testy: (m, { rovne }) => {
      rovne(m.hasCycle(zoznam([1, 2, 3])), false, 'hasCycle(1→2→3)');
      const a = zoznam([1, 2, 3, 4]);
      a.next.next.next.next = a.next;
      rovne(m.hasCycle(a), true, 'hasCycle(1→2→3→4→(späť na 2))');
      const b = zoznam([1]);
      b.next = b;
      rovne(m.hasCycle(b), true, 'hasCycle(1→(sám na seba))');
      rovne(m.hasCycle(null), false, 'hasCycle(null)');
      const dlhy = zoznam(Array.from({ length: 50000 }, (_, i) => i));
      rovne(m.hasCycle(dlhy), false, 'hasCycle(50 000 uzlov bez cyklu)');
    },
  },
  {
    id: 12,
    nazov: 'mergeTwoSorted – spojenie dvoch zoradených zoznamov',
    testy: (m, { rovne, pravda }) => {
      rovne(naPole(m.mergeTwoSorted(zoznam([1, 3, 5]), zoznam([2, 4, 6, 8]))), [1, 2, 3, 4, 5, 6, 8], 'mergeTwoSorted(1→3→5, 2→4→6→8)');
      rovne(naPole(m.mergeTwoSorted(null, zoznam([1, 2]))), [1, 2], 'mergeTwoSorted(null, 1→2)');
      rovne(naPole(m.mergeTwoSorted(null, null)), [], 'mergeTwoSorted(null, null)');
      const a = zoznam([1, 4]);
      const b = zoznam([2]);
      const out = m.mergeTwoSorted(a, b);
      pravda(out === a && out.next === b, 'nevytváraj nové uzly – prepoj existujúce');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'Playlist – fronta skladieb v prehrávači',
    testy: (m, { rovne, pravda, nepouziva }) => {
      pravda(typeof m.Playlist === 'function', 'chýba trieda Playlist');
      for (const meno of Object.getOwnPropertyNames(m.Playlist.prototype)) {
        if (meno === 'toArray' || meno === 'constructor') continue;
        nepouziva(m.Playlist.prototype[meno], /\bArray\b|\[\]|\.shift\(|\.splice\(/, `${meno}: skladby drž v spájanom zozname, nie v poli (pole použi len v toArray)`);
      }
      const p = new m.Playlist();
      pravda(!Object.values(p).some(Array.isArray), 'Playlist nesmie mať pole ako vlastnosť – použi head/tail');
      rovne(p.add('Song A'), 1, "add('Song A')");
      rovne(p.add('Song B'), 2, "add('Song B')");
      rovne(p.playNext('Hit'), 3, "playNext('Hit')");
      rovne(p.toArray(), ['Hit', 'Song A', 'Song B'], 'toArray()');
      rovne(p.removeSong('Song B'), true, "removeSong('Song B')");
      rovne(p.removeSong('Neexistuje'), false, "removeSong('Neexistuje')");
      rovne(p.add('Song C'), 3, "add('Song C') po odstránení posledného");
      rovne(p.toArray(), ['Hit', 'Song A', 'Song C'], 'toArray()');
      rovne(p.play(), 'Hit', 'play()');
      rovne(p.play(), 'Song A', 'play()');
      rovne(p.play(), 'Song C', 'play()');
      rovne(p.play(), null, 'play() na prázdnom playliste');
      rovne(p.add('Posledná'), 1, "add('Posledná') po vyprázdnení");
      rovne(p.toArray(), ['Posledná'], 'toArray()');
    },
  },
  {
    id: 14,
    nazov: 'addBigNumbers – sčítanie obrovských čísel',
    testy: (m, { rovne }) => {
      const cislo = (s) => zoznam([...s].reverse().map(Number));
      const text = (head) => naPole(head).reverse().join('');
      rovne(text(m.addBigNumbers(cislo('342'), cislo('465'))), '807', '342 + 465');
      rovne(text(m.addBigNumbers(cislo('999'), cislo('1'))), '1000', '999 + 1');
      rovne(text(m.addBigNumbers(cislo('0'), cislo('0'))), '0', '0 + 0');
      const a = '98765432109876543210987654321';
      const b = '12345678901234567890123456789';
      rovne(text(m.addBigNumbers(cislo(a), cislo(b))), (BigInt(a) + BigInt(b)).toString(), `${a} + ${b}`);
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
