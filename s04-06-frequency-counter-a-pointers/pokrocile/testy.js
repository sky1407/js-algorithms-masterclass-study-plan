'use strict';
const spravne = require('./riesenie');

const povodne = {
  sameFrequency(a, b) {
    const s1 = String(a);
    const s2 = String(b);
    if (s1.length !== s2.length) return false;
    for (const d of s1) if (!s2.includes(d)) return false;
    return true;
  },
  averagePair(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const avg = (arr[left] + arr[right]) / 2;
      if (avg === target) return true;
      if (avg < target) left++;
      else right--;
    }
    return false;
  },
  findPair(arr, n) {
    const seen = new Set(arr);
    for (const x of arr) if (seen.has(x + n)) return true;
    return false;
  },
};

const debug = [
  {
    id: 1,
    nazov: 'same – druhé mocniny s rovnakou frekvenciou',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.same([1, 2, 3], [4, 1, 9]), true, 'same([1, 2, 3], [4, 1, 9])');
      rovne(m.same([1, 2, 3], [1, 9]), false, 'same([1, 2, 3], [1, 9])');
      rovne(m.same([1, 2, 2], [1, 4, 1]), false, 'same([1, 2, 2], [1, 4, 1])');
      rovne(m.same([-2, 2], [4, 4]), false, 'same([-2, 2], [4, 4])');
      rovne(m.same([], []), true, 'same([], [])');
      zlozitost(m.zlozitost1, 'O(n)');
    },
  },
  {
    id: 2,
    nazov: 'countUniqueValues – počet unikátnych hodnôt',
    testy: (m, { rovne }) => {
      rovne(m.countUniqueValues([1, 1, 1, 2]), 2, 'countUniqueValues([1, 1, 1, 2])');
      rovne(m.countUniqueValues([1, 2, 3, 4, 4, 7, 7, 12, 12, 13]), 7, 'countUniqueValues([1, 2, 3, 4, 4, 7, 7, 12, 12, 13])');
      rovne(m.countUniqueValues([-2, -1, -1, 0, 1]), 4, 'countUniqueValues([-2, -1, -1, 0, 1])');
      rovne(m.countUniqueValues([5]), 1, 'countUniqueValues([5])');
      rovne(m.countUniqueValues([]), 0, 'countUniqueValues([])');
      const arr = [1, 1, 2, 3];
      m.countUniqueValues(arr);
      rovne(arr, [1, 1, 2, 3], 'vstupné pole (nesmie sa zmeniť)');
    },
  },
  {
    id: 3,
    nazov: 'sumZero – prvý pár so súčtom 0',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.sumZero([-3, -2, -1, 0, 1, 2, 3]), [-3, 3], 'sumZero([-3, -2, -1, 0, 1, 2, 3])');
      rovne(m.sumZero([-4, -1, 0, 1, 5]), [-1, 1], 'sumZero([-4, -1, 0, 1, 5])');
      rovne(m.sumZero([-2, 0, 1, 3]), undefined, 'sumZero([-2, 0, 1, 3])');
      rovne(m.sumZero([0]), undefined, 'sumZero([0])');
      rovne(m.sumZero([]), undefined, 'sumZero([])');
      zlozitost(m.zlozitost3, 'O(n)');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'validAnagram',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.validAnagram('anagram', 'nagaram'), true, "validAnagram('anagram', 'nagaram')");
      rovne(m.validAnagram('rat', 'car'), false, "validAnagram('rat', 'car')");
      rovne(m.validAnagram('aaz', 'zza'), false, "validAnagram('aaz', 'zza')");
      rovne(m.validAnagram('', ''), true, "validAnagram('', '')");
      rovne(m.validAnagram('ab', 'abc'), false, "validAnagram('ab', 'abc')");
      zlozitost(m.zlozitost4, 'O(n)');
    },
  },
  {
    id: 5,
    nazov: 'areThereDuplicates – cez triedenie a dva ukazovatele',
    testy: (m, { rovne, zlozitost }) => {
      rovne(m.areThereDuplicates(1, 2, 3), false, 'areThereDuplicates(1, 2, 3)');
      rovne(m.areThereDuplicates(1, 2, 2), true, 'areThereDuplicates(1, 2, 2)');
      rovne(m.areThereDuplicates('a', 'b', 'c', 'a'), true, "areThereDuplicates('a', 'b', 'c', 'a')");
      rovne(m.areThereDuplicates(10, 9, 100, 9), true, 'areThereDuplicates(10, 9, 100, 9)');
      rovne(m.areThereDuplicates(), false, 'areThereDuplicates()');
      zlozitost(m.zlozitost5, 'O(n log n)');
    },
  },
  {
    id: 6,
    nazov: 'isSubsequence',
    testy: (m, { rovne }) => {
      rovne(m.isSubsequence('hello', 'hello world'), true, "isSubsequence('hello', 'hello world')");
      rovne(m.isSubsequence('sing', 'sting'), true, "isSubsequence('sing', 'sting')");
      rovne(m.isSubsequence('abc', 'abracadabra'), true, "isSubsequence('abc', 'abracadabra')");
      rovne(m.isSubsequence('abc', 'acb'), false, "isSubsequence('abc', 'acb')");
      rovne(m.isSubsequence('', 'abc'), true, "isSubsequence('', 'abc')");
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'sameFrequency – rovnaké cifry',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.sameFrequency, spravne.sameFrequency);
      rovne(m.sameFrequency(182, 281), true, 'sameFrequency(182, 281)');
      rovne(m.sameFrequency(34, 14), false, 'sameFrequency(34, 14)');
      rovne(m.sameFrequency(3589578, 5879385), true, 'sameFrequency(3589578, 5879385)');
      rovne(m.sameFrequency(22, 222), false, 'sameFrequency(22, 222)');
      rovne(m.sameFrequency(1122, 1222), false, 'sameFrequency(1122, 1222)');
    },
  },
  {
    id: 8,
    nazov: 'averagePair – pár s daným priemerom',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.averagePair, spravne.averagePair);
      rovne(m.averagePair([1, 2, 3], 2.5), true, 'averagePair([1, 2, 3], 2.5)');
      rovne(m.averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8), true, 'averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)');
      rovne(m.averagePair([-1, 0, 3, 4, 5, 6], 4.1), false, 'averagePair([-1, 0, 3, 4, 5, 6], 4.1)');
      rovne(m.averagePair([4], 4), false, 'averagePair([4], 4)');
      rovne(m.averagePair([], 4), false, 'averagePair([], 4)');
    },
  },
  {
    id: 9,
    nazov: 'findPair – pár s rozdielom n',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.findPair, spravne.findPair);
      rovne(m.findPair([6, 1, 4, 10, 2, 4], 2), true, 'findPair([6, 1, 4, 10, 2, 4], 2)');
      rovne(m.findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1), true, 'findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)');
      rovne(m.findPair([4, -2, 3, 10], -6), true, 'findPair([4, -2, 3, 10], -6)');
      rovne(m.findPair([6, 1, 4, 10, 2, 4], 22), false, 'findPair([6, 1, 4, 10, 2, 4], 22)');
      rovne(m.findPair([5, 5], 0), true, 'findPair([5, 5], 0)');
      rovne(m.findPair([5, 6], 0), false, 'findPair([5, 6], 0)');
      rovne(m.findPair([], 0), false, 'findPair([], 0)');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'constructNote – dá sa správa poskladať z písmen?',
    testy: (m, { rovne }) => {
      rovne(m.constructNote('aa', 'abc'), false, "constructNote('aa', 'abc')");
      rovne(m.constructNote('abc', 'dcba'), true, "constructNote('abc', 'dcba')");
      rovne(m.constructNote('aabbcc', 'bcabcaddff'), true, "constructNote('aabbcc', 'bcabcaddff')");
      rovne(m.constructNote('', 'abc'), true, "constructNote('', 'abc')");
      rovne(m.constructNote('a', ''), false, "constructNote('a', '')");
    },
  },
  {
    id: 11,
    nazov: 'findAllDuplicates – všetky duplikáty',
    testy: (m, { rovne }) => {
      rovne(m.findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1]), [2, 3], 'findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1])');
      rovne(m.findAllDuplicates([4, 3, 2, 1, 0]), [], 'findAllDuplicates([4, 3, 2, 1, 0])');
      rovne(m.findAllDuplicates([10, 9, 10, 1, 1, 10]), [1, 10], 'findAllDuplicates([10, 9, 10, 1, 1, 10])');
      rovne(m.findAllDuplicates([]), [], 'findAllDuplicates([])');
    },
  },
  {
    id: 12,
    nazov: 'countPairsWithSum – počet párov so súčtom',
    testy: (m, { rovne }) => {
      rovne(m.countPairsWithSum([1, 2, 3, 4, 5, 6], 7), 3, 'countPairsWithSum([1, 2, 3, 4, 5, 6], 7)');
      rovne(m.countPairsWithSum([-3, -1, 0, 1, 2, 4], 1), 3, 'countPairsWithSum([-3, -1, 0, 1, 2, 4], 1)');
      rovne(m.countPairsWithSum([1, 2, 3], 10), 0, 'countPairsWithSum([1, 2, 3], 10)');
      rovne(m.countPairsWithSum([3], 6), 0, 'countPairsWithSum([3], 6)');
      rovne(m.countPairsWithSum([], 0), 0, 'countPairsWithSum([], 0)');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'findDoubleBookings – dvojité rezervácie v hoteli',
    testy: (m, { rovne }) => {
      const bookings = [
        { room: 12, date: '2026-10-20', guest: 'Novák' },
        { room: 7, date: '2026-10-20', guest: 'Kováč' },
        { room: 12, date: '2026-10-20', guest: 'Horváth' },
        { room: 7, date: '2026-10-19', guest: 'Tóth' },
        { room: 3, date: '2026-10-20', guest: 'Varga' },
        { room: 7, date: '2026-10-19', guest: 'Balog' },
        { room: 7, date: '2026-10-19', guest: 'Szabó' },
        { room: 3, date: '2026-10-20', guest: 'Molnár' },
      ];
      rovne(
        m.findDoubleBookings(bookings),
        [
          { room: 7, date: '2026-10-19', guests: ['Tóth', 'Balog', 'Szabó'] },
          { room: 3, date: '2026-10-20', guests: ['Varga', 'Molnár'] },
          { room: 12, date: '2026-10-20', guests: ['Novák', 'Horváth'] },
        ],
        'findDoubleBookings(bookings)',
      );
      rovne(m.findDoubleBookings([{ room: 1, date: '2026-01-01', guest: 'A' }]), [], 'jedna rezervácia');
      rovne(m.findDoubleBookings([]), [], 'findDoubleBookings([])');
    },
  },
  {
    id: 14,
    nazov: 'bestGiftPair – dva darčeky do rozpočtu',
    testy: (m, { rovne, pravda }) => {
      rovne(m.bestGiftPair([10, 20, 30, 40, 50], 65), 60, 'bestGiftPair([10, 20, 30, 40, 50], 65)');
      rovne(m.bestGiftPair([5, 15, 25, 35], 40), 40, 'bestGiftPair([5, 15, 25, 35], 40)');
      rovne(m.bestGiftPair([30, 40, 50], 50), null, 'bestGiftPair([30, 40, 50], 50)');
      rovne(m.bestGiftPair([20], 100), null, 'bestGiftPair([20], 100)');
      rovne(m.bestGiftPair([], 100), null, 'bestGiftPair([], 100)');
      const prices = Array.from({ length: 2000 }, (_, i) => i * 3 + 1);
      const budget = 4000;
      for (let k = 0; k < 20; k++) {
        const p = prices.slice(k * 50);
        rovne(m.bestGiftPair(p, budget + k), spravne.bestGiftPair(p, budget + k), `náhodný test #${k + 1}`);
      }
      const start = Date.now();
      m.bestGiftPair(Array.from({ length: 200000 }, (_, i) => i), 150000);
      pravda(Date.now() - start < 500, 'príliš pomalé pre 200 000 cien – použi dva ukazovatele (O(n))');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
