'use strict';
const { naPole, naPoleOdzadu, postav } = require('../lib/zoznamy');

const teoria = [
  {
    id: 1,
    otazka: 'Čím sa líši obojsmerný (doubly) zoznam od jednosmerného?',
    moznosti: [
      'Každý uzol má okrem next aj prev – šípku na predchádzajúci uzol.',
      'Má dva head.',
      'Uzly majú indexy.',
      'Nemá tail.',
    ],
    spravna: 'a',
    napoveda: 'Doubly = dvojito. Čo je dvakrát?',
    vysvetlenie: 'Uzol v doubly zozname má val, next aj prev, takže sa dá ísť dopredu aj dozadu.',
  },
  {
    id: 2,
    otazka: 'Prečo je pop v obojsmernom zozname O(1), kým v jednosmernom O(n)?',
    moznosti: [
      'Lebo nový tail je hneď tail.prev – netreba ho hľadať od začiatku.',
      'Lebo obojsmerný zoznam je vždy kratší.',
      'Lebo pop nič nemaže.',
      'Nie je, oba sú O(n).',
    ],
    spravna: 'a',
    napoveda: 'Kto je predposledný uzol? Vieme ho nájsť hneď?',
    vysvetlenie: 'Posledný uzol pozná svojho predchodcu cez prev, takže nový tail máme okamžite.',
  },
  {
    id: 3,
    otazka: 'Aká je nevýhoda obojsmerného zoznamu?',
    moznosti: [
      'Každý uzol zaberá viac pamäte (extra šípka prev) a pri zmenách treba opravovať viac šípok.',
      'Nedá sa doň pridávať.',
      'Prístup k prvému prvku je O(n).',
      'Nemá žiadnu nevýhodu.',
    ],
    spravna: 'a',
    napoveda: 'Čo musí mať každý uzol navyše?',
    vysvetlenie: 'Šípka prev stojí pamäť a pri každom vložení či odobratí treba správne nastaviť next aj prev.',
  },
  {
    id: 4,
    otazka: 'Ako je optimalizované get(index) v obojsmernom zozname?',
    moznosti: [
      'Ak je index v druhej polovici, začne od tail a ide cez prev.',
      'Používa binárne vyhľadávanie.',
      'Pamätá si všetky uzly v poli.',
      'Vždy začína od tail.',
    ],
    spravna: 'a',
    napoveda: 'Od ktorého konca je to bližšie k 9. prvku z 10?',
    vysvetlenie: 'Pre index <= length / 2 ide od head, inak od tail. Najviac teda prejde polovicu zoznamu.',
  },
  {
    id: 5,
    otazka: 'Aká je rýchlosť get v obojsmernom zozname?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    spravna: 'c',
    napoveda: 'n / 2 krokov – a čo robíme s konštantami v Big O?',
    vysvetlenie: 'V najhoršom prípade prejde n / 2 uzlov. Konštantu 1/2 zahadzujeme, takže je to stále O(n).',
  },
  {
    id: 6,
    otazka: 'Koľko šípok (next / prev) treba nastaviť pri vložení uzla DO STREDU obojsmerného zoznamu?',
    moznosti: ['1', '2', '4', '6'],
    spravna: 'c',
    napoveda: 'before ⇄ node ⇄ after – spočítaj šípky.',
    vysvetlenie: 'before.next = node, node.prev = before, node.next = after, after.prev = node. Spolu 4.',
  },
  {
    id: 7,
    otazka: 'Čo je head.prev v správnom obojsmernom zozname?',
    moznosti: ['null', 'tail', 'head', 'undefined'],
    spravna: 'a',
    napoveda: 'Je niečo pred prvým uzlom?',
    vysvetlenie: 'Pred prvým uzlom nič nie je, preto head.prev je null. Podobne tail.next je null.',
  },
  {
    id: 8,
    otazka: 'Kde sa v praxi hodí obojsmerný zoznam?',
    moznosti: [
      'História prehliadača – tlačidlá Späť a Dopredu.',
      'Binárne vyhľadávanie.',
      'Triedenie čísel.',
      'Počítanie písmen v texte.',
    ],
    spravna: 'a',
    napoveda: 'Kde sa pohybuješ dopredu aj dozadu?',
    vysvetlenie: 'V histórii prehliadača ideš Späť (prev) aj Dopredu (next) – presne to obojsmerný zoznam vie.',
  },
  {
    id: 9,
    otazka: 'Odstraňujeme uzol removed zo stredu. Na čo má ukazovať removed.prev.next?',
    moznosti: ['removed.next', 'removed', 'null', 'removed.prev'],
    spravna: 'a',
    napoveda: 'Ľavý sused má preskočiť removed.',
    vysvetlenie: 'Ľavý sused má ukazovať na pravého suseda: removed.prev.next = removed.next. A naopak removed.next.prev = removed.prev.',
  },
  {
    id: 10,
    otazka: 'Aká rýchla je operácia shift v obojsmernom zozname?',
    moznosti: ['O(1)', 'O(n)', 'O(log n)', 'Závisí od dĺžky.'],
    spravna: 'a',
    napoveda: 'Treba niečo hľadať?',
    vysvetlenie: 'Nový head je oldHead.next a len mu nastavíme prev = null. To je O(1).',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = { val: 1, next: null, prev: null };\nconst b = { val: 2, next: null, prev: a };\na.next = b;\nconsole.log(b.prev.val);',
    moznosti: ['1', '2', 'null', 'undefined'],
    spravna: 'a',
    napoveda: 'b.prev je a.',
    vysvetlenie: 'b.prev ukazuje na a a a.val je 1.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = { val: 1, next: null, prev: null };\nconst b = { val: 2, next: null, prev: a };\na.next = b;\nconsole.log(a.next.prev === a);',
    moznosti: ['true', 'false', 'undefined', '1'],
    spravna: 'a',
    napoveda: 'Choď z a dopredu a potom dozadu. Kde skončíš?',
    vysvetlenie: 'a.next je b a b.prev je a. Takže a.next.prev je samotné a → true. V správnom zozname to platí pre každý uzol.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = { val: 1, prev: null };\nconst b = { val: 2, prev: a };\nconst c = { val: 3, prev: b };\nlet cur = c;\nwhile (cur) {\n  console.log(cur.val);\n  cur = cur.prev;\n}',
    moznosti: ['3\n2\n1', '1\n2\n3', '3', '1'],
    spravna: 'a',
    napoveda: 'Začíname na c a ideme cez prev.',
    vysvetlenie: 'Odzadu: 3 → 2 → 1, potom je cur null.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: "const length = 10;\nconst index = 8;\nconsole.log(index <= length / 2 ? 'od začiatku' : 'od konca');",
    moznosti: ['od začiatku', 'od konca', 'true', 'false'],
    spravna: 'b',
    napoveda: 'Je 8 menej alebo rovné 5?',
    vysvetlenie: '8 <= 5 neplatí, takže get začne od konca (tail).',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = { val: 1, next: null, prev: null };\nconsole.log(a.prev);',
    moznosti: ['null', 'undefined', '1', 'Chyba: TypeError'],
    spravna: 'a',
    napoveda: 'Akú hodnotu má vlastnosť prev?',
    vysvetlenie: 'prev bola nastavená na null, takže sa vypíše null.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód? (odstránenie stredného uzla)',
    kod: 'const a = { val: 1, next: null, prev: null };\nconst b = { val: 2, next: null, prev: a };\nconst c = { val: 3, next: null, prev: b };\na.next = b;\nb.next = c;\nb.prev.next = b.next;\nb.next.prev = b.prev;\nconsole.log(a.next.val, c.prev.val);',
    moznosti: ['3 1', '2 2', '3 2', '2 1'],
    spravna: 'a',
    napoveda: 'b.prev je a, b.next je c. Kam teraz ukazuje a.next a c.prev?',
    vysvetlenie: 'a.next = c a c.prev = a. Uzol b sme vyradili z oboch smerov: vypíše sa 3 1.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const uzol = { val: 5, next: null, prev: null };\nconsole.log(Object.keys(uzol).length);',
    moznosti: ['1', '2', '3', '5'],
    spravna: 'c',
    napoveda: 'Koľko vlastností má uzol?',
    vysvetlenie: 'val, next a prev sú 3 vlastnosti. Jednosmerný uzol má len 2.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "const n = { next: 'x', prev: 'y' };\n[n.next, n.prev] = [n.prev, n.next];\nconsole.log(n.next);",
    moznosti: ['x', 'y', 'undefined', 'null'],
    spravna: 'b',
    napoveda: 'Hodnoty next a prev sa vymenili.',
    vysvetlenie: 'Po výmene je n.next "y" a n.prev "x". Presne takto reverse otáča každý uzol.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (koľko krokov od tail k indexu 8)',
    kod: 'const length = 10;\nconst index = 8;\nlet kroky = 0;\nfor (let i = length - 1; i > index; i--) kroky++;\nconsole.log(kroky);',
    moznosti: ['8', '1', '2', '9'],
    spravna: 'b',
    napoveda: 'tail má index 9. Koľko krokov dozadu je to na 8?',
    vysvetlenie: 'Z indexu 9 na index 8 je jeden krok. Od head by to bolo 8 krokov.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = { val: 1, next: null, prev: null };\nconst b = { val: 2, next: null, prev: a };\na.next = b;\nconsole.log(b.prev.next.val);',
    moznosti: ['1', '2', 'null', 'Chyba: TypeError'],
    spravna: 'b',
    napoveda: 'b.prev je a. a.next je…',
    vysvetlenie: 'b.prev je a, a.next je b, b.val je 2. Krok dozadu a dopredu nás vráti na b.',
  },
];

const dll = (Trieda, hodnoty) => postav(new Trieda(), hodnoty, true);

const debug = [
  {
    id: 1,
    nazov: 'push – pridaj na koniec',
    napovedy: [
      'Spredu je zoznam dobrý, odzadu nie. Na koho ukazuje prev nového uzla?',
      'Nový uzol je za starým tailom, takže jeho prev má byť starý tail.',
      'Zmeň node.prev = this.head na node.prev = this.tail.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1]);
      l.push(2);
      l.push(3);
      rovne(naPole(l), [1, 2, 3], 'spredu po push(2), push(3)');
      rovne(naPoleOdzadu(l), [3, 2, 1], 'odzadu po push(2), push(3)');
    },
  },
  {
    id: 2,
    nazov: 'pop – odober z konca',
    napovedy: [
      'Chyba TypeError: tail je null. Kto je nový tail po odobratí posledného?',
      'Nový tail je uzol PRED starým tailom – oldTail.prev.',
      'Zmeň this.tail = oldTail.next na this.tail = oldTail.prev.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 2, 3]);
      rovne(l.pop().val, 3, 'pop().val');
      rovne([naPole(l), naPoleOdzadu(l)], [[1, 2], [2, 1]], '[spredu, odzadu]');
    },
  },
  {
    id: 3,
    nazov: 'shift – odober zo začiatku',
    napovedy: [
      'Odzadu sa stále objavuje odobratý uzol. Na čo ukazuje prev nového head?',
      'Nový head nemá nikoho pred sebou, jeho prev musí byť null.',
      'Zmeň this.head.prev = oldHead na this.head.prev = null.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 2, 3]);
      rovne(l.shift().val, 1, 'shift().val');
      rovne([naPole(l), naPoleOdzadu(l)], [[2, 3], [3, 2]], '[spredu, odzadu]');
    },
  },
  {
    id: 4,
    nazov: 'unshift – pridaj na začiatok',
    napovedy: [
      'Zoznam sa zacyklí. Ktorá šípka starého head sa má zmeniť – next, alebo prev?',
      'Starý prvý uzol má teraz pred sebou nový uzol, takže sa mení jeho prev.',
      'Zmeň this.head.next = node na this.head.prev = node.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [2, 3]);
      l.unshift(1);
      rovne([naPole(l), naPoleOdzadu(l)], [[1, 2, 3], [3, 2, 1]], '[spredu, odzadu] po unshift(1)');
    },
  },
  {
    id: 5,
    nazov: 'get – od bližšieho konca',
    napovedy: [
      'get(3) z 5 prvkov spadne. Ktorým smerom ide cyklus, keď začne od tail?',
      'Od konca sa ide DOZADU, teda cez prev.',
      'V druhej vetve zmeň current = current.next na current = current.prev.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [0, 1, 2, 3, 4]);
      rovne(l.get(1).val, 1, 'get(1).val');
      rovne(l.get(3).val, 3, 'get(3).val');
      rovne(l.get(4).val, 4, 'get(4).val');
    },
  },
  {
    id: 6,
    nazov: 'set – zmeň hodnotu',
    napovedy: [
      'TypeError: Cannot set properties of null. Kedy sa vykoná node.val = val?',
      'Hodnotu chceme nastaviť, keď uzol EXISTUJE. Podmienka je otočená.',
      'Zmeň if (!node) na if (node).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 2, 3]);
      rovne(l.set(1, 9), true, 'set(1, 9)');
      rovne(naPole(l), [1, 9, 3], 'zoznam po set(1, 9)');
      rovne(l.set(5, 0), false, 'set(5, 0)');
    },
  },
  {
    id: 7,
    nazov: 'insert – vlož do stredu',
    napovedy: [
      'Spredu je to dobre, odzadu sa nový uzol vynechá. Na koho ukazuje after.prev?',
      'Pravý sused (after) má pred sebou teraz nový uzol.',
      'Zmeň after.prev = before na after.prev = node.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 3]);
      rovne(l.insert(1, 2), true, 'insert(1, 2)');
      rovne([naPole(l), naPoleOdzadu(l)], [[1, 2, 3], [3, 2, 1]], '[spredu, odzadu]');
    },
  },
  {
    id: 8,
    nazov: 'remove – odober zo stredu',
    napovedy: [
      'Odzadu sa stále objavuje odobratý uzol. Na koho má po odobratí ukazovať removed.next.prev?',
      'Pravý sused má preskočiť removed a ukazovať na ľavého suseda.',
      'Zmeň removed.next.prev = removed na removed.next.prev = removed.prev.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 2, 3]);
      rovne(l.remove(1).val, 2, 'remove(1).val');
      rovne([naPole(l), naPoleOdzadu(l)], [[1, 3], [3, 1]], '[spredu, odzadu]');
    },
  },
  {
    id: 9,
    nazov: 'reverse – otoč zoznam',
    napovedy: [
      'Po otočení zostane len 1 prvok. Kde je po výmene uložený „ďalší“ uzol?',
      'Po výmene next a prev je pôvodný next uložený v prev.',
      'Zmeň current = current.next na current = current.prev.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 2, 3]);
      l.reverse();
      rovne([naPole(l), naPoleOdzadu(l)], [[3, 2, 1], [1, 2, 3]], '[spredu, odzadu] po reverse()');
    },
  },
  {
    id: 10,
    nazov: 'toArrayReverse – hodnoty odzadu',
    napovedy: [
      'Vráti sa len jedna hodnota. Ktorým smerom ideš od tail?',
      'Od tail sa ide dozadu cez prev.',
      'Zmeň current = current.next na current = current.prev.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DoublyLinkedList, [1, 2, 3]);
      rovne(l.toArrayReverse(), [3, 2, 1], 'toArrayReverse()');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'DNode – nový uzol nemá predchodcu',
    napovedy: ['Na čo ukazuje prev nového uzla?', 'Rovnako ako next – zatiaľ nikam.', 'Nahraď ___ slovom null.'],
    testy: (m, { rovne }) => {
      const n = new m.DNode(4);
      rovne([n.val, n.next, n.prev], [4, null, null], 'new DNode(4) – [val, next, prev]');
    },
  },
  {
    id: 2,
    nazov: 'push – šípka dozadu',
    napovedy: ['Nový uzol má ukazovať dozadu na starý tail. Ako sa volá šípka dozadu?', 'Opak next.', 'Nahraď ___ slovom prev.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1]);
      l.push(2);
      rovne(naPoleOdzadu(l), [2, 1], 'odzadu po push(2)');
    },
  },
  {
    id: 3,
    nazov: 'pop – nový tail',
    napovedy: ['Nový tail je uzol pred starým tailom.', 'oldTail.…', 'Nahraď ___ slovom prev.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1, 2, 3]);
      l.pop();
      rovne([naPole(l), l.tail.val], [[1, 2], 2], '[spredu, tail.val] po pop()');
    },
  },
  {
    id: 4,
    nazov: 'pop – odstrihni koniec',
    napovedy: ['Nový tail nemá nikoho za sebou. Čo bude v jeho next?', 'Hodnota „nič“.', 'Nahraď ___ slovom null.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1, 2]);
      l.popB();
      rovne(l.tail.next, null, 'tail.next po popB()');
    },
  },
  {
    id: 5,
    nazov: 'shift – nový head nemá predchodcu',
    napovedy: ['Ktorú šípku nového head treba vynulovať?', 'Tú, čo ukazuje dozadu.', 'Nahraď ___ slovom prev.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1, 2, 3]);
      l.shift();
      rovne(naPoleOdzadu(l), [3, 2], 'odzadu po shift()');
    },
  },
  {
    id: 6,
    nazov: 'unshift – starý head má pred sebou nový uzol',
    napovedy: ['Na čo má ukazovať prev starého prvého uzla?', 'Na nový uzol.', 'Nahraď ___ slovom node.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [2]);
      l.unshift(1);
      rovne(naPoleOdzadu(l), [2, 1], 'odzadu po unshift(1)');
    },
  },
  {
    id: 7,
    nazov: 'get – index posledného uzla',
    napovedy: ['Od konca začíname na tail. Aký index má tail?', 'Posledný index = length - …', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [0, 1, 2, 3, 4, 5]);
      rovne(l.get(4).val, 4, 'get(4).val');
      rovne(l.get(5).val, 5, 'get(5).val');
    },
  },
  {
    id: 8,
    nazov: 'insert – pravý sused ukáže dozadu na nový uzol',
    napovedy: ['after má pred sebou teraz koho?', 'Novo vložený uzol.', 'Nahraď ___ slovom node.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1, 3]);
      l.insert(1, 2);
      rovne([naPole(l), naPoleOdzadu(l)], [[1, 2, 3], [3, 2, 1]], '[spredu, odzadu]');
    },
  },
  {
    id: 9,
    nazov: 'remove – ľavý sused preskočí removed',
    napovedy: ['Na koho má ukazovať ľavý sused po odstránení?', 'Na uzol za removed.', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1, 2, 3]);
      l.remove(1);
      rovne([naPole(l), naPoleOdzadu(l)], [[1, 3], [3, 1]], '[spredu, odzadu]');
    },
  },
  {
    id: 10,
    nazov: 'remove – odpoj odstránený uzol (dve ___)',
    napovedy: [
      'Odstránený uzol už nemá do zoznamu ukazovať ani dopredu, ani dozadu.',
      'Obe šípky nastav na hodnotu „nič“.',
      'Obe ___ nahraď slovom null.',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DList, [1, 2, 3]);
      const r = l.remove(1);
      rovne([r.next, r.prev], [null, null], '[removed.next, removed.prev]');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'Node – uzol s val, next a prev',
    napovedy: ['Tri vlastnosti: val, next, prev.', 'next aj prev sú na začiatku null.', 'constructor(val) { this.val = val; this.next = null; this.prev = null; }'],
    testy: (m, { rovne }) => {
      const n = new m.Node(1);
      rovne([n.val, n.next, n.prev], [1, null, null], 'new Node(1) – [val, next, prev]');
    },
  },
  {
    id: 2,
    nazov: 'DLL.push – na koniec (vráť this)',
    napovedy: [
      'Prázdny zoznam: head aj tail je nový uzol.',
      'Inak: this.tail.next = node; node.prev = this.tail; this.tail = node. Potom length++.',
      'Celé riešenie je v teórii v časti 3 (push).',
    ],
    testy: (m, { rovne }) => {
      const l = new m.DLL();
      rovne(l.push(1), l, 'push vracia this');
      l.push(2).push(3);
      rovne([naPole(l), naPoleOdzadu(l), l.length], [[1, 2, 3], [3, 2, 1], 3], '[spredu, odzadu, length]');
    },
  },
  {
    id: 3,
    nazov: 'DLL.pop – z konca (vráť uzol)',
    napovedy: [
      'Prázdny → undefined. Jeden prvok → head = tail = null.',
      'Inak tail = oldTail.prev, tail.next = null, oldTail.prev = null. length--.',
      'Celé riešenie je v teórii v časti 3 (pop).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, [1, 2, 3]);
      const r = l.pop();
      rovne([r.val, r.prev], [3, null], '[val, prev] odobratého uzla');
      rovne([naPole(l), naPoleOdzadu(l), l.length], [[1, 2], [2, 1], 2], '[spredu, odzadu, length]');
      const jeden = dll(m.DLL, [5]);
      jeden.pop();
      rovne([jeden.head, jeden.tail, jeden.length], [null, null, 0], '[head, tail, length] po vyprázdnení');
      rovne(new m.DLL().pop(), undefined, 'pop() na prázdnom');
    },
  },
  {
    id: 4,
    nazov: 'DLL.shift – zo začiatku (vráť uzol)',
    napovedy: [
      'Prázdny → undefined. Jeden prvok → head = tail = null.',
      'Inak head = oldHead.next, head.prev = null, oldHead.next = null. length--.',
      'Celé riešenie je v teórii v časti 3 (shift).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, [1, 2, 3]);
      const r = l.shift();
      rovne([r.val, r.next], [1, null], '[val, next] odobratého uzla');
      rovne([naPole(l), naPoleOdzadu(l)], [[2, 3], [3, 2]], '[spredu, odzadu]');
      const jeden = dll(m.DLL, [5]);
      jeden.shift();
      rovne([jeden.head, jeden.tail, jeden.length], [null, null, 0], '[head, tail, length] po vyprázdnení');
    },
  },
  {
    id: 5,
    nazov: 'DLL.unshift – na začiatok (vráť this)',
    napovedy: [
      'Prázdny zoznam: head aj tail je nový uzol.',
      'Inak: this.head.prev = node; node.next = this.head; this.head = node. Potom length++.',
      'Celé riešenie je v teórii v časti 3 (unshift).',
    ],
    testy: (m, { rovne }) => {
      const l = new m.DLL();
      rovne(l.unshift(3), l, 'unshift vracia this');
      l.unshift(2).unshift(1);
      rovne([naPole(l), naPoleOdzadu(l), l.length], [[1, 2, 3], [3, 2, 1], 3], '[spredu, odzadu, length]');
    },
  },
  {
    id: 6,
    nazov: 'DLL.get – od bližšieho konca (inak null)',
    napovedy: [
      'Mimo rozsahu → null. index <= length / 2 → od head cez next.',
      'Inak od tail cez prev: for (let i = this.length - 1; i > index; i--) current = current.prev;',
      'Celé riešenie je v teórii v časti 3 (get).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, ['a', 'b', 'c', 'd', 'e']);
      rovne([l.get(0).val, l.get(1).val, l.get(3).val, l.get(4).val], ['a', 'b', 'd', 'e'], '[get(0), get(1), get(3), get(4)] .val');
      rovne([l.get(5), l.get(-1)], [null, null], '[get(5), get(-1)]');
    },
  },
  {
    id: 7,
    nazov: 'DLL.set – zmeň hodnotu (true / false)',
    napovedy: ['Použi get z úlohy 6.', 'Ak uzol existuje, nastav val a vráť true. Inak false.', 'const node = this.get(index); if (!node) return false; node.val = val; return true;'],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, [1, 2, 3]);
      rovne([l.set(2, 30), l.set(9, 0)], [true, false], '[set(2, 30), set(9, 0)]');
      rovne(naPole(l), [1, 2, 30], 'zoznam po set');
    },
  },
  {
    id: 8,
    nazov: 'DLL.insert – vlož na index (true / false)',
    napovedy: [
      'Mimo rozsahu → false. index 0 → unshift, index === length → push.',
      'Inak before = get(index - 1), after = before.next a nastav 4 šípky.',
      'Celé riešenie je v teórii v časti 3 (insert).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, [1, 3]);
      rovne(l.insert(1, 2), true, 'insert(1, 2)');
      l.insert(0, 0);
      l.insert(4, 4);
      rovne([naPole(l), naPoleOdzadu(l), l.length], [[0, 1, 2, 3, 4], [4, 3, 2, 1, 0], 5], '[spredu, odzadu, length]');
      rovne(l.insert(10, 1), false, 'insert(10, 1)');
    },
  },
  {
    id: 9,
    nazov: 'DLL.remove – odober z indexu (vráť uzol)',
    napovedy: [
      'Mimo rozsahu → undefined. index 0 → shift, posledný → pop.',
      'Inak removed = get(index), prepoj susedov, removed.next = removed.prev = null, length--.',
      'Celé riešenie je v teórii v časti 3 (remove).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, [1, 2, 3, 4]);
      const r = l.remove(1);
      rovne([r.val, r.next, r.prev], [2, null, null], '[val, next, prev] odobratého uzla');
      rovne([naPole(l), naPoleOdzadu(l), l.length], [[1, 3, 4], [4, 3, 1], 3], '[spredu, odzadu, length]');
      rovne(l.remove(7), undefined, 'remove(7)');
    },
  },
  {
    id: 10,
    nazov: 'DLL.reverse – otoč zoznam (vráť this)',
    napovedy: [
      'Každému uzlu vymeň next a prev. Potom vymeň head a tail.',
      'Pozor: po výmene je „ďalší“ uzol v current.prev.',
      'Celé riešenie je v teórii v časti 3 (reverse).',
    ],
    testy: (m, { rovne }) => {
      const l = dll(m.DLL, [1, 2, 3, 4]);
      rovne(l.reverse(), l, 'reverse vracia this');
      rovne([naPole(l), naPoleOdzadu(l)], [[4, 3, 2, 1], [1, 2, 3, 4]], '[spredu, odzadu]');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
