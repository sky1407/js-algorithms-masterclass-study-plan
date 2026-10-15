'use strict';
const spravne = require('./riesenie');

const povodne = {
  lastIndexOf(arr, val) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === val) return mid;
      if (arr[mid] < val) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  },
  containsValue(arr, val) {
    const sorted = [...arr].sort();
    let left = 0;
    let right = sorted.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sorted[mid] === val) return true;
      if (sorted[mid] < val) left = mid + 1;
      else right = mid - 1;
    }
    return false;
  },
  findClosest(arr, target) {
    if (arr.length === 0) return null;
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) left = mid + 1;
      else right = mid;
    }
    return arr[left];
  },
};

function pocitanePole(hodnoty) {
  let pocet = 0;
  const pole = new Proxy(hodnoty, {
    get(ciel, kluc, prijemca) {
      if (typeof kluc === 'string' && /^\d+$/.test(kluc)) pocet++;
      return Reflect.get(ciel, kluc, prijemca);
    },
  });
  return { pole, pocet: () => pocet };
}

const debug = [
  {
    id: 1,
    nazov: 'linearSearch',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.linearSearch([10, 15, 20, 25, 30], 15), 1, 'linearSearch([10, 15, 20, 25, 30], 15)');
      rovne(m.linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4), 5, 'linearSearch([9..0], 4)');
      rovne(m.linearSearch([100], 100), 0, 'linearSearch([100], 100)');
      rovne(m.linearSearch([1, 2, 3, 4, 5], 6), -1, 'linearSearch([1, 2, 3, 4, 5], 6)');
      rovne(m.linearSearch([], 1), -1, 'linearSearch([], 1)');
      zlozitost(m.zlozitost1, 'O(n)');
    },
  },
  {
    id: 2,
    nazov: 'binarySearch',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.binarySearch([1, 2, 3, 4, 5], 2), 1, 'binarySearch([1, 2, 3, 4, 5], 2)');
      rovne(m.binarySearch([1, 2, 3, 4, 5], 3), 2, 'binarySearch([1, 2, 3, 4, 5], 3)');
      rovne(m.binarySearch([1, 2, 3, 4, 5], 5), 4, 'binarySearch([1, 2, 3, 4, 5], 5)');
      rovne(m.binarySearch([1, 2, 3, 4, 5], 1), 0, 'binarySearch([1, 2, 3, 4, 5], 1)');
      rovne(m.binarySearch([1, 2, 3, 4, 5], 6), -1, 'binarySearch([1, 2, 3, 4, 5], 6)');
      rovne(m.binarySearch([7], 7), 0, 'binarySearch([7], 7)');
      rovne(m.binarySearch([], 7), -1, 'binarySearch([], 7)');
      zlozitost(m.zlozitost2, 'O(log n)');
    },
  },
  {
    id: 3,
    nazov: 'naiveCount – počet výskytov podreťazca',
    testy: (m, { rovne }) => {
      rovne(m.naiveCount('lorie loled', 'lol'), 1, "naiveCount('lorie loled', 'lol')");
      rovne(m.naiveCount('lorie loled', 'lo'), 2, "naiveCount('lorie loled', 'lo')");
      rovne(m.naiveCount('wowomgzomg', 'omg'), 2, "naiveCount('wowomgzomg', 'omg')");
      rovne(m.naiveCount('aaaa', 'aa'), 3, "naiveCount('aaaa', 'aa') – prekrývajúce sa výskyty");
      rovne(m.naiveCount('abc', 'abcd'), 0, "naiveCount('abc', 'abcd')");
      rovne(m.naiveCount('abc', ''), 0, "naiveCount('abc', '')");
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'binarySearchRec – rekurzívne binárne vyhľadávanie',
    testy: (m, { rovne }) => {
      const arr = [5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99];
      rovne(m.binarySearchRec(arr, 10), 2, 'binarySearchRec(arr, 10)');
      rovne(m.binarySearchRec(arr, 95), 16, 'binarySearchRec(arr, 95)');
      rovne(m.binarySearchRec(arr, 5), 0, 'binarySearchRec(arr, 5)');
      rovne(m.binarySearchRec(arr, 99), 19, 'binarySearchRec(arr, 99)');
      rovne(m.binarySearchRec(arr, 100), -1, 'binarySearchRec(arr, 100)');
      rovne(m.binarySearchRec([], 1), -1, 'binarySearchRec([], 1)');
    },
  },
  {
    id: 5,
    nazov: 'naiveIndexOf – index prvého výskytu',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.naiveIndexOf, /\.indexOf\(|\.includes\(|\.search\(/, 'nepoužívaj vstavané indexOf / includes / search');
      rovne(m.naiveIndexOf('hello world', 'world'), 6, "naiveIndexOf('hello world', 'world')");
      rovne(m.naiveIndexOf('hello world', 'o'), 4, "naiveIndexOf('hello world', 'o')");
      rovne(m.naiveIndexOf('aaab', 'aab'), 1, "naiveIndexOf('aaab', 'aab')");
      rovne(m.naiveIndexOf('hello', 'xyz'), -1, "naiveIndexOf('hello', 'xyz')");
      rovne(m.naiveIndexOf('hi', 'hello'), -1, "naiveIndexOf('hi', 'hello')");
      rovne(m.naiveIndexOf('abc', ''), 0, "naiveIndexOf('abc', '')");
    },
  },
  {
    id: 6,
    nazov: 'searchMatrix – binárne vyhľadávanie v 2D matici',
    testy: (m, { rovne, zlozitost }) => {
      const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
      for (const v of [1, 7, 10, 16, 60, 34]) rovne(m.searchMatrix(matrix, v), true, `searchMatrix(matrix, ${v})`);
      for (const v of [0, 13, 61, 8]) rovne(m.searchMatrix(matrix, v), false, `searchMatrix(matrix, ${v})`);
      rovne(m.searchMatrix([[5]], 5), true, 'searchMatrix([[5]], 5)');
      rovne(m.searchMatrix([], 5), false, 'searchMatrix([], 5)');
      zlozitost(m.zlozitost6, 'O(log n)');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'lastIndexOf – posledný výskyt v zoradenom poli',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.lastIndexOf, spravne.lastIndexOf);
      rovne(m.lastIndexOf([1, 2, 3, 4], 3), 2, 'lastIndexOf([1, 2, 3, 4], 3)');
      rovne(m.lastIndexOf([1, 1, 1, 1, 1], 1), 4, 'lastIndexOf([1, 1, 1, 1, 1], 1)');
      rovne(m.lastIndexOf([1, 2, 2, 2, 3], 2), 3, 'lastIndexOf([1, 2, 2, 2, 3], 2)');
      rovne(m.lastIndexOf([1, 2, 3], 5), -1, 'lastIndexOf([1, 2, 3], 5)');
    },
  },
  {
    id: 8,
    nazov: 'containsValue – zoradenie + binárne vyhľadávanie',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.containsValue, spravne.containsValue);
      rovne(m.containsValue([5, 3, 8, 1], 8), true, 'containsValue([5, 3, 8, 1], 8)');
      rovne(m.containsValue([100, 25, 3, 9, 1000], 9), true, 'containsValue([100, 25, 3, 9, 1000], 9)');
      rovne(m.containsValue([100, 25, 3, 9, 1000], 25), true, 'containsValue([100, 25, 3, 9, 1000], 25)');
      rovne(m.containsValue([100, 25, 3], 4), false, 'containsValue([100, 25, 3], 4)');
      const arr = [3, 1, 2];
      m.containsValue(arr, 1);
      rovne(arr, [3, 1, 2], 'vstupné pole (nesmie sa zmeniť)');
    },
  },
  {
    id: 9,
    nazov: 'findClosest – najbližšia hodnota v zoradenom poli',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.findClosest, spravne.findClosest);
      rovne(m.findClosest([1, 5, 10], 9), 10, 'findClosest([1, 5, 10], 9)');
      rovne(m.findClosest([1, 5, 10], 6), 5, 'findClosest([1, 5, 10], 6)');
      rovne(m.findClosest([1, 5, 10], 100), 10, 'findClosest([1, 5, 10], 100)');
      rovne(m.findClosest([1, 5, 10], -3), 1, 'findClosest([1, 5, 10], -3)');
      rovne(m.findClosest([2, 4], 3), 2, 'findClosest([2, 4], 3) – pri zhode menšia hodnota');
      rovne(m.findClosest([], 3), null, 'findClosest([], 3)');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'searchRange – prvý a posledný výskyt v O(log n)',
    testy: (m, { rovne, pravda }) => {
      rovne(m.searchRange([5, 7, 7, 8, 8, 10], 8), [3, 4], 'searchRange([5, 7, 7, 8, 8, 10], 8)');
      rovne(m.searchRange([5, 7, 7, 8, 8, 10], 6), [-1, -1], 'searchRange([5, 7, 7, 8, 8, 10], 6)');
      rovne(m.searchRange([2, 2, 2], 2), [0, 2], 'searchRange([2, 2, 2], 2)');
      rovne(m.searchRange([], 0), [-1, -1], 'searchRange([], 0)');
      const hodnoty = Array.from({ length: 50000 }, (_, i) => Math.floor(i / 1000));
      const { pole, pocet } = pocitanePole(hodnoty);
      rovne(m.searchRange(pole, 25), [25000, 25999], 'searchRange(50 000 prvkov, 25)');
      pravda(pocet() <= 100, `searchRange pozrel do poľa ${pocet()}× – to nie je O(log n)`);
    },
  },
  {
    id: 11,
    nazov: 'findPeak – vrchol „hory“ v O(log n)',
    testy: (m, { rovne, pravda }) => {
      rovne(m.findPeak([0, 1, 0]), 1, 'findPeak([0, 1, 0])');
      rovne(m.findPeak([0, 2, 5, 3, 1]), 2, 'findPeak([0, 2, 5, 3, 1])');
      rovne(m.findPeak([1, 3, 5, 7, 9, 2]), 4, 'findPeak([1, 3, 5, 7, 9, 2])');
      rovne(m.findPeak([9, 4, 1]), 0, 'findPeak([9, 4, 1])');
      rovne(m.findPeak([1, 4, 9]), 2, 'findPeak([1, 4, 9])');
      const hodnoty = Array.from({ length: 100000 }, (_, i) => (i <= 70000 ? i : 140000 - i));
      const { pole, pocet } = pocitanePole(hodnoty);
      rovne(m.findPeak(pole), 70000, 'findPeak(100 000 prvkov)');
      pravda(pocet() <= 100, `findPeak pozrel do poľa ${pocet()}× – to nie je O(log n)`);
    },
  },
  {
    id: 12,
    nazov: 'minEatingSpeed – binárne vyhľadávanie ODPOVEDE',
    testy: (m, { rovne, pravda }) => {
      rovne(m.minEatingSpeed([3, 6, 7, 11], 8), 4, 'minEatingSpeed([3, 6, 7, 11], 8)');
      rovne(m.minEatingSpeed([30, 11, 23, 4, 20], 5), 30, 'minEatingSpeed([30, 11, 23, 4, 20], 5)');
      rovne(m.minEatingSpeed([30, 11, 23, 4, 20], 6), 23, 'minEatingSpeed([30, 11, 23, 4, 20], 6)');
      rovne(m.minEatingSpeed([1, 1, 1], 10), 1, 'minEatingSpeed([1, 1, 1], 10)');
      const start = Date.now();
      rovne(m.minEatingSpeed([100000000, 1], 3), 50000000, 'minEatingSpeed([100000000, 1], 3)');
      pravda(Date.now() - start < 50, 'príliš pomalé – neskúšaj rýchlosti 1, 2, 3, ... postupne, hľadaj ich binárne');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'highlight – zvýraznenie výsledkov vyhľadávania',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.highlight, /RegExp|\.replace|\.indexOf\(|\.split\(/, 'nepoužívaj RegExp, replace, indexOf ani split – napíš vlastné vyhľadávanie');
      rovne(m.highlight('Java a JavaScript', 'java'), '<mark>Java</mark> a <mark>Java</mark>Script', "highlight('Java a JavaScript', 'java')");
      rovne(m.highlight('aaaa', 'aa'), '<mark>aa</mark><mark>aa</mark>', "highlight('aaaa', 'aa')");
      rovne(m.highlight('aaa', 'aa'), '<mark>aa</mark>a', "highlight('aaa', 'aa')");
      rovne(m.highlight('Bratislava', 'x'), 'Bratislava', "highlight('Bratislava', 'x')");
      rovne(m.highlight('Hello', ''), 'Hello', "highlight('Hello', '')");
    },
  },
  {
    id: 14,
    nazov: 'valueAt – aká cena platila v danom čase?',
    testy: (m, { rovne, pravda }) => {
      const history = [
        { time: 100, value: 19.9 },
        { time: 250, value: 17.5 },
        { time: 400, value: 21 },
        { time: 900, value: 15 },
      ];
      rovne(m.valueAt(history, 99), null, 'valueAt(history, 99)');
      rovne(m.valueAt(history, 100), 19.9, 'valueAt(history, 100)');
      rovne(m.valueAt(history, 300), 17.5, 'valueAt(history, 300)');
      rovne(m.valueAt(history, 400), 21, 'valueAt(history, 400)');
      rovne(m.valueAt(history, 5000), 15, 'valueAt(history, 5000)');
      rovne(m.valueAt([], 5), null, 'valueAt([], 5)');
      const dlha = Array.from({ length: 50000 }, (_, i) => ({ time: i * 10, value: i }));
      const { pole, pocet } = pocitanePole(dlha);
      rovne(m.valueAt(pole, 123457), 12345, 'valueAt(50 000 záznamov, 123457)');
      pravda(pocet() <= 60, `valueAt pozrel do histórie ${pocet()}× – použi binárne vyhľadávanie`);
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
