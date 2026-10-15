'use strict';

const BEZ_SORT = /\.sort\s*\(/;

const teoria = [
  {
    id: 1,
    otazka: 'Aká je hlavná myšlienka Merge Sortu?',
    moznosti: [
      'Porovnávať susedov a vymieňať ich.',
      'Rozdeliť pole na polovice až po kúsky s 1 prvkom a potom ich spájať v správnom poradí.',
      'Vybrať pivot a dať menšie vľavo.',
      'Triediť podľa číslic do košíkov.',
    ],
    spravna: 'b',
    napoveda: 'Merge = spojiť. Čo sa spája?',
    vysvetlenie: 'Merge sort delí pole, kým nemá kúsky s 1 prvkom (tie sú zotriedené), a potom ich po dvojiciach spája do zotriedených celkov.',
  },
  {
    id: 2,
    otazka: 'Prečo je base case v mergeSort if (arr.length <= 1) return arr;?',
    moznosti: [
      'Lebo pole s 0 alebo 1 prvkom je vždy zotriedené.',
      'Lebo prázdne pole spôsobí chybu.',
      'Lebo merge funguje len pre 1 prvok.',
      'Je to náhodne zvolené číslo.',
    ],
    spravna: 'a',
    napoveda: 'Dá sa pole s jedným prvkom zotriediť zle?',
    vysvetlenie: 'Jeden prvok (alebo žiadny) je vždy v správnom poradí, takže ho netreba ďalej deliť.',
  },
  {
    id: 3,
    otazka: 'Aká rýchla je funkcia merge, ktorá spája dve zotriedené polia dĺžky n a m?',
    moznosti: ['O(1)', 'O(n + m)', 'O(n · m)', 'O(log n)'],
    spravna: 'b',
    napoveda: 'Každý prvok sa do výsledku pridá presne raz.',
    vysvetlenie: 'Každý prvok z oboch polí sa pozrie a pridá raz, takže O(n + m).',
  },
  {
    id: 4,
    otazka: 'Aká je rýchlosť Merge Sortu?',
    moznosti: ['O(n) vždy', 'O(n log n) vždy', 'O(n²) v najhoršom prípade', 'O(log n)'],
    spravna: 'b',
    napoveda: 'log n úrovní delenia, na každej úrovni spájame n prvkov.',
    vysvetlenie: 'Pole sa delí na polovice log n-krát a na každej úrovni sa spája n prvkov. Spolu O(n log n) – vždy, aj v najhoršom prípade.',
  },
  {
    id: 5,
    otazka: 'Čo je pivot v Quick Sorte?',
    moznosti: [
      'Najväčší prvok poľa.',
      'Prvok, okolo ktorého sa pole rozdelí: menšie vľavo, väčšie vpravo.',
      'Posledný index poľa.',
      'Pomocné pole na výsledky.',
    ],
    spravna: 'b',
    napoveda: 'Pivot = os, okolo ktorej sa niečo otáča.',
    vysvetlenie: 'Pivot je vybraný prvok. Po rozdelení sú menšie prvky vľavo, väčšie vpravo a pivot je na svojom definitívnom mieste.',
  },
  {
    id: 6,
    otazka: 'Kedy má Quick Sort (pivot = prvý prvok) najhorší prípad O(n²)?',
    moznosti: [
      'Keď je pole už zotriedené.',
      'Keď je pole náhodne premiešané.',
      'Keď má pole párny počet prvkov.',
      'Nikdy, je vždy O(n log n).',
    ],
    spravna: 'a',
    napoveda: 'Ak je pivot vždy najmenší prvok, koľko prvkov bude vľavo?',
    vysvetlenie: 'V zotriedenom poli je prvý prvok vždy najmenší. Pole sa rozdelí na 0 a n - 1 prvkov, takže úrovní je n namiesto log n.',
  },
  {
    id: 7,
    otazka: 'Prečo voláme quickSort(arr, left, p - 1) a quickSort(arr, p + 1, right) – bez indexu p?',
    moznosti: [
      'Lebo pivot je už na svojom definitívnom mieste.',
      'Lebo index p neexistuje.',
      'Aby bol kód kratší.',
      'Je to chyba, p tam má byť.',
    ],
    spravna: 'a',
    napoveda: 'Kde je pivot po funkcii pivot?',
    vysvetlenie: 'Pivot je na správnom mieste, nemusí sa už triediť. Keby sme ho zahrnuli, rekurzia by sa mohla zacykliť.',
  },
  {
    id: 8,
    otazka: 'Čím je Radix Sort iný ako ostatné triedenia?',
    moznosti: [
      'Je vždy najpomalší.',
      'Vôbec neporovnáva čísla medzi sebou – triedi ich podľa číslic do 10 košíkov.',
      'Funguje len na textoch.',
      'Používa pivot.',
    ],
    spravna: 'b',
    napoveda: 'Koľko košíkov má radix sort a podľa čoho do nich dáva čísla?',
    vysvetlenie: 'Radix sort rozhádže čísla do košíkov 0–9 podľa jednej číslice, vyberie ich a zopakuje pre ďalšiu číslicu. Porovnanie a < b nepoužíva.',
  },
  {
    id: 9,
    otazka: 'Čo vráti getDigit(7323, 2), ak i = 0 sú jednotky?',
    moznosti: ['7', '3', '2', '23'],
    spravna: 'b',
    napoveda: 'i = 0 jednotky (3), i = 1 desiatky (2), i = 2 stovky (?).',
    vysvetlenie: '7323: jednotky 3, desiatky 2, stovky 3. Výpočet: Math.floor(7323 / 100) = 73, 73 % 10 = 3.',
  },
  {
    id: 10,
    otazka: 'Prečo musia byť košíky v Radix Sorte v KAŽDOM kole nové?',
    moznosti: [
      'Lebo inak by v nich zostali čísla z minulého kola a zdvojovali by sa.',
      'Lebo JavaScript nevie pole použiť dvakrát.',
      'Aby bol kód rýchlejší.',
      'Nemusia.',
    ],
    spravna: 'a',
    napoveda: 'Čo by bolo v košíku 3 na začiatku druhého kola?',
    vysvetlenie: 'Starý košík by obsahoval čísla z minulého kola a nové by sa pridali k nim. Pole by sa zväčšovalo a obsahovalo duplikáty.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = [1, 2, 3, 4, 5];\nconst mid = Math.floor(a.length / 2);\nconsole.log(a.slice(0, mid), a.slice(mid));',
    moznosti: ['[ 1, 2 ] [ 3, 4, 5 ]', '[ 1, 2, 3 ] [ 4, 5 ]', '[ 1, 2 ] [ 4, 5 ]', '[ 1, 2, 3 ] [ 3, 4, 5 ]'],
    spravna: 'a',
    napoveda: 'mid = Math.floor(5 / 2) = 2. slice(0, 2) nezahŕňa index 2.',
    vysvetlenie: 'mid je 2. slice(0, 2) sú indexy 0 a 1 → [ 1, 2 ]. slice(2) sú indexy 2 až koniec → [ 3, 4, 5 ].',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(10 ** 3);',
    moznosti: ['30', '1000', '13', '103'],
    spravna: 'b',
    napoveda: '** je mocnina.',
    vysvetlenie: '10 ** 3 = 10 · 10 · 10 = 1000.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.floor(12345 / 100) % 10);',
    moznosti: ['123', '3', '5', '45'],
    spravna: 'b',
    napoveda: '12345 / 100 = 123.45. Potom floor a zvyšok po delení 10.',
    vysvetlenie: 'Math.floor(123.45) = 123 a 123 % 10 = 3. To je číslica stoviek.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.floor(Math.log10(423)) + 1);',
    moznosti: ['2', '3', '4', '423'],
    spravna: 'b',
    napoveda: 'log10(423) je medzi 2 a 3.',
    vysvetlenie: 'log10(423) ≈ 2.63, floor je 2 a + 1 je 3. Číslo 423 má 3 číslice.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Array.from({ length: 3 }, () => []));',
    moznosti: ['[ [], [], [] ]', '[ 0, 1, 2 ]', '[]', '[ 3 ]'],
    spravna: 'a',
    napoveda: 'Vytvorí pole dĺžky 3 a každý prvok je výsledok funkcie () => [].',
    vysvetlenie: 'Array.from vytvorí 3 prvky a každý je nové prázdne pole: [ [], [], [] ].',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([].concat(...[[1], [2, 3], []]));',
    moznosti: ['[ 1, 2, 3 ]', '[ [ 1 ], [ 2, 3 ], [] ]', '[ 1, [ 2, 3 ] ]', '6'],
    spravna: 'a',
    napoveda: '... vysype vnútorné polia ako samostatné argumenty pre concat.',
    vysvetlenie: 'Je to ako [].concat([1], [2, 3], []) a výsledok je [ 1, 2, 3 ]. Takto sa v radix sorte vysypú košíky.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.max(...[3, 9, 2]));',
    moznosti: ['3', '9', 'NaN', '[ 3, 9, 2 ]'],
    spravna: 'b',
    napoveda: '...[3, 9, 2] je to isté ako 3, 9, 2.',
    vysvetlenie: 'Math.max(3, 9, 2) je 9.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód? (merge)',
    kod: 'const a = [1, 4];\nconst b = [2, 3];\nconst r = [];\nlet i = 0;\nlet j = 0;\nwhile (i < a.length && j < b.length) {\n  if (a[i] < b[j]) { r.push(a[i]); i++; }\n  else { r.push(b[j]); j++; }\n}\nconsole.log(r);',
    moznosti: ['[ 1, 2, 3, 4 ]', '[ 1, 2, 3 ]', '[ 1, 4, 2, 3 ]', '[ 1, 2 ]'],
    spravna: 'b',
    napoveda: 'Hlavný cyklus skončí, keď sa JEDNO z polí minie. Zvyšok sa tu nepridáva!',
    vysvetlenie: '1 < 2 → 1. 4 > 2 → 2. 4 > 3 → 3. Pole b sa minulo, cyklus končí. 4 sa nepridala, lebo chýba cyklus na zvyšok: [ 1, 2, 3 ].',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (pivot)',
    kod: 'const arr = [4, 8, 2, 1, 5, 7, 6, 3];\nconst p = arr[0];\nlet swapIdx = 0;\nfor (let i = 1; i < arr.length; i++) {\n  if (p > arr[i]) swapIdx++;\n}\nconsole.log(swapIdx);',
    moznosti: ['4', '3', '0', '7'],
    spravna: 'b',
    napoveda: 'Koľko čísel je menších ako 4?',
    vysvetlenie: 'Menšie ako 4 sú 2, 1 a 3, teda tri čísla. Pivot 4 bude na indexe 3.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(String(-45).length);',
    moznosti: ['2', '3', '-45', '45'],
    spravna: 'b',
    napoveda: 'Aj znamienko mínus je znak textu.',
    vysvetlenie: 'Text "-45" má 3 znaky. Preto pri počítaní číslic používame Math.abs.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'merge – spoj dve zotriedené polia',
    napovedy: [
      'Hlavná časť funguje, zle je pridávanie zvyšku z poľa b. Ktorý index tam používaš?',
      'Po poli b sa ide indexom j, nie i.',
      'V poslednom while zmeň b[i] na b[j].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.merge([1, 10, 50], [2, 14, 99, 100]), [1, 2, 10, 14, 50, 99, 100], 'merge([1, 10, 50], [2, 14, 99, 100])');
      rovne(m.merge([], [1, 2]), [1, 2], 'merge([], [1, 2])');
    },
  },
  {
    id: 2,
    nazov: 'mergeB – spoj dve zotriedené polia',
    napovedy: [
      'Výsledok nie je zotriedený. Ktorý prvok sa má pridať ako prvý?',
      'Pridávame MENŠÍ z dvoch vrchných prvkov.',
      'Zmeň a[i] > b[j] na a[i] < b[j].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.mergeB([1, 3], [2, 4]), [1, 2, 3, 4], 'mergeB([1, 3], [2, 4])');
    },
  },
  {
    id: 3,
    nazov: 'mergeSort – base case',
    napovedy: [
      'RangeError = nekonečná rekurzia. Čo sa stane s poľom s 1 prvkom?',
      'Pole s 1 prvkom sa rozdelí na [] a [x] a [x] sa zase rozdelí… Jeden prvok musí byť base case.',
      'Zmeň arr.length === 0 na arr.length <= 1.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.mergeSort([8, 3, 5, 1]), [1, 3, 5, 8], 'mergeSort([8, 3, 5, 1])');
      rovne(m.mergeSort([]), [], 'mergeSort([])');
    },
  },
  {
    id: 4,
    nazov: 'mergeSortB – nestrať prostredný prvok',
    napovedy: [
      'Vo výsledku chýbajú čísla. Pokrývajú slice(0, mid) a pravá časť celé pole?',
      'slice(0, mid) končí PRED mid. Pravá časť musí začať na mid, nie mid + 1.',
      'Zmeň arr.slice(mid + 1) na arr.slice(mid).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.mergeSortB([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], 'mergeSortB([5, 4, 3, 2, 1])');
    },
  },
  {
    id: 5,
    nazov: 'pivot – vráť index, kde skončil pivot',
    napovedy: [
      'Pole sa upraví dobre, ale vrátené číslo nie. Kde je pivot na konci?',
      'Pivot sa na konci vymení na index swapIdx.',
      'Zmeň return start; na return swapIdx;',
    ],
    testy: (m, { rovne }) => {
      const a = [4, 8, 2, 1, 5, 7, 6, 3];
      rovne(m.pivot(a), 3, 'pivot([4, 8, 2, 1, 5, 7, 6, 3])');
      rovne(a[3], 4, 'pivot je po pivot() na indexe 3');
    },
  },
  {
    id: 6,
    nazov: 'quickSort – rekurzia bez pivota',
    napovedy: [
      'RangeError = nekonečná rekurzia. Pozri sa na druhé rekurzívne volanie.',
      'Pivot na indexe p je už na mieste. Pravá časť začína ZA ním.',
      'Zmeň quickSort(arr, p, right) na quickSort(arr, p + 1, right).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.quickSort([4, 6, 9, 1, 2, 5, 3]), [1, 2, 3, 4, 5, 6, 9], 'quickSort([4, 6, 9, 1, 2, 5, 3])');
    },
  },
  {
    id: 7,
    nazov: 'getDigit – i-ta číslica sprava',
    napovedy: [
      'getDigit(12345, 2) má byť 3. Čím treba deliť, aby sme odsekli 2 číslice?',
      'Treba deliť 100 = 10 na druhú. 10 * i je 20, nie 100.',
      'Zmeň 10 * i na 10 ** i.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.getDigit(12345, 0), 5, 'getDigit(12345, 0)');
      rovne(m.getDigit(12345, 2), 3, 'getDigit(12345, 2)');
      rovne(m.getDigit(12345, 4), 1, 'getDigit(12345, 4)');
    },
  },
  {
    id: 8,
    nazov: 'digitCount – počet číslic',
    napovedy: [
      'Pre 423 vráti 2. log10(423) ≈ 2.63. Čo treba pridať?',
      'Číslo od 100 do 999 má log10 medzi 2 a 3, ale 3 číslice.',
      'Pridaj + 1 za Math.floor(...).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.digitCount(423), 3, 'digitCount(423)');
      rovne(m.digitCount(7), 1, 'digitCount(7)');
      rovne(m.digitCount(0), 1, 'digitCount(0)');
    },
  },
  {
    id: 9,
    nazov: 'mostDigits – najviac číslic v poli',
    napovedy: [
      'Funkcia vráti najmenší počet číslic. Ktorá funkcia Math.… sa používa?',
      'Hľadáme NAJVIAC, teda maximum.',
      'Zmeň Math.min na Math.max a začni s max = 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.mostDigits([1234, 56, 7]), 4, 'mostDigits([1234, 56, 7])');
      rovne(m.mostDigits([12, 34]), 2, 'mostDigits([12, 34])');
    },
  },
  {
    id: 10,
    nazov: 'radixSort – nové košíky v každom kole',
    napovedy: [
      'Výsledok je dlhší ako vstup – čísla sa zdvojujú. Kedy sa vytvárajú košíky?',
      'Košíky sa vytvoria raz pred cyklom a v druhom kole ešte obsahujú čísla z prvého.',
      'Presuň riadok const buckets = … dovnútra cyklu for (let k …).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.radixSort([23, 345, 5467, 12, 2345, 9852]), [12, 23, 345, 2345, 5467, 9852], 'radixSort([23, 345, 5467, 12, 2345, 9852])');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'mergeX – pridaj prvok z b',
    napovedy: ['Po poli b sa ide ktorým indexom?', 'i je pre a, … pre b.', 'Nahraď ___ písmenom j.'],
    testy: (m, { rovne }) => {
      rovne(m.mergeX([1, 5], [2, 3]), [1, 2, 3, 5], 'mergeX([1, 5], [2, 3])');
    },
  },
  {
    id: 2,
    nazov: 'mergeRest – zvyšok z a',
    napovedy: ['Tento cyklus pridáva zvyšok, ktorý ostal v jednom z polí. V ktorom (podľa indexu i)?', 'i ukazuje do poľa a.', 'Nahraď ___ písmenom a.'],
    testy: (m, { rovne }) => {
      rovne(m.mergeRest([5, 6], [1]), [1, 5, 6], 'mergeRest([5, 6], [1])');
    },
  },
  {
    id: 3,
    nazov: 'mergeSortMid – stred',
    napovedy: ['Pole delíme na polovice. Čím delíme dĺžku?', 'Polovica = delené…', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne(m.mergeSortMid([3, 1, 2]), [1, 2, 3], 'mergeSortMid([3, 1, 2])');
    },
  },
  {
    id: 4,
    nazov: 'mergeSortJoin – spoj polovice',
    napovedy: ['merge spája ľavú a… ?', 'Druhá polovica je v premennej right.', 'Nahraď ___ slovom right.'],
    testy: (m, { rovne }) => {
      rovne(m.mergeSortJoin([9, 7, 8]), [7, 8, 9], 'mergeSortJoin([9, 7, 8])');
    },
  },
  {
    id: 5,
    nazov: 'pivotSwap – presuň menší prvok dopredu',
    napovedy: ['Menší prvok arr[i] vymieňame s prvkom na indexe swapIdx. Čo je na pravej strane?', '[arr[swapIdx], arr[i]] = [arr[i], arr[?]]', 'Nahraď ___ slovom swapIdx.'],
    testy: (m, { rovne }) => {
      const a = [4, 8, 2, 1, 5, 7, 6, 3];
      rovne(m.pivotSwap(a), 3, 'pivotSwap([4, 8, 2, 1, 5, 7, 6, 3])');
      rovne(a, [3, 2, 1, 4, 5, 7, 6, 8], 'pole po pivotSwap');
    },
  },
  {
    id: 6,
    nazov: 'quick – ľavá časť bez pivota',
    napovedy: ['Ľavá časť končí tesne PRED pivotom. Aký je to index?', 'p - …', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.quick([5, 2, 8, 1, 9]), [1, 2, 5, 8, 9], 'quick([5, 2, 8, 1, 9])');
      rovne(m.quick([5, 4, 3, 2, 1, 9]), [1, 2, 3, 4, 5, 9], 'quick([5, 4, 3, 2, 1, 9])');
    },
  },
  {
    id: 7,
    nazov: 'digitAt – posledná číslica',
    napovedy: ['Ako dostaneš poslednú číslicu čísla 123?', 'Zvyšok po delení… (123 % ? = 3)', 'Nahraď ___ číslom 10.'],
    testy: (m, { rovne }) => {
      rovne(m.digitAt(7323, 2), 3, 'digitAt(7323, 2)');
      rovne(m.digitAt(7323, 0), 3, 'digitAt(7323, 0)');
      rovne(m.digitAt(7323, 3), 7, 'digitAt(7323, 3)');
    },
  },
  {
    id: 8,
    nazov: 'countDigits0 – nula má jednu číslicu',
    napovedy: ['Koľko číslic má číslo 0?', 'log10(0) je -Infinity, preto má nula vlastný base case.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.countDigits0(0), 1, 'countDigits0(0)');
      rovne(m.countDigits0(99), 2, 'countDigits0(99)');
    },
  },
  {
    id: 9,
    nazov: 'makeBuckets – košíky pre číslice',
    napovedy: ['Koľko je rôznych číslic?', '0, 1, 2, … 9', 'Nahraď ___ číslom 10.'],
    testy: (m, { rovne }) => {
      rovne(m.makeBuckets(), [[], [], [], [], [], [], [], [], [], []], 'makeBuckets()');
    },
  },
  {
    id: 10,
    nazov: 'radix – rozhádž a vysyp (dve ___)',
    napovedy: [
      'Prvé ___: ktorou metódou pridáš číslo do košíka? Druhé ___: čo vysypeme do nums?',
      'Pridávanie na koniec poľa = push. Vysypeme všetky košíky.',
      'Prvé ___ nahraď push, druhé ___ nahraď buckets.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.radix([902, 4, 7, 408, 29]), [4, 7, 29, 408, 902], 'radix([902, 4, 7, 408, 29])');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'mergeSorted – spoj dve zotriedené polia',
    napovedy: [
      'Dva ukazovatele i, j a cyklus while (i < a.length && j < b.length).',
      'Pridávaj menší z a[i], b[j]. Potom dva cykly na zvyšky.',
      'Celé riešenie je v teórii v časti 2 (merge).',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.mergeSorted([1, 3, 5], [2, 4, 6, 8]), [1, 2, 3, 4, 5, 6, 8], 'mergeSorted([1, 3, 5], [2, 4, 6, 8])');
      rovne(m.mergeSorted([], []), [], 'mergeSorted([], [])');
      nepouziva(m.mergeSorted, BEZ_SORT, 'napíš to bez .sort()');
    },
  },
  {
    id: 2,
    nazov: 'mergeSortP – Merge Sort',
    napovedy: [
      'Base case: dĺžka <= 1. Potom mid, ľavá a pravá polovica rekurzívne.',
      'Na spojenie použi mergeSorted z úlohy 1.',
      'if (arr.length <= 1) return arr; const mid = Math.floor(arr.length / 2); return mergeSorted(mergeSortP(arr.slice(0, mid)), mergeSortP(arr.slice(mid)));',
    ],
    testy: (m, { rovne, nepouziva, rekurzivna }) => {
      rovne(m.mergeSortP([10, 24, 76, 73, 72, 1, 9]), [1, 9, 10, 24, 72, 73, 76], 'mergeSortP([10, 24, 76, 73, 72, 1, 9])');
      rovne(m.mergeSortP([]), [], 'mergeSortP([])');
      nepouziva(m.mergeSortP, BEZ_SORT, 'napíš to bez .sort()');
      rekurzivna(m.mergeSortP);
    },
  },
  {
    id: 3,
    nazov: 'pivotP – rozdeľ okolo pivota, vráť jeho index',
    napovedy: [
      'p = arr[start], swapIdx = start. Pre každý menší prvok: swapIdx++ a vymeň.',
      'Na konci vymeň arr[start] a arr[swapIdx] a vráť swapIdx.',
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne }) => {
      const a = [4, 8, 2, 1, 5, 7, 6, 3];
      rovne(m.pivotP(a, 0, 7), 3, 'pivotP([4, 8, 2, 1, 5, 7, 6, 3], 0, 7)');
      rovne(a.slice(0, 3).every(x => x < 4) && a.slice(4).every(x => x > 4), true, 'menšie vľavo od pivota, väčšie vpravo');
      rovne(m.pivotP([1, 2, 3], 0, 2), 0, 'pivotP([1, 2, 3], 0, 2)');
    },
  },
  {
    id: 4,
    nazov: 'quickSortP – Quick Sort',
    napovedy: [
      'Parametre left = 0, right = arr.length - 1. Ak left < right: p = pivotP(arr, left, right).',
      'Potom rekurzívne ľavá časť (left … p - 1) a pravá (p + 1 … right). Vráť arr.',
      'if (left < right) { const p = pivotP(arr, left, right); quickSortP(arr, left, p - 1); quickSortP(arr, p + 1, right); } return arr;',
    ],
    testy: (m, { rovne, nepouziva, rekurzivna }) => {
      rovne(m.quickSortP([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]), [-3, 1, 2, 2, 3, 4, 5, 6, 9, 23, 100], 'quickSortP([100, -3, 2, …])');
      rovne(m.quickSortP([]), [], 'quickSortP([])');
      nepouziva(m.quickSortP, BEZ_SORT, 'napíš to bez .sort()');
      rekurzivna(m.quickSortP);
    },
  },
  {
    id: 5,
    nazov: 'getDigitP – i-ta číslica sprava',
    napovedy: [
      'Vydeľ číslo 10 ** i, zaokrúhli nadol a zober zvyšok po delení 10.',
      'Nezabudni na Math.abs pre záporné čísla.',
      'return Math.floor(Math.abs(num) / 10 ** i) % 10;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.getDigitP(12345, 1), 4, 'getDigitP(12345, 1)');
      rovne(m.getDigitP(12345, 7), 0, 'getDigitP(12345, 7)');
      rovne(m.getDigitP(-87, 0), 7, 'getDigitP(-87, 0)');
    },
  },
  {
    id: 6,
    nazov: 'digitCountP – počet číslic',
    napovedy: [
      'Nula má 1 číslicu. Inak Math.floor(Math.log10(Math.abs(num))) + 1.',
      'Iný spôsob: String(Math.abs(num)).length.',
      'if (num === 0) return 1; return Math.floor(Math.log10(Math.abs(num))) + 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.digitCountP(21388), 5, 'digitCountP(21388)');
      rovne(m.digitCountP(0), 1, 'digitCountP(0)');
      rovne(m.digitCountP(-45), 2, 'digitCountP(-45)');
    },
  },
  {
    id: 7,
    nazov: 'mostDigitsP – najviac číslic',
    napovedy: [
      'max = 0 a pre každé číslo max = Math.max(max, digitCountP(n)).',
      'Použi funkciu z úlohy 6.',
      'let max = 0; for (const n of nums) max = Math.max(max, digitCountP(n)); return max;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.mostDigitsP([23, 567, 89, 12234324, 90]), 8, 'mostDigitsP([23, 567, 89, 12234324, 90])');
      rovne(m.mostDigitsP([]), 0, 'mostDigitsP([])');
    },
  },
  {
    id: 8,
    nazov: 'radixSortP – Radix Sort',
    napovedy: [
      'Koľko kôl = mostDigitsP(nums). V každom kole nové košíky Array.from({ length: 10 }, () => []).',
      'Rozhádž: buckets[getDigitP(n, k)].push(n). Vysyp: nums = [].concat(...buckets).',
      'Celé riešenie je v teórii v časti 4.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.radixSortP([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]), [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637], 'radixSortP([902, 4, 7, …])');
      rovne(m.radixSortP([]), [], 'radixSortP([])');
      nepouziva(m.radixSortP, BEZ_SORT, 'napíš to bez .sort()');
    },
  },
  {
    id: 9,
    nazov: 'mergeUnique – spoj dve zotriedené polia bez opakovaní',
    napovedy: [
      'Ako merge, ale pridaj prvok len vtedy, keď sa nerovná poslednému prvku výsledku.',
      'Pomocná podmienka: if (result[result.length - 1] !== x) result.push(x);',
      'Najjednoduchšie: najprv merge, potom prejdi výsledok a nechaj len prvky, ktoré sa líšia od predchádzajúceho.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.mergeUnique([1, 2, 4], [2, 3, 4, 5]), [1, 2, 3, 4, 5], 'mergeUnique([1, 2, 4], [2, 3, 4, 5])');
      rovne(m.mergeUnique([1, 1], [1]), [1], 'mergeUnique([1, 1], [1])');
      nepouziva(m.mergeUnique, BEZ_SORT, 'napíš to bez .sort()');
    },
  },
  {
    id: 10,
    nazov: 'mergeSortPeople – ľudia podľa veku Merge Sortom',
    napovedy: [
      'Rovnaké ako mergeSortP, len pri spájaní porovnávaš a[i].age < b[j].age.',
      'Napíš si vnútri pomocnú funkciu spoj(a, b) a mergeSortPeople volaj rekurzívne.',
      'if (people.length <= 1) return people; const mid = …; const l = mergeSortPeople(people.slice(0, mid)); const r = mergeSortPeople(people.slice(mid)); a potom ich spoj podľa .age',
    ],
    testy: (m, { rovne, nepouziva, rekurzivna }) => {
      const p = [{ n: 'A', age: 40 }, { n: 'B', age: 18 }, { n: 'C', age: 25 }, { n: 'D', age: 33 }];
      rovne(m.mergeSortPeople(p).map(x => x.n), ['B', 'C', 'D', 'A'], 'mergeSortPeople(...) – poradie');
      nepouziva(m.mergeSortPeople, BEZ_SORT, 'napíš to bez .sort()');
      rekurzivna(m.mergeSortPeople);
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
