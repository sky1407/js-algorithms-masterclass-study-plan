'use strict';
const spravne = require('./riesenie');

const povodne = {
  mergeSortBy(arr, key) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = povodne.mergeSortBy(arr.slice(0, mid), key);
    const right = povodne.mergeSortBy(arr.slice(mid), key);
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i][key] < right[j][key]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return result.concat(left.slice(i), right.slice(j));
  },
  quickSortSafe(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      const pv = arr[left];
      let p = left;
      for (let i = left + 1; i <= right; i++) {
        if (pv > arr[i]) {
          p++;
          [arr[p], arr[i]] = [arr[i], arr[p]];
        }
      }
      [arr[left], arr[p]] = [arr[p], arr[left]];
      povodne.quickSortSafe(arr, left, p - 1);
      povodne.quickSortSafe(arr, p + 1, right);
    }
    return arr;
  },
  radixSortSigned(nums) {
    return spravne.radixSort(nums);
  },
};

const BEZ_SORT = /\.sort\(/;

function nahodne(n, seed, rozsah = 2001, posun = 1000) {
  let x = seed;
  return Array.from({ length: n }, () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return (x % rozsah) - posun;
  });
}

const vzorky = [
  [[37, 45, 29, 8], '[37, 45, 29, 8]'],
  [[4, 8, 2, 1, 5, 7, 6, 3], '[4, 8, 2, 1, 5, 7, 6, 3]'],
  [[5, 4, 3, 2, 1], '[5, 4, 3, 2, 1]'],
  [[3, -1, 3, 0, -1], '[3, -1, 3, 0, -1]'],
  [[2, 1], '[2, 1]'],
  [[1], '[1]'],
  [[], '[]'],
];

function overTriedenie(fn, nazov, { rovne, nepouziva }, bezZapornych = false) {
  nepouziva(fn, BEZ_SORT, 'nepoužívaj vstavané .sort()');
  for (const [vstup, popis] of vzorky) {
    if (bezZapornych && vstup.some((x) => x < 0)) continue;
    rovne(fn([...vstup]), [...vstup].sort((a, b) => a - b), `${nazov}(${popis})`);
  }
  const data = bezZapornych ? nahodne(500, 3, 100000, 0) : nahodne(500, 3);
  rovne(fn([...data]), [...data].sort((a, b) => a - b), `${nazov}(500 náhodných čísel)`);
}

function rychlo(fn, limitMs, sprava, pravda) {
  const start = Date.now();
  fn();
  const trvanie = Date.now() - start;
  pravda(trvanie < limitMs, `${sprava} (trvalo ${trvanie} ms, limit ${limitMs} ms)`);
}

const debug = [
  {
    id: 1,
    nazov: 'merge – spojenie dvoch zoradených polí',
    testy: (m, { rovne }) => {
      rovne(m.merge([1, 10, 50], [2, 14, 99, 100]), [1, 2, 10, 14, 50, 99, 100], 'merge([1, 10, 50], [2, 14, 99, 100])');
      rovne(m.merge([5, 6, 7], [1, 2]), [1, 2, 5, 6, 7], 'merge([5, 6, 7], [1, 2])');
      rovne(m.merge([1, 2], [5, 6, 7]), [1, 2, 5, 6, 7], 'merge([1, 2], [5, 6, 7])');
      rovne(m.merge([], [3]), [3], 'merge([], [3])');
      rovne(m.merge([2, 2], [2]), [2, 2, 2], 'merge([2, 2], [2])');
    },
  },
  {
    id: 2,
    nazov: 'mergeSort',
    testy: (m, p) => {
      overTriedenie(m.mergeSort, 'mergeSort', p);
      p.zlozitost(m.zlozitost2, 'O(n log n)');
    },
  },
  {
    id: 3,
    nazov: 'quickSort (pivot helper)',
    testy: (m, p) => {
      overTriedenie((arr) => m.quickSort(arr), 'quickSort', p);
      const arr = [3, 1, 2];
      p.pravda(m.quickSort(arr) === arr, 'quickSort má triediť na mieste a vrátiť to isté pole');
      p.zlozitost(m.zlozitost3, 'O(n^2)', 'Zložitosť v NAJHORŠOM prípade');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'radix helpery – getDigit, digitCount, mostDigits',
    testy: (m, { rovne }) => {
      rovne(m.getDigit(12345, 0), 5, 'getDigit(12345, 0)');
      rovne(m.getDigit(12345, 2), 3, 'getDigit(12345, 2)');
      rovne(m.getDigit(12345, 4), 1, 'getDigit(12345, 4)');
      rovne(m.getDigit(12345, 5), 0, 'getDigit(12345, 5)');
      rovne(m.getDigit(7, 0), 7, 'getDigit(7, 0)');
      rovne(m.digitCount(1), 1, 'digitCount(1)');
      rovne(m.digitCount(9), 1, 'digitCount(9)');
      rovne(m.digitCount(25), 2, 'digitCount(25)');
      rovne(m.digitCount(314), 3, 'digitCount(314)');
      rovne(m.digitCount(1000), 4, 'digitCount(1000)');
      rovne(m.digitCount(0), 1, 'digitCount(0)');
      rovne(m.mostDigits([1, 9, 10, 100, 99]), 3, 'mostDigits([1, 9, 10, 100, 99])');
      rovne(m.mostDigits([100, 1010, 1, 500]), 4, 'mostDigits([100, 1010, 1, 500])');
      rovne(m.mostDigits([0, 100000, 400, 12, 8]), 6, 'mostDigits([0, 100000, 400, 12, 8])');
      rovne(m.mostDigits([]), 0, 'mostDigits([])');
    },
  },
  {
    id: 5,
    nazov: 'radixSort',
    testy: (m, p) => {
      overTriedenie(m.radixSort, 'radixSort', p, true);
      p.rovne(m.radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]), [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637], 'radixSort(kurz)');
    },
  },
  {
    id: 6,
    nazov: 'quickSortLomuto – partition s pivotom na konci',
    testy: (m, p) => {
      overTriedenie((arr) => m.quickSortLomuto(arr), 'quickSortLomuto', p);
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'mergeSortBy – stabilný merge sort',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.mergeSortBy, spravne.mergeSortBy);
      const objednavky = [
        { id: 1, stav: 'odoslaná' },
        { id: 2, stav: 'nová' },
        { id: 3, stav: 'odoslaná' },
        { id: 4, stav: 'nová' },
        { id: 5, stav: 'nová' },
      ];
      rovne(m.mergeSortBy(objednavky, 'stav').map((o) => o.id), [2, 4, 5, 1, 3], "mergeSortBy(objednavky, 'stav')");
      rovne(m.mergeSortBy([], 'x'), [], "mergeSortBy([], 'x')");
    },
  },
  {
    id: 8,
    nazov: 'quickSortSafe – quick sort, ktorý nespadne na zoradených dátach',
    testy: (m, { rovne, pravda, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.quickSortSafe, spravne.quickSortSafe);
      rovne(m.quickSortSafe([5, 2, 9, 1, 7]), [1, 2, 5, 7, 9], 'quickSortSafe([5, 2, 9, 1, 7])');
      const zoradene = Array.from({ length: 50000 }, (_, i) => i);
      rovne(m.quickSortSafe([...zoradene]), zoradene, 'quickSortSafe(50 000 zoradených)');
      rovne(m.quickSortSafe([...zoradene].reverse()), zoradene, 'quickSortSafe(50 000 opačne zoradených)');
      const data = nahodne(50000, 11);
      const start = Date.now();
      rovne(m.quickSortSafe([...data]), [...data].sort((a, b) => a - b), 'quickSortSafe(50 000 náhodných)');
      pravda(Date.now() - start < 300, 'príliš pomalé');
    },
  },
  {
    id: 9,
    nazov: 'radixSortSigned – radix sort aj pre záporné čísla',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.radixSortSigned, spravne.radixSortSigned);
      rovne(m.radixSortSigned([3, -20, 15, -1, 0, -300, 7]), [-300, -20, -1, 0, 3, 7, 15], 'radixSortSigned([3, -20, 15, -1, 0, -300, 7])');
      rovne(m.radixSortSigned([10, 2, 33]), [2, 10, 33], 'radixSortSigned([10, 2, 33])');
      rovne(m.radixSortSigned([-1, -10, -5]), [-10, -5, -1], 'radixSortSigned([-1, -10, -5])');
      rovne(m.radixSortSigned([]), [], 'radixSortSigned([])');
      const data = nahodne(1000, 5);
      rovne(m.radixSortSigned(data), [...data].sort((a, b) => a - b), 'radixSortSigned(1000 náhodných)');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'mergeSortFull – merge sort od nuly, nemení vstup',
    testy: (m, p) => {
      overTriedenie(m.mergeSortFull, 'mergeSortFull', p);
      const vstup = [3, 1, 2];
      m.mergeSortFull(vstup);
      p.rovne(vstup, [3, 1, 2], 'vstupné pole (nesmie sa zmeniť)');
      const data = nahodne(100000, 9);
      rychlo(() => m.mergeSortFull(data), 400, '100 000 prvkov musí byť rýchlo – O(n log n)', p.pravda);
    },
  },
  {
    id: 11,
    nazov: 'quickSelect – k-ty najmenší prvok',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.quickSelect, BEZ_SORT, 'nepoužívaj .sort() – to by bolo O(n log n)');
      rovne(m.quickSelect([7, 10, 4, 3, 20, 15], 3), 7, 'quickSelect([7, 10, 4, 3, 20, 15], 3)');
      rovne(m.quickSelect([7, 10, 4, 3, 20, 15], 1), 3, 'quickSelect([7, 10, 4, 3, 20, 15], 1)');
      rovne(m.quickSelect([7, 10, 4, 3, 20, 15], 6), 20, 'quickSelect([7, 10, 4, 3, 20, 15], 6)');
      rovne(m.quickSelect([5, 5, 1], 2), 5, 'quickSelect([5, 5, 1], 2)');
      rovne(m.quickSelect([1, 2], 3), undefined, 'quickSelect([1, 2], 3)');
      const data = nahodne(200001, 21);
      const kopia = [...data];
      const median = [...data].sort((a, b) => a - b)[100000];
      const start = Date.now();
      rovne(m.quickSelect(data, 100001), median, 'quickSelect(200 001 prvkov, medián)');
      pravda(Date.now() - start < 200, 'príliš pomalé – priemerne má byť O(n)');
      rovne(data, kopia, 'vstupné pole (nesmie sa zmeniť)');
    },
  },
  {
    id: 12,
    nazov: 'countInversions – počet inverzií v O(n log n)',
    testy: (m, { rovne, pravda }) => {
      rovne(m.countInversions([1, 2, 3]), 0, 'countInversions([1, 2, 3])');
      rovne(m.countInversions([3, 2, 1]), 3, 'countInversions([3, 2, 1])');
      rovne(m.countInversions([2, 4, 1, 3, 5]), 3, 'countInversions([2, 4, 1, 3, 5])');
      rovne(m.countInversions([2, 1, 3, 1]), 3, 'countInversions([2, 1, 3, 1])');
      rovne(m.countInversions([]), 0, 'countInversions([])');
      const obratene = Array.from({ length: 100000 }, (_, i) => 100000 - i);
      const start = Date.now();
      rovne(m.countInversions(obratene), 4999950000, 'countInversions(100 000 opačne zoradených)');
      pravda(Date.now() - start < 400, 'príliš pomalé – použi merge sort (počítaj pri spájaní)');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'mergeLogs – spojenie logov z viacerých serverov',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.mergeLogs, BEZ_SORT, 'nepoužívaj .sort() – logy každého servera sú už zoradené');
      const servers = [
        [{ time: 1, msg: 'A1' }, { time: 5, msg: 'A5' }, { time: 9, msg: 'A9' }],
        [{ time: 2, msg: 'B2' }, { time: 5, msg: 'B5' }],
        [],
        [{ time: 0, msg: 'D0' }, { time: 5, msg: 'D5' }, { time: 10, msg: 'D10' }],
      ];
      rovne(
        m.mergeLogs(servers).map((l) => l.msg),
        ['D0', 'A1', 'B2', 'A5', 'B5', 'D5', 'A9', 'D10'],
        'mergeLogs(servers)',
      );
      rovne(m.mergeLogs([]), [], 'mergeLogs([])');
      rovne(m.mergeLogs([[{ time: 1, msg: 'x' }]]).length, 1, 'mergeLogs([[jeden]])');
      const vela = Array.from({ length: 200 }, (_, s) => Array.from({ length: 500 }, (_, i) => ({ time: i * 200 + s, msg: `${s}` })));
      const start = Date.now();
      const out = m.mergeLogs(vela);
      pravda(Date.now() - start < 400, 'príliš pomalé pre 200 serverov × 500 logov');
      pravda(out.length === 100000 && out.every((l, i) => i === 0 || out[i - 1].time <= l.time), 'výsledok nie je správne zoradený');
    },
  },
  {
    id: 14,
    nazov: 'sortOrderIds – zoradenie čísel objednávok',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.sortOrderIds, BEZ_SORT, 'nepoužívaj .sort() – vyskúšaj radix sort');
      rovne(m.sortOrderIds([2026000123, 2025999999, 2026000001]), [2025999999, 2026000001, 2026000123], 'sortOrderIds([...])');
      rovne(m.sortOrderIds([]), [], 'sortOrderIds([])');
      const ids = nahodne(200000, 17, 2000000000, 0);
      const start = Date.now();
      const out = m.sortOrderIds([...ids]);
      pravda(Date.now() - start < 600, 'príliš pomalé pre 200 000 objednávok');
      rovne(out, [...ids].sort((a, b) => a - b), 'sortOrderIds(200 000 náhodných)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
