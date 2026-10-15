'use strict';

const teoria = [
  {
    id: 1,
    otazka: 'Aká je rýchlosť lineárneho vyhľadávania v NAJHORŠOM prípade?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    spravna: 'c',
    napoveda: 'Najhorší prípad: prvok je posledný alebo tam vôbec nie je.',
    vysvetlenie: 'V najhoršom prípade treba pozrieť všetkých n prvkov, takže O(n).',
  },
  {
    id: 2,
    otazka: 'Kedy MUSÍŠ použiť lineárne vyhľadávanie namiesto binárneho?',
    moznosti: ['Keď je pole zotriedené.', 'Keď pole nie je zotriedené.', 'Keď má pole viac ako 100 prvkov.', 'Nikdy, binárne funguje vždy.'],
    spravna: 'b',
    napoveda: 'Čo potrebuje binárne vyhľadávanie, aby fungovalo?',
    vysvetlenie: 'Binárne vyhľadávanie funguje len na zotriedenom poli. Na nezotriedenom treba ísť prvok po prvku.',
  },
  {
    id: 3,
    otazka: 'Čo vráti arr.indexOf(x), keď x v poli NIE JE?',
    moznosti: ['undefined', 'null', '-1', 'false'],
    spravna: 'c',
    napoveda: 'Je to číslo, ktoré nemôže byť platným indexom.',
    vysvetlenie: 'indexOf vráti -1. Indexy sú 0 a viac, takže -1 jasne znamená „nenašiel som“.',
  },
  {
    id: 4,
    otazka: 'Aký je rozdiel medzi arr.find(fn) a arr.findIndex(fn)?',
    moznosti: [
      'Žiadny.',
      'find vráti samotný prvok, findIndex vráti jeho index.',
      'find vráti index, findIndex vráti prvok.',
      'find hľadá od konca, findIndex od začiatku.',
    ],
    spravna: 'b',
    napoveda: 'Pozri sa na koniec názvu: …Index.',
    vysvetlenie: 'find vráti prvý prvok, pre ktorý funkcia vráti true (alebo undefined). findIndex vráti jeho index (alebo -1).',
  },
  {
    id: 5,
    otazka: 'Čo znamená šípková funkcia x => x > 5?',
    moznosti: [
      'Premenná x je väčšia ako 5.',
      'Funkcia, ktorá dostane x a vráti, či je x väčšie ako 5.',
      'Cyklus od x po 5.',
      'Porovnanie dvoch polí.',
    ],
    spravna: 'b',
    napoveda: 'Pred šípkou je parameter, za šípkou to, čo funkcia vráti.',
    vysvetlenie: 'x => x > 5 je skratka za function (x) { return x > 5; }.',
  },
  {
    id: 6,
    otazka: 'Aký je NAJLEPŠÍ prípad binárneho vyhľadávania?',
    moznosti: ['O(1) – hľadaný prvok je hneď v strede.', 'O(log n)', 'O(n)', 'O(n log n)'],
    spravna: 'a',
    napoveda: 'Čo ak sa trafíš hneď prvým stredom?',
    vysvetlenie: 'Ak je hľadaný prvok práve v strede, nájdeme ho hneď v prvom kroku, teda O(1).',
  },
  {
    id: 7,
    otazka: 'Prečo v binárnom vyhľadávaní počítame stred cez Math.floor((left + right) / 2)?',
    moznosti: [
      'Aby bol výsledok väčší.',
      'Lebo index musí byť celé číslo a (left + right) / 2 môže byť napríklad 1.5.',
      'Lebo bez toho by bol stred vždy 0.',
      'Je to len zvyk, nemá to vplyv.',
    ],
    spravna: 'b',
    napoveda: 'Čo je arr[1.5]?',
    vysvetlenie: 'Pole nemá šuplík 1.5, arr[1.5] je undefined. Math.floor zaokrúhli nadol na celé číslo.',
  },
  {
    id: 8,
    otazka: 'V naivnom hľadaní v texte porovnávame text[i + j] s pattern[j]. Čo znamená i?',
    moznosti: [
      'Koľké písmeno vzoru kontrolujeme.',
      'Miesto v texte, kam sme vzor priložili (jeho začiatok).',
      'Počet nájdených výskytov.',
      'Dĺžku vzoru.',
    ],
    spravna: 'b',
    napoveda: 'Vonkajší cyklus posúva vzor po texte.',
    vysvetlenie: 'i je začiatok, kam vzor prikladáme. j je posun vo vzore. Preto písmeno v texte je text[i + j].',
  },
  {
    id: 9,
    otazka: 'Aká je rýchlosť naivného hľadania slova dĺžky m v texte dĺžky n?',
    moznosti: ['O(n)', 'O(m)', 'O(n · m)', 'O(log n)'],
    spravna: 'c',
    napoveda: 'Je tam cyklus v cykle. Koľkokrát beží vonkajší a koľkokrát vnútorný?',
    vysvetlenie: 'Pre každé z n miest v texte porovnávame až m písmen, takže O(n · m).',
  },
  {
    id: 10,
    otazka: 'Čo urobí príkaz break vnútri cyklu?',
    moznosti: [
      'Preskočí aktuálny krok a pokračuje ďalším.',
      'Okamžite ukončí cyklus.',
      'Ukončí celý program.',
      'Vráti hodnotu z funkcie.',
    ],
    spravna: 'b',
    napoveda: 'break = zlomiť, prerušiť.',
    vysvetlenie: 'break okamžite ukončí najbližší cyklus. Program pokračuje kódom za cyklom. (Preskočenie jedného kroku robí continue.)',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([5, 8, 2].indexOf(8));',
    moznosti: ['8', '1', '2', 'true'],
    spravna: 'b',
    napoveda: 'indexOf vracia index, nie hodnotu.',
    vysvetlenie: '8 je na indexe 1.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([5, 8, 2].indexOf(9));',
    moznosti: ['undefined', '-1', 'false', '3'],
    spravna: 'b',
    napoveda: 'Čo vracia indexOf, keď nič nenájde?',
    vysvetlenie: '9 v poli nie je, takže indexOf vráti -1.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log([1, 2, 3].includes('2'));",
    moznosti: ['true', 'false', '1', 'undefined'],
    spravna: 'b',
    napoveda: "Je číslo 2 to isté ako text '2'?",
    vysvetlenie: "includes porovnáva cez ===. Text '2' nie je číslo 2, takže false.",
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([3, 7, 10].find(x => x > 5));',
    moznosti: ['7', '1', '[ 7, 10 ]', 'true'],
    spravna: 'a',
    napoveda: 'find vráti PRVÝ prvok, ktorý vyhovuje.',
    vysvetlenie: 'Prvý prvok väčší ako 5 je 7. find skončí hneď, ako ho nájde.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([3, 7, 10].findIndex(x => x > 5));',
    moznosti: ['7', '1', '2', '-1'],
    spravna: 'b',
    napoveda: 'findIndex vráti index, nie prvok.',
    vysvetlenie: 'Prvý prvok väčší ako 5 je 7 a je na indexe 1.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([1, 2].find(x => x > 5));',
    moznosti: ['-1', 'undefined', 'null', 'false'],
    spravna: 'b',
    napoveda: 'find nenašiel nič. Vracia -1 ako findIndex?',
    vysvetlenie: 'find vráti undefined, keď nič nevyhovuje. -1 vracia findIndex a indexOf.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: "const text = 'aaa';\nconst vzor = 'aa';\nlet count = 0;\nfor (let i = 0; i < text.length; i++) {\n  for (let j = 0; j < vzor.length; j++) {\n    if (text[i + j] !== vzor[j]) break;\n    if (j === vzor.length - 1) count++;\n  }\n}\nconsole.log(count);",
    moznosti: ['1', '2', '3', '0'],
    spravna: 'b',
    napoveda: 'Priložíme vzor na i = 0, 1, 2. Kde sedí celé "aa"?',
    vysvetlenie: 'i = 0: "aa" sedí. i = 1: "aa" sedí. i = 2: text[3] neexistuje, nesedí. Spolu 2 (výskyty sa môžu prekrývať).',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let left = 0;\nlet right = 7;\nlet kroky = 0;\nwhile (left <= right) {\n  const mid = Math.floor((left + right) / 2);\n  kroky++;\n  if (mid === 7) break;\n  left = mid + 1;\n}\nconsole.log(kroky);',
    moznosti: ['8', '3', '4', '7'],
    spravna: 'c',
    napoveda: 'Zapíš si mid v každom kroku: (0 + 7) / 2 → 3, potom left = 4…',
    vysvetlenie: 'mid ide 3 → 5 → 6 → 7. To sú 4 kroky. Lineárne by sme potrebovali 8.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log('ahoj'.includes('ho'));",
    moznosti: ['true', 'false', '1', '2'],
    spravna: 'a',
    napoveda: 'Je kúsok "ho" niekde v slove "ahoj"?',
    vysvetlenie: 'a-ho-j: kúsok "ho" tam je, takže true.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: 'for (let i = 0; i < 5; i++) {\n  if (i === 2) break;\n  console.log(i);\n}',
    moznosti: ['0\n1', '0\n1\n2', '0\n1\n3\n4', '2'],
    spravna: 'a',
    napoveda: 'break ukončí celý cyklus. Vypíše sa ešte 2?',
    vysvetlenie: 'Vypíše sa 0 a 1. Pri i = 2 sa break vykoná skôr ako console.log, a cyklus skončí.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'linearSearch – index prvku, inak -1',
    napovedy: [
      'linearSearch([5, 8], 5) vráti -1. Kontroluje sa vôbec prvý prvok?',
      'Cyklus začína na i = 1. Prvý prvok má index 0.',
      'Zmeň let i = 1 na let i = 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.linearSearch([5, 8], 5), 0, 'linearSearch([5, 8], 5)');
      rovne(m.linearSearch([5, 8, 1], 1), 2, 'linearSearch([5, 8, 1], 1)');
      rovne(m.linearSearch([5, 8], 9), -1, 'linearSearch([5, 8], 9)');
    },
  },
  {
    id: 2,
    nazov: 'includesValue – je x v poli?',
    napovedy: [
      'includesValue([1, 2, 3], 3) vráti false. Koľko prvkov funkcia naozaj skontroluje?',
      'return false v else ukončí funkciu hneď po prvom prvku, ktorý nesedí. Odpoveď „nie“ vieme až po prejdení VŠETKÝCH.',
      'Zmaž else s return false z cyklu a za cyklus daj return false;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.includesValue([1, 2, 3], 1), true, 'includesValue([1, 2, 3], 1)');
      rovne(m.includesValue([1, 2, 3], 3), true, 'includesValue([1, 2, 3], 3)');
      rovne(m.includesValue([1, 2, 3], 7), false, 'includesValue([1, 2, 3], 7)');
    },
  },
  {
    id: 3,
    nazov: 'indexOfLast – index POSLEDNÉHO výskytu',
    napovedy: [
      'indexOfLast([1, 2, 3], 1) vráti -1. Kontroluje sa index 0?',
      'Cyklus ide odzadu a musí skončiť až PO indexe 0. Podmienka i > 0 ho vynechá.',
      'Zmeň i > 0 na i >= 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.indexOfLast([1, 2, 1], 1), 2, 'indexOfLast([1, 2, 1], 1)');
      rovne(m.indexOfLast([1, 2, 3], 1), 0, 'indexOfLast([1, 2, 3], 1)');
      rovne(m.indexOfLast([1, 2, 3], 9), -1, 'indexOfLast([1, 2, 3], 9)');
    },
  },
  {
    id: 4,
    nazov: 'binarySearch – binárne vyhľadávanie',
    napovedy: [
      'Pre pole so 4 prvkami vyjde stred 1.5. Čo je arr[1.5]?',
      'Index musí byť celé číslo. Ktorá funkcia Math.… zaokrúhli nadol?',
      'Zmeň (left + right) / 2 na Math.floor((left + right) / 2).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.binarySearch([1, 2, 3, 4], 4), 3, 'binarySearch([1, 2, 3, 4], 4)');
      rovne(m.binarySearch([1, 2, 3, 4], 2), 1, 'binarySearch([1, 2, 3, 4], 2)');
      rovne(m.binarySearch([1, 2, 3, 4], 9), -1, 'binarySearch([1, 2, 3, 4], 9)');
    },
  },
  {
    id: 5,
    nazov: 'naiveSearch – koľkokrát je vzor v texte',
    napovedy: [
      'Porovnávame písmeno textu s písmenom vzoru. Ktorým indexom sa ide po vzore?',
      'Po vzore sa ide indexom j (i je začiatok v texte).',
      'Zmeň pattern[i] na pattern[j].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.naiveSearch('lorie loled', 'lol'), 1, "naiveSearch('lorie loled', 'lol')");
      rovne(m.naiveSearch('ababab', 'ab'), 3, "naiveSearch('ababab', 'ab')");
      rovne(m.naiveSearch('abc', 'x'), 0, "naiveSearch('abc', 'x')");
    },
  },
  {
    id: 6,
    nazov: 'countPattern – koľkokrát je vzor v texte',
    napovedy: [
      'Funkcia vráti vždy 0. Kedy sa zvyšuje count?',
      'j ide od 0 po pattern.length - 1. Hodnotu pattern.length nikdy nedosiahne.',
      'Zmeň j === pattern.length na j === pattern.length - 1.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countPattern('wowomgzomg', 'omg'), 2, "countPattern('wowomgzomg', 'omg')");
      rovne(m.countPattern('aaa', 'a'), 3, "countPattern('aaa', 'a')");
    },
  },
  {
    id: 7,
    nazov: 'findFirstBig – prvé číslo VÄČŠIE ako limit',
    napovedy: [
      'findFirstBig([1, 5, 10], 5) vráti 5. Je 5 väčšie ako 5?',
      '>= znamená „väčšie alebo rovné“. Chceme len „väčšie“.',
      'Zmeň x >= limit na x > limit.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.findFirstBig([1, 5, 10], 5), 10, 'findFirstBig([1, 5, 10], 5)');
      rovne(m.findFirstBig([1, 2], 5), undefined, 'findFirstBig([1, 2], 5)');
    },
  },
  {
    id: 8,
    nazov: 'findUser – nájdi objekt používateľa podľa mena',
    napovedy: [
      'Funkcia vracia číslo namiesto objektu. Ktorá metóda vracia index?',
      'findIndex vráti index, find vráti samotný prvok.',
      'Zmeň findIndex na find.',
    ],
    testy: (m, { rovne }) => {
      const ludia = [{ name: 'Eva', age: 20 }, { name: 'Adam', age: 30 }];
      rovne(m.findUser(ludia, 'Adam'), { name: 'Adam', age: 30 }, "findUser(ludia, 'Adam')");
      rovne(m.findUser(ludia, 'Jano'), undefined, "findUser(ludia, 'Jano')");
    },
  },
  {
    id: 9,
    nazov: 'searchSorted – lineárne hľadanie v zotriedenom poli so skorým koncom',
    napovedy: [
      'searchSorted([1, 3, 5], 5) vráti -1 hneď na začiatku. Kedy môžeme prestať hľadať?',
      'V zotriedenom poli: keď je aktuálne číslo už VÄČŠIE ako hľadané, ďalej ho nenájdeme.',
      'Zmeň arr[i] < x na arr[i] > x.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.searchSorted([1, 3, 5], 5), 2, 'searchSorted([1, 3, 5], 5)');
      rovne(m.searchSorted([1, 3, 5], 4), -1, 'searchSorted([1, 3, 5], 4)');
    },
  },
  {
    id: 10,
    nazov: 'firstMatchIndex – kde v texte začína vzor',
    napovedy: [
      "firstMatchIndex('ahoj svet', 'svet') má byť 5. Čo funkcia vracia, keď nájde zhodu?",
      'Začiatok vzoru v texte je i. j je len posun vo vzore.',
      'Zmeň return j; na return i;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.firstMatchIndex('ahoj svet', 'svet'), 5, "firstMatchIndex('ahoj svet', 'svet')");
      rovne(m.firstMatchIndex('abc', 'x'), -1, "firstMatchIndex('abc', 'x')");
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'linSearch – vráť index',
    napovedy: ['Funkcia má vrátiť index nájdeného prvku. V ktorej premennej je?', 'Index v cykle je i.', 'Nahraď ___ písmenom i.'],
    testy: (m, { rovne }) => {
      rovne(m.linSearch([4, 6, 8], 8), 2, 'linSearch([4, 6, 8], 8)');
    },
  },
  {
    id: 2,
    nazov: 'linSearchMissing – nič nenašiel',
    napovedy: ['Čo sa vracia, keď prvok v poli nie je?', 'Rovnaké číslo ako pri indexOf.', 'Nahraď ___ číslom -1.'],
    testy: (m, { rovne }) => {
      rovne(m.linSearchMissing([4, 6, 8], 1), -1, 'linSearchMissing([4, 6, 8], 1)');
      rovne(m.linSearchMissing([4, 6, 8], 4), 0, 'linSearchMissing([4, 6, 8], 4)');
    },
  },
  {
    id: 3,
    nazov: 'hasItem – cez hotovú metódu',
    napovedy: ['Ktorá metóda vráti index alebo -1?', 'index + Of', 'Nahraď ___ slovom indexOf.'],
    testy: (m, { rovne }) => {
      rovne(m.hasItem(['a', 'b'], 'b'), true, "hasItem(['a', 'b'], 'b')");
      rovne(m.hasItem(['a', 'b'], 'c'), false, "hasItem(['a', 'b'], 'c')");
    },
  },
  {
    id: 4,
    nazov: 'findAbove – prvý väčší ako limit',
    napovedy: ['S čím porovnávame x?', 'Druhý parameter funkcie je limit.', 'Nahraď ___ slovom limit.'],
    testy: (m, { rovne }) => {
      rovne(m.findAbove([2, 9, 4], 3), 9, 'findAbove([2, 9, 4], 3)');
    },
  },
  {
    id: 5,
    nazov: 'binFind – pravý okraj',
    napovedy: ['Kde začína pravý okraj?', 'Na poslednom indexe.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.binFind([1, 4, 9, 16], 16), 3, 'binFind([1, 4, 9, 16], 16)');
      rovne(m.binFind([1, 4, 9, 16], 5), -1, 'binFind([1, 4, 9, 16], 5)');
    },
  },
  {
    id: 6,
    nazov: 'binHas – nenašli sme',
    napovedy: ['Funkcia vracia true/false. Čo vrátiť, keď cyklus skončí bez nájdenia?', 'Prvok tam nie je.', 'Nahraď ___ slovom false.'],
    testy: (m, { rovne }) => {
      rovne(m.binHas([1, 4, 9], 9), true, 'binHas([1, 4, 9], 9)');
      rovne(m.binHas([1, 4, 9], 2), false, 'binHas([1, 4, 9], 2)');
    },
  },
  {
    id: 7,
    nazov: 'naiveCount – dĺžka vnútorného cyklu',
    napovedy: ['Vnútorný cyklus ide po písmenách vzoru. Ako sa volá parameter so vzorom?', 'Vzor je pattern.', 'Nahraď ___ slovom pattern.'],
    testy: (m, { rovne }) => {
      rovne(m.naiveCount('harold said haha in hamburg', 'ha'), 4, "naiveCount('harold said haha in hamburg', 'ha')");
    },
  },
  {
    id: 8,
    nazov: 'naiveCount2 – index vo vzore',
    napovedy: ['Písmeno textu je text[i + j]. Aký index má zodpovedajúce písmeno vzoru?', 'Posun vo vzore je j.', 'Nahraď ___ písmenom j.'],
    testy: (m, { rovne }) => {
      rovne(m.naiveCount2('lorie loled', 'lol'), 1, "naiveCount2('lorie loled', 'lol')");
      rovne(m.naiveCount2('aaaa', 'aa'), 3, "naiveCount2('aaaa', 'aa')");
    },
  },
  {
    id: 9,
    nazov: 'naiveCount3 – posledné písmeno vzoru',
    napovedy: ['Aký index má posledné písmeno vzoru?', 'Posledný index = dĺžka mínus…', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.naiveCount3('abcabc', 'abc'), 2, "naiveCount3('abcabc', 'abc')");
    },
  },
  {
    id: 10,
    nazov: 'findAllIndexes – všetky indexy výskytu (dve ___)',
    napovedy: [
      'Prvé ___: s čím začína zoznam výsledkov? Druhé ___: čo do neho pridávame – prvok, či jeho index?',
      'Na začiatku je prázdne pole. Pridávame index, ten je v i.',
      'Prvé ___ nahraď [], druhé ___ nahraď i.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.findAllIndexes([1, 2, 1, 3, 1], 1), [0, 2, 4], 'findAllIndexes([1, 2, 1, 3, 1], 1)');
      rovne(m.findAllIndexes([1, 2], 5), [], 'findAllIndexes([1, 2], 5)');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'linearSearchP – index alebo -1',
    napovedy: [
      'Prejdi indexy cyklom for a porovnávaj arr[i] === x.',
      'Pri zhode hneď return i. Za cyklom return -1.',
      'for (let i = 0; i < arr.length; i++) { if (arr[i] === x) return i; } return -1;',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.linearSearchP([10, 15, 20, 25, 30], 15), 1, 'linearSearchP([10, 15, 20, 25, 30], 15)');
      rovne(m.linearSearchP([9, 8, 7, 6], 4), -1, 'linearSearchP([9, 8, 7, 6], 4)');
      nepouziva(m.linearSearchP, /indexOf|findIndex/, 'skús to bez indexOf / findIndex – napíš vlastný cyklus');
    },
  },
  {
    id: 2,
    nazov: 'containsValue – je x v poli? (true / false)',
    napovedy: [
      'Ako úloha 1, len vraciaš true / false.',
      'Pri zhode return true, za cyklom return false.',
      'for (const y of arr) { if (y === x) return true; } return false;',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.containsValue([3, 1], 1), true, 'containsValue([3, 1], 1)');
      rovne(m.containsValue([], 1), false, 'containsValue([], 1)');
      nepouziva(m.containsValue, /includes|indexOf/, 'skús to bez includes / indexOf – napíš vlastný cyklus');
    },
  },
  {
    id: 3,
    nazov: 'countValue – koľkokrát je x v poli',
    napovedy: [
      'Počítadlo let pocet = 0 a cyklus.',
      'Pri každej zhode pocet++.',
      'let pocet = 0; for (const y of arr) { if (y === x) pocet++; } return pocet;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countValue([1, 2, 1, 1], 1), 3, 'countValue([1, 2, 1, 1], 1)');
      rovne(m.countValue([1, 2], 3), 0, 'countValue([1, 2], 3)');
    },
  },
  {
    id: 4,
    nazov: 'findAllPositions – pole všetkých indexov, kde je x',
    napovedy: [
      'Prázdne pole na výsledky a cyklus cez indexy.',
      'Pri zhode result.push(i).',
      'const result = []; for (let i = 0; i < arr.length; i++) { if (arr[i] === x) result.push(i); } return result;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.findAllPositions(['a', 'b', 'a'], 'a'), [0, 2], "findAllPositions(['a', 'b', 'a'], 'a')");
      rovne(m.findAllPositions([], 'a'), [], "findAllPositions([], 'a')");
    },
  },
  {
    id: 5,
    nazov: 'lastIndex – index posledného výskytu, inak -1',
    napovedy: [
      'Choď cyklom odzadu: for (let i = arr.length - 1; i >= 0; i--).',
      'Prvá zhoda odzadu je posledný výskyt.',
      'for (let i = arr.length - 1; i >= 0; i--) { if (arr[i] === x) return i; } return -1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.lastIndex([4, 5, 4, 6], 4), 2, 'lastIndex([4, 5, 4, 6], 4)');
      rovne(m.lastIndex([4, 5], 7), -1, 'lastIndex([4, 5], 7)');
      rovne(m.lastIndex([4, 5], 4), 0, 'lastIndex([4, 5], 4)');
    },
  },
  {
    id: 6,
    nazov: 'binarySearchP – binárne vyhľadávanie',
    napovedy: [
      'left = 0, right = arr.length - 1, while (left <= right).',
      'mid = Math.floor((left + right) / 2). Rovná sa → return mid. Menší → left = mid + 1. Väčší → right = mid - 1.',
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.binarySearchP([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 95), 16, 'binarySearchP([5, …, 99], 95)');
      rovne(m.binarySearchP([1, 2, 3, 4, 5], 1), 0, 'binarySearchP([1, 2, 3, 4, 5], 1)');
      rovne(m.binarySearchP([1, 2, 3, 4, 5], 6), -1, 'binarySearchP([1, 2, 3, 4, 5], 6)');
    },
  },
  {
    id: 7,
    nazov: 'firstGreater – prvý prvok väčší ako limit, inak undefined',
    napovedy: [
      'Môžeš použiť arr.find so šípkovou funkciou.',
      'Funkcia pre find: x => x > limit.',
      'return arr.find(x => x > limit);',
    ],
    testy: (m, { rovne }) => {
      rovne(m.firstGreater([1, 8, 3, 9], 5), 8, 'firstGreater([1, 8, 3, 9], 5)');
      rovne(m.firstGreater([1, 2], 5), undefined, 'firstGreater([1, 2], 5)');
    },
  },
  {
    id: 8,
    nazov: 'findByName – objekt s daným menom, inak null',
    napovedy: [
      'Prejdi pole objektov a porovnaj p.name s name.',
      'Pri zhode vráť celý objekt p. Za cyklom return null.',
      'for (const p of people) { if (p.name === name) return p; } return null;',
    ],
    testy: (m, { rovne }) => {
      const ludia = [{ name: 'Eva', city: 'Bánovce' }, { name: 'Ján', city: 'Trenčín' }];
      rovne(m.findByName(ludia, 'Ján'), { name: 'Ján', city: 'Trenčín' }, "findByName(ludia, 'Ján')");
      rovne(m.findByName(ludia, 'Ivan'), null, "findByName(ludia, 'Ivan')");
    },
  },
  {
    id: 9,
    nazov: 'naiveStringSearch – koľkokrát je short v long',
    napovedy: [
      'Dva cykly: i cez long, j cez short.',
      'Ak long[i + j] !== short[j] → break. Ak j === short.length - 1 → count++.',
      'Celé riešenie je v teórii v časti 4.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.naiveStringSearch('lorie loled', 'lol'), 1, "naiveStringSearch('lorie loled', 'lol')");
      rovne(m.naiveStringSearch('omgomgomg', 'omg'), 3, "naiveStringSearch('omgomgomg', 'omg')");
      rovne(m.naiveStringSearch('abc', 'd'), 0, "naiveStringSearch('abc', 'd')");
      nepouziva(m.naiveStringSearch, /indexOf|includes|split|match/, 'napíš to dvoma cyklami, bez indexOf / includes / split / match');
    },
  },
  {
    id: 10,
    nazov: 'findWordIndex – kde v texte začína slovo, inak -1',
    napovedy: [
      'Ako úloha 9, ale pri prvej celej zhode hneď vráť i.',
      'Ak j === word.length - 1 → return i. Za oboma cyklami return -1.',
      'for (let i = 0; i < text.length; i++) { for (let j = 0; j < word.length; j++) { if (text[i + j] !== word[j]) break; if (j === word.length - 1) return i; } } return -1;',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.findWordIndex('dobrý deň', 'deň'), 6, "findWordIndex('dobrý deň', 'deň')");
      rovne(m.findWordIndex('abcabc', 'ca'), 2, "findWordIndex('abcabc', 'ca')");
      rovne(m.findWordIndex('abc', 'x'), -1, "findWordIndex('abc', 'x')");
      nepouziva(m.findWordIndex, /indexOf|includes|search\(/, 'napíš to dvoma cyklami, bez indexOf / includes / search');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
