'use strict';
const spravne = require('./riesenie');

const povodne = {
  mostFrequent(arr) {
    const counts = {};
    for (const x of arr) counts[x] = (counts[x] || 0) + 1;
    let best;
    let bestCount = 0;
    for (const [x, c] of Object.entries(counts)) {
      if (c > bestCount) {
        best = x;
        bestCount = c;
      }
    }
    return best;
  },
  unique(arr) {
    const seen = {};
    const result = [];
    for (const x of arr) {
      if (!seen[x]) {
        seen[x] = true;
        result.push(x);
      }
    }
    return result;
  },
  removeValue(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) arr.splice(i, 1);
    }
    return arr;
  },
};

const debug = [
  {
    id: 1,
    nazov: 'countWords – počítadlo slov',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.countWords('a b a'), { a: 2, b: 1 }, "countWords('a b a')");
      rovne(m.countWords('Ahoj ahoj  svet'), { ahoj: 2, svet: 1 }, "countWords('Ahoj ahoj  svet')");
      rovne(m.countWords(''), {}, "countWords('')");
      rovne(m.countWords('  x  '), { x: 1 }, "countWords('  x  ')");
      zlozitost(m.zlozitost1, 'O(n)');
    },
  },
  {
    id: 2,
    nazov: 'lastN – posledných n prvkov',
    testy: (m, { rovne }) => {
      rovne(m.lastN([1, 2, 3, 4], 2), [3, 4], 'lastN([1, 2, 3, 4], 2)');
      rovne(m.lastN([1, 2, 3], 5), [1, 2, 3], 'lastN([1, 2, 3], 5)');
      rovne(m.lastN([1, 2, 3], 0), [], 'lastN([1, 2, 3], 0)');
      rovne(m.lastN([], 3), [], 'lastN([], 3)');
    },
  },
  {
    id: 3,
    nazov: 'mergeSettings – nemeň vstup',
    testy: (m, { rovne }) => {
      const defaults = { theme: 'light', lang: 'sk' };
      const user = { theme: 'dark' };
      rovne(m.mergeSettings(defaults, user), { theme: 'dark', lang: 'sk' }, 'mergeSettings(defaults, user)');
      rovne(defaults, { theme: 'light', lang: 'sk' }, 'defaults po volaní (nesmú sa zmeniť)');
      rovne(user, { theme: 'dark' }, 'user po volaní (nesmie sa zmeniť)');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'invert – vymeň kľúče a hodnoty',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.invert({ a: 'x', b: 'y' }), { x: 'a', y: 'b' }, "invert({ a: 'x', b: 'y' })");
      rovne(m.invert({}), {}, 'invert({})');
      zlozitost(m.zlozitost4, 'O(n)');
    },
  },
  {
    id: 5,
    nazov: 'groupBy – zoskup podľa kľúča',
    testy: (m, { rovne }) => {
      const r = m.groupBy([1, 2, 3, 4, 5], (x) => (x % 2 === 0 ? 'parne' : 'neparne'));
      rovne(r, { neparne: [1, 3, 5], parne: [2, 4] }, 'groupBy([1..5], párnosť)');
      rovne(m.groupBy([], (x) => x), {}, 'groupBy([], ...)');
    },
  },
  {
    id: 6,
    nazov: 'removeAt – nová kópia bez prvku',
    testy: (m, { rovne, zlozitost }) => {
      const arr = [10, 20, 30];
      rovne(m.removeAt(arr, 1), [10, 30], 'removeAt([10, 20, 30], 1)');
      rovne(m.removeAt(arr, 0), [20, 30], 'removeAt([10, 20, 30], 0)');
      rovne(m.removeAt(arr, 2), [10, 20], 'removeAt([10, 20, 30], 2)');
      rovne(arr, [10, 20, 30], 'pôvodné pole (nesmie sa zmeniť)');
      zlozitost(m.zlozitost6, 'O(n)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'mostFrequent – najčastejší prvok',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.mostFrequent, spravne.mostFrequent);
      rovne(m.mostFrequent(['a', 'b', 'a']), 'a', "mostFrequent(['a', 'b', 'a'])");
      rovne(m.mostFrequent([3, 3, 1]), 3, 'mostFrequent([3, 3, 1])');
      rovne(m.mostFrequent([5, 2, 2, 5]), 5, 'mostFrequent([5, 2, 2, 5])');
      rovne(m.mostFrequent([]), undefined, 'mostFrequent([])');
    },
  },
  {
    id: 8,
    nazov: 'unique – odstráň duplikáty',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.unique, spravne.unique);
      rovne(m.unique([1, 2, 1, 3]), [1, 2, 3], 'unique([1, 2, 1, 3])');
      rovne(m.unique([1, '1', true, 'true']), [1, '1', true, 'true'], "unique([1, '1', true, 'true'])");
      rovne(m.unique([]), [], 'unique([])');
    },
  },
  {
    id: 9,
    nazov: 'removeValue – zmaž všetky výskyty',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.removeValue, spravne.removeValue);
      const arr = [1, 2, 2, 2, 3, 2];
      const r = m.removeValue(arr, 2);
      rovne(r, [1, 3], 'removeValue([1, 2, 2, 2, 3, 2], 2)');
      rovne(arr, [1, 3], 'pôvodné pole sa má zmeniť na mieste');
      rovne(m.removeValue([], 1), [], 'removeValue([], 1)');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'zlozitosti – Big O operácií',
    testy: (m, { pravda, zlozitost }) => {
      pravda(m.zlozitosti && typeof m.zlozitosti === 'object', 'chýba objekt zlozitosti');
      for (const [kluc, spravna] of Object.entries(spravne.zlozitosti)) {
        zlozitost(m.zlozitosti[kluc], spravna, `zlozitosti.${kluc}`);
      }
    },
  },
  {
    id: 11,
    nazov: 'rotateLeft – otoč pole',
    testy: (m, { rovne }) => {
      const arr = [1, 2, 3, 4, 5];
      rovne(m.rotateLeft(arr, 2), [3, 4, 5, 1, 2], 'rotateLeft([1..5], 2)');
      rovne(m.rotateLeft(arr, 0), [1, 2, 3, 4, 5], 'rotateLeft([1..5], 0)');
      rovne(m.rotateLeft(arr, 7), [3, 4, 5, 1, 2], 'rotateLeft([1..5], 7)');
      rovne(m.rotateLeft(arr, 5), [1, 2, 3, 4, 5], 'rotateLeft([1..5], 5)');
      rovne(m.rotateLeft([], 3), [], 'rotateLeft([], 3)');
      rovne(arr, [1, 2, 3, 4, 5], 'pôvodné pole (nesmie sa zmeniť)');
    },
  },
  {
    id: 12,
    nazov: 'diffObjects – rozdiel dvoch objektov',
    testy: (m, { rovne }) => {
      rovne(
        m.diffObjects({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5, e: 6 }),
        { added: ['d', 'e'], removed: ['a'], changed: ['c'] },
        'diffObjects({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5, e: 6 })',
      );
      rovne(m.diffObjects({}, {}), { added: [], removed: [], changed: [] }, 'diffObjects({}, {})');
      rovne(
        m.diffObjects({ z: 0, x: undefined }, { x: null, y: 0 }),
        { added: ['y'], removed: ['z'], changed: ['x'] },
        'diffObjects({ z: 0, x: undefined }, { x: null, y: 0 })',
      );
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'applyOrders – sklad e-shopu',
    testy: (m, { rovne }) => {
      const stock = { mys: 5, klavesnica: 1 };
      const orders = [
        { sku: 'mys', qty: 2 },
        { sku: 'klavesnica', qty: 2 },
        { sku: 'monitor', qty: 1 },
        { sku: 'klavesnica', qty: 1 },
        { sku: 'mys', qty: 3 },
        { sku: 'mys', qty: 1 },
      ];
      rovne(
        m.applyOrders(stock, orders),
        { stock: { mys: 0, klavesnica: 0 }, rejected: [1, 2, 5] },
        'applyOrders(stock, orders)',
      );
      rovne(stock, { mys: 5, klavesnica: 1 }, 'pôvodný sklad (nesmie sa zmeniť)');
      rovne(m.applyOrders({ a: 1 }, []), { stock: { a: 1 }, rejected: [] }, 'applyOrders({ a: 1 }, [])');
      rovne(m.applyOrders({}, [{ sku: 'toString', qty: 1 }]), { stock: {}, rejected: [0] }, "objednávka sku 'toString' (pozor na zdedené kľúče!)");
    },
  },
  {
    id: 14,
    nazov: 'topSpenders – najlepší zákazníci',
    testy: (m, { rovne }) => {
      const tx = [
        { customer: 'eva', amount: 500 },
        { customer: 'adam', amount: 300 },
        { customer: 'eva', amount: 100 },
        { customer: 'boris', amount: 600 },
        { customer: 'adam', amount: 300 },
        { customer: 'cyril', amount: 50 },
      ];
      rovne(
        m.topSpenders(tx, 3),
        [{ customer: 'adam', total: 600 }, { customer: 'boris', total: 600 }, { customer: 'eva', total: 600 }],
        'topSpenders(tx, 3)',
      );
      rovne(m.topSpenders(tx, 1), [{ customer: 'adam', total: 600 }], 'topSpenders(tx, 1)');
      rovne(m.topSpenders(tx, 10).length, 4, 'topSpenders(tx, 10).length');
      rovne(m.topSpenders([], 3), [], 'topSpenders([], 3)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
