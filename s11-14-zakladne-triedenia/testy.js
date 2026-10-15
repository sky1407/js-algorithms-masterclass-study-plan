'use strict';

const BEZ_SORT = /\.sort\s*\(/;

const teoria = [
  {
    id: 1,
    otazka: 'Ako funguje Bubble Sort?',
    moznosti: [
      'Nájde najmenší prvok a dá ho na začiatok.',
      'Porovnáva susedné prvky a vymení ich, keď je ľavý väčší. Najväčší tak „vybuble“ na koniec.',
      'Rozdelí pole na polovice a tie spojí.',
      'Vkladá prvky na správne miesto medzi už zotriedené.',
    ],
    spravna: 'b',
    napoveda: 'Bublina stúpa nahor – čo sa stane s najväčším číslom?',
    vysvetlenie: 'Bubble sort porovnáva susedov a vymieňa ich. Po každom prechode je ďalší najväčší prvok na svojom mieste na konci.',
  },
  {
    id: 2,
    otazka: 'Bubble Sort urobil jeden celý prechod poľom. Čo určite platí?',
    moznosti: [
      'Najmenší prvok je na začiatku.',
      'Najväčší prvok je na konci.',
      'Pole je zotriedené.',
      'Nič, záleží od poľa.',
    ],
    spravna: 'b',
    napoveda: 'Najväčší prvok vyhrá každé porovnanie so susedom…',
    vysvetlenie: 'Najväčší prvok sa pri každom porovnaní posunie ďalej doprava, takže po prvom prechode je na konci.',
  },
  {
    id: 3,
    otazka: 'Čo robí optimalizácia noSwaps v Bubble Sorte?',
    moznosti: [
      'Zakáže výmeny prvkov.',
      'Ak počas prechodu nebola žiadna výmena, pole je zotriedené a triedenie skončí.',
      'Vymení prvý a posledný prvok.',
      'Zrýchli porovnávanie čísel.',
    ],
    spravna: 'b',
    napoveda: 'Čo znamená, keď sú všetci susedia už v správnom poradí?',
    vysvetlenie: 'Ak v celom prechode nebolo treba nič vymeniť, všetci susedia sú v poriadku, takže je hotovo. Na zotriedenom poli je to potom O(n).',
  },
  {
    id: 4,
    otazka: 'Ako funguje Selection Sort?',
    moznosti: [
      'Nájde najmenší prvok zo zvyšku a dá ho na začiatok zvyšku.',
      'Porovnáva susedov.',
      'Vkladá prvky ako karty v ruke.',
      'Náhodne mieša prvky, kým nie sú zotriedené.',
    ],
    spravna: 'a',
    napoveda: 'Selection = výber. Čo si v každom kroku vyberie?',
    vysvetlenie: 'V každom kroku vyberie (select) najmenší prvok zo zvyšku a vymení ho s prvým prvkom zvyšku.',
  },
  {
    id: 5,
    otazka: 'Ako funguje Insertion Sort?',
    moznosti: [
      'Nájde najmenší prvok a dá ho na začiatok.',
      'Berie prvky jeden po druhom a vkladá ich na správne miesto medzi už zotriedené prvky vľavo.',
      'Rozdelí pole na dve polovice.',
      'Porovnáva len prvý a posledný prvok.',
    ],
    spravna: 'b',
    napoveda: 'Spomeň si na triedenie kariet v ruke.',
    vysvetlenie: 'Ľavá časť je vždy zotriedená. Ďalší prvok sa do nej vloží (insert) na správne miesto a väčšie prvky sa posunú doprava.',
  },
  {
    id: 6,
    otazka: 'Aká je priemerná rýchlosť Bubble, Selection aj Insertion Sortu?',
    moznosti: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    spravna: 'c',
    napoveda: 'Všetky majú cyklus v cykle.',
    vysvetlenie: 'Všetky tri majú vnorené cykly cez pole, takže v priemere O(n²).',
  },
  {
    id: 7,
    otazka: 'Pole je TAKMER zotriedené. Ktorý algoritmus bude najrýchlejší?',
    moznosti: ['Selection Sort', 'Insertion Sort', 'Všetky rovnako', 'Žiadny z nich nefunguje'],
    spravna: 'b',
    napoveda: 'Ktorý z nich skoro nič nerobí, keď je prvok už na správnom mieste?',
    vysvetlenie: 'Insertion sort pri takmer zotriedenom poli väčšinou nič neposúva, je to skoro O(n). Selection sort robí O(n²) porovnaní vždy.',
  },
  {
    id: 8,
    otazka: 'Prečo pri výmene dvoch prvkov potrebujeme premennú temp?',
    moznosti: [
      'Aby sme si odložili prvú hodnotu, kým ju neprepíšeme druhou.',
      'Lebo JavaScript to vyžaduje.',
      'Aby bola výmena rýchlejšia.',
      'Nepotrebujeme, arr[i] = arr[j]; arr[j] = arr[i]; funguje.',
    ],
    spravna: 'a',
    napoveda: 'Ako vymeníš obsah dvoch plných pohárov?',
    vysvetlenie: 'Po arr[i] = arr[j] je pôvodná hodnota arr[i] preč. Preto si ju najprv odložíme do temp.',
  },
  {
    id: 9,
    otazka: 'Porovnávacia funkcia pre sort vrátila ZÁPORNÉ číslo. Čo to znamená?',
    moznosti: ['a ide pred b.', 'b ide pred a.', 'a a b sú rovnaké.', 'Triedenie skončí.'],
    spravna: 'a',
    napoveda: 'Pri (a, b) => a - b je výsledok záporný, keď je a menšie.',
    vysvetlenie: 'Záporné číslo znamená, že a patrí pred b. Preto (a, b) => a - b triedi vzostupne.',
  },
  {
    id: 10,
    otazka: 'Koľko EXTRA pamäte potrebujú tieto tri triedenia (space complexity)?',
    moznosti: ['O(1) – triedia na mieste, v tom istom poli.', 'O(n) – vždy robia kópiu poľa.', 'O(n²)', 'O(log n)'],
    spravna: 'a',
    napoveda: 'Vytvárajú nové pole, alebo len vymieňajú prvky v pôvodnom?',
    vysvetlenie: 'Všetky tri len vymieňajú alebo posúvajú prvky v pôvodnom poli a potrebujú pár premenných. To je O(1) extra pamäte.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let a = 1;\nlet b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);',
    moznosti: ['1 2', '2 1', '2 2', '1 1'],
    spravna: 'b',
    napoveda: '[a, b] = [b, a] je skrátená výmena.',
    vysvetlenie: 'Hodnoty sa vymenia: a je 2, b je 1.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([3, 1, 2].sort((a, b) => a - b));',
    moznosti: ['[ 1, 2, 3 ]', '[ 3, 2, 1 ]', '[ 3, 1, 2 ]', '[ 1, 3, 2 ]'],
    spravna: 'a',
    napoveda: 'a - b triedi vzostupne.',
    vysvetlenie: 'a - b je záporné pre menšie a, takže menšie ide dopredu: [ 1, 2, 3 ].',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([3, 1, 2].sort((a, b) => b - a));',
    moznosti: ['[ 1, 2, 3 ]', '[ 3, 2, 1 ]', '[ 3, 1, 2 ]', '[ 2, 1, 3 ]'],
    spravna: 'b',
    napoveda: 'b - a je opak a - b.',
    vysvetlenie: 'b - a triedi zostupne: [ 3, 2, 1 ].',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód? (jeden prechod Bubble Sortu)',
    kod: 'const arr = [4, 3, 2, 1];\nfor (let j = 0; j < arr.length - 1; j++) {\n  if (arr[j] > arr[j + 1]) {\n    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n  }\n}\nconsole.log(arr);',
    moznosti: ['[ 1, 2, 3, 4 ]', '[ 3, 2, 1, 4 ]', '[ 3, 4, 2, 1 ]', '[ 4, 3, 2, 1 ]'],
    spravna: 'b',
    napoveda: 'Sleduj štvorku: vyhrá každé porovnanie a posúva sa doprava.',
    vysvetlenie: '4 sa postupne vymení s 3, 2 aj 1 a skončí na konci. Ostatné sa posunú o miesto doľava: [ 3, 2, 1, 4 ].',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód? (prvý krok Selection Sortu)',
    kod: 'const arr = [5, 2, 9, 1];\nlet min = 0;\nfor (let j = 1; j < arr.length; j++) {\n  if (arr[j] < arr[min]) min = j;\n}\nconsole.log(min);',
    moznosti: ['1', '3', '0', '2'],
    spravna: 'b',
    napoveda: 'min je INDEX najmenšieho prvku. Kde je číslo 1?',
    vysvetlenie: 'Najmenší prvok je 1 a je na indexe 3. Vypisujeme index, nie hodnotu.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let porovnania = 0;\nconst n = 4;\nfor (let i = 0; i < n; i++) {\n  for (let j = i + 1; j < n; j++) {\n    porovnania++;\n  }\n}\nconsole.log(porovnania);',
    moznosti: ['16', '6', '4', '12'],
    spravna: 'b',
    napoveda: 'Pre i = 0 beží j 3-krát, pre i = 1 2-krát…',
    vysvetlenie: '3 + 2 + 1 + 0 = 6 porovnaní. Všeobecne n · (n - 1) / 2, čo je O(n²).',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log(['b', 'a', 'c'].sort());",
    moznosti: ["[ 'a', 'b', 'c' ]", "[ 'c', 'b', 'a' ]", "[ 'b', 'a', 'c' ]", 'Chyba: TypeError'],
    spravna: 'a',
    napoveda: 'sort() bez funkcie triedi texty abecedne.',
    vysvetlenie: "Pri textoch sort() bez funkcie funguje dobre: [ 'a', 'b', 'c' ].",
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([10, 9, 1].sort());',
    moznosti: ['[ 1, 9, 10 ]', '[ 1, 10, 9 ]', '[ 10, 9, 1 ]', '[ 9, 10, 1 ]'],
    spravna: 'b',
    napoveda: 'sort() bez funkcie porovnáva ako text: "10" vs "9" – ktorý začína menšou číslicou?',
    vysvetlenie: 'Ako text: "1" < "10" < "9" (porovnáva sa prvá číslica). Preto [ 1, 10, 9 ].',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (jeden krok Insertion Sortu)',
    kod: 'const arr = [1, 3, 5, 2];\nconst current = arr[3];\nlet j = 2;\nwhile (j >= 0 && arr[j] > current) {\n  arr[j + 1] = arr[j];\n  j--;\n}\narr[j + 1] = current;\nconsole.log(arr);',
    moznosti: ['[ 1, 3, 5, 2 ]', '[ 1, 2, 3, 5 ]', '[ 2, 1, 3, 5 ]', '[ 1, 3, 3, 5 ]'],
    spravna: 'b',
    napoveda: 'Vkladáme 2. Ktoré čísla vľavo sú väčšie a posunú sa?',
    vysvetlenie: '5 a 3 sú väčšie ako 2, posunú sa doprava. 1 nie je, takže 2 sa vloží za 1: [ 1, 2, 3, 5 ].',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: "const ludia = [{ meno: 'A', vek: 30 }, { meno: 'B', vek: 20 }];\nludia.sort((a, b) => a.vek - b.vek);\nconsole.log(ludia[0].meno);",
    moznosti: ['A', 'B', '20', '30'],
    spravna: 'b',
    napoveda: 'Triedime podľa veku vzostupne. Kto je mladší?',
    vysvetlenie: 'B má 20 rokov, je mladší, takže bude prvý. Vypíše sa B.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'swap – vymeň dva prvky',
    napovedy: [
      'Po prvom riadku je hodnota arr[i] prepísaná. Odkiaľ ju v druhom riadku zoberieš?',
      'Najprv si hodnotu arr[i] odlož do premennej temp.',
      'const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.swap([1, 2], 0, 1), [2, 1], 'swap([1, 2], 0, 1)');
      rovne(m.swap([5, 6, 7], 0, 2), [7, 6, 5], 'swap([5, 6, 7], 0, 2)');
    },
  },
  {
    id: 2,
    nazov: 'bubbleSort – vzostupne',
    napovedy: [
      'Pole vyjde zotriedené, ale naopak. Kedy vymieňame susedov?',
      'Vymeniť treba, keď je ĽAVÝ väčší ako pravý.',
      'Zmeň arr[j] < arr[j + 1] na arr[j] > arr[j + 1].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.bubbleSort([5, 3, 4, 1]), [1, 3, 4, 5], 'bubbleSort([5, 3, 4, 1])');
      rovne(m.bubbleSort([]), [], 'bubbleSort([])');
    },
  },
  {
    id: 3,
    nazov: 'bubbleSortFast – s optimalizáciou noSwaps',
    napovedy: [
      'Triedenie skončí po prvom prechode, aj keď pole ešte nie je zotriedené. Čo nastavuješ pri výmene?',
      'Keď nastala výmena, znamená to, že pole ešte NIE JE hotové.',
      'Vo vnútri if zmeň noSwaps = true na noSwaps = false.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.bubbleSortFast([5, 1, 4, 2, 8]), [1, 2, 4, 5, 8], 'bubbleSortFast([5, 1, 4, 2, 8])');
      rovne(m.bubbleSortFast([1, 2, 3]), [1, 2, 3], 'bubbleSortFast([1, 2, 3])');
    },
  },
  {
    id: 4,
    nazov: 'selectionSort – zapamätaj si index menšieho',
    napovedy: [
      'Keď nájdeš menší prvok, aký index si zapamätáš?',
      'Menší prvok je na indexe j, nie i.',
      'Zmeň min = i na min = j.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.selectionSort([5, 3, 4, 1, 2]), [1, 2, 3, 4, 5], 'selectionSort([5, 3, 4, 1, 2])');
    },
  },
  {
    id: 5,
    nazov: 'selectionSortB – kde začína hľadanie minima',
    napovedy: [
      'Pre i = 1 by sa malo hľadať minimum len vo zvyšku (od indexu 1). Odkiaľ začína min?',
      'Prvý kandidát na minimum je prvý prvok zvyšku, teda index i.',
      'Zmeň let min = 0 na let min = i.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.selectionSortB([3, 1, 2]), [1, 2, 3], 'selectionSortB([3, 1, 2])');
      rovne(m.selectionSortB([9, 8, 7, 6]), [6, 7, 8, 9], 'selectionSortB([9, 8, 7, 6])');
    },
  },
  {
    id: 6,
    nazov: 'insertionSort – kam vložiť kartu',
    napovedy: [
      'Po while cykle je j o jedno miesto VĽAVO od medzery. Kde je medzera?',
      'Medzera, kam patrí current, je na indexe j + 1.',
      'Zmeň arr[j] = current na arr[j + 1] = current.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.insertionSort([2, 5, 4, 1]), [1, 2, 4, 5], 'insertionSort([2, 5, 4, 1])');
      rovne(m.insertionSort([1, 2, 3]), [1, 2, 3], 'insertionSort([1, 2, 3])');
    },
  },
  {
    id: 7,
    nazov: 'insertionSortB – nezabudni na index 0',
    napovedy: [
      'Pre [3, 1, 2] sa jednotka nedostane na začiatok. Kontroluje sa arr[0]?',
      'Podmienka j > 0 skončí skôr, než porovná prvok na indexe 0.',
      'Zmeň j > 0 na j >= 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.insertionSortB([3, 1, 2]), [1, 2, 3], 'insertionSortB([3, 1, 2])');
      rovne(m.insertionSortB([4, 3, 2, 1]), [1, 2, 3, 4], 'insertionSortB([4, 3, 2, 1])');
    },
  },
  {
    id: 8,
    nazov: 'sortNumbersAsc – vzostupne cez sort',
    napovedy: [
      'Vychádza zostupne. Čo vracia porovnávacia funkcia?',
      'Vzostupne = a - b, zostupne = b - a.',
      'Zmeň (a, b) => b - a na (a, b) => a - b.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sortNumbersAsc([3, 10, 1]), [1, 3, 10], 'sortNumbersAsc([3, 10, 1])');
    },
  },
  {
    id: 9,
    nazov: 'sortByAge – ľudia podľa veku',
    napovedy: [
      'Porovnávacia funkcia musí vrátiť ČÍSLO (záporné / 0 / kladné). Čo vracia a.age > b.age?',
      'true/false nie je správny výsledok. Rozdiel vekov je číslo.',
      'Zmeň a.age > b.age na a.age - b.age.',
    ],
    testy: (m, { rovne }) => {
      const ludia = [{ name: 'A', age: 30 }, { name: 'B', age: 20 }, { name: 'C', age: 10 }];
      rovne(m.sortByAge(ludia).map(p => p.name), ['C', 'B', 'A'], 'sortByAge(...) – poradie mien');
    },
  },
  {
    id: 10,
    nazov: 'sortByLength – slová od najkratšieho',
    napovedy: [
      'Odčítať dva texty nedá číslo (vyjde NaN). Čo chceme porovnávať?',
      'Porovnávame DĹŽKY slov.',
      'Zmeň (a, b) => a - b na (a, b) => a.length - b.length.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sortByLength(['ccc', 'a', 'bb']), ['a', 'bb', 'ccc'], "sortByLength(['ccc', 'a', 'bb'])");
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'swapTemp – výmena cez temp',
    napovedy: ['Kde máme odloženú pôvodnú hodnotu arr[i]?', 'V pomocnej premennej.', 'Nahraď ___ slovom temp.'],
    testy: (m, { rovne }) => {
      rovne(m.swapTemp([1, 2, 3], 0, 2), [3, 2, 1], 'swapTemp([1, 2, 3], 0, 2)');
    },
  },
  {
    id: 2,
    nazov: 'bubble – porovnaj suseda',
    napovedy: ['Sused vpravo od j má index j + …?', 'Hneď vedľa.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.bubble([3, 2, 1]), [1, 2, 3], 'bubble([3, 2, 1])');
    },
  },
  {
    id: 3,
    nazov: 'bubbleNoSwaps – kam až porovnávať susedov',
    napovedy: [
      'j porovnáva arr[j] a arr[j + 1]. Aký najväčší môže byť j, aby j + 1 bol ešte v nezotriedenej časti dĺžky i?',
      'Posledná dvojica je (i - 2, i - 1), takže j < i - …',
      'Nahraď ___ číslom 1.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.bubbleNoSwaps([2, 1, 3, 4]), [1, 2, 3, 4], 'bubbleNoSwaps([2, 1, 3, 4])');
      rovne(m.bubbleNoSwaps([4, 3, 2, 1]), [1, 2, 3, 4], 'bubbleNoSwaps([4, 3, 2, 1])');
    },
  },
  {
    id: 4,
    nazov: 'selection – nový index minima',
    napovedy: ['Našli sme menší prvok. Na ktorom indexe?', 'Vnútorný cyklus ide premennou j.', 'Nahraď ___ písmenom j.'],
    testy: (m, { rovne }) => {
      rovne(m.selection([4, 2, 3, 1]), [1, 2, 3, 4], 'selection([4, 2, 3, 1])');
    },
  },
  {
    id: 5,
    nazov: 'selectionSwap – výmena s minimom',
    napovedy: ['Vymieňame arr[i] a arr[min]. Na pravej strane je [arr[min], arr[?]].', 'Hodnota z indexu i ide na miesto min.', 'Nahraď ___ písmenom i.'],
    testy: (m, { rovne }) => {
      rovne(m.selectionSwap([3, 1, 2]), [1, 2, 3], 'selectionSwap([3, 1, 2])');
    },
  },
  {
    id: 6,
    nazov: 'insertion – ktorú kartu vkladáme',
    napovedy: ['Vonkajší cyklus ide indexom i. Ktorú kartu práve vkladáme?', 'current je prvok na indexe i.', 'Nahraď ___ písmenom i.'],
    testy: (m, { rovne }) => {
      rovne(m.insertion([3, 1, 2]), [1, 2, 3], 'insertion([3, 1, 2])');
    },
  },
  {
    id: 7,
    nazov: 'insertionPlace – vlož do medzery',
    napovedy: ['Po while je medzera o jedno miesto vpravo od j.', 'arr[j + …] = current', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.insertionPlace([5, 4, 3]), [3, 4, 5], 'insertionPlace([5, 4, 3])');
    },
  },
  {
    id: 8,
    nazov: 'sortAsc – porovnávacia funkcia',
    napovedy: ['Vzostupne je (a, b) => ? - b', 'Menšie a má dať záporné číslo.', 'Nahraď ___ písmenom a.'],
    testy: (m, { rovne }) => {
      rovne(m.sortAsc([20, 3, 100]), [3, 20, 100], 'sortAsc([20, 3, 100])');
    },
  },
  {
    id: 9,
    nazov: 'sortByPrice – podľa ceny',
    napovedy: ['Podľa akej vlastnosti triedime?', 'Druhá strana používa b.price.', 'Nahraď ___ slovom price.'],
    testy: (m, { rovne }) => {
      const tovar = [{ name: 'syr', price: 3 }, { name: 'chlieb', price: 1 }, { name: 'víno', price: 9 }];
      rovne(m.sortByPrice(tovar).map(t => t.name), ['chlieb', 'syr', 'víno'], 'sortByPrice(tovar) – poradie');
    },
  },
  {
    id: 10,
    nazov: 'insertionFull – celý insertion sort (dve ___)',
    napovedy: [
      'Prvé ___: po ktorý index najďalej smie ísť j? Druhé ___: o koľko sa j zmenšuje?',
      'Najmenší index je 0. Posúvame sa po jednom.',
      'Prvé ___ nahraď 0, druhé ___ nahraď 1.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.insertionFull([4, 1, 3, 2]), [1, 2, 3, 4], 'insertionFull([4, 1, 3, 2])');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'swapP – vymeň prvky na indexoch i a j a vráť pole',
    napovedy: [
      'Použi pomocnú premennú temp alebo [a, b] = [b, a].',
      'const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;',
      'const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp; return arr;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.swapP([1, 2, 3], 0, 1), [2, 1, 3], 'swapP([1, 2, 3], 0, 1)');
    },
  },
  {
    id: 2,
    nazov: 'isSorted – je pole zotriedené vzostupne?',
    napovedy: [
      'Porovnaj každého suseda: arr[i] > arr[i + 1] znamená, že nie je zotriedené.',
      'Cyklus for (let i = 0; i < arr.length - 1; i++). Pri chybe return false, za cyklom return true.',
      'for (let i = 0; i < arr.length - 1; i++) { if (arr[i] > arr[i + 1]) return false; } return true;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isSorted([1, 2, 2, 5]), true, 'isSorted([1, 2, 2, 5])');
      rovne(m.isSorted([1, 3, 2]), false, 'isSorted([1, 3, 2])');
      rovne(m.isSorted([]), true, 'isSorted([])');
    },
  },
  {
    id: 3,
    nazov: 'bubbleSortP – Bubble Sort',
    napovedy: [
      'Dva cykly: vonkajší i od arr.length nadol, vnútorný j od 0 po i - 1.',
      'Ak arr[j] > arr[j + 1], vymeň ich.',
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.bubbleSortP([37, 45, 29, 8]), [8, 29, 37, 45], 'bubbleSortP([37, 45, 29, 8])');
      rovne(m.bubbleSortP([1]), [1], 'bubbleSortP([1])');
      nepouziva(m.bubbleSortP, BEZ_SORT, 'napíš to vlastnými cyklami, bez .sort()');
    },
  },
  {
    id: 4,
    nazov: 'countSwapsBubble – koľko výmen urobí Bubble Sort',
    napovedy: [
      'Napíš bubble sort a pri každej výmene zvýš počítadlo.',
      'let swaps = 0; … if (arr[j] > arr[j + 1]) { vymeň; swaps++; }',
      'let swaps = 0; for (let i = arr.length; i > 0; i--) { for (let j = 0; j < i - 1; j++) { if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; swaps++; } } } return swaps;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countSwapsBubble([3, 2, 1]), 3, 'countSwapsBubble([3, 2, 1])');
      rovne(m.countSwapsBubble([1, 2, 3]), 0, 'countSwapsBubble([1, 2, 3])');
      rovne(m.countSwapsBubble([2, 1, 3]), 1, 'countSwapsBubble([2, 1, 3])');
    },
  },
  {
    id: 5,
    nazov: 'findMinIndex – index najmenšieho prvku od indexu start',
    napovedy: [
      'Začni s min = start a choď cyklom od start + 1.',
      'Ak arr[j] < arr[min], tak min = j.',
      'let min = start; for (let j = start + 1; j < arr.length; j++) { if (arr[j] < arr[min]) min = j; } return min;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.findMinIndex([5, 2, 9, 1], 0), 3, 'findMinIndex([5, 2, 9, 1], 0)');
      rovne(m.findMinIndex([5, 2, 9, 7], 2), 3, 'findMinIndex([5, 2, 9, 7], 2)');
    },
  },
  {
    id: 6,
    nazov: 'selectionSortP – Selection Sort',
    napovedy: [
      'Pre každé i nájdi index minima zvyšku (ako v úlohe 5) a vymeň ho s arr[i].',
      'Vonkajší cyklus i od 0, vnútorný j od i + 1. Na konci: if (min !== i) vymeň.',
      'Celé riešenie je v teórii v časti 4.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.selectionSortP([0, 2, 34, 22, 10, 19, 17]), [0, 2, 10, 17, 19, 22, 34], 'selectionSortP([0, 2, 34, 22, 10, 19, 17])');
      rovne(m.selectionSortP([]), [], 'selectionSortP([])');
      nepouziva(m.selectionSortP, BEZ_SORT, 'napíš to vlastnými cyklami, bez .sort()');
    },
  },
  {
    id: 7,
    nazov: 'insertIntoSorted – vlož x do zotriedeného poľa na správne miesto',
    napovedy: [
      'Pridaj x na koniec (push) a potom ho posúvaj doľava, kým je ľavý sused väčší.',
      'Je to jeden krok insertion sortu: current = x, j = posledný index pred ním.',
      'let j = arr.length - 1; arr.push(x); while (j >= 0 && arr[j] > x) { arr[j + 1] = arr[j]; j--; } arr[j + 1] = x; return arr;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.insertIntoSorted([1, 3, 5], 4), [1, 3, 4, 5], 'insertIntoSorted([1, 3, 5], 4)');
      rovne(m.insertIntoSorted([1, 3, 5], 0), [0, 1, 3, 5], 'insertIntoSorted([1, 3, 5], 0)');
      rovne(m.insertIntoSorted([], 7), [7], 'insertIntoSorted([], 7)');
    },
  },
  {
    id: 8,
    nazov: 'insertionSortP – Insertion Sort',
    napovedy: [
      'Pre i od 1: current = arr[i], j = i - 1.',
      'while (j >= 0 && arr[j] > current) { arr[j + 1] = arr[j]; j--; } a potom arr[j + 1] = current.',
      'Celé riešenie je v teórii v časti 5.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.insertionSortP([8, 1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6, 7, 8], 'insertionSortP([8, 1, 2, 3, 4, 5, 6, 7])');
      rovne(m.insertionSortP([2, 1]), [1, 2], 'insertionSortP([2, 1])');
      nepouziva(m.insertionSortP, BEZ_SORT, 'napíš to vlastnými cyklami, bez .sort()');
    },
  },
  {
    id: 9,
    nazov: 'sortDescending – zostupne cez sort',
    napovedy: [
      'Použi arr.sort s porovnávacou funkciou.',
      'Zostupne = (a, b) => b - a.',
      'return arr.sort((a, b) => b - a);',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sortDescending([2, 30, 4]), [30, 4, 2], 'sortDescending([2, 30, 4])');
    },
  },
  {
    id: 10,
    nazov: 'sortStudents – študenti podľa známky (najlepší = najvyššie body)',
    napovedy: [
      'Triediš objekty podľa vlastnosti points, od najväčšieho.',
      'Porovnávacia funkcia: (a, b) => b.points - a.points.',
      'return students.sort((a, b) => b.points - a.points);',
    ],
    testy: (m, { rovne }) => {
      const s = [{ name: 'Eva', points: 70 }, { name: 'Ján', points: 95 }, { name: 'Ivo', points: 80 }];
      rovne(m.sortStudents(s).map(x => x.name), ['Ján', 'Ivo', 'Eva'], 'sortStudents(...) – poradie mien');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
