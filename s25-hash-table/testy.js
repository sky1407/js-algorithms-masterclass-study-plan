'use strict';

function hashSpravny(key, len) {
  let total = 0;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    total = (total * 31 + key.charCodeAt(i) - 96) % len;
  }
  return total;
}

function tabulka(Trieda, size, dvojice) {
  const t = new Trieda(size);
  t.keyMap = new Array(size);
  for (const [k, v] of dvojice) {
    const i = hashSpravny(k, size);
    if (!t.keyMap[i]) t.keyMap[i] = [];
    t.keyMap[i].push([k, v]);
  }
  return t;
}

const FARBY = [['maroon', '#800000'], ['yellow', '#FFFF00'], ['olive', '#808000'], ['salmon', '#FA8072'], ['plum', '#DDA0DD']];
const zoradene = (arr) => arr.slice().sort();

const teoria = [
  {
    id: 1,
    otazka: 'Čo ukladá hash table?',
    moznosti: ['Dvojice kľúč → hodnota, ktoré vie rýchlo nájsť podľa kľúča.', 'Len čísla v poradí.', 'Uzly s next a prev.', 'Zotriedené hodnoty.'],
    spravna: 'a',
    napoveda: 'V JavaScripte ju poznáš ako objekt {}.',
    vysvetlenie: 'Hash table ukladá kľúč → hodnota. Objekt aj Map sú hash tabuľky.',
  },
  {
    id: 2,
    otazka: 'Čo robí hash funkcia?',
    moznosti: [
      'Z kľúča vypočíta číslo – index v poli, kam patrí hodnota.',
      'Zotriedi kľúče.',
      'Zašifruje heslo.',
      'Vymaže duplikáty.',
    ],
    spravna: 'a',
    napoveda: 'Spomeň si na lístok s číslom háčika v šatni.',
    vysvetlenie: 'Hash funkcia premení kľúč (napr. "pink") na index poľa, kam sa dvojica uloží.',
  },
  {
    id: 3,
    otazka: 'Čo znamená, že hash funkcia je deterministická?',
    moznosti: [
      'Ten istý kľúč dá vždy ten istý index.',
      'Každý kľúč dá iný index.',
      'Index je náhodný.',
      'Funguje len pre čísla.',
    ],
    spravna: 'a',
    napoveda: 'Keby ti šatniarka dala zakaždým iné číslo…',
    vysvetlenie: 'Keby ten istý kľúč dal raz index 3 a raz 7, hodnotu by sme už nikdy nenašli.',
  },
  {
    id: 4,
    otazka: 'Čo je kolízia v hash table?',
    moznosti: ['Dva rôzne kľúče dostanú rovnaký index.', 'Kľúč sa nedá nájsť.', 'Tabuľka je plná.', 'Hodnota je undefined.'],
    spravna: 'a',
    napoveda: 'Dva kabáty chcú ten istý háčik.',
    vysvetlenie: 'Kolízia nastane, keď hash funkcia dá dvom rôznym kľúčom ten istý index.',
  },
  {
    id: 5,
    otazka: 'Ako rieši kolízie separate chaining?',
    moznosti: [
      'Na jednom indexe je pole dvojíc [kľúč, hodnota].',
      'Hľadá najbližšie voľné miesto.',
      'Starú hodnotu prepíše.',
      'Zdvojnásobí pole.',
    ],
    spravna: 'a',
    napoveda: 'Na jeden háčik zavesíš viac kabátov.',
    vysvetlenie: 'Každý index obsahuje pole dvojíc, napr. [["pink", "#ff69b4"], ["cyan", "#00ffff"]].',
  },
  {
    id: 6,
    otazka: 'Ako rieši kolízie linear probing?',
    moznosti: [
      'Keď je miesto obsadené, hľadá najbližšie voľné miesto.',
      'Ukladá pole dvojíc na jeden index.',
      'Vymaže starý kľúč.',
      'Vyhodí chybu.',
    ],
    spravna: 'a',
    napoveda: 'Probing = skúšanie ďalšieho miesta.',
    vysvetlenie: 'Pri linear probing je na každom indexe najviac jedna dvojica. Pri kolízii sa skúša index + 1, + 2… kým nie je voľno.',
  },
  {
    id: 7,
    otazka: 'Aká rýchla je v PRIEMERE operácia get (a set) v hash table?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    spravna: 'a',
    napoveda: 'Šatniarka ide priamo na háčik.',
    vysvetlenie: 'Hash funkcia hneď povie index a háčik má väčšinou len 1 – 2 dvojice. V priemere je to O(1).',
  },
  {
    id: 8,
    otazka: 'Prečo hash funkcie používajú prvočísla (napr. 31, veľkosť 53)?',
    moznosti: [
      'Kľúče sa rozložia rovnomernejšie a je menej kolízií.',
      'Lebo prvočísla sú menšie.',
      'Lebo JavaScript iné čísla nepodporuje.',
      'Kvôli bezpečnosti hesiel.',
    ],
    spravna: 'a',
    napoveda: 'Čo chceme, aby sa kľúče rozhádzali…',
    vysvetlenie: 'Násobenie a delenie prvočíslami menej často vytvára rovnaké zvyšky, takže kolízií je menej.',
  },
  {
    id: 9,
    otazka: 'Čo vráti map.get(kluc), keď taký kľúč v Map nie je?',
    moznosti: ['undefined', 'null', '0', 'Vyhodí chybu.'],
    spravna: 'a',
    napoveda: 'Ako objekt pri neexistujúcom kľúči.',
    vysvetlenie: 'Neexistujúci kľúč vráti undefined. Preto pri počítaní píšeme (map.get(x) || 0) + 1.',
  },
  {
    id: 10,
    otazka: 'Čo je Set?',
    moznosti: ['Kolekcia unikátnych hodnôt – každá hodnota je v nej najviac raz.', 'Zotriedené pole.', 'Dvojice kľúč → hodnota.', 'Zásobník.'],
    spravna: 'a',
    napoveda: 'new Set([1, 2, 2, 3]).size je 3.',
    vysvetlenie: 'Set si pamätá len rôzne hodnoty. Hodí sa na odstránenie duplikátov a rýchle has(x).',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log('a'.charCodeAt(0));",
    moznosti: ['97', '1', '0', 'a'],
    spravna: 'a',
    napoveda: 'Kód malého písmena a.',
    vysvetlenie: 'Písmeno a má v počítači kód 97, b 98 atď.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log('c'.charCodeAt(0) - 96);",
    moznosti: ['3', '99', '2', '67'],
    spravna: 'a',
    napoveda: 'a = 1, b = 2, c = ?',
    vysvetlenie: 'c má kód 99 a 99 - 96 = 3.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(17 % 5);',
    moznosti: ['2', '3', '3.4', '12'],
    spravna: 'a',
    napoveda: '17 = 3 · 5 + ?',
    vysvetlenie: '17 / 5 je 3 a zvyšok 2.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: "const m = new Map();\nm.set('a', 1);\nm.set('a', 2);\nconsole.log(m.get('a'), m.size);",
    moznosti: ['2 1', '1 2', '2 2', '1 1'],
    spravna: 'a',
    napoveda: 'Druhé set s rovnakým kľúčom pridá nový záznam, alebo prepíše starý?',
    vysvetlenie: 'Rovnaký kľúč sa prepíše. Hodnota je 2 a v mape je stále 1 dvojica.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const s = new Set([1, 2, 2, 3, 3, 3]);\nconsole.log(s.size);',
    moznosti: ['3', '6', '1', '2'],
    spravna: 'a',
    napoveda: 'Set si pamätá len rôzne hodnoty.',
    vysvetlenie: 'Rôzne hodnoty sú 1, 2, 3, takže size je 3.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: "const o = {};\no['x'] = 1;\nconsole.log('x' in o, 'y' in o);",
    moznosti: ['true false', 'true true', '1 undefined', 'false false'],
    spravna: 'a',
    napoveda: 'in sa pýta, či kľúč existuje.',
    vysvetlenie: 'Kľúč x existuje, y nie.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód? (separate chaining)',
    kod: "const keyMap = [];\nkeyMap[2] = [['a', 1]];\nkeyMap[2].push(['b', 2]);\nconsole.log(keyMap[2].length, keyMap[2][1][0]);",
    moznosti: ['2 b', '1 a', '2 a', '2 2'],
    spravna: 'a',
    napoveda: 'Na indexe 2 sú teraz dve dvojice. [1][0] je kľúč druhej dvojice.',
    vysvetlenie: 'Háčik 2 má dve dvojice. Druhá dvojica je ["b", 2] a jej kľúč (index 0) je b.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "const m = new Map([['a', 1]]);\nconsole.log(m.has('b'), m.get('b'));",
    moznosti: ['false undefined', 'false null', 'true 1', 'false 0'],
    spravna: 'a',
    napoveda: 'Kľúč b v mape nie je.',
    vysvetlenie: 'has vráti false a get pre neexistujúci kľúč vráti undefined.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (malá hash funkcia)',
    kod: "let total = 0;\nfor (const ch of 'ab') {\n  total = (total * 31 + ch.charCodeAt(0) - 96) % 10;\n}\nconsole.log(total);",
    moznosti: ['3', '1', '33', '2'],
    spravna: 'a',
    napoveda: 'Po a: (0 · 31 + 1) % 10 = 1. Po b: (1 · 31 + 2) % 10 = ?',
    vysvetlenie: 'Po a je total 1. Po b je (31 + 2) % 10 = 33 % 10 = 3.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log([...new Set('banana')].join(''));",
    moznosti: ['ban', 'banana', 'bnn', 'aaa'],
    spravna: 'a',
    napoveda: 'Set nechá každé písmeno len raz, v poradí prvého výskytu.',
    vysvetlenie: 'Rôzne písmená v poradí, v akom sa prvýkrát objavili: b, a, n → ban.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'hash – index v rozsahu poľa',
    napovedy: [
      "hash('pink', 10) vráti obrovské číslo. Ako ho vtesnať do rozsahu 0 … 9?",
      'Po každom kroku treba vziať zvyšok po delení dĺžkou poľa.',
      'Zmeň total = total * PRIME + value na total = (total * PRIME + value) % arrayLen.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.hash('pink', 10), hashSpravny('pink', 10), "hash('pink', 10)");
      rovne(m.hash('orangered', 13), hashSpravny('orangered', 13), "hash('orangered', 13)");
    },
  },
  {
    id: 2,
    nazov: 'charValue – a = 1, b = 2, …',
    napovedy: ["charValue('a') vráti 0. Aký je kód písmena a?", "'a'.charCodeAt(0) je 97. Koľko treba odčítať, aby vyšla 1?", 'Zmeň - 97 na - 96.'],
    testy: (m, { rovne }) => {
      rovne([m.charValue('a'), m.charValue('z')], [1, 26], "[charValue('a'), charValue('z')]");
    },
  },
  {
    id: 3,
    nazov: 'HashTable.set – pridaj do zoznamu na háčiku',
    napovedy: [
      'Pri kolízii sa prvá dvojica stratí. Čo sa deje s keyMap[index]?',
      'Na háčiku má byť POLE dvojíc. Novú dvojicu treba pridať (push), nie prepísať celý háčik.',
      'Zmeň this.keyMap[index] = [key, value] na this.keyMap[index].push([key, value]).',
    ],
    testy: (m, { rovne }) => {
      const t = new m.HashTable(1);
      t.set('a', 1);
      t.set('b', 2);
      rovne(t.keyMap[0], [['a', 1], ['b', 2]], 'keyMap[0] po set a, b do tabuľky veľkosti 1');
    },
  },
  {
    id: 4,
    nazov: 'HashTable.setB – vytvor prázdny háčik',
    napovedy: [
      'TypeError pri push. Kedy sa vytvára prázdne pole na háčiku?',
      'Pole treba vytvoriť, keď háčik ešte NEEXISTUJE. Podmienka je otočená.',
      'Zmeň if (this.keyMap[index]) na if (!this.keyMap[index]).',
    ],
    testy: (m, { rovne }) => {
      const t = new m.HashTable(1);
      t.setB('a', 1);
      t.setB('b', 2);
      rovne(t.keyMap[0], [['a', 1], ['b', 2]], 'keyMap[0] po setB a, b');
    },
  },
  {
    id: 5,
    nazov: 'HashTable.get – vráť hodnotu',
    napovedy: ["get('maroon') vráti 'maroon' namiesto farby. Čo je pair[0] a čo pair[1]?", 'pair[0] je kľúč, pair[1] je hodnota.', 'Zmeň return pair[0] na return pair[1].'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTable, 17, FARBY);
      rovne([t.get('maroon'), t.get('plum'), t.get('blue')], ['#800000', '#DDA0DD', undefined], "[get('maroon'), get('plum'), get('blue')]");
    },
  },
  {
    id: 6,
    nazov: 'HashTable.getB – prehľadaj celý háčik',
    napovedy: [
      'V tabuľke veľkosti 1 nájde len prvý kľúč. Koľko dvojíc na háčiku skontroluje?',
      'return undefined vnútri cyklu skončí funkciu hneď pri prvej nezhode.',
      'Zmaž else vetvu z cyklu; return undefined má byť až za cyklom.',
    ],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTable, 1, FARBY);
      rovne([t.getB('maroon'), t.getB('salmon'), t.getB('blue')], ['#800000', '#FA8072', undefined], "[getB('maroon'), getB('salmon'), getB('blue')]");
    },
  },
  {
    id: 7,
    nazov: 'HashTable.keys – všetky kľúče',
    napovedy: ['keys vráti farby namiesto mien. Čo pridávaš do výsledku?', 'Kľúč je pair[0].', 'Zmeň result.push(pair[1]) na result.push(pair[0]).'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTable, 17, FARBY);
      rovne(zoradene(t.keys()), zoradene(FARBY.map(f => f[0])), 'keys() (zoradené)');
    },
  },
  {
    id: 8,
    nazov: 'HashTable.values – unikátne hodnoty',
    napovedy: [
      'values vráti prázdne pole. Kedy sa hodnota pridáva?',
      'Pridať treba, keď vo výsledku ešte NIE JE. Podmienka je otočená.',
      'Zmeň if (result.includes(pair[1])) na if (!result.includes(pair[1])).',
    ],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTable, 17, [['a', 1], ['b', 2], ['c', 1]]);
      rovne(t.values().slice().sort(), [1, 2], 'values() (zoradené)');
    },
  },
  {
    id: 9,
    nazov: 'HashTable.setOrUpdate – zmeň hodnotu existujúceho kľúča',
    napovedy: [
      'Pri druhom set rovnakého kľúča vznikne duplikát. Podľa čoho hľadáš existujúci kľúč?',
      'Kľúč je v pair[0], nie v pair[1].',
      'Zmeň pair[1] === key na pair[0] === key.',
    ],
    testy: (m, { rovne }) => {
      const t = new m.HashTable(1);
      t.setOrUpdate('a', 1);
      t.setOrUpdate('a', 5);
      rovne(t.keyMap[0], [['a', 5]], "keyMap[0] po setOrUpdate('a', 1) a ('a', 5)");
    },
  },
  {
    id: 10,
    nazov: 'countWordsMap – počítadlo slov cez Map',
    napovedy: [
      'Vyjde NaN. Čo vráti map.get(w) pre slovo, ktoré ešte nebolo?',
      'undefined + 1 je NaN. Treba začať od 0.',
      'Zmeň map.get(w) + 1 na (map.get(w) || 0) + 1.',
    ],
    testy: (m, { rovne }) => {
      const r = m.countWordsMap(['a', 'b', 'a']);
      rovne([r.get('a'), r.get('b')], [2, 1], "[get('a'), get('b')] pre ['a', 'b', 'a']");
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'letterValue – a = 1',
    napovedy: ["Kód 'a' je 97. Koľko odčítať, aby vyšla 1?", '97 - ? = 1', 'Nahraď ___ číslom 96.'],
    testy: (m, { rovne }) => {
      rovne([m.letterValue('a'), m.letterValue('e')], [1, 5], "[letterValue('a'), letterValue('e')]");
    },
  },
  {
    id: 2,
    nazov: 'hashA – najviac 100 znakov',
    napovedy: ['Coltova hash funkcia berie najviac koľko znakov?', 'Math.min(key.length, ?)', 'Nahraď ___ číslom 100.'],
    testy: (m, { rovne }) => {
      rovne(m.hashA('pink', 10), hashSpravny('pink', 10), "hashA('pink', 10)");
      rovne(m.hashA('cyan', 7), hashSpravny('cyan', 7), "hashA('cyan', 7)");
    },
  },
  {
    id: 3,
    nazov: 'hashB – vtesnaj do poľa',
    napovedy: ['Zvyšok po delení akým číslom dá index v rozsahu poľa?', 'Dĺžkou poľa – parameter arrayLen.', 'Nahraď ___ slovom arrayLen.'],
    testy: (m, { rovne }) => {
      rovne(m.hashB('cyan', 7), hashSpravny('cyan', 7), "hashB('cyan', 7)");
    },
  },
  {
    id: 4,
    nazov: 'Table.set – prázdny háčik',
    napovedy: ['Čo vložíme na háčik, ktorý ešte neexistuje?', 'Prázdny zoznam dvojíc.', 'Nahraď ___ s [].'],
    testy: (m, { rovne }) => {
      const t = new m.Table(1);
      t.set('a', 1);
      rovne(t.keyMap[0], [['a', 1]], "keyMap[0] po set('a', 1)");
    },
  },
  {
    id: 5,
    nazov: 'Table.set2 – dvojica',
    napovedy: ['Dvojica je [kľúč, ?]', 'Druhý parameter metódy.', 'Nahraď ___ slovom value.'],
    testy: (m, { rovne }) => {
      const t = new m.Table(1);
      t.set2('a', 7);
      rovne(t.keyMap[0], [['a', 7]], "keyMap[0] po set2('a', 7)");
    },
  },
  {
    id: 6,
    nazov: 'Table.get – vypočítaj index',
    napovedy: ['Z čoho počítame index?', 'Z kľúča, ktorý hľadáme.', 'Nahraď ___ slovom key.'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.Table, 17, FARBY);
      rovne(t.get('olive'), '#808000', "get('olive')");
    },
  },
  {
    id: 7,
    nazov: 'Table.get2 – vráť hodnotu',
    napovedy: ['V dvojici [kľúč, hodnota] je hodnota na indexe…', 'Kľúč je 0, hodnota…', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.Table, 1, FARBY);
      rovne(t.get2('salmon'), '#FA8072', "get2('salmon')");
    },
  },
  {
    id: 8,
    nazov: 'Table.keys – zober kľúč',
    napovedy: ['Na ktorom indexe dvojice je kľúč?', 'Prvý prvok dvojice.', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.Table, 17, FARBY);
      rovne(zoradene(t.keys()), zoradene(FARBY.map(f => f[0])), 'keys() (zoradené)');
    },
  },
  {
    id: 9,
    nazov: 'firstSeenTwice – Set: videl som to už?',
    napovedy: ['Ktorá metóda Set-u povie, či hodnotu obsahuje?', 'Rovnaká ako pri Map.', 'Nahraď ___ slovom has.'],
    testy: (m, { rovne }) => {
      rovne([m.firstSeenTwice([3, 1, 4, 1, 3]), m.firstSeenTwice([1, 2])], [1, undefined], '[firstSeenTwice([3, 1, 4, 1, 3]), firstSeenTwice([1, 2])]');
    },
  },
  {
    id: 10,
    nazov: 'countOf – počítadlo cez Map (dve ___)',
    napovedy: [
      'Prvé ___: ktorou metódou Map prečítaš doterajší počet? Druhé ___: čo vrátiť pre slovo, ktoré tam nie je?',
      'Čítanie z Map = get. Slovo, ktoré nebolo, má počet 0.',
      'Prvé ___ nahraď get, druhé ___ nahraď 0.',
    ],
    testy: (m, { rovne }) => {
      const slova = ['pes', 'mačka', 'pes'];
      rovne([m.countOf(slova, 'pes'), m.countOf(slova, 'myš')], [2, 0], "[countOf(…, 'pes'), countOf(…, 'myš')]");
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'charValue2 – a = 1, b = 2, … z = 26',
    napovedy: ['Použi charCodeAt(0).', "'a'.charCodeAt(0) je 97.", 'return ch.charCodeAt(0) - 96;'],
    testy: (m, { rovne }) => {
      rovne([m.charValue2('a'), m.charValue2('k'), m.charValue2('z')], [1, 11, 26], "[charValue2('a'), ('k'), ('z')]");
    },
  },
  {
    id: 2,
    nazov: 'simpleHash – Coltova hash funkcia',
    napovedy: [
      'total = 0, PRIME = 31, cyklus cez najviac 100 znakov.',
      'V cykle: total = (total * PRIME + kód písmena - 96) % arrayLen.',
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne }) => {
      for (const [k, n] of [['pink', 10], ['orangered', 13], ['a', 53], ['zebra', 7]]) {
        rovne(m.simpleHash(k, n), hashSpravny(k, n), `simpleHash('${k}', ${n})`);
      }
    },
  },
  {
    id: 3,
    nazov: 'HashTableP.set – ulož alebo zmeň',
    napovedy: [
      'index = this._hash(key). Ak háčik neexistuje, vytvor [].',
      'Ak na háčiku je dvojica s rovnakým kľúčom, zmeň jej hodnotu. Inak push([key, value]).',
      'Celé riešenie je v teórii v časti 5 (set).',
    ],
    testy: (m, { rovne }) => {
      const t = new m.HashTableP(1);
      t.set('a', 1);
      t.set('b', 2);
      t.set('a', 3);
      rovne(t.keyMap[0], [['a', 3], ['b', 2]], "keyMap[0] po set a, b, a (veľkosť 1)");
      const v = new m.HashTableP(17);
      for (const [k, h] of FARBY) v.set(k, h);
      rovne(v.keyMap[hashSpravny('plum', 17)].some(p => p[0] === 'plum' && p[1] === '#DDA0DD'), true, "dvojica plum je na háčiku podľa _hash");
    },
  },
  {
    id: 4,
    nazov: 'HashTableP.get – hodnota podľa kľúča (inak undefined)',
    napovedy: [
      'index = this._hash(key), bucket = this.keyMap[index].',
      'Ak bucket existuje, nájdi v ňom dvojicu s pair[0] === key a vráť pair[1].',
      'Celé riešenie je v teórii v časti 5 (get).',
    ],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTableP, 1, FARBY);
      rovne([t.get('yellow'), t.get('plum'), t.get('blue')], ['#FFFF00', '#DDA0DD', undefined], "[get('yellow'), get('plum'), get('blue')]");
    },
  },
  {
    id: 5,
    nazov: 'HashTableP.has – je kľúč v tabuľke?',
    napovedy: ['Podobné ako get.', 'Vráť true, keď nájdeš dvojicu s kľúčom; inak false.', 'Môžeš použiť get, ale pozor – hodnota môže byť aj 0 alebo false. Bezpečnejšie je hľadať kľúč priamo.'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTableP, 1, [['nula', 0], ['jeden', 1]]);
      rovne([t.has('nula'), t.has('jeden'), t.has('dva')], [true, true, false], "[has('nula'), has('jeden'), has('dva')]");
    },
  },
  {
    id: 6,
    nazov: 'HashTableP.keys – všetky kľúče',
    napovedy: ['Prejdi všetky háčiky; prázdne preskoč.', 'Z každej dvojice pridaj pair[0].', 'Celé riešenie je v teórii v časti 5 (keys).'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTableP, 17, FARBY);
      rovne(zoradene(t.keys()), zoradene(FARBY.map(f => f[0])), 'keys() (zoradené)');
    },
  },
  {
    id: 7,
    nazov: 'HashTableP.values – unikátne hodnoty',
    napovedy: ['Ako keys, ale pridávaš pair[1].', 'Pridaj len vtedy, keď vo výsledku ešte nie je (includes).', 'Celé riešenie je v teórii v časti 5 (values).'],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTableP, 17, [['a', 'x'], ['b', 'y'], ['c', 'x']]);
      rovne(zoradene(t.values()), ['x', 'y'], 'values() (zoradené)');
    },
  },
  {
    id: 8,
    nazov: 'HashTableP.remove – odstráň kľúč (true / false)',
    napovedy: [
      'Nájdi háčik a v ňom index dvojice s pair[0] === key (findIndex).',
      'Ak existuje, odstráň ju cez bucket.splice(i, 1) a vráť true. Inak false.',
      'const b = this.keyMap[this._hash(key)]; if (!b) return false; const i = b.findIndex(p => p[0] === key); if (i === -1) return false; b.splice(i, 1); return true;',
    ],
    testy: (m, { rovne }) => {
      const t = tabulka(m.HashTableP, 1, FARBY);
      rovne([t.remove('olive'), t.remove('olive')], [true, false], "[remove('olive'), znova remove('olive')]");
      rovne(t.keyMap[0].map(p => p[0]), ['maroon', 'yellow', 'salmon', 'plum'], 'kľúče na háčiku po remove');
    },
  },
  {
    id: 9,
    nazov: 'firstRepeated – prvý prvok, ktorý sa zopakuje (Set)',
    napovedy: ['Pamätaj si videné prvky v new Set().', 'Ak seen.has(x), vráť x. Inak seen.add(x).', 'const seen = new Set(); for (const x of arr) { if (seen.has(x)) return x; seen.add(x); } return undefined;'],
    testy: (m, { rovne }) => {
      rovne([m.firstRepeated(['a', 'b', 'c', 'b', 'a']), m.firstRepeated([1, 2, 3])], ['b', undefined], '[firstRepeated([a, b, c, b, a]), firstRepeated([1, 2, 3])]');
    },
  },
  {
    id: 10,
    nazov: 'twoSum – indexy dvoch čísel so súčtom target (Map)',
    napovedy: [
      'Pre každé číslo x hľadáš jeho „dvojča“ target - x. Pamätaj si v Map: číslo → index.',
      'Pre i: ak map.has(target - nums[i]), vráť [map.get(target - nums[i]), i]. Inak map.set(nums[i], i).',
      'const m = new Map(); for (let i = 0; i < nums.length; i++) { const d = target - nums[i]; if (m.has(d)) return [m.get(d), i]; m.set(nums[i], i); } return null;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.twoSum([2, 7, 11, 15], 9), [0, 1], 'twoSum([2, 7, 11, 15], 9)');
      rovne(m.twoSum([3, 2, 4], 6), [1, 2], 'twoSum([3, 2, 4], 6)');
      rovne(m.twoSum([1, 2], 10), null, 'twoSum([1, 2], 10)');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
