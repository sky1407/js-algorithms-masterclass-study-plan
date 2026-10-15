'use strict';
const { naPole, postav } = require('../lib/zoznamy');

const teoria = [
  {
    id: 1,
    otazka: 'Čo je trieda (class)?',
    moznosti: [
      'Šablóna, podľa ktorej sa vytvárajú objekty.',
      'Iný názov pre pole.',
      'Funkcia, ktorá sa spustí len raz.',
      'Premenná, ktorá sa nedá zmeniť.',
    ],
    spravna: 'a',
    napoveda: 'Spomeň si na formičku na koláčiky.',
    vysvetlenie: 'Trieda je šablóna (formička). Cez new podľa nej vytvoríš ľubovoľne veľa objektov – inštancií.',
  },
  {
    id: 2,
    otazka: 'Kedy sa spustí constructor triedy?',
    moznosti: [
      'Keď zavoláme ľubovoľnú metódu.',
      'Pri vytvorení objektu cez new.',
      'Nikdy automaticky, treba ho volať ručne.',
      'Keď program skončí.',
    ],
    spravna: 'b',
    napoveda: 'new Pes("Rex") – čo sa stane v tej chvíli?',
    vysvetlenie: 'new vytvorí nový objekt a automaticky naň spustí constructor, ktorý nastaví počiatočné vlastnosti.',
  },
  {
    id: 3,
    otazka: 'Čo znamená this vnútri metódy?',
    moznosti: [
      'Celú triedu.',
      'Konkrétny objekt, na ktorom metódu voláme.',
      'Predchádzajúci objekt.',
      'Globálnu premennú.',
    ],
    spravna: 'b',
    napoveda: 'V rex.stekaj() je this kto?',
    vysvetlenie: 'this je ten konkrétny objekt pred bodkou. V rex.stekaj() je this rex, v max.stekaj() je to max.',
  },
  {
    id: 4,
    otazka: 'Čo obsahuje uzol (Node) v jednosmernom spájanom zozname?',
    moznosti: [
      'Hodnotu a odkaz na ďalší uzol.',
      'Len hodnotu.',
      'Index a hodnotu.',
      'Odkaz na prvý a posledný uzol.',
    ],
    spravna: 'a',
    napoveda: 'Lístok pri hľadaní pokladu: vec + …',
    vysvetlenie: 'Uzol má val (hodnotu) a next (odkaz na ďalší uzol, alebo null, ak je posledný).',
  },
  {
    id: 5,
    otazka: 'Čo sú head a tail?',
    moznosti: ['Prvý a posledný uzol zoznamu.', 'Prvá a posledná hodnota v poli.', 'Dve metódy zoznamu.', 'Ľavá a pravá polovica zoznamu.'],
    spravna: 'a',
    napoveda: 'head = hlava, tail = chvost.',
    vysvetlenie: 'head ukazuje na prvý uzol, tail na posledný. Vďaka tail je push O(1).',
  },
  {
    id: 6,
    otazka: 'Aká rýchla je operácia „daj mi 5. prvok“ (get) v spájanom zozname?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    spravna: 'c',
    napoveda: 'Dá sa skočiť priamo na 5. uzol?',
    vysvetlenie: 'Zoznam nemá indexy. K 5. uzlu sa dostaneš len prejdením prvých štyroch, takže O(n).',
  },
  {
    id: 7,
    otazka: 'Aké rýchle je pridanie na ZAČIATOK spájaného zoznamu (unshift)?',
    moznosti: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    spravna: 'a',
    napoveda: 'Treba niečo posúvať alebo prečíslovať?',
    vysvetlenie: 'Stačí, aby nový uzol ukázal na doterajší head, a head sa zmení na nový uzol. To je O(1). V poli je unshift O(n).',
  },
  {
    id: 8,
    otazka: 'Prečo je pop (odobratie z konca) v jednosmernom zozname O(n)?',
    moznosti: [
      'Lebo musíme od začiatku nájsť predposledný uzol, ktorý bude nový tail.',
      'Lebo musíme prečíslovať všetky uzly.',
      'Lebo pop robí kópiu zoznamu.',
      'Nie je, je O(1).',
    ],
    spravna: 'a',
    napoveda: 'Vie posledný uzol, kto je pred ním?',
    vysvetlenie: 'Uzly majú len next, nie odkaz dozadu. Predposledný uzol preto musíme hľadať od head.',
  },
  {
    id: 9,
    otazka: 'Kedy sa oplatí spájaný zoznam namiesto poľa?',
    moznosti: [
      'Keď často pristupujem k prvkom cez index.',
      'Keď často pridávam a odoberám prvky na začiatku.',
      'Keď potrebujem binárne vyhľadávanie.',
      'Nikdy.',
    ],
    spravna: 'b',
    napoveda: 'V čom je zoznam rýchlejší ako pole?',
    vysvetlenie: 'Pridanie aj odobratie na začiatku je v zozname O(1), v poli O(n). Prístup cez index je naopak v poli rýchlejší.',
  },
  {
    id: 10,
    otazka: 'Metóda push končí riadkom return this. Na čo je to dobré?',
    moznosti: [
      'Umožní reťazenie: list.push(1).push(2).',
      'Vymaže zoznam.',
      'Vráti počet prvkov.',
      'Nič, je to zbytočné.',
    ],
    spravna: 'a',
    napoveda: 'Čo je this a čo sa dá zavolať na výsledku?',
    vysvetlenie: 'push vráti samotný zoznam, takže naň hneď môžeš zavolať ďalšiu metódu: list.push(1).push(2).push(3).',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: "class Pes {\n  constructor(meno) {\n    this.meno = meno;\n  }\n  stekaj() {\n    return this.meno + ' haf';\n  }\n}\nconst p = new Pes('Rex');\nconsole.log(p.stekaj());",
    moznosti: ['Rex haf', 'meno haf', 'undefined haf', 'haf'],
    spravna: 'a',
    napoveda: 'this.meno je meno tohto psa.',
    vysvetlenie: 'constructor uložil Rex do this.meno a stekaj vráti Rex haf.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const a = { val: 1, next: null };\nconst b = { val: 2, next: null };\na.next = b;\nconsole.log(a.next.val);',
    moznosti: ['1', '2', 'null', 'undefined'],
    spravna: 'b',
    napoveda: 'a.next je uzol b.',
    vysvetlenie: 'a.next ukazuje na b a b.val je 2.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const c = { val: 3, next: null };\nconst b = { val: 2, next: c };\nconst head = { val: 1, next: b };\nlet cur = head;\nwhile (cur) {\n  console.log(cur.val);\n  cur = cur.next;\n}',
    moznosti: ['1\n2\n3', '3\n2\n1', '1', '1\n2'],
    spravna: 'a',
    napoveda: 'Začíname na head a ideme po next, kým nie je null.',
    vysvetlenie: 'Prejdeme 1 → 2 → 3 a potom je cur null a cyklus končí.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const b = { val: 2, next: null };\nconst a = { val: 1, next: b };\nconsole.log(a.next.next);',
    moznosti: ['2', 'null', 'undefined', 'Chyba: TypeError'],
    spravna: 'b',
    napoveda: 'a.next je b. Čo je b.next?',
    vysvetlenie: 'a.next je b a b.next je null (posledný uzol).',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const head = { val: 5, next: { val: 6, next: { val: 7, next: null } } };\nlet n = 0;\nlet cur = head;\nwhile (cur) {\n  n++;\n  cur = cur.next;\n}\nconsole.log(n);',
    moznosti: ['2', '3', '7', '18'],
    spravna: 'b',
    napoveda: 'Koľko uzlov prejdeme?',
    vysvetlenie: 'Zoznam má 3 uzly (5, 6, 7), takže n je 3.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'class K {\n  constructor() {\n    this.n = 0;\n  }\n  add() {\n    this.n++;\n    return this;\n  }\n}\nconst k = new K();\nk.add().add();\nconsole.log(k.n);',
    moznosti: ['0', '1', '2', 'Chyba: TypeError'],
    spravna: 'c',
    napoveda: 'add vracia this, takže druhé add sa volá na tom istom objekte.',
    vysvetlenie: 'Prvé add zvýši n na 1 a vráti k. Druhé add zvýši n na 2.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód? (unshift ručne)',
    kod: 'let head = { val: 2, next: null };\nconst node = { val: 1, next: head };\nhead = node;\nconsole.log(head.val, head.next.val);',
    moznosti: ['1 2', '2 1', '1 undefined', '2 null'],
    spravna: 'a',
    napoveda: 'Nový uzol ukazuje na starý head a potom sa stane novým head.',
    vysvetlenie: 'head je teraz uzol 1 a jeho next je uzol 2.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód? (odstránenie zo stredu)',
    kod: 'const c = { val: 3, next: null };\nconst b = { val: 2, next: c };\nconst a = { val: 1, next: b };\na.next = a.next.next;\nconsole.log(a.next.val);',
    moznosti: ['2', '3', 'null', 'undefined'],
    spravna: 'b',
    napoveda: 'a.next.next je c.',
    vysvetlenie: 'a.next teraz ukazuje priamo na c, uzol 2 sme preskočili. a.next.val je 3.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: "class Bod {\n  constructor(x) {\n    this.x = x;\n  }\n}\nconst a = new Bod(1);\nconst b = new Bod(2);\na.x = 10;\nconsole.log(b.x);",
    moznosti: ['10', '2', '1', 'undefined'],
    spravna: 'b',
    napoveda: 'Majú a a b spoločné x, alebo každý svoje?',
    vysvetlenie: 'Každá inštancia má vlastné vlastnosti. Zmena a.x nezmení b.x, ktoré ostáva 2.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: 'class X {\n  constructor() {\n    this.v = 5;\n  }\n  daj() {\n    return v;\n  }\n}\nconsole.log(new X().daj());',
    moznosti: ['5', 'undefined', 'Chyba: ReferenceError', 'null'],
    spravna: 'c',
    napoveda: 'V metóde je napísané len v, bez this.',
    vysvetlenie: 'v bez this je obyčajná premenná, ktorá neexistuje → ReferenceError. Správne je return this.v.',
  },
];

const zoznam = (m, hodnoty) => postav(new m.SinglyLinkedList(), hodnoty);

const debug = [
  {
    id: 1,
    nazov: 'Counter – počítadlo',
    napovedy: [
      'Chyba je ReferenceError: count is not defined. Kde je uložený count?',
      'count je vlastnosť objektu, nastavená v constructore cez this.',
      'Zmeň count++ na this.count++.',
    ],
    testy: (m, { rovne }) => {
      const c = new m.Counter();
      c.increment();
      rovne(c.increment(), 2, 'po dvoch increment()');
    },
  },
  {
    id: 2,
    nazov: 'Rectangle – obsah obdĺžnika',
    napovedy: [
      'new Rectangle(3, 4).area() má byť 12. Ktoré dve strany sa násobia?',
      'Obsah = šírka × výška. Teraz sa násobí šírka × šírka.',
      'Zmeň this.width * this.width na this.width * this.height.',
    ],
    testy: (m, { rovne }) => {
      rovne(new m.Rectangle(3, 4).area(), 12, 'new Rectangle(3, 4).area()');
    },
  },
  {
    id: 3,
    nazov: 'SinglyLinkedList.push – pridaj na koniec',
    napovedy: [
      'Po push(2) a push(3) do [1] chýba 2. Kto má ukazovať na nový uzol?',
      'Nový uzol sa pripája za POSLEDNÝ uzol (tail), nie za prvý.',
      'Zmeň this.head.next = node na this.tail.next = node.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [1]);
      l.push(2);
      l.push(3);
      rovne(naPole(l), [1, 2, 3], 'zoznam [1] po push(2), push(3)');
      rovne(l.tail.val, 3, 'tail.val');
      rovne(l.length, 3, 'length');
    },
  },
  {
    id: 4,
    nazov: 'SinglyLinkedList.pop – odober z konca',
    napovedy: [
      'Zoznam sa skráti správne, ale vráti sa zlý uzol. Ktorý uzol sme odobrali?',
      'current je posledný (odobratý), newTail je nový posledný.',
      'Zmeň return newTail na return current.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [1, 2, 3]);
      rovne(l.pop().val, 3, 'pop() na [1, 2, 3] – val vráteného uzla');
      rovne(naPole(l), [1, 2], 'zoznam po pop()');
      rovne(l.tail.val, 2, 'tail.val');
    },
  },
  {
    id: 5,
    nazov: 'SinglyLinkedList.shift – odober zo začiatku',
    napovedy: [
      'shift má vrátiť odobratý (pôvodný prvý) uzol. Čo vracia?',
      'this.head je po zmene už druhý uzol. Pôvodný prvý je v oldHead.',
      'Zmeň return this.head na return oldHead.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [1, 2, 3]);
      rovne(l.shift().val, 1, 'shift() na [1, 2, 3] – val vráteného uzla');
      rovne(naPole(l), [2, 3], 'zoznam po shift()');
    },
  },
  {
    id: 6,
    nazov: 'SinglyLinkedList.unshift – pridaj na začiatok',
    napovedy: [
      'Po unshift(1) do [2, 3] vyjde [1, 3]. Na koho ukazuje nový uzol?',
      'Nový prvý uzol má ukazovať na doterajší PRVÝ uzol.',
      'Zmeň node.next = this.tail na node.next = this.head.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [2, 3]);
      l.unshift(1);
      rovne(naPole(l), [1, 2, 3], 'zoznam [2, 3] po unshift(1)');
      rovne(l.length, 3, 'length');
    },
  },
  {
    id: 7,
    nazov: 'SinglyLinkedList.get – uzol na indexe',
    napovedy: [
      'get(1) vráti uzol 30 namiesto 20. Koľkokrát sa posunieme?',
      'Pre index 1 sa máme posunúť presne raz. Podmienka counter <= index pustí cyklus o raz viac.',
      'Zmeň counter <= index na counter < index (alebo counter !== index).',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [10, 20, 30]);
      rovne(l.get(1).val, 20, 'get(1).val');
      rovne(l.get(0).val, 10, 'get(0).val');
      rovne(l.get(5), null, 'get(5)');
    },
  },
  {
    id: 8,
    nazov: 'SinglyLinkedList.set – zmeň hodnotu',
    napovedy: [
      'set vráti true, ale hodnota sa nezmení. Ako sa volá vlastnosť s hodnotou v uzle?',
      'Uzol má vlastnosť val, nie value.',
      'Zmeň node.value = val na node.val = val.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [1, 2, 3]);
      rovne(l.set(1, 9), true, 'set(1, 9)');
      rovne(naPole(l), [1, 9, 3], 'zoznam po set(1, 9)');
      rovne(l.set(7, 1), false, 'set(7, 1)');
    },
  },
  {
    id: 9,
    nazov: 'SinglyLinkedList.insert – vlož do stredu',
    napovedy: [
      'Zoznam sa zacyklí. Záleží na poradí dvoch riadkov s next?',
      'Po prev.next = node už prev.next neukazuje na zvyšok zoznamu, ale na node. Najprv treba pripojiť node na zvyšok.',
      'Vymeň poradie: najprv node.next = prev.next; potom prev.next = node;',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [1, 3]);
      rovne(l.insert(1, 2), true, 'insert(1, 2)');
      rovne(naPole(l), [1, 2, 3], 'zoznam [1, 3] po insert(1, 2)');
      rovne(l.length, 3, 'length');
    },
  },
  {
    id: 10,
    nazov: 'SinglyLinkedList.reverse – otoč zoznam',
    napovedy: [
      'Po reverse má zoznam len 1 prvok. Na koho má ukazovať šípka uzla?',
      'Šípka sa otáča DOZADU – na predchádzajúci uzol (prev), nie na ďalší.',
      'Zmeň node.next = next na node.next = prev.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznam(m, [1, 2, 3]);
      l.reverse();
      rovne(naPole(l), [3, 2, 1], 'zoznam [1, 2, 3] po reverse()');
      rovne(l.tail.val, 1, 'tail.val');
    },
  },
];

const zoznamD = (m, hodnoty) => postav(new m.LinkedList(), hodnoty);

const doplnenie = [
  {
    id: 1,
    nazov: 'ListNode – nový uzol nikam neukazuje',
    napovedy: ['Kam ukazuje next nového uzla, keď za ním ešte nič nie je?', 'Hodnota „nič“ je null.', 'Nahraď ___ slovom null.'],
    testy: (m, { rovne }) => {
      const n = new m.ListNode(5);
      rovne(n.val, 5, 'new ListNode(5).val');
      rovne(n.next, null, 'new ListNode(5).next');
    },
  },
  {
    id: 2,
    nazov: 'LinkedList.push – pripoj za posledný',
    napovedy: ['Ktorá vlastnosť posledného uzla má ukázať na nový uzol?', 'Odkaz na ďalší uzol.', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1]);
      l.push(2);
      rovne(naPole(l), [1, 2], 'zoznam [1] po push(2)');
    },
  },
  {
    id: 3,
    nazov: 'LinkedList.pop – choď, kým je ďalší',
    napovedy: ['Kým existuje ďalší uzol, posúvame sa. Ako sa volá vlastnosť s ďalším uzlom?', 'current.… ', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1, 2, 3]);
      rovne(l.pop().val, 3, 'pop().val');
      rovne(naPole(l), [1, 2], 'zoznam po pop()');
    },
  },
  {
    id: 4,
    nazov: 'LinkedList.shift – nový začiatok',
    napovedy: ['Nový head je uzol hneď za starým head.', 'oldHead.…', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1, 2]);
      rovne(l.shift().val, 1, 'shift().val');
      rovne(naPole(l), [2], 'zoznam po shift()');
    },
  },
  {
    id: 5,
    nazov: 'LinkedList.unshift – nový ukáže na starý začiatok',
    napovedy: ['Nový prvý uzol ukáže na doterajší prvý. Ako sa volá?', 'this.…', 'Nahraď ___ slovom head.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [2]);
      l.unshift(1);
      rovne(naPole(l), [1, 2], 'zoznam [2] po unshift(1)');
    },
  },
  {
    id: 6,
    nazov: 'LinkedList.get – kontrola rozsahu',
    napovedy: ['Index musí byť menší ako počet prvkov. Kde je počet uložený?', 'this.…', 'Nahraď ___ slovom length.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [4, 5]);
      rovne(l.get(1).val, 5, 'get(1).val');
      rovne(l.get(2), null, 'get(2)');
      rovne(l.get(5), null, 'get(5)');
    },
  },
  {
    id: 7,
    nazov: 'LinkedList.set – zapíš hodnotu',
    napovedy: ['Ako sa volá vlastnosť uzla s hodnotou?', 'Tá istá, čo v constructore ListNode.', 'Nahraď ___ slovom val.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1, 2]);
      l.set(0, 7);
      rovne(naPole(l), [7, 2], 'zoznam po set(0, 7)');
    },
  },
  {
    id: 8,
    nazov: 'LinkedList.insert – vytvor uzol',
    napovedy: ['Akú triedu použiješ na vytvorenie nového uzla?', 'Je definovaná na začiatku súboru.', 'Nahraď ___ slovom ListNode.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1, 3]);
      l.insert(1, 2);
      rovne(naPole(l), [1, 2, 3], 'zoznam [1, 3] po insert(1, 2)');
    },
  },
  {
    id: 9,
    nazov: 'LinkedList.remove – preskoč uzol',
    napovedy: ['prev má ukázať na uzol ZA odstraňovaným.', 'removed.…', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1, 2, 3]);
      rovne(l.remove(1).val, 2, 'remove(1).val');
      rovne(naPole(l), [1, 3], 'zoznam po remove(1)');
    },
  },
  {
    id: 10,
    nazov: 'LinkedList.reverse – otoč šípky (dve ___)',
    napovedy: [
      'Prvé ___: na koho má šípka uzla ukazovať po otočení? Druhé ___: kto bude „predchádzajúci“ v ďalšom kroku?',
      'Šípka ide dozadu na prev. Aktuálny node sa stane novým prev.',
      'Prvé ___ nahraď prev, druhé ___ nahraď node.',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamD(m, [1, 2, 3, 4]);
      l.reverse();
      rovne(naPole(l), [4, 3, 2, 1], 'zoznam po reverse()');
    },
  },
];

const zoznamP = (m, hodnoty) => postav(new m.SList(), hodnoty);

const prakticke = [
  {
    id: 1,
    nazov: 'Point – bod a vzdialenosť',
    napovedy: [
      'V constructore ulož this.x = x a this.y = y.',
      'Vzdialenosť: dx = other.x - this.x, dy = other.y - this.y, výsledok Math.sqrt(dx * dx + dy * dy).',
      'distanceTo(other) { const dx = other.x - this.x; const dy = other.y - this.y; return Math.sqrt(dx * dx + dy * dy); }',
    ],
    testy: (m, { rovne }) => {
      const a = new m.Point(0, 0);
      const b = new m.Point(3, 4);
      rovne([b.x, b.y], [3, 4], 'new Point(3, 4) – x a y');
      rovne(a.distanceTo(b), 5, 'Point(0, 0).distanceTo(Point(3, 4))');
    },
  },
  {
    id: 2,
    nazov: 'Node – uzol',
    napovedy: ['Uzol má dve vlastnosti: val a next.', 'next je na začiatku null.', 'constructor(val) { this.val = val; this.next = null; }'],
    testy: (m, { rovne }) => {
      const n = new m.Node(5);
      rovne([n.val, n.next], [5, null], 'new Node(5) – [val, next]');
    },
  },
  {
    id: 3,
    nazov: 'SList.push – pridaj na koniec (vráť this)',
    napovedy: [
      'Potrebuješ hotovú triedu Node z úlohy 2. Prázdny zoznam: head aj tail je nový uzol.',
      'Inak: this.tail.next = node; this.tail = node. Nakoniec length++ a return this.',
      'Celé riešenie je v teórii v časti 3 (push).',
    ],
    testy: (m, { rovne }) => {
      const l = new m.SList();
      rovne(l.push(1), l, 'push vracia this');
      l.push(2).push(3);
      rovne(naPole(l), [1, 2, 3], 'zoznam po push(1), push(2), push(3)');
      rovne([l.head.val, l.tail.val, l.length], [1, 3, 3], '[head.val, tail.val, length]');
    },
  },
  {
    id: 4,
    nazov: 'SList.pop – odober z konca (vráť uzol)',
    napovedy: [
      'Prázdny → undefined. Inak choď s current a newTail, kým current.next existuje.',
      'Potom tail = newTail, tail.next = null, length--. Ak je length 0, head aj tail = null.',
      'Celé riešenie je v teórii v časti 3 (pop).',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamP(m, [1, 2, 3]);
      rovne(l.pop().val, 3, 'pop().val');
      rovne([naPole(l), l.tail.val, l.length], [[1, 2], 2, 2], '[zoznam, tail.val, length]');
      const jeden = zoznamP(m, [7]);
      rovne(jeden.pop().val, 7, 'pop() na [7]');
      rovne([jeden.head, jeden.tail, jeden.length], [null, null, 0], '[head, tail, length] po vyprázdnení');
      rovne(new m.SList().pop(), undefined, 'pop() na prázdnom zozname');
    },
  },
  {
    id: 5,
    nazov: 'SList.shift – odober zo začiatku (vráť uzol)',
    napovedy: [
      'Prázdny → undefined. Inak si odlož oldHead a head = oldHead.next.',
      'length--. Ak je length 0, aj tail = null. Vráť oldHead.',
      'Celé riešenie je v teórii v časti 3 (shift).',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamP(m, [1, 2]);
      rovne(l.shift().val, 1, 'shift().val');
      rovne([naPole(l), l.length], [[2], 1], '[zoznam, length]');
      l.shift();
      rovne([l.head, l.tail, l.length], [null, null, 0], '[head, tail, length] po vyprázdnení');
      rovne(l.shift(), undefined, 'shift() na prázdnom zozname');
    },
  },
  {
    id: 6,
    nazov: 'SList.unshift – pridaj na začiatok (vráť this)',
    napovedy: [
      'Prázdny zoznam: head aj tail je nový uzol.',
      'Inak node.next = this.head; this.head = node. Potom length++ a return this.',
      'Celé riešenie je v teórii v časti 3 (unshift).',
    ],
    testy: (m, { rovne }) => {
      const l = new m.SList();
      rovne(l.unshift(3), l, 'unshift vracia this');
      l.unshift(2).unshift(1);
      rovne([naPole(l), l.tail.val, l.length], [[1, 2, 3], 3, 3], '[zoznam, tail.val, length]');
    },
  },
  {
    id: 7,
    nazov: 'SList.get – uzol na indexe (inak null)',
    napovedy: [
      'Mimo rozsahu (index < 0 alebo index >= length) → null.',
      'Inak začni na head a posuň sa index-krát cez next.',
      'Celé riešenie je v teórii v časti 3 (get).',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamP(m, ['a', 'b', 'c']);
      rovne([l.get(0).val, l.get(2).val], ['a', 'c'], '[get(0).val, get(2).val]');
      rovne([l.get(3), l.get(-1)], [null, null], '[get(3), get(-1)]');
    },
  },
  {
    id: 8,
    nazov: 'SList.insert – vlož na index (true / false)',
    napovedy: [
      'Mimo rozsahu → false. index 0 → unshift, index === length → push (úlohy 3 a 6).',
      'Inak prev = this.get(index - 1) (úloha 7), node.next = prev.next, prev.next = node, length++.',
      'Celé riešenie je v teórii v časti 3 (insert). Pozor na poradie riadkov s next!',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamP(m, [1, 3]);
      rovne(l.insert(1, 2), true, 'insert(1, 2)');
      rovne(naPole(l), [1, 2, 3], 'po insert(1, 2)');
      l.insert(0, 0);
      l.insert(4, 4);
      rovne([naPole(l), l.length], [[0, 1, 2, 3, 4], 5], '[zoznam, length] po insert(0, 0) a insert(4, 4)');
      rovne(l.insert(9, 9), false, 'insert(9, 9)');
    },
  },
  {
    id: 9,
    nazov: 'SList.remove – odober z indexu (vráť uzol)',
    napovedy: [
      'Mimo rozsahu → undefined. index 0 → shift, posledný index → pop.',
      'Inak prev = this.get(index - 1), removed = prev.next, prev.next = removed.next, length--.',
      'Celé riešenie je v teórii v časti 3 (remove).',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamP(m, [1, 2, 3, 4]);
      rovne(l.remove(1).val, 2, 'remove(1).val');
      rovne([naPole(l), l.length], [[1, 3, 4], 3], '[zoznam, length]');
      rovne(l.remove(2).val, 4, 'remove(2).val – posledný');
      rovne(l.tail.val, 3, 'tail.val po odobratí posledného');
      rovne(l.remove(5), undefined, 'remove(5)');
    },
  },
  {
    id: 10,
    nazov: 'SList.reverse – otoč zoznam na mieste (vráť this)',
    napovedy: [
      'Vymeň head a tail. Potom prejdi zoznam s premennými prev = null, node, next.',
      'V cykle: next = node.next; node.next = prev; prev = node; node = next;',
      'Celé riešenie je v teórii v časti 3 (reverse).',
    ],
    testy: (m, { rovne }) => {
      const l = zoznamP(m, [1, 2, 3, 4]);
      rovne(l.reverse(), l, 'reverse vracia this');
      rovne([naPole(l), l.head.val, l.tail.val], [[4, 3, 2, 1], 4, 1], '[zoznam, head.val, tail.val]');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
