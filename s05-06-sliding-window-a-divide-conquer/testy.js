'use strict';

const teoria = [
  {
    id: 1,
    otazka: 'Čo robí posuvné okno (sliding window), keď sa posunie o jedno miesto doprava?',
    moznosti: [
      'Spočíta celé okno znova od začiatku.',
      'Odčíta prvok, ktorý z okna odišiel, a pripočíta prvok, ktorý prišiel.',
      'Zdvojnásobí veľkosť okna.',
      'Zotriedi prvky v okne.',
    ],
    spravna: 'b',
    napoveda: 'Spomeň si na vlak: jeden vagón odíde, jeden príde.',
    vysvetlenie: 'Ostatné prvky v okne sa nemenia, takže stačí odčítať odchádzajúci a pripočítať prichádzajúci prvok. Preto je to O(n).',
  },
  {
    id: 2,
    otazka: 'Okno má veľkosť k a práve končí na indexe i. Ktorý prvok pri posune do tohto okna ODIŠIEL?',
    moznosti: ['arr[i]', 'arr[i - 1]', 'arr[i - k]', 'arr[k]'],
    spravna: 'c',
    napoveda: 'Skús k = 2, i = 2: okno je [1, 2] (indexy). Predtým bolo [0, 1]. Ktorý index vypadol?',
    vysvetlenie: 'Nové okno má indexy i - k + 1 až i. Predchádzajúce začínalo na i - k, ten prvok práve odišiel.',
  },
  {
    id: 3,
    otazka: 'Prečo v maxSubarraySum začíname s max = súčet prvého okna, a nie s max = 0?',
    moznosti: [
      'Lebo je to rýchlejšie.',
      'Lebo keď sú všetky čísla záporné, správny výsledok je záporný a 0 by bola zlá odpoveď.',
      'Lebo 0 nie je číslo.',
      'Je to jedno, oba spôsoby fungujú vždy.',
    ],
    spravna: 'b',
    napoveda: 'Aký je najväčší súčet dvojice v [-3, -2, -5]?',
    vysvetlenie: 'V [-3, -2, -5] je najväčší súčet dvojice -5. Keby sme začali s 0, žiadne okno by ju neprekonalo a vrátili by sme 0.',
  },
  {
    id: 4,
    otazka: 'Pri hľadaní NAJMENŠEJ hodnoty začíname často s let min = Infinity. Prečo?',
    moznosti: [
      'Lebo Infinity je najmenšie číslo.',
      'Lebo každé skutočné číslo je menšie ako Infinity, takže ho hneď nahradí.',
      'Lebo inak JavaScript hodí chybu.',
      'Lebo Infinity sa rovná nule.',
    ],
    spravna: 'b',
    napoveda: 'Infinity = nekonečno. Je nejaké číslo väčšie?',
    vysvetlenie: 'Infinity je väčšie ako akékoľvek číslo. Prvé porovnanie Math.min(Infinity, x) vráti x. Ak min ostane Infinity, nič sme nenašli.',
  },
  {
    id: 5,
    otazka: 'V minSubArrayLen (okno meniacej sa veľkosti) kedy okno ZMENŠUJEME zľava?',
    moznosti: [
      'Vždy po pridaní prvku.',
      'Kým je súčet okna aspoň target.',
      'Keď je súčet menší ako target.',
      'Nikdy, okno sa len zväčšuje.',
    ],
    spravna: 'b',
    napoveda: 'Hľadáme NAJKRATŠIE okno, ktoré ešte spĺňa podmienku.',
    vysvetlenie: 'Keď súčet stačí, zapamätáme si dĺžku a skúsime okno skrátiť zľava. Keď už súčet nestačí, okno zase naťahujeme doprava.',
  },
  {
    id: 6,
    otazka: 'Aká je dĺžka okna od indexu left po index right (oba vrátane)?',
    moznosti: ['right - left', 'right - left + 1', 'right + left', 'right - left - 1'],
    spravna: 'b',
    napoveda: 'Skús left = 2, right = 2. Koľko prvkov je v okne?',
    vysvetlenie: 'Pri left = right je v okne 1 prvok, takže treba right - left + 1.',
  },
  {
    id: 7,
    otazka: 'Čo musí platiť, aby fungovalo binárne vyhľadávanie?',
    moznosti: ['Pole musí byť zotriedené.', 'Pole musí mať párny počet prvkov.', 'Pole nesmie obsahovať záporné čísla.', 'Nič, funguje vždy.'],
    spravna: 'a',
    napoveda: 'Ako vieme, že ak je stred malý, hľadané číslo je vpravo?',
    vysvetlenie: 'Len v zotriedenom poli vieme, že vľavo od stredu sú menšie a vpravo väčšie čísla. Inak by sme zahodili zlú polovicu.',
  },
  {
    id: 8,
    otazka: 'Aká je rýchlosť (Big O) binárneho vyhľadávania?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    spravna: 'b',
    napoveda: 'Každý krok zahodí polovicu prvkov.',
    vysvetlenie: 'Pri každom kroku sa počet prvkov zmenší na polovicu. Počet delení dvomi je log₂ n, takže O(log n).',
  },
  {
    id: 9,
    otazka: 'Binárne vyhľadávanie: arr[mid] je MENŠIE ako hľadané x. Čo urobíme?',
    moznosti: ['right = mid - 1', 'left = mid + 1', 'return -1', 'left = mid'],
    spravna: 'b',
    napoveda: 'Hľadané číslo je väčšie ako stred. Na ktorej strane sú väčšie čísla?',
    vysvetlenie: 'x je väčšie ako stred, takže je vpravo. Ľavý okraj presunieme za stred: left = mid + 1.',
  },
  {
    id: 10,
    otazka: 'Pole má 1024 prvkov. Koľko krokov približne najviac potrebuje binárne vyhľadávanie?',
    moznosti: ['1024', '512', '10', '2'],
    spravna: 'c',
    napoveda: 'Koľkokrát môžeš 1024 deliť dvoma, kým nedostaneš 1?',
    vysvetlenie: '1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1 je 10 delení, takže asi 10 krokov.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.max(3, 7, 2));',
    moznosti: ['3', '7', '2', '12'],
    spravna: 'b',
    napoveda: 'max = najväčšie.',
    vysvetlenie: 'Math.max vráti najväčšie zo zadaných čísel, teda 7.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.floor(7 / 2));',
    moznosti: ['3.5', '3', '4', '2'],
    spravna: 'b',
    napoveda: '7 / 2 je 3.5. floor zaokrúhľuje nadol.',
    vysvetlenie: '7 / 2 = 3.5 a Math.floor odsekne desatinnú časť → 3.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let sum = 1 + 2;\nsum = sum - 1 + 3;\nconsole.log(sum);',
    moznosti: ['5', '6', '3', '7'],
    spravna: 'a',
    napoveda: 'Okno [1, 2] sa posunulo: 1 odišla, 3 prišla.',
    vysvetlenie: 'sum je 3, potom 3 - 1 + 3 = 5. Presne to je súčet nového okna [2, 3].',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.min(Infinity, 4));',
    moznosti: ['Infinity', '4', '0', 'NaN'],
    spravna: 'b',
    napoveda: 'Ktoré je menšie: nekonečno, alebo 4?',
    vysvetlenie: '4 je menšie ako nekonečno, takže Math.min vráti 4.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const arr = [1, 3, 5, 7, 9];\nconst left = 0;\nconst right = 4;\nconst mid = Math.floor((left + right) / 2);\nconsole.log(mid, arr[mid]);',
    moznosti: ['2 5', '2 3', '5 2', '3 7'],
    spravna: 'a',
    napoveda: '(0 + 4) / 2 = ? A aký prvok je na tom indexe?',
    vysvetlenie: 'mid = Math.floor(4 / 2) = 2 a arr[2] je 5. Vypíše sa 2 5.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let n = 16;\nlet kroky = 0;\nwhile (n > 1) {\n  n = n / 2;\n  kroky++;\n}\nconsole.log(kroky);',
    moznosti: ['16', '8', '4', '5'],
    spravna: 'c',
    napoveda: '16 → 8 → 4 → 2 → 1. Koľko šípok?',
    vysvetlenie: '16 → 8 → 4 → 2 → 1 sú 4 delenia. To je log₂ 16 = 4.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód? (dva riadky)',
    kod: 'const arr = [1, 2, 3, 4];\nconst k = 2;\nfor (let i = k; i < arr.length; i++) {\n  console.log(arr[i - k], arr[i]);\n}',
    moznosti: ['1 3\n2 4', '2 3\n3 4', '1 2\n3 4', '0 2\n1 3'],
    spravna: 'a',
    napoveda: 'i začína na 2. Čo je arr[0] a arr[2]?',
    vysvetlenie: 'i = 2: odchádza arr[0] = 1, prichádza arr[2] = 3. i = 3: odchádza arr[1] = 2, prichádza arr[3] = 4.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód? (dva riadky)',
    kod: "const seen = { a: 0 };\nconsole.log(seen.a ? 'videné' : 'nie');\nconsole.log(seen.a !== undefined);",
    moznosti: ['nie\ntrue', 'videné\ntrue', 'nie\nfalse', 'videné\nfalse'],
    spravna: 'a',
    napoveda: 'seen.a je 0. Je 0 truthy? A je 0 rovné undefined?',
    vysvetlenie: '0 je falsy, preto prvý riadok vypíše nie, hoci písmeno sme videli. 0 !== undefined je true. Preto pri indexoch kontrolujeme !== undefined.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let best = 0;\nfor (const x of [2, 5, 1]) {\n  best = Math.max(best, x);\n}\nconsole.log(best);',
    moznosti: ['2', '5', '1', '8'],
    spravna: 'b',
    napoveda: 'best si pamätá najväčšie doteraz videné číslo.',
    vysvetlenie: 'best ide 0 → 2 → 5 → 5. Výsledok je 5.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: "const s = 'abcd';\nconsole.log(s.slice(1, 3));",
    moznosti: ['abc', 'bc', 'bcd', 'ab'],
    spravna: 'b',
    napoveda: 'slice(1, 3) berie indexy 1 a 2 (koniec sa nepočíta).',
    vysvetlenie: 's[1] je b, s[2] je c. Index 3 sa už nepočíta, takže výsledok je bc.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'maxSubarraySum – najväčší súčet k susedných čísel',
    napovedy: [
      'Skús maxSubarraySum([4, 2, 1], 3). Je tam len jedno okno. Prečo vráti 0?',
      'max začína nulou. Má začínať súčtom prvého okna (pozri teóriu, časť 2).',
      'Zmeň let max = 0; na let max = sum;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2), 10, 'maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)');
      rovne(m.maxSubarraySum([4, 2, 1], 3), 7, 'maxSubarraySum([4, 2, 1], 3)');
      rovne(m.maxSubarraySum([-3, -2, -5], 2), -5, 'maxSubarraySum([-3, -2, -5], 2)');
      rovne(m.maxSubarraySum([1], 2), null, 'maxSubarraySum([1], 2)');
    },
  },
  {
    id: 2,
    nazov: 'windowSums – súčty všetkých okien veľkosti k',
    napovedy: [
      'Prvé okno je správne, ďalšie nie. Ktorý prvok odčítavaš pri posune?',
      'Prvok, ktorý odišiel z okna, je na indexe i - k.',
      'Zmeň arr[i - 1] na arr[i - k].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.windowSums([1, 2, 3, 4], 2), [3, 5, 7], 'windowSums([1, 2, 3, 4], 2)');
      rovne(m.windowSums([1, 2, 3, 4, 5], 3), [6, 9, 12], 'windowSums([1, 2, 3, 4, 5], 3)');
    },
  },
  {
    id: 3,
    nazov: 'minSubArrayLen – najkratší kus so súčtom aspoň target',
    napovedy: [
      'Skús minSubArrayLen([1, 1], 5). Také okno neexistuje, čo funkcia vráti?',
      'Keď sa nič nenašlo, minLen ostane Infinity. Zadanie chce vtedy 0.',
      'Zmeň return minLen; na return minLen === Infinity ? 0 : minLen;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.minSubArrayLen([2, 3, 1, 2, 4, 3], 7), 2, 'minSubArrayLen([2, 3, 1, 2, 4, 3], 7)');
      rovne(m.minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39), 3, 'minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)');
      rovne(m.minSubArrayLen([1, 1], 5), 0, 'minSubArrayLen([1, 1], 5)');
    },
  },
  {
    id: 4,
    nazov: 'findLongestSubstring – najdlhší kus bez opakovaného písmena',
    napovedy: [
      "Pri 'abba' alebo 'abcabcbb' vychádza zle. Kde má začať okno po zopakovaní písmena?",
      'Okno musí začať až ZA starým výskytom písmena, nie na ňom.',
      'Zmeň seen[ch] na seen[ch] + 1 v riadku so start = Math.max(...).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.findLongestSubstring('abcabcbb'), 3, "findLongestSubstring('abcabcbb')");
      rovne(m.findLongestSubstring('bbbbbb'), 1, "findLongestSubstring('bbbbbb')");
      rovne(m.findLongestSubstring(''), 0, "findLongestSubstring('')");
    },
  },
  {
    id: 5,
    nazov: 'binarySearch – index prvku v zotriedenom poli, inak -1',
    napovedy: [
      'Hľadáš 9 v [1, 3, 5, 7, 9]. Stred je 5, čo je menej ako 9. Kam treba ísť?',
      'Keď je stred menší, hľadané číslo je vpravo → posúvaš left. Keď je väčší → posúvaš right.',
      'Vymeň obsah vetiev: if (arr[mid] < x) left = mid + 1; else right = mid - 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.binarySearch([1, 3, 5, 7, 9], 9), 4, 'binarySearch([1, 3, 5, 7, 9], 9)');
      rovne(m.binarySearch([1, 3, 5, 7, 9], 1), 0, 'binarySearch([1, 3, 5, 7, 9], 1)');
      rovne(m.binarySearch([1, 3, 5, 7, 9], 4), -1, 'binarySearch([1, 3, 5, 7, 9], 4)');
    },
  },
  {
    id: 6,
    nazov: 'halveCount – koľkokrát sa dá číslo deliť 2, kým nie je 1',
    napovedy: [
      'halveCount(8) má byť 3 (8 → 4 → 2 → 1). Funkcia urobí o krok viac.',
      'Keď je n už 1, máme skončiť. Podmienka n >= 1 pustí cyklus aj pre 1.',
      'Zmeň while (n >= 1) na while (n > 1).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.halveCount(8), 3, 'halveCount(8)');
      rovne(m.halveCount(1), 0, 'halveCount(1)');
      rovne(m.halveCount(1024), 10, 'halveCount(1024)');
    },
  },
  {
    id: 7,
    nazov: 'maxAverage – najväčší priemer k susedných čísel',
    napovedy: [
      'Súčet okna je správny. Čím ho treba deliť, aby vyšiel priemer okna?',
      'Okno má k prvkov, nie arr.length.',
      'Zmeň max / arr.length na max / k.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.maxAverage([1, 12, -5, -6, 50, 3], 4), 12.75, 'maxAverage([1, 12, -5, -6, 50, 3], 4)');
      rovne(m.maxAverage([5, 5], 1), 5, 'maxAverage([5, 5], 1)');
    },
  },
  {
    id: 8,
    nazov: 'sumOfWindow – súčet k prvkov od indexu start',
    napovedy: [
      'sumOfWindow([1, 2, 3, 4, 5], 2, 2) má sčítať indexy 2 a 3. Kde má cyklus skončiť?',
      'Cyklus začína na start a má urobiť k krokov, teda skončiť pred start + k.',
      'Zmeň i < k na i < start + k.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sumOfWindow([1, 2, 3, 4, 5], 2, 2), 7, 'sumOfWindow([1, 2, 3, 4, 5], 2, 2)');
      rovne(m.sumOfWindow([1, 2, 3], 0, 3), 6, 'sumOfWindow([1, 2, 3], 0, 3)');
    },
  },
  {
    id: 9,
    nazov: 'isInSorted – je x v zotriedenom poli? (binárne)',
    napovedy: [
      'Skús isInSorted([5], 5). Prebehne cyklus vôbec?',
      'Keď left === right, ešte jeden prvok treba skontrolovať.',
      'Zmeň while (left < right) na while (left <= right).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isInSorted([5], 5), true, 'isInSorted([5], 5)');
      rovne(m.isInSorted([1, 2, 3, 4, 5], 5), true, 'isInSorted([1, 2, 3, 4, 5], 5)');
      rovne(m.isInSorted([1, 2, 3], 7), false, 'isInSorted([1, 2, 3], 7)');
    },
  },
  {
    id: 10,
    nazov: 'longestRun – najdlhšia séria rovnakých čísel za sebou',
    napovedy: [
      'Keď príde iné číslo, začína nová séria. Aká dlhá je séria s jedným číslom?',
      'Nová séria má hneď dĺžku 1 (to nové číslo), nie 0.',
      'Zmeň cur = 0; na cur = 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.longestRun([1, 1, 2, 2, 2, 3]), 3, 'longestRun([1, 1, 2, 2, 2, 3])');
      rovne(m.longestRun([4, 5, 5]), 2, 'longestRun([4, 5, 5])');
      rovne(m.longestRun([7]), 1, 'longestRun([7])');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'firstWindowSum – súčet prvých k čísel',
    napovedy: ['Koľko čísel sčítavame?', 'Toľko, aká je veľkosť okna.', 'Nahraď ___ písmenom k.'],
    testy: (m, { rovne }) => {
      rovne(m.firstWindowSum([5, 1, 3, 9], 3), 9, 'firstWindowSum([5, 1, 3, 9], 3)');
    },
  },
  {
    id: 2,
    nazov: 'slideMax – ktorý prvok odchádza z okna',
    napovedy: ['Okno končí na i a má veľkosť k. Ktorý index práve vypadol?', 'Odchádzajúci prvok je na indexe i mínus veľkosť okna.', 'Nahraď ___ písmenom k.'],
    testy: (m, { rovne }) => {
      rovne(m.slideMax([1, 2, 5, 2, 8, 1, 5], 2), 10, 'slideMax([1, 2, 5, 2, 8, 1, 5], 2)');
      rovne(m.slideMax([1, 2, 5, 2, 8, 1, 5], 4), 17, 'slideMax([1, 2, 5, 2, 8, 1, 5], 4)');
    },
  },
  {
    id: 3,
    nazov: 'bestWindow – zapamätaj si väčší súčet',
    napovedy: ['Ktorá funkcia Math.… vráti väčšie z dvoch čísel?', 'max = najväčšie, min = najmenšie.', 'Nahraď ___ slovom max.'],
    testy: (m, { rovne }) => {
      rovne(m.bestWindow([4, 2, 1, 6], 1), 6, 'bestWindow([4, 2, 1, 6], 1)');
      rovne(m.bestWindow([4, 2, 1, 6, 2], 4), 13, 'bestWindow([4, 2, 1, 6, 2], 4)');
    },
  },
  {
    id: 4,
    nazov: 'shortestSum – nič nenašla → 0',
    napovedy: ['Čo má funkcia vrátiť, keď minLen ostalo Infinity?', 'Zadanie hovorí: ak také okno neexistuje, vráť 0.', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      rovne(m.shortestSum([2, 1, 6, 5, 4], 9), 2, 'shortestSum([2, 1, 6, 5, 4], 9)');
      rovne(m.shortestSum([1, 2], 50), 0, 'shortestSum([1, 2], 50)');
    },
  },
  {
    id: 5,
    nazov: 'searchMid – stred zaokrúhli nadol',
    napovedy: ['(0 + 3) / 2 je 1.5, ale index musí byť celé číslo. Ktorá funkcia Math.… zaokrúhľuje nadol?', 'Anglicky podlaha = floor.', 'Nahraď ___ slovom floor.'],
    testy: (m, { rovne }) => {
      rovne(m.searchMid([2, 4, 6, 8], 4), 1, 'searchMid([2, 4, 6, 8], 4)');
      rovne(m.searchMid([2, 4, 6, 8], 5), -1, 'searchMid([2, 4, 6, 8], 5)');
    },
  },
  {
    id: 6,
    nazov: 'searchFound – čo vrátiť, keď sme našli',
    napovedy: ['Funkcia vracia INDEX nájdeného prvku. Kde sme ho práve našli?', 'Index stredu je v premennej mid.', 'Nahraď ___ slovom mid.'],
    testy: (m, { rovne }) => {
      rovne(m.searchFound([10, 20, 30, 40, 50], 40), 3, 'searchFound([10, 20, 30, 40, 50], 40)');
      rovne(m.searchFound([10, 20], 15), -1, 'searchFound([10, 20], 15)');
    },
  },
  {
    id: 7,
    nazov: 'searchRight – posuň ľavý okraj za stred',
    napovedy: ['Stred sme už skontrolovali. Ľavý okraj má ísť za neho, o koľko?', 'Ďalší prvok za mid je mid + …', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.searchRight([1, 2, 3, 4, 5, 6], 6), 5, 'searchRight([1, 2, 3, 4, 5, 6], 6)');
      rovne(m.searchRight([1, 2, 3], 2), 1, 'searchRight([1, 2, 3], 2)');
    },
  },
  {
    id: 8,
    nazov: 'halvings – deľ číslo, kým nie je 1',
    napovedy: ['Hľadáme, koľkokrát vieme číslo rozpoliť. Čím delíme?', 'Rozpoliť = deliť dvomi.', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne(m.halvings(16), 4, 'halvings(16)');
      rovne(m.halvings(1), 0, 'halvings(1)');
    },
  },
  {
    id: 9,
    nazov: 'longestNoRepeat – dĺžka okna',
    napovedy: ['Okno ide od start po i vrátane. Aká je jeho dĺžka?', 'Pri start = i je v okne jedno písmeno.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.longestNoRepeat('thisisawesome'), 6, "longestNoRepeat('thisisawesome')");
      rovne(m.longestNoRepeat('abcdef'), 6, "longestNoRepeat('abcdef')");
    },
  },
  {
    id: 10,
    nazov: 'windowAverages – priemery všetkých okien (dve ___)',
    napovedy: [
      'Prvé ___: od akého čísla začína súčet? Druhé ___: priemer okna = súčet / počet prvkov okna.',
      'Súčet začína nulou. Okno má k prvkov.',
      'Prvé ___ nahraď 0, druhé ___ nahraď k.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.windowAverages([1, 3, 5, 7], 2), [2, 4, 6], 'windowAverages([1, 3, 5, 7], 2)');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'sumFirstK – súčet prvých k čísel',
    napovedy: [
      'Cyklus for (let i = 0; i < k; i++) a pripočítavaj arr[i].',
      'let s = 0; pred cyklom, return s; za ním.',
      'let s = 0; for (let i = 0; i < k; i++) s += arr[i]; return s;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sumFirstK([4, 1, 7, 2], 2), 5, 'sumFirstK([4, 1, 7, 2], 2)');
      rovne(m.sumFirstK([4, 1, 7, 2], 4), 14, 'sumFirstK([4, 1, 7, 2], 4)');
    },
  },
  {
    id: 2,
    nazov: 'allWindowSums – pole súčtov všetkých okien veľkosti k',
    napovedy: [
      'Spočítaj prvé okno a daj ho do výsledku. Potom posúvaj okno a pridávaj ďalšie súčty.',
      'Pri posune: sum = sum - arr[i - k] + arr[i]; potom vysledok.push(sum).',
      'let sum = 0; for (let i = 0; i < k; i++) sum += arr[i]; const v = [sum]; for (let i = k; i < arr.length; i++) { sum = sum - arr[i - k] + arr[i]; v.push(sum); } return v;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.allWindowSums([1, 2, 3, 4], 2), [3, 5, 7], 'allWindowSums([1, 2, 3, 4], 2)');
      rovne(m.allWindowSums([5, 5, 5], 3), [15], 'allWindowSums([5, 5, 5], 3)');
    },
  },
  {
    id: 3,
    nazov: 'maxWindowSum – najväčší súčet k susedných (null, ak je pole kratšie)',
    napovedy: [
      'Je to maxSubarraySum z teórie, časť 2.',
      'Nezabudni: if (arr.length < k) return null; a max začína súčtom prvého okna.',
      'Celé riešenie je v teórii v časti 2.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.maxWindowSum([100, 200, 300, 400], 2), 700, 'maxWindowSum([100, 200, 300, 400], 2)');
      rovne(m.maxWindowSum([-3, 4, 0, -2, 6, -1], 2), 5, 'maxWindowSum([-3, 4, 0, -2, 6, -1], 2)');
      rovne(m.maxWindowSum([2, 3], 3), null, 'maxWindowSum([2, 3], 3)');
    },
  },
  {
    id: 4,
    nazov: 'minWindowSum – najmenší súčet k susedných',
    napovedy: [
      'Ako úloha 3, len hľadáš minimum.',
      'Math.min namiesto Math.max.',
      'let sum = 0; for (let i = 0; i < k; i++) sum += arr[i]; let min = sum; for (let i = k; i < arr.length; i++) { sum = sum - arr[i - k] + arr[i]; min = Math.min(min, sum); } return min;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.minWindowSum([4, 2, 1, 6], 2), 3, 'minWindowSum([4, 2, 1, 6], 2)');
      rovne(m.minWindowSum([5, -1, -1, 5], 2), -2, 'minWindowSum([5, -1, -1, 5], 2)');
    },
  },
  {
    id: 5,
    nazov: 'linearSearch – index prvku (prvok po prvku), inak -1',
    napovedy: [
      'Prejdi všetky indexy a porovnaj arr[i] s x.',
      'Keď sa rovná, hneď vráť i. Za cyklom vráť -1.',
      'for (let i = 0; i < arr.length; i++) { if (arr[i] === x) return i; } return -1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.linearSearch([9, 4, 7], 7), 2, 'linearSearch([9, 4, 7], 7)');
      rovne(m.linearSearch([9, 4, 7], 1), -1, 'linearSearch([9, 4, 7], 1)');
    },
  },
  {
    id: 6,
    nazov: 'binSearch – binárne vyhľadávanie',
    napovedy: [
      'left = 0, right = arr.length - 1, while (left <= right), mid = Math.floor((left + right) / 2).',
      'arr[mid] === x → return mid. arr[mid] < x → left = mid + 1. Inak right = mid - 1.',
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.binSearch([1, 2, 3, 4, 5, 6, 7, 8], 7), 6, 'binSearch([1, 2, 3, 4, 5, 6, 7, 8], 7)');
      rovne(m.binSearch([1, 2, 3], 1), 0, 'binSearch([1, 2, 3], 1)');
      rovne(m.binSearch([1, 2, 3], 10), -1, 'binSearch([1, 2, 3], 10)');
      rovne(m.binSearch([], 1), -1, 'binSearch([], 1)');
    },
  },
  {
    id: 7,
    nazov: 'countHalvings – koľkokrát deliť 2, kým nie je n <= 1',
    napovedy: [
      'Cyklus while (n > 1), v ňom n = n / 2 a počítadlo++.',
      'Pri n = 1 sa cyklus nespustí → 0.',
      'let k = 0; while (n > 1) { n = n / 2; k++; } return k;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countHalvings(32), 5, 'countHalvings(32)');
      rovne(m.countHalvings(1), 0, 'countHalvings(1)');
    },
  },
  {
    id: 8,
    nazov: 'smallestSubarray – najkratšie okno so súčtom aspoň target (inak 0)',
    napovedy: [
      'Je to minSubArrayLen z teórie: húsenica sa naťahuje doprava a sťahuje zľava.',
      'for (right…) { sum += arr[right]; while (sum >= target) { minLen = Math.min(...); sum -= arr[left]; left++; } }',
      'Celé riešenie je v teórii v časti 2 (minSubArrayLen).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.smallestSubarray([2, 1, 6, 5, 4], 9), 2, 'smallestSubarray([2, 1, 6, 5, 4], 9)');
      rovne(m.smallestSubarray([1, 4, 16, 22, 5, 7, 8, 9, 10], 55), 5, 'smallestSubarray([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)');
      rovne(m.smallestSubarray([1, 2, 3], 100), 0, 'smallestSubarray([1, 2, 3], 100)');
    },
  },
  {
    id: 9,
    nazov: 'longestUniqueSubstring – najdlhší kus textu bez opakovania',
    napovedy: [
      'Pamätaj si v objekte seen, na akom indexe si ktoré písmeno videl naposledy.',
      'Keď písmeno už bolo: start = Math.max(start, seen[ch] + 1). Potom best = Math.max(best, i - start + 1).',
      'Celé riešenie je v teórii v časti 2 (findLongestSubstring).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.longestUniqueSubstring('rithmschool'), 7, "longestUniqueSubstring('rithmschool')");
      rovne(m.longestUniqueSubstring('longestsubstring'), 8, "longestUniqueSubstring('longestsubstring')");
      rovne(m.longestUniqueSubstring(''), 0, "longestUniqueSubstring('')");
    },
  },
  {
    id: 10,
    nazov: 'maxConsecutiveOnes – najdlhšia séria jednotiek',
    napovedy: [
      'Počítaj aktuálnu sériu cur a najlepšiu best.',
      'Keď je x === 1: cur++ a best = Math.max(best, cur). Inak cur = 0.',
      'let cur = 0, best = 0; for (const x of arr) { if (x === 1) { cur++; best = Math.max(best, cur); } else { cur = 0; } } return best;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.maxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3, 'maxConsecutiveOnes([1, 1, 0, 1, 1, 1])');
      rovne(m.maxConsecutiveOnes([0, 0]), 0, 'maxConsecutiveOnes([0, 0])');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
