'use strict';
const spravne = require('./riesenie');

const povodne = {
  sortByAge(people) {
    const arr = [...people];
    for (let i = 1; i < arr.length; i++) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].age >= current.age) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  },
  selectionSortAny(arr) {
    const result = [...arr];
    for (let i = 0; i < result.length; i++) {
      let lowest = i;
      for (let j = i + 1; j < result.length; j++) {
        if (result[j] - result[lowest] < 0) lowest = j;
      }
      [result[i], result[lowest]] = [result[lowest], result[i]];
    }
    return result;
  },
  sortDates(dates) {
    const arr = [...dates];
    for (let i = 1; i < arr.length; i++) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  },
};

const BEZ_SORT = /\.sort\(/;

function nahodne(n, seed) {
  let x = seed;
  return Array.from({ length: n }, () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return (x % 2001) - 1000;
  });
}

function overTriedenie(fn, nazov, { rovne, pravda, nepouziva }) {
  nepouziva(fn, BEZ_SORT, 'nepoužívaj vstavané .sort()');
  for (const [vstup, popis] of [
    [[37, 45, 29, 8], '[37, 45, 29, 8]'],
    [[8, 1, 2, 3, 4, 5, 6, 7], '[8, 1, 2, 3, 4, 5, 6, 7]'],
    [[5, 4, 3, 2, 1], '[5, 4, 3, 2, 1]'],
    [[3, -1, 3, 0, -1], '[3, -1, 3, 0, -1]'],
    [[2, 1], '[2, 1]'],
    [[1], '[1]'],
    [[], '[]'],
  ]) {
    const kopia = [...vstup];
    const vysledok = fn(kopia);
    rovne(vysledok, [...vstup].sort((a, b) => a - b), `${nazov}(${popis})`);
    pravda(vysledok === kopia, `${nazov} má triediť NA MIESTE a vrátiť to isté pole`);
  }
  const data = nahodne(300, 7);
  rovne(fn([...data]), [...data].sort((a, b) => a - b), `${nazov}(300 náhodných čísel)`);
}

const debug = [
  {
    id: 1,
    nazov: 'bubbleSort',
    testy: (m, p) => {
      overTriedenie(m.bubbleSort, 'bubbleSort', p);
      p.zlozitost(m.zlozitost1, 'O(n^2)');
    },
  },
  {
    id: 2,
    nazov: 'selectionSort',
    testy: (m, p) => {
      overTriedenie(m.selectionSort, 'selectionSort', p);
      p.zlozitost(m.zlozitost2, 'O(n^2)');
    },
  },
  {
    id: 3,
    nazov: 'insertionSort',
    testy: (m, p) => {
      overTriedenie(m.insertionSort, 'insertionSort', p);
      p.zlozitost(m.zlozitost3, 'O(n)', 'Zložitosť pre UŽ ZORADENÉ pole');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'bubbleSortOptimized – predčasné ukončenie',
    testy: (m, p) => {
      overTriedenie((arr) => m.bubbleSortOptimized(arr), 'bubbleSortOptimized', p);
      let porovnania = 0;
      const zoradene = Array.from({ length: 1000 }, (_, i) => i);
      m.bubbleSortOptimized(zoradene, (a, b) => {
        porovnania++;
        return a - b;
      });
      p.pravda(porovnania <= 999, `na zoradenom poli 1000 prvkov urobil ${porovnania} porovnaní – má skončiť po prvom prechode bez výmeny`);
    },
  },
  {
    id: 5,
    nazov: 'insertionSortCmp – triedenie s vlastným porovnaním',
    testy: (m, { rovne }) => {
      rovne(m.insertionSortCmp([3, 1, 2], (a, b) => b - a), [3, 2, 1], 'insertionSortCmp([3, 1, 2], zostupne)');
      rovne(
        m.insertionSortCmp(['banán', 'kiwi', 'jablko'], (a, b) => a.length - b.length),
        ['kiwi', 'banán', 'jablko'],
        "insertionSortCmp(['banán', 'kiwi', 'jablko'], podľa dĺžky)",
      );
      rovne(m.insertionSortCmp([5, 1, 4, 2, 3], (a, b) => a - b), [1, 2, 3, 4, 5], 'insertionSortCmp([5, 1, 4, 2, 3], vzostupne)');
      rovne(m.insertionSortCmp([], (a, b) => a - b), [], 'insertionSortCmp([], ...)');
    },
  },
  {
    id: 6,
    nazov: 'sortBy – selection sort podľa kľúča',
    testy: (m, { rovne }) => {
      const produkty = [
        { nazov: 'Myš', cena: 25 },
        { nazov: 'Monitor', cena: 199 },
        { nazov: 'Adaptér', cena: 5 },
        { nazov: 'Klávesnica', cena: 49 },
      ];
      rovne(m.sortBy([...produkty], 'cena').map((x) => x.nazov), ['Adaptér', 'Myš', 'Klávesnica', 'Monitor'], "sortBy(produkty, 'cena')");
      rovne(m.sortBy([...produkty], 'nazov').map((x) => x.nazov), ['Adaptér', 'Klávesnica', 'Monitor', 'Myš'], "sortBy(produkty, 'nazov')");
      rovne(m.sortBy([], 'cena'), [], "sortBy([], 'cena')");
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'sortByAge – STABILNÉ triedenie',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.sortByAge, spravne.sortByAge);
      const ludia = [
        { name: 'Eva', age: 30 },
        { name: 'Ján', age: 25 },
        { name: 'Ida', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Zoe', age: 20 },
      ];
      rovne(m.sortByAge(ludia).map((x) => x.name), ['Zoe', 'Ján', 'Bob', 'Eva', 'Ida'], 'sortByAge(ludia)');
      rovne(ludia[0].name, 'Eva', 'vstupné pole sa nesmie zmeniť');
    },
  },
  {
    id: 8,
    nazov: 'selectionSortAny – čísla aj reťazce',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.selectionSortAny, spravne.selectionSortAny);
      rovne(m.selectionSortAny([3, 1, 2]), [1, 2, 3], 'selectionSortAny([3, 1, 2])');
      rovne(m.selectionSortAny(['pes', 'auto', 'mačka']), ['auto', 'mačka', 'pes'], "selectionSortAny(['pes', 'auto', 'mačka'])");
      rovne(m.selectionSortAny([]), [], 'selectionSortAny([])');
    },
  },
  {
    id: 9,
    nazov: 'sortDates – dátumy vo formáte DD.MM.RRRR',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.sortDates, spravne.sortDates);
      rovne(
        m.sortDates(['15.03.2026', '01.12.2025', '20.03.2026', '05.01.2026']),
        ['01.12.2025', '05.01.2026', '15.03.2026', '20.03.2026'],
        'sortDates([...])',
      );
      rovne(m.sortDates(['31.12.2025', '01.01.2026']), ['31.12.2025', '01.01.2026'], "sortDates(['31.12.2025', '01.01.2026'])");
      rovne(m.sortDates([]), [], 'sortDates([])');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'bubbleSortCmp – bubble sort s komparátorom',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.bubbleSortCmp, BEZ_SORT, 'nepoužívaj vstavané .sort()');
      const arr = [3, 1, 2];
      pravda(m.bubbleSortCmp(arr, (a, b) => a - b) === arr, 'má triediť na mieste a vrátiť to isté pole');
      rovne(arr, [1, 2, 3], 'bubbleSortCmp([3, 1, 2], vzostupne)');
      rovne(m.bubbleSortCmp([1, 3, 2], (a, b) => b - a), [3, 2, 1], 'bubbleSortCmp([1, 3, 2], zostupne)');
      const ludia = [{ n: 'A', v: 2 }, { n: 'B', v: 1 }, { n: 'C', v: 2 }, { n: 'D', v: 1 }];
      rovne(m.bubbleSortCmp(ludia, (a, b) => a.v - b.v).map((x) => x.n), ['B', 'D', 'A', 'C'], 'bubbleSortCmp musí byť stabilný');
    },
  },
  {
    id: 11,
    nazov: 'countSwaps – koľko výmen urobí bubble sort',
    testy: (m, { rovne }) => {
      rovne(m.countSwaps([1, 2, 3]), 0, 'countSwaps([1, 2, 3])');
      rovne(m.countSwaps([3, 2, 1]), 3, 'countSwaps([3, 2, 1])');
      rovne(m.countSwaps([2, 1, 3, 1]), 3, 'countSwaps([2, 1, 3, 1])');
      rovne(m.countSwaps([5, 4, 3, 2, 1]), 10, 'countSwaps([5, 4, 3, 2, 1])');
      rovne(m.countSwaps([]), 0, 'countSwaps([])');
      const arr = [3, 2, 1];
      m.countSwaps(arr);
      rovne(arr, [3, 2, 1], 'vstupné pole (nesmie sa zmeniť)');
    },
  },
  {
    id: 12,
    nazov: 'sortColors – 0, 1, 2 v jednom prechode',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.sortColors, BEZ_SORT, 'nepoužívaj vstavané .sort()');
      const arr = [2, 0, 2, 1, 1, 0];
      pravda(m.sortColors(arr) === arr, 'má triediť na mieste a vrátiť to isté pole');
      rovne(arr, [0, 0, 1, 1, 2, 2], 'sortColors([2, 0, 2, 1, 1, 0])');
      rovne(m.sortColors([2, 0, 1]), [0, 1, 2], 'sortColors([2, 0, 1])');
      rovne(m.sortColors([2, 2, 2]), [2, 2, 2], 'sortColors([2, 2, 2])');
      rovne(m.sortColors([]), [], 'sortColors([])');
      const velke = Array.from({ length: 300000 }, (_, i) => (i * 7) % 3);
      const start = Date.now();
      m.sortColors(velke);
      pravda(Date.now() - start < 100, 'príliš pomalé pre 300 000 prvkov – má to byť O(n)');
      pravda(velke.every((x, i) => i === 0 || velke[i - 1] <= x), 'veľké pole nie je zoradené');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'leaderboard – rebríček hráčov',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.leaderboard, BEZ_SORT, 'nepoužívaj vstavané .sort()');
      const players = [
        { name: 'zuzka', score: 900, time: 120 },
        { name: 'marek', score: 1200, time: 300 },
        { name: 'ada', score: 900, time: 95 },
        { name: 'boris', score: 900, time: 95 },
        { name: 'cyril', score: 1200, time: 250 },
      ];
      rovne(
        m.leaderboard(players),
        ['1. cyril (1200)', '2. marek (1200)', '3. ada (900)', '4. boris (900)', '5. zuzka (900)'],
        'leaderboard(players)',
      );
      rovne(players[0].name, 'zuzka', 'vstupné pole sa nesmie zmeniť');
      rovne(m.leaderboard([]), [], 'leaderboard([])');
    },
  },
  {
    id: 14,
    nazov: 'sortNearlySorted – takmer zoradené dáta zo senzora',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.sortNearlySorted, BEZ_SORT, 'nepoužívaj vstavané .sort()');
      rovne(m.sortNearlySorted([2, 1, 3, 5, 4, 6]), [1, 2, 3, 4, 5, 6], 'sortNearlySorted([2, 1, 3, 5, 4, 6])');
      rovne(m.sortNearlySorted([]), [], 'sortNearlySorted([])');
      const n = 40000;
      const data = Array.from({ length: n }, (_, i) => i);
      for (let i = 0; i + 3 < n; i += 4) [data[i], data[i + 3]] = [data[i + 3], data[i]];
      const start = Date.now();
      const vysledok = m.sortNearlySorted(data);
      const trvanie = Date.now() - start;
      pravda(vysledok.every((x, i) => x === i), 'výsledok nie je zoradený');
      pravda(trvanie < 150, `${n} takmer zoradených prvkov trvalo ${trvanie} ms – vyber algoritmus, ktorý je na takmer zoradených dátach ~O(n)`);
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
