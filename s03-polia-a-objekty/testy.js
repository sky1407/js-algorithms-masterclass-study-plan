'use strict';

const teoria = [
  {
    id: 1,
    otazka: 'Aký index (číslo šuplíka) má PRVÝ prvok poľa?',
    moznosti: ['1', '0', '-1', 'záleží na dĺžke poľa'],
    spravna: 'b',
    napoveda: 'V JavaScripte sa šuplíky číslujú od nuly.',
    vysvetlenie: 'Indexy začínajú od 0. Prvý prvok je arr[0], druhý arr[1] a tak ďalej.',
  },
  {
    id: 2,
    otazka: 'Ako sa dostaneš k POSLEDNÉMU prvku poľa arr?',
    moznosti: ['arr[arr.length]', 'arr[arr.length - 1]', 'arr[-1]', 'arr.last'],
    spravna: 'b',
    napoveda: 'Pole s 3 prvkami má indexy 0, 1, 2. Aké číslo má posledný šuplík v porovnaní s dĺžkou 3?',
    vysvetlenie: 'Pole s dĺžkou 3 má indexy 0, 1, 2, takže posledný je length - 1. arr[arr.length] je už prázdny šuplík (undefined).',
  },
  {
    id: 3,
    otazka: 'Ktorá operácia je pri veľkom poli POMALÁ?',
    moznosti: ['arr.push(x)', 'arr.pop()', 'arr.unshift(x)', 'arr[5]'],
    spravna: 'c',
    napoveda: 'Pomalé je to, pri čom sa musia všetky prvky posunúť a dostať nové číslo.',
    vysvetlenie: 'unshift pridáva na začiatok, takže všetky ostatné prvky sa musia posunúť o jedno miesto. To je O(n). push, pop a prístup cez index sú O(1).',
  },
  {
    id: 4,
    otazka: 'Prečo je arr.shift() (vybratie prvého prvku) pomalé?',
    moznosti: [
      'Lebo JavaScript musí najprv pole zotriediť.',
      'Lebo všetky ostatné prvky sa musia posunúť a dostať nový index.',
      'Lebo shift vždy robí kópiu poľa.',
      'Nie je pomalé, je rovnako rýchle ako pop().',
    ],
    spravna: 'b',
    napoveda: 'Predstav si, že vyberieš vec zo šuplíka 0. Čo sa musí stať s vecami v šuplíkoch 1, 2, 3…?',
    vysvetlenie: 'Po vybratí prvého prvku sa prvok z indexu 1 presunie na 0, z 2 na 1 atď. Pri n prvkoch je to n presunov, teda O(n).',
  },
  {
    id: 5,
    otazka: 'Kľúč máš uložený v premennej: const kluc = "vek". Ako prečítaš hodnotu z objektu osoba?',
    moznosti: ['osoba.kluc', 'osoba[kluc]', 'osoba["kluc"]', 'osoba(kluc)'],
    spravna: 'b',
    napoveda: 'Bodka hľadá šuplík s doslovným menom. Čo treba použiť, keď je meno v premennej?',
    vysvetlenie: 'osoba[kluc] pozrie do premennej kluc, nájde tam "vek" a otvorí šuplík vek. osoba.kluc a osoba["kluc"] hľadajú šuplík, ktorý sa doslova volá "kluc".',
  },
  {
    id: 6,
    otazka: 'Aká rýchla (Big O) je operácia osoba["meno"] – prístup do objektu cez kľúč?',
    moznosti: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
    spravna: 'a',
    napoveda: 'Musí JavaScript prezerať všetky šuplíky, alebo ide rovno do toho s menom?',
    vysvetlenie: 'Prístup cez kľúč je O(1): JavaScript ide rovno do správneho šuplíka bez ohľadu na to, koľko ich v objekte je.',
  },
  {
    id: 7,
    otazka: 'Čo vráti Object.keys({ a: 1, b: 2 })?',
    moznosti: ["['a', 'b']", '[1, 2]', "[['a', 1], ['b', 2]]", '2'],
    spravna: 'a',
    napoveda: 'keys = kľúče, teda mená šuplíkov.',
    vysvetlenie: "Object.keys vráti pole kľúčov ['a', 'b']. Hodnoty [1, 2] vráti Object.values a dvojice Object.entries.",
  },
  {
    id: 8,
    otazka: 'Ktorá z týchto hodnôt sa v podmienke if (...) berie ako „NIE“ (falsy)?',
    moznosti: ["'0'", '[]', '0', '-1'],
    spravna: 'c',
    napoveda: 'Falsy je len 6 hodnôt: false, 0, prázdny text, undefined, null, NaN.',
    vysvetlenie: "Číslo 0 je falsy. Text '0', prázdne pole [] aj -1 sú truthy. Preto if (pocty[x]) zlyhá, keď je v šuplíku 0.",
  },
  {
    id: 9,
    otazka: 'Čo znamená, že funkcia je O(n)?',
    moznosti: [
      'Trvá vždy presne n sekúnd.',
      'Je rovnako rýchla pre 10 aj pre milión prvkov.',
      'Keď je prvkov 2× viac, práce je približne 2× viac.',
      'Keď je prvkov 2× viac, práce je 4× viac.',
    ],
    spravna: 'c',
    napoveda: 'O(n) typicky znamená jeden cyklus cez všetky prvky.',
    vysvetlenie: 'O(n) znamená, že práca rastie rovnakým tempom ako počet prvkov. Rovnaká rýchlosť pre každé n je O(1), 4× viac práce pri 2× viac prvkoch je O(n²).',
  },
  {
    id: 10,
    otazka: 'Chceš kópiu časti poľa a pôvodné pole NESMIEŠ zmeniť. Čo použiješ?',
    moznosti: ['arr.slice(1, 3)', 'arr.reverse()', 'arr.sort()', 'arr.shift()'],
    spravna: 'a',
    napoveda: 'Ktorá z metód v tabuľke v 0-teoria.md má v stĺpci „Mení pôvodné pole?“ napísané nie?',
    vysvetlenie: 'slice vytvorí nové pole a pôvodné nechá tak. reverse a sort menia pôvodné pole, shift z neho vyberie prvok.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: "const arr = [10, 20, 30];\nconsole.log(arr[1]);",
    moznosti: ['10', '20', '30', 'undefined'],
    spravna: 'b',
    napoveda: 'Indexy začínajú od 0.',
    vysvetlenie: 'arr[0] je 10, arr[1] je 20. Index 1 je DRUHÝ prvok.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: "const arr = [10, 20, 30];\nconsole.log(arr[arr.length]);",
    moznosti: ['30', '3', 'undefined', 'Chyba: TypeError'],
    spravna: 'c',
    napoveda: 'arr.length je 3. Existuje šuplík s indexom 3?',
    vysvetlenie: 'arr.length je 3, ale posledný index je 2. Šuplík 3 neexistuje, takže výsledok je undefined (nie chyba).',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: "const a = [1, 2];\nconst x = a.push(3);\nconsole.log(x);",
    moznosti: ['[ 1, 2, 3 ]', '3', 'undefined', 'true'],
    spravna: 'b',
    napoveda: 'Pozri sa do teórie, čo push VRACIA.',
    vysvetlenie: 'push pridá prvok a vráti NOVÚ DĹŽKU poľa. Pole má teraz 3 prvky, takže x je 3.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: "const a = [1, 2, 3];\na.pop();\nconsole.log(a);",
    moznosti: ['[ 1, 2, 3 ]', '[ 2, 3 ]', '[ 1, 2 ]', '3'],
    spravna: 'c',
    napoveda: 'pop berie z konca. Vypisujeme pole, nie to, čo pop vrátil.',
    vysvetlenie: 'pop odstráni posledný prvok (3). V poli ostane [ 1, 2 ].',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód? (dva riadky)',
    kod: "const osoba = { meno: 'Eva' };\nconst kluc = 'meno';\nconsole.log(osoba.kluc);\nconsole.log(osoba[kluc]);",
    moznosti: ['Eva\nEva', 'undefined\nEva', 'Eva\nundefined', 'undefined\nundefined'],
    spravna: 'b',
    napoveda: 'osoba.kluc hľadá šuplík s menom "kluc". osoba[kluc] použije obsah premennej.',
    vysvetlenie: 'osoba.kluc hľadá kľúč "kluc", ten neexistuje → undefined. osoba[kluc] je osoba["meno"] → Eva.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: "const pocty = {};\nfor (const x of ['a', 'b', 'a']) {\n  pocty[x] = (pocty[x] || 0) + 1;\n}\nconsole.log(pocty.a);",
    moznosti: ['1', '2', '3', 'NaN'],
    spravna: 'b',
    napoveda: 'Koľkokrát je v poli písmeno a?',
    vysvetlenie: "Prvé 'a': pocty.a = (undefined || 0) + 1 = 1. Druhé 'a': pocty.a = (1 || 0) + 1 = 2.",
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: "const obj = { x: 1, y: 2, z: 3 };\nconsole.log(Object.keys(obj).length);",
    moznosti: ['1', '3', '6', 'undefined'],
    spravna: 'b',
    napoveda: 'Object.keys vráti pole kľúčov. Koľko ich je?',
    vysvetlenie: "Object.keys(obj) je ['x', 'y', 'z'] a jeho dĺžka je 3.",
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "const pocet = 0;\nif (pocet) {\n  console.log('áno');\n} else {\n  console.log('nie');\n}",
    moznosti: ['áno', 'nie', '0', 'nič, kód spadne'],
    spravna: 'b',
    napoveda: 'Je 0 v podmienke pravda alebo nepravda?',
    vysvetlenie: '0 je falsy, takže sa vykoná vetva else a vypíše sa nie.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (dva riadky)',
    kod: "const a = [1, 2, 3, 4];\nconst b = a.slice(1, 3);\nconsole.log(b);\nconsole.log(a.length);",
    moznosti: ['[ 2, 3 ]\n4', '[ 2, 3, 4 ]\n4', '[ 1, 2, 3 ]\n4', '[ 2, 3 ]\n2'],
    spravna: 'a',
    napoveda: 'slice(1, 3) berie od indexu 1 a koniec (index 3) sa NEpočíta. Mení slice pôvodné pole?',
    vysvetlenie: 'slice(1, 3) vezme indexy 1 a 2 → [ 2, 3 ]. Pôvodné pole sa nezmení, má stále 4 prvky.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: "const cisla = [10, 1, 2];\ncisla.sort();\nconsole.log(cisla);",
    moznosti: ['[ 1, 2, 10 ]', '[ 10, 2, 1 ]', '[ 1, 10, 2 ]', '[ 10, 1, 2 ]'],
    spravna: 'c',
    napoveda: 'sort() bez funkcie porovnáva čísla ako text, podľa prvej číslice.',
    vysvetlenie: "sort() bez (a, b) => a - b triedi ako text: '1' < '10' < '2'. Preto vyjde [ 1, 10, 2 ].",
  },
];

const debug = [
  {
    id: 1,
    nazov: 'lastItem – posledný prvok',
    napovedy: [
      'Pole [1, 2, 3] má dĺžku 3. Aké indexy má?',
      'Posledný index je vždy o 1 menší ako dĺžka.',
      'Zmeň arr[arr.length] na arr[arr.length - 1].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.lastItem([1, 2, 3]), 3, 'lastItem([1, 2, 3])');
      rovne(m.lastItem(['a']), 'a', "lastItem(['a'])");
    },
  },
  {
    id: 2,
    nazov: 'total – súčet všetkých čísel',
    napovedy: [
      'Ktorý prvok sa nepripočíta? Skús si súčet [5, 1] spočítať po krokoch.',
      'Cyklus začína od i = 1. Aký index má prvý prvok?',
      'Zmeň let i = 1 na let i = 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.total([5, 1]), 6, 'total([5, 1])');
      rovne(m.total([1, 2, 3]), 6, 'total([1, 2, 3])');
      rovne(m.total([]), 0, 'total([])');
    },
  },
  {
    id: 3,
    nazov: 'countItem – koľkokrát je x v poli',
    napovedy: [
      'Pozri sa na podmienku v if. Porovnáva, alebo priraďuje?',
      'Jedno = znamená „ulož“, tri === znamenajú „je rovné?“.',
      'Zmeň arr[i] = x na arr[i] === x.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countItem([1, 2, 1], 1), 2, 'countItem([1, 2, 1], 1)');
      rovne(m.countItem(['a', 'b'], 'c'), 0, "countItem(['a', 'b'], 'c')");
    },
  },
  {
    id: 4,
    nazov: 'findMax – najväčšie číslo',
    napovedy: [
      'Funguje to pre kladné čísla. Čo sa stane, keď sú všetky čísla záporné?',
      'Ak začneme s best = 0, žiadne záporné číslo nebude väčšie ako 0.',
      'Začni prvým prvkom: let best = arr[0];',
    ],
    testy: (m, { rovne }) => {
      rovne(m.findMax([3, 9, 2]), 9, 'findMax([3, 9, 2])');
      rovne(m.findMax([-5, -2, -9]), -2, 'findMax([-5, -2, -9])');
    },
  },
  {
    id: 5,
    nazov: 'getValue – hodnota objektu podľa kľúča',
    napovedy: [
      'Kľúč je v premennej key. Ako sa číta z objektu, keď je kľúč v premennej?',
      'obj.key hľadá šuplík, ktorý sa doslova volá "key".',
      'Zmeň obj.key na obj[key].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.getValue({ meno: 'Eva' }, 'meno'), 'Eva', "getValue({ meno: 'Eva' }, 'meno')");
      rovne(m.getValue({ a: 1, b: 2 }, 'b'), 2, "getValue({ a: 1, b: 2 }, 'b')");
    },
  },
  {
    id: 6,
    nazov: 'addItem – pridaj tovar na KONIEC košíka',
    napovedy: [
      'Tovar sa pridal, ale na zlé miesto.',
      'unshift pridáva na začiatok. Ktorá metóda pridáva na koniec?',
      'Zmeň cart.unshift(item) na cart.push(item).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.addItem(['chlieb'], 'mlieko'), ['chlieb', 'mlieko'], "addItem(['chlieb'], 'mlieko')");
      rovne(m.addItem([], 'syr'), ['syr'], "addItem([], 'syr')");
    },
  },
  {
    id: 7,
    nazov: 'frequency – koľkokrát je ktorý prvok',
    napovedy: [
      'Výsledok obsahuje NaN. Čo je v counts[x], keď prvok vidíme prvýkrát?',
      'undefined + 1 je NaN. Keď v šuplíku nič nie je, treba začať od 0.',
      'Zmeň counts[x] + 1 na (counts[x] || 0) + 1.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.frequency(['a', 'b', 'a']), { a: 2, b: 1 }, "frequency(['a', 'b', 'a'])");
      rovne(m.frequency([]), {}, 'frequency([])');
    },
  },
  {
    id: 8,
    nazov: 'hasKey – existuje kľúč v objekte?',
    napovedy: [
      'Skús hasKey({ pocet: 0 }, "pocet"). Kľúč tam je, ale aká je v ňom hodnota?',
      'Hodnota 0 je falsy, takže podmienka povie „nie“. Treba sa pýtať na kľúč, nie na hodnotu.',
      "Nahraď celý riadok za return key in obj;",
    ],
    testy: (m, { rovne }) => {
      rovne(m.hasKey({ a: 1 }, 'a'), true, "hasKey({ a: 1 }, 'a')");
      rovne(m.hasKey({ pocet: 0 }, 'pocet'), true, "hasKey({ pocet: 0 }, 'pocet')");
      rovne(m.hasKey({ a: 1 }, 'b'), false, "hasKey({ a: 1 }, 'b')");
    },
  },
  {
    id: 9,
    nazov: 'reverseCopy – otočená KÓPIA, pôvodné pole sa nemení',
    napovedy: [
      'Výsledok je správny, ale pôvodné pole sa zmenilo. Ktorá metóda mení pôvodné pole?',
      'reverse() otáča pôvodné pole. Najprv urob kópiu cez slice().',
      'Zmeň arr.reverse() na arr.slice().reverse().',
    ],
    testy: (m, { rovne }) => {
      const a = [1, 2, 3];
      rovne(m.reverseCopy(a), [3, 2, 1], 'reverseCopy([1, 2, 3])');
      rovne(a, [1, 2, 3], 'pôvodné pole po reverseCopy');
    },
  },
  {
    id: 10,
    nazov: 'sortNumbers – zoraď čísla od najmenšieho',
    napovedy: [
      'Pre [3, 1, 2] to funguje, pre [10, 1, 2] nie. Prečo? Pozri teóriu, časť 4.',
      'sort() bez funkcie triedi čísla ako text.',
      'Zmeň arr.sort() na arr.sort((a, b) => a - b).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sortNumbers([3, 1, 2]), [1, 2, 3], 'sortNumbers([3, 1, 2])');
      rovne(m.sortNumbers([10, 1, 2]), [1, 2, 10], 'sortNumbers([10, 1, 2])');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'first – prvý prvok',
    napovedy: ['Aký index má prvý prvok?', 'Indexy začínajú od nuly.', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      rovne(m.first([7, 8, 9]), 7, 'first([7, 8, 9])');
      rovne(m.first(['x']), 'x', "first(['x'])");
    },
  },
  {
    id: 2,
    nazov: 'last – posledný prvok',
    napovedy: ['Dĺžka je 3, posledný index je 2. Koľko treba odčítať?', 'Posledný index = dĺžka mínus jedna.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.last([7, 8, 9]), 9, 'last([7, 8, 9])');
      rovne(m.last(['x']), 'x', "last(['x'])");
    },
  },
  {
    id: 3,
    nazov: 'addToEnd – pridaj na koniec',
    napovedy: ['Ktorá metóda pridáva na koniec poľa?', 'Je to tá rýchla, O(1). Opak je pop.', 'Nahraď ___ slovom push.'],
    testy: (m, { rovne }) => {
      rovne(m.addToEnd([1, 2], 3), [1, 2, 3], 'addToEnd([1, 2], 3)');
    },
  },
  {
    id: 4,
    nazov: 'removeFirst – vyber prvý prvok a vráť ho',
    napovedy: ['Ktorá metóda vyberá zo ZAČIATKU poľa?', 'Opak unshift. Opak pop je push, opak unshift je…', 'Nahraď ___ slovom shift.'],
    testy: (m, { rovne }) => {
      const a = [5, 6, 7];
      rovne(m.removeFirst(a), 5, 'removeFirst([5, 6, 7])');
      rovne(a, [6, 7], 'pole po removeFirst');
    },
  },
  {
    id: 5,
    nazov: 'sumAll – súčet čísel',
    napovedy: ['Čo treba v každom kroku pripočítať k s?', 'Aktuálne číslo z cyklu je v premennej x.', 'Nahraď ___ písmenom x.'],
    testy: (m, { rovne }) => {
      rovne(m.sumAll([1, 2, 3]), 6, 'sumAll([1, 2, 3])');
      rovne(m.sumAll([]), 0, 'sumAll([])');
    },
  },
  {
    id: 6,
    nazov: 'getName – meno osoby',
    napovedy: ['Kľúč tu píšeme do hranatých zátvoriek. Ako sa volá kľúč s menom?', 'Kľúč v hranatých zátvorkách musí byť text v úvodzovkách.', "Nahraď ___ textom 'name'."],
    testy: (m, { rovne }) => {
      rovne(m.getName({ name: 'Adam', age: 30 }), 'Adam', "getName({ name: 'Adam', age: 30 })");
    },
  },
  {
    id: 7,
    nazov: 'countKeys – počet kľúčov objektu',
    napovedy: ['Ktorá funkcia Object.… vráti pole kľúčov?', 'keys = kľúče, values = hodnoty.', 'Nahraď ___ slovom keys.'],
    testy: (m, { rovne }) => {
      rovne(m.countKeys({ a: 1, b: 2, c: 3 }), 3, 'countKeys({ a: 1, b: 2, c: 3 })');
      rovne(m.countKeys({}), 0, 'countKeys({})');
    },
  },
  {
    id: 8,
    nazov: 'isEmpty – je pole prázdne?',
    napovedy: ['Akú dĺžku má prázdne pole []?', 'Prázdne pole nemá žiadny prvok.', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      rovne(m.isEmpty([]), true, 'isEmpty([])');
      rovne(m.isEmpty([1]), false, 'isEmpty([1])');
    },
  },
  {
    id: 9,
    nazov: 'contains – je x v poli?',
    napovedy: ['Ktorá metóda poľa vráti true/false, či prvok obsahuje?', 'Anglicky „obsahuje“ = includes.', 'Nahraď ___ slovom includes.'],
    testy: (m, { rovne }) => {
      rovne(m.contains([1, 2, 3], 2), true, 'contains([1, 2, 3], 2)');
      rovne(m.contains([1, 2, 3], 9), false, 'contains([1, 2, 3], 9)');
    },
  },
  {
    id: 10,
    nazov: 'tally – počítadlo (dve medzery ___)',
    napovedy: [
      'Prvé ___: do ktorého šuplíka zapisujeme? Druhé ___: čím začať, keď je šuplík prázdny?',
      'Šuplík sa volá podľa aktuálneho prvku x. Prázdny šuplík začína od nuly.',
      'Prvé ___ nahraď x, druhé ___ nahraď 0. Výsledok: c[x] = (c[x] || 0) + 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.tally(['a', 'b', 'a']), { a: 2, b: 1 }, "tally(['a', 'b', 'a'])");
      rovne(m.tally([3, 3, 3]), { 3: 3 }, 'tally([3, 3, 3])');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'count – počet prvkov v poli',
    napovedy: ['Každé pole vie, koľko má prvkov.', 'Je to vlastnosť length.', 'return arr.length;'],
    testy: (m, { rovne }) => {
      rovne(m.count([1, 2, 3]), 3, 'count([1, 2, 3])');
      rovne(m.count([]), 0, 'count([])');
    },
  },
  {
    id: 2,
    nazov: 'firstAndLast – pole [prvý, posledný]',
    napovedy: [
      'Vráť nové pole s dvoma prvkami: [ ..., ... ].',
      'Prvý je arr[0], posledný arr[arr.length - 1].',
      'return [arr[0], arr[arr.length - 1]];',
    ],
    testy: (m, { rovne }) => {
      rovne(m.firstAndLast([1, 2, 3]), [1, 3], 'firstAndLast([1, 2, 3])');
      rovne(m.firstAndLast(['a']), ['a', 'a'], "firstAndLast(['a'])");
    },
  },
  {
    id: 3,
    nazov: 'sum – súčet čísel',
    napovedy: [
      'Použi vzor „súčet“ z teórie, časť 3.',
      'let s = 0; potom cyklus for (const x of arr), v ňom s = s + x;',
      'let s = 0; for (const x of arr) { s = s + x; } return s;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sum([1, 2, 3]), 6, 'sum([1, 2, 3])');
      rovne(m.sum([10, -10]), 0, 'sum([10, -10])');
      rovne(m.sum([]), 0, 'sum([])');
    },
  },
  {
    id: 4,
    nazov: 'countEven – koľko je párnych čísel',
    napovedy: [
      'Číslo je párne, keď x % 2 === 0.',
      'Začni s let pocet = 0; v cykle pripočítaj 1, keď je x párne.',
      'let pocet = 0; for (const x of arr) { if (x % 2 === 0) pocet++; } return pocet;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countEven([1, 2, 3, 4]), 2, 'countEven([1, 2, 3, 4])');
      rovne(m.countEven([1, 3]), 0, 'countEven([1, 3])');
      rovne(m.countEven([]), 0, 'countEven([])');
    },
  },
  {
    id: 5,
    nazov: 'onlyPositive – nové pole len s kladnými číslami',
    napovedy: [
      'Použi vzor „nové pole“: const vysledok = []; a v cykle push.',
      'Kladné číslo je x > 0 (nula nie je kladná).',
      'const v = []; for (const x of arr) { if (x > 0) v.push(x); } return v;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.onlyPositive([3, -1, 0, 5]), [3, 5], 'onlyPositive([3, -1, 0, 5])');
      rovne(m.onlyPositive([-2]), [], 'onlyPositive([-2])');
    },
  },
  {
    id: 6,
    nazov: 'doubleAll – nové pole s dvojnásobkami',
    napovedy: [
      'Opäť vzor „nové pole“. Čo pridáš do výsledku pre každé x?',
      'Dvojnásobok x je x * 2.',
      'const v = []; for (const x of arr) { v.push(x * 2); } return v;',
    ],
    testy: (m, { rovne }) => {
      const a = [1, 2, 3];
      rovne(m.doubleAll(a), [2, 4, 6], 'doubleAll([1, 2, 3])');
      rovne(a, [1, 2, 3], 'pôvodné pole po doubleAll');
      rovne(m.doubleAll([]), [], 'doubleAll([])');
    },
  },
  {
    id: 7,
    nazov: 'makePerson – vytvor objekt osoby',
    napovedy: [
      'Vráť objekt v kučeravých zátvorkách { }.',
      'Kľúče sú name a age, hodnoty sú parametre funkcie.',
      'return { name: name, age: age };',
    ],
    testy: (m, { rovne }) => {
      rovne(m.makePerson('Eva', 20), { name: 'Eva', age: 20 }, "makePerson('Eva', 20)");
    },
  },
  {
    id: 8,
    nazov: 'countLetters – koľkokrát je ktoré písmeno',
    napovedy: [
      'Je to vzor „počítadlo“ z teórie, časť 7. for...of funguje aj na texte.',
      'const pocty = {}; for (const p of word) { ... } return pocty;',
      'const pocty = {}; for (const p of word) { pocty[p] = (pocty[p] || 0) + 1; } return pocty;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countLetters('mama'), { m: 2, a: 2 }, "countLetters('mama')");
      rovne(m.countLetters('abc'), { a: 1, b: 1, c: 1 }, "countLetters('abc')");
      rovne(m.countLetters(''), {}, "countLetters('')");
    },
  },
  {
    id: 9,
    nazov: 'sumValues – súčet všetkých hodnôt objektu',
    napovedy: [
      'Najprv získaj pole hodnôt: Object.values(obj).',
      'Potom ho sčítaj ako v úlohe 3.',
      'let s = 0; for (const x of Object.values(obj)) { s = s + x; } return s;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sumValues({ jablka: 3, hrusky: 2 }), 5, 'sumValues({ jablka: 3, hrusky: 2 })');
      rovne(m.sumValues({}), 0, 'sumValues({})');
    },
  },
  {
    id: 10,
    nazov: 'mostCommon – najčastejší prvok',
    napovedy: [
      'Dva kroky: 1) spočítaj výskyty (počítadlo), 2) nájdi prvok s najväčším počtom.',
      'V kroku 2 prechádzaj pôvodné pole (nie objekt) a pamätaj si best a bestCount. Prepíš len pri VÄČŠOM počte – tak pri zhode vyhrá ten, čo bol prvý.',
      'const c = {}; for (const x of arr) c[x] = (c[x] || 0) + 1; let best = arr[0]; for (const x of arr) { if (c[x] > c[best]) best = x; } return best;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.mostCommon(['a', 'b', 'b', 'c']), 'b', "mostCommon(['a', 'b', 'b', 'c'])");
      rovne(m.mostCommon([1, 2, 2, 1, 3]), 1, 'mostCommon([1, 2, 2, 1, 3]) – pri zhode vyhrá ten, čo bol prvý');
      rovne(m.mostCommon([7]), 7, 'mostCommon([7])');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
