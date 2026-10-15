'use strict';
const spravne = require('./riesenie');

class PovodnaMaxHeap extends spravne.MaxBinaryHeap {
  extractMax() {
    if (this.values.length === 0) return undefined;
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      const length = this.values.length;
      while (true) {
        const leftIdx = 2 * idx + 1;
        const rightIdx = 2 * idx + 2;
        let swapIdx = null;
        if (leftIdx < length && this.values[leftIdx] > this.values[idx]) swapIdx = leftIdx;
        if (rightIdx < length && this.values[rightIdx] > this.values[idx]) swapIdx = rightIdx;
        if (swapIdx === null) break;
        [this.values[idx], this.values[swapIdx]] = [this.values[swapIdx], this.values[idx]];
        idx = swapIdx;
      }
    }
    return max;
  }
}

class PovodnaStablePQ {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    let idx = this.values.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx].priority >= this.values[parentIdx].priority) break;
      [this.values[idx], this.values[parentIdx]] = [this.values[parentIdx], this.values[idx]];
      idx = parentIdx;
    }
    return this;
  }

  dequeue() {
    if (this.values.length === 0) return undefined;
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      const length = this.values.length;
      while (true) {
        const l = 2 * idx + 1;
        const r = 2 * idx + 2;
        let best = idx;
        if (l < length && this.values[l].priority < this.values[best].priority) best = l;
        if (r < length && this.values[r].priority < this.values[best].priority) best = r;
        if (best === idx) break;
        [this.values[idx], this.values[best]] = [this.values[best], this.values[idx]];
        idx = best;
      }
    }
    return min.val;
  }
}

const povodne = {
  isMaxHeap(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      if (!(arr[i] >= arr[2 * i + 1] && arr[i] >= arr[2 * i + 2])) return false;
    }
    return true;
  },
};

const BEZ_SORT = /\.sort\(/;

function uzol(x) {
  return x && typeof x === 'object' && 'priority' in x ? { val: x.val, priority: x.priority } : x;
}

const stavHaldy = (x, navrat) => (navrat ? x : [...x.values]);
const stavPQ = (x, navrat) => (navrat ? uzol(x) : x.values.map(uzol));
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
    throw new p.TestChyba("protipríklad ešte nie je doplnený – zadaj pole operácií, napr. [['insert', 5], ['extractMax']]");
  }
  p.protipriklad([ops], (o) => p.prehraj(Povodna, o, stav), (o) => p.prehraj(Vzor, o, stav));
}

function nahodne(n, seed, rozsah = 1000) {
  let x = seed;
  return Array.from({ length: n }, () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x % rozsah;
  });
}

const I = (...vals) => vals.map((v) => ['insert', v]);

const debug = [
  {
    id: 1,
    nazov: 'MaxBinaryHeap.insert – bubble up',
    testy: (m, p) => overOps(m.MaxBinaryHeap, spravne.MaxBinaryHeap, [
      I(41, 39, 33, 18, 27, 12, 55),
      I(1, 2, 3, 4, 5, 6, 7),
      I(5, 5, 5),
      I(10),
    ], stavHaldy, p),
  },
  {
    id: 2,
    nazov: 'MaxBinaryHeap.extractMax – sink down',
    testy: (m, { rovne }) => {
      for (const halda of [[55, 39, 41, 18, 27, 12, 33], [9, 8, 7, 6, 5, 4, 3, 2, 1], [10, 1, 9], [3, 3, 3], [7], []]) {
        const h = new m.MaxBinaryHeap();
        const v = new spravne.MaxBinaryHeap();
        h.values = [...halda];
        v.values = [...halda];
        const out = [];
        const ocak = [];
        for (let i = 0; i <= halda.length; i++) {
          out.push(h.extractMax());
          ocak.push(v.extractMax());
          rovne([out, h.values], [ocak, v.values], `opakované extractMax() z haldy [${halda}]`);
        }
      }
    },
  },
  {
    id: 3,
    nazov: 'PriorityQueue – menšie číslo = vyššia priorita',
    testy: (m, p) => overOps(m.PriorityQueue, spravne.PriorityQueue, [
      [['enqueue', 'prechladnutie', 5], ['enqueue', 'zlomenina', 2], ['enqueue', 'strelná rana', 1], ['enqueue', 'horúčka', 4], ['enqueue', 'popálenina', 3]],
      [['enqueue', 'a', 3], ['enqueue', 'b', 1], ['enqueue', 'c', 2], ['dequeue'], ['dequeue'], ['dequeue'], ['dequeue']],
      [['enqueue', 'x', 1], ['dequeue'], ['enqueue', 'y', 2]],
    ], stavPQ, p),
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'kthLargest – k-ty najväčší cez min-haldu veľkosti k',
    testy: (m, { rovne, nepouziva, zlozitost }) => {
      nepouziva(m.kthLargest, BEZ_SORT, 'nepoužívaj .sort()');
      rovne(m.kthLargest([3, 2, 1, 5, 6, 4], 2), 5, 'kthLargest([3, 2, 1, 5, 6, 4], 2)');
      rovne(m.kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4, 'kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)');
      rovne(m.kthLargest([7], 1), 7, 'kthLargest([7], 1)');
      const data = nahodne(5000, 3);
      rovne(m.kthLargest(data, 100), [...data].sort((a, b) => b - a)[99], 'kthLargest(5000 čísel, 100)');
      zlozitost(m.zlozitost4, 'O(n log k)');
    },
  },
  {
    id: 5,
    nazov: 'heapify – z poľa max-halda v O(n)',
    testy: (m, { rovne, pravda, zlozitost }) => {
      for (const vstup of [[3, 9, 2, 1, 4, 5], [1, 2, 3, 4, 5, 6, 7], [5], []]) {
        const a = [...vstup];
        const out = m.heapify(a);
        pravda(out === a, 'heapify má pracovať na mieste a vrátiť to isté pole');
        rovne(a, spravne.heapify([...vstup]), `heapify([${vstup}])`);
      }
      zlozitost(m.zlozitost5, 'O(n)');
    },
  },
  {
    id: 6,
    nazov: 'heapSort – triedenie haldou na mieste',
    testy: (m, { rovne, nepouziva, zlozitost }) => {
      nepouziva(m.heapSort, BEZ_SORT, 'nepoužívaj .sort()');
      for (const vstup of [[3, 9, 2, 1, 4, 5], [5, 4, 3, 2, 1], [2, 2, 1], [1], []]) {
        rovne(m.heapSort([...vstup]), [...vstup].sort((a, b) => a - b), `heapSort([${vstup}])`);
      }
      const data = nahodne(2000, 5);
      rovne(m.heapSort([...data]), [...data].sort((a, b) => a - b), 'heapSort(2000 čísel)');
      zlozitost(m.zlozitost6, 'O(n log n)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'MaxBinaryHeap.extractMax',
    testy: (m, p) => {
      overProtipriklad(m.protipriklad7, PovodnaMaxHeap, spravne.MaxBinaryHeap, stavHaldy, p);
      const vsetko = nahodne(200, 9);
      overOps(m.MaxBinaryHeap, spravne.MaxBinaryHeap, [
        [...I(10, 9, 8, 1), ['extractMax'], ['extractMax'], ['extractMax']],
        [...I(...vsetko), ...vsetko.map(() => ['extractMax'])],
      ], stavHaldy, p);
    },
  },
  {
    id: 8,
    nazov: 'StablePriorityQueue – pri rovnakej priorite FIFO',
    testy: (m, p) => {
      overProtipriklad(m.protipriklad8, PovodnaStablePQ, spravne.StablePriorityQueue, lenNavraty, p);
      const ops = [];
      'abcdefghij'.split('').forEach((ch, i) => ops.push(['enqueue', ch, i % 3]));
      for (let i = 0; i < 11; i++) ops.push(['dequeue']);
      overOps(m.StablePriorityQueue, spravne.StablePriorityQueue, [
        ops,
        [['enqueue', 'a', 2], ['enqueue', 'b', 1], ['enqueue', 'c', 2], ['dequeue'], ['enqueue', 'd', 1], ['dequeue'], ['dequeue'], ['dequeue']],
      ], lenNavraty, p);
    },
  },
  {
    id: 9,
    nazov: 'isMaxHeap – je pole platná max-halda?',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.isMaxHeap, spravne.isMaxHeap);
      rovne(m.isMaxHeap([90, 15, 10, 7, 12, 2]), true, 'isMaxHeap([90, 15, 10, 7, 12, 2])');
      rovne(m.isMaxHeap([9, 15, 10, 7, 12, 11]), false, 'isMaxHeap([9, 15, 10, 7, 12, 11])');
      rovne(m.isMaxHeap([10, 5, 9, 1]), true, 'isMaxHeap([10, 5, 9, 1])');
      rovne(m.isMaxHeap([10, 5, 9, 6, 6, 1, 2, 7]), false, 'isMaxHeap([10, 5, 9, 6, 6, 1, 2, 7])');
      rovne(m.isMaxHeap([]), true, 'isMaxHeap([])');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'MinHeap – min-halda od nuly',
    testy: (m, p) => {
      const ops = [];
      for (const v of nahodne(300, 13)) ops.push(['insert', v]);
      for (let i = 0; i < 150; i++) ops.push(['extractMin'], ['peek'], ['size']);
      overOps(m.MinHeap, spravne.MinHeap, [
        [['insert', 5], ['insert', 3], ['insert', 8], ['peek'], ['extractMin'], ['extractMin'], ['size'], ['extractMin'], ['extractMin'], ['peek']],
        ops,
      ], lenNavraty, p);
    },
  },
  {
    id: 11,
    nazov: 'kClosest – k bodov najbližšie k [0, 0]',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.kClosest, BEZ_SORT, 'nepoužívaj .sort() – použi haldu veľkosti k');
      rovne(m.kClosest([[1, 3], [-2, 2]], 1), [[-2, 2]], 'kClosest([[1, 3], [-2, 2]], 1)');
      rovne(m.kClosest([[3, 3], [5, -1], [-2, 4]], 2), [[3, 3], [-2, 4]], 'kClosest([[3, 3], [5, -1], [-2, 4]], 2)');
      rovne(m.kClosest([[1, 0], [0, 1], [2, 2]], 2), [[1, 0], [0, 1]], 'kClosest – pri rovnakej vzdialenosti poradie zo vstupu');
      const body = nahodne(4000, 7).map((x, i) => [x - 500, (i * 37) % 1000 - 500]);
      rovne(m.kClosest(body, 10), spravne.kClosest(body, 10), 'kClosest(4000 bodov, 10)');
    },
  },
  {
    id: 12,
    nazov: 'mergeKSorted – spojenie k zoradených polí',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.mergeKSorted, BEZ_SORT, 'nepoužívaj .sort() – použi min-haldu');
      rovne(m.mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]), [1, 1, 2, 3, 4, 4, 5, 6], 'mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]])');
      rovne(m.mergeKSorted([[], [1], []]), [1], 'mergeKSorted([[], [1], []])');
      rovne(m.mergeKSorted([]), [], 'mergeKSorted([])');
      const polia = Array.from({ length: 1000 }, (_, k) => Array.from({ length: 100 }, (_, i) => i * 1000 + k));
      const start = Date.now();
      const out = m.mergeKSorted(polia);
      pravda(Date.now() - start < 400, 'príliš pomalé pre 1000 polí × 100 prvkov – O(N log k)');
      pravda(out.length === 100000 && out.every((x, i) => x === i), 'výsledok 1000 × 100 nie je správne zoradený');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'minMeetingRooms – koľko zasadačiek treba?',
    testy: (m, { rovne }) => {
      rovne(m.minMeetingRooms([[0, 30], [5, 10], [15, 20]]), 2, 'minMeetingRooms([[0, 30], [5, 10], [15, 20]])');
      rovne(m.minMeetingRooms([[7, 10], [2, 4]]), 1, 'minMeetingRooms([[7, 10], [2, 4]])');
      rovne(m.minMeetingRooms([[9, 10], [10, 11], [11, 12]]), 1, 'minMeetingRooms – koniec o 10 a začiatok o 10 sa neprekrývajú');
      rovne(m.minMeetingRooms([[1, 5], [2, 6], [3, 7], [4, 8], [5, 9]]), 4, 'minMeetingRooms([[1, 5], [2, 6], [3, 7], [4, 8], [5, 9]])');
      rovne(m.minMeetingRooms([]), 0, 'minMeetingRooms([])');
    },
  },
  {
    id: 14,
    nazov: 'topKHashtags – trendy na sociálnej sieti',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.topKHashtags, BEZ_SORT, 'nepoužívaj .sort() – použi haldu');
      const tags = ['#js', '#ai', '#js', '#react', '#ai', '#js', '#node', '#react', '#ai', '#css'];
      rovne(m.topKHashtags(tags, 2), ['#ai', '#js'], 'topKHashtags(tags, 2) – #ai aj #js 3×, abecedne');
      rovne(m.topKHashtags(tags, 3), ['#ai', '#js', '#react'], 'topKHashtags(tags, 3)');
      rovne(m.topKHashtags(tags, 10), ['#ai', '#js', '#react', '#css', '#node'], 'topKHashtags(tags, 10)');
      rovne(m.topKHashtags([], 3), [], 'topKHashtags([], 3)');
      const velke = nahodne(50000, 21, 3000).map((x) => `#t${x}`);
      rovne(m.topKHashtags(velke, 20), spravne.topKHashtags(velke, 20), 'topKHashtags(50 000 tagov, 20)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
