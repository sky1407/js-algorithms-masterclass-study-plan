'use strict';

function hodnoty(s) {
  const v = [];
  let n = s.first;
  while (n) {
    v.push(n.val);
    if (v.length > 10000) throw new Error('zoznam je zacyklený – next niekde ukazuje späť');
    n = n.next;
  }
  return v;
}

function postav(s, vals) {
  const uzly = vals.map((val) => ({ val, next: null }));
  for (let i = 0; i < uzly.length - 1; i++) uzly[i].next = uzly[i + 1];
  s.first = uzly[0] || null;
  s.last = uzly[uzly.length - 1] || null;
  s.size = uzly.length;
  return s;
}

const teoria = [
  {
    id: 1,
    otazka: 'Ako funguje Stack (zásobník)?',
    moznosti: [
      'LIFO – posledný, ktorý prišiel, ide prvý von (kôpka tanierov).',
      'FIFO – kto prvý príde, ide prvý von (rad v obchode).',
      'Prvky sú vždy zotriedené.',
      'Vyberá sa náhodný prvok.',
    ],
    spravna: 'a',
    napoveda: 'Z kôpky tanierov berieš ktorý tanier?',
    vysvetlenie: 'Stack je LIFO: Last In, First Out. Berieš vždy ten, ktorý si dal navrch ako posledný.',
  },
  {
    id: 2,
    otazka: 'Ako funguje Queue (front, rad)?',
    moznosti: [
      'LIFO – posledný ide prvý.',
      'FIFO – kto prvý príde, ide prvý (rad v obchode).',
      'Najmenší prvok ide prvý.',
      'Prvky sa nedajú odoberať.',
    ],
    spravna: 'b',
    napoveda: 'Kto ide prvý k pokladni?',
    vysvetlenie: 'Queue je FIFO: First In, First Out. Kto sa postavil do radu prvý, ide prvý na rad.',
  },
  {
    id: 3,
    otazka: 'Ktoré metódy poľa použiješ, keď chceš z poľa spraviť RÝCHLY stack?',
    moznosti: ['push a pop', 'push a shift', 'unshift a pop', 'shift a unshift'],
    spravna: 'a',
    napoveda: 'Ktoré operácie s poľom sú O(1)?',
    vysvetlenie: 'push a pop pracujú s koncom poľa a sú O(1). unshift a shift by tiež fungovali ako stack, ale sú O(n).',
  },
  {
    id: 4,
    otazka: 'Queue z poľa cez push a shift funguje, ale prečo nie je ideálny?',
    moznosti: [
      'Lebo shift je O(n) – musí prečíslovať všetky prvky.',
      'Lebo push nefunguje.',
      'Lebo pole nemôže mať viac ako 100 prvkov.',
      'Je ideálny, nie je s ním problém.',
    ],
    spravna: 'a',
    napoveda: 'Čo sa stane s indexmi po odobratí prvého prvku?',
    vysvetlenie: 'Po shift sa všetky prvky posunú o jedno miesto doľava a dostanú nový index. To je O(n).',
  },
  {
    id: 5,
    otazka: 'Stack pomocou linked listu: kde pridávame aj odoberáme prvky?',
    moznosti: [
      'Na začiatku (first) – lebo tam je to v jednosmernom zozname O(1).',
      'Na konci (last).',
      'V strede.',
      'Pridávame na konci, odoberáme na začiatku.',
    ],
    spravna: 'a',
    napoveda: 'Odobratie z konca jednosmerného zoznamu je O(n). Odkiaľ je O(1)?',
    vysvetlenie: 'Pridanie aj odobratie na začiatku jednosmerného zoznamu je O(1), preto je vrch zásobníka first.',
  },
  {
    id: 6,
    otazka: 'Queue pomocou linked listu: kde je enqueue a kde dequeue?',
    moznosti: [
      'enqueue na koniec (last), dequeue zo začiatku (first).',
      'Oboje na začiatku.',
      'Oboje na konci.',
      'enqueue na začiatok, dequeue z konca.',
    ],
    spravna: 'a',
    napoveda: 'Nový zákazník sa stavia na koniec radu. Kto odchádza?',
    vysvetlenie: 'Pridávame na koniec (last.next = node) a odoberáme zo začiatku (first = first.next). Oboje je O(1).',
  },
  {
    id: 7,
    otazka: 'Kde sa používa STACK?',
    moznosti: [
      'Undo (Ctrl+Z), call stack, tlačidlo Späť v prehliadači.',
      'Tlačiareň, ktorá tlačí v poradí.',
      'Rad pri pokladni.',
      'Triedenie čísel.',
    ],
    spravna: 'a',
    napoveda: 'Undo vráti POSLEDNÝ krok.',
    vysvetlenie: 'Undo vždy vráti posledný krok, to je LIFO. Rovnako call stack a tlačidlo Späť.',
  },
  {
    id: 8,
    otazka: 'Kde sa používa QUEUE?',
    moznosti: [
      'Rad úloh pre tlačiareň – tlačí v poradí, v akom prišli.',
      'Undo (Ctrl+Z).',
      'Kontrola zátvoriek.',
      'Rekurzia.',
    ],
    spravna: 'a',
    napoveda: 'Kde záleží na tom, kto prišiel prvý?',
    vysvetlenie: 'Tlačiareň vytlačí dokumenty v poradí, v akom prišli – FIFO.',
  },
  {
    id: 9,
    otazka: 'Aké rýchle sú push a pop v stacku (linked list aj pole)?',
    moznosti: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    spravna: 'a',
    napoveda: 'Treba pri nich niečo prechádzať?',
    vysvetlenie: 'Pracujú len s vrchom zásobníka, nič neprechádzajú. Preto O(1).',
  },
  {
    id: 10,
    otazka: 'Čo robí operácia peek?',
    moznosti: [
      'Pozrie, čo je navrchu, ale nič neodoberie.',
      'Odoberie všetky prvky.',
      'Pridá prvok na spodok.',
      'Otočí zásobník.',
    ],
    spravna: 'a',
    napoveda: 'Peek = nakuknúť.',
    vysvetlenie: 'peek vráti vrchný prvok bez odobratia. Pri poli je to arr[arr.length - 1].',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const s = [];\ns.push(1);\ns.push(2);\ns.push(3);\nconsole.log(s.pop());',
    moznosti: ['1', '3', '[ 1, 2 ]', '2'],
    spravna: 'b',
    napoveda: 'Stack: posledný dnu, prvý von.',
    vysvetlenie: '3 bolo pridané ako posledné, takže pop vráti 3.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const q = [];\nq.push(1);\nq.push(2);\nq.push(3);\nconsole.log(q.shift());',
    moznosti: ['1', '3', '[ 2, 3 ]', '2'],
    spravna: 'a',
    napoveda: 'Queue: prvý dnu, prvý von.',
    vysvetlenie: '1 bolo v rade prvé, takže shift vráti 1.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const s = [1, 2, 3];\ns.pop();\ns.push(4);\nconsole.log(s);',
    moznosti: ['[ 1, 2, 4 ]', '[ 1, 2, 3, 4 ]', '[ 4, 1, 2 ]', '[ 2, 3, 4 ]'],
    spravna: 'a',
    napoveda: 'pop zoberie 3, push pridá 4 na koniec.',
    vysvetlenie: 'Po pop je [1, 2] a po push(4) je [ 1, 2, 4 ].',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód? (peek)',
    kod: "const s = ['a', 'b'];\nconsole.log(s[s.length - 1]);\nconsole.log(s.length);",
    moznosti: ['b\n2', 'b\n1', 'a\n2', 'undefined\n2'],
    spravna: 'a',
    napoveda: 'Peek len pozrie, nič neodoberá.',
    vysvetlenie: 'Vrch je b a dĺžka ostáva 2, lebo peek nič neodobral.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([].pop());',
    moznosti: ['undefined', 'null', '0', 'Chyba: TypeError'],
    spravna: 'a',
    napoveda: 'Čo vráti pop, keď nie je čo odobrať?',
    vysvetlenie: 'pop na prázdnom poli nespadne, vráti undefined.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'let size = 0;\nconsole.log(++size, size++, size);',
    moznosti: ['1 1 2', '1 2 2', '0 1 2', '1 1 1'],
    spravna: 'a',
    napoveda: '++x vráti novú hodnotu, x++ vráti starú a až potom zvýši.',
    vysvetlenie: '++size zvýši na 1 a vráti 1. size++ vráti 1 a zvýši na 2. Potom size je 2.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: "const stack = [];\nfor (const ch of 'abc') stack.push(ch);\nlet r = '';\nwhile (stack.length) r += stack.pop();\nconsole.log(r);",
    moznosti: ['abc', 'cba', 'bca', 'acb'],
    spravna: 'b',
    napoveda: 'Posledné vložené písmeno ide von prvé.',
    vysvetlenie: 'Na stack prídu a, b, c. Pop ich vyberá v poradí c, b, a, takže výsledok je cba.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "let hlbka = 0;\nfor (const ch of '(()') {\n  hlbka += ch === '(' ? 1 : -1;\n}\nconsole.log(hlbka);",
    moznosti: ['0', '1', '-1', '3'],
    spravna: 'b',
    napoveda: 'Dve otváracie, jedna zatváracia.',
    vysvetlenie: '+1 +1 -1 = 1. Jedna zátvorka ostala neuzavretá.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (dequeue v linked liste)',
    kod: 'let first = { val: 1, next: { val: 2, next: null } };\nconst temp = first;\nfirst = first.next;\nconsole.log(temp.val, first.val);',
    moznosti: ['1 2', '2 1', '1 1', '2 null'],
    spravna: 'a',
    napoveda: 'temp si pamätá pôvodný prvý uzol.',
    vysvetlenie: 'temp je odobratý uzol 1, nový first je uzol 2.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód? (undo)',
    kod: "const kroky = ['napíš', 'zmaž', 'vlož'];\nkroky.pop();\nconsole.log(kroky.length, kroky[kroky.length - 1]);",
    moznosti: ['2 zmaž', '2 vlož', '3 vlož', '2 napíš'],
    spravna: 'a',
    napoveda: 'Undo zruší posledný krok.',
    vysvetlenie: 'pop odstráni vlož. Ostanú 2 kroky a posledný je zmaž.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'Stack.push – nový vrch',
    napovedy: [
      'Zásobník sa zacyklí. Na čo ukazuje this.first.next po zmene first?',
      'Po this.first = node je this.first ten nový uzol. Pod neho patrí STARÝ vrch, ktorý si treba odložiť.',
      'Zmeň this.first.next = this.first na this.first.next = temp.',
    ],
    testy: (m, { rovne }) => {
      const s = postav(new m.Stack(), [2, 1]);
      rovne(s.push(3), 3, 'push(3) vráti novú veľkosť');
      rovne(hodnoty(s), [3, 2, 1], 'zásobník zvrchu po push(3)');
    },
  },
  {
    id: 2,
    nazov: 'Stack.pop – vráť odobratú hodnotu',
    napovedy: [
      'pop vráti hodnotu, ktorá ostala navrchu, nie tú odobratú. Kde je odobratý uzol?',
      'Odobratý uzol je odložený v temp.',
      'Zmeň return this.first.val na return temp.val.',
    ],
    testy: (m, { rovne }) => {
      const s = postav(new m.Stack(), [3, 2, 1]);
      rovne(s.pop(), 3, 'pop() na zásobníku 3, 2, 1');
      rovne(hodnoty(s), [2, 1], 'zásobník po pop()');
    },
  },
  {
    id: 3,
    nazov: 'Stack.peek – pozri vrch',
    napovedy: [
      'peek vráti spodok namiesto vrchu. Kde je vrch zásobníka?',
      'Vrch je first, spodok je last.',
      'Zmeň this.last.val na this.first.val.',
    ],
    testy: (m, { rovne }) => {
      const s = postav(new m.Stack(), [3, 2, 1]);
      rovne(s.peek(), 3, 'peek()');
      rovne(s.size, 3, 'size po peek() (nič sa neodobralo)');
    },
  },
  {
    id: 4,
    nazov: 'Queue.enqueue – postav sa na koniec radu',
    napovedy: [
      'Po enqueue sa stratí prvok zo stredu. Za koho sa nový prvok pripája?',
      'Nový sa stavia za POSLEDNÉHO v rade.',
      'Zmeň this.first.next = node na this.last.next = node.',
    ],
    testy: (m, { rovne }) => {
      const q = postav(new m.Queue(), [1, 2]);
      q.enqueue(3);
      rovne(hodnoty(q), [1, 2, 3], 'rad po enqueue(3)');
      rovne(q.last.val, 3, 'last.val');
    },
  },
  {
    id: 5,
    nazov: 'Queue.dequeue – vráť hodnotu',
    napovedy: [
      'dequeue vráti celý objekt uzla, nie číslo. Čo má vrátiť?',
      'Vraciame hodnotu uzla – vlastnosť val.',
      'Zmeň return temp na return temp.val.',
    ],
    testy: (m, { rovne }) => {
      const q = postav(new m.Queue(), [1, 2, 3]);
      rovne(q.dequeue(), 1, 'dequeue()');
      rovne(hodnoty(q), [2, 3], 'rad po dequeue()');
    },
  },
  {
    id: 6,
    nazov: 'ArrayStack.pop – zásobník z poľa',
    napovedy: [
      'pop vráti prvý vložený prvok namiesto posledného. Ktorá metóda poľa sa používa?',
      'shift berie zo začiatku. Stack berie z toho istého konca, kam push pridáva.',
      'Zmeň this.items.shift() na this.items.pop().',
    ],
    testy: (m, { rovne }) => {
      const s = new m.ArrayStack();
      s.push('a');
      s.push('b');
      rovne(s.pop(), 'b', "pop() po push('a'), push('b')");
    },
  },
  {
    id: 7,
    nazov: 'ArrayQueue.dequeue – rad z poľa',
    napovedy: [
      'dequeue vráti posledného namiesto prvého. Ktorá metóda poľa berie zo začiatku?',
      'pop berie z konca, shift zo začiatku.',
      'Zmeň this.items.pop() na this.items.shift().',
    ],
    testy: (m, { rovne }) => {
      const q = new m.ArrayQueue();
      q.enqueue('a');
      q.enqueue('b');
      rovne(q.dequeue(), 'a', "dequeue() po enqueue('a'), enqueue('b')");
    },
  },
  {
    id: 8,
    nazov: 'isBalanced – sú zátvorky v poriadku?',
    napovedy: [
      "isBalanced('((') vráti true. Ostali na zásobníku neuzavreté zátvorky?",
      'Na konci je všetko v poriadku, len ak je zásobník prázdny.',
      'Zmeň return true na return stack.length === 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isBalanced('({[]})'), true, "isBalanced('({[]})')");
      rovne(m.isBalanced('(]'), false, "isBalanced('(]')");
      rovne(m.isBalanced('(('), false, "isBalanced('((')");
    },
  },
  {
    id: 9,
    nazov: 'reverseString – otoč text pomocou zásobníka',
    napovedy: [
      'Text sa neotočí. Z ktorého konca berie zásobník?',
      'shift berie zo začiatku (ako rad). Zásobník berie z vrchu – z konca.',
      'Zmeň stack.shift() na stack.pop().',
    ],
    testy: (m, { rovne }) => {
      rovne(m.reverseString('ahoj'), 'joha', "reverseString('ahoj')");
    },
  },
  {
    id: 10,
    nazov: 'backTo – tlačidlo Späť v prehliadači',
    napovedy: [
      "backTo(['a', 'b', 'c', 'd'], 2) má vrátiť 'b'. Koľkokrát sa vykoná pop?",
      'Cyklus i <= steps prebehne steps + 1 krát.',
      'Zmeň i <= steps na i < steps.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.backTo(['a', 'b', 'c', 'd'], 2), 'b', "backTo(['a', 'b', 'c', 'd'], 2)");
      rovne(m.backTo(['a', 'b'], 0), 'b', "backTo(['a', 'b'], 0)");
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'StackD.push – pod nový vrch daj starý',
    napovedy: ['Starý vrch sme si odložili. Do ktorej premennej?', 'Pomocná premenná temp.', 'Nahraď ___ slovom temp.'],
    testy: (m, { rovne }) => {
      const s = postav(new m.StackD(), [1]);
      s.push(2);
      rovne(hodnoty(s), [2, 1], 'zásobník zvrchu po push(2)');
    },
  },
  {
    id: 2,
    nazov: 'StackD.push2 – vráť novú veľkosť',
    napovedy: ['Ako sa volá vlastnosť s počtom prvkov?', 'Colt ju volá size.', 'Nahraď ___ slovom size.'],
    testy: (m, { rovne }) => {
      const s = postav(new m.StackD(), [1, 2]);
      rovne(s.push2(0), 3, 'push2(0) vráti novú veľkosť');
    },
  },
  {
    id: 3,
    nazov: 'StackD.pop – nový vrch',
    napovedy: ['Nový vrch je uzol pod starým vrchom.', 'first.…', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const s = postav(new m.StackD(), [3, 2, 1]);
      s.pop();
      rovne(hodnoty(s), [2, 1], 'zásobník po pop()');
    },
  },
  {
    id: 4,
    nazov: 'StackD.pop2 – vráť hodnotu',
    napovedy: ['Vraciame hodnotu uzla. Ako sa volá vlastnosť?', 'temp.…', 'Nahraď ___ slovom val.'],
    testy: (m, { rovne }) => {
      const s = postav(new m.StackD(), [3, 2, 1]);
      rovne(s.pop2(), 3, 'pop2()');
    },
  },
  {
    id: 5,
    nazov: 'QueueD.enqueue – pripoj za posledného',
    napovedy: ['Ktorá vlastnosť posledného uzla má ukázať na nový?', 'Odkaz na ďalší.', 'Nahraď ___ slovom next.'],
    testy: (m, { rovne }) => {
      const q = postav(new m.QueueD(), [1]);
      q.enqueue(2);
      rovne(hodnoty(q), [1, 2], 'rad po enqueue(2)');
    },
  },
  {
    id: 6,
    nazov: 'QueueD.enqueue2 – nový je posledný',
    napovedy: ['Kto je po pridaní posledný v rade?', 'Novo vytvorený uzol.', 'Nahraď ___ slovom node.'],
    testy: (m, { rovne }) => {
      const q = postav(new m.QueueD(), [1]);
      q.enqueue2(2);
      q.enqueue2(3);
      rovne([hodnoty(q), q.last.val], [[1, 2, 3], 3], '[rad, last.val]');
    },
  },
  {
    id: 7,
    nazov: 'QueueD.dequeue – kto ide von',
    napovedy: ['Z radu odchádza ten, kto je…', '…na začiatku.', 'Nahraď ___ slovom first.'],
    testy: (m, { rovne }) => {
      const q = postav(new m.QueueD(), [1, 2]);
      rovne(q.dequeue(), 1, 'dequeue()');
      rovne(hodnoty(q), [2], 'rad po dequeue()');
    },
  },
  {
    id: 8,
    nazov: 'ArrStack.pop – zásobník z poľa',
    napovedy: ['Ktorá metóda poľa odoberá z konca?', 'Opak push.', 'Nahraď ___ slovom pop.'],
    testy: (m, { rovne }) => {
      const s = new m.ArrStack();
      s.push(1);
      s.push(2);
      rovne(s.pop(), 2, 'pop()');
    },
  },
  {
    id: 9,
    nazov: 'ArrQueue.dequeue – rad z poľa',
    napovedy: ['Ktorá metóda poľa odoberá zo začiatku?', 'Opak unshift.', 'Nahraď ___ slovom shift.'],
    testy: (m, { rovne }) => {
      const q = new m.ArrQueue();
      q.enqueue(1);
      q.enqueue(2);
      rovne(q.dequeue(), 1, 'dequeue()');
    },
  },
  {
    id: 10,
    nazov: 'balanced – zátvorky (dve ___)',
    napovedy: [
      'Prvé ___: ktorou metódou zoberieš vrch zásobníka? Druhé ___: koľko neuzavretých zátvoriek smie na konci ostať?',
      'Vrch odoberá pop. Na konci nesmie ostať žiadna.',
      'Prvé ___ nahraď pop, druhé ___ nahraď 0.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.balanced('[()]'), true, "balanced('[()]')");
      rovne(m.balanced('[(])'), false, "balanced('[(])')");
      rovne(m.balanced('[['), false, "balanced('[[')");
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'Node – uzol s val a next',
    napovedy: ['Dve vlastnosti: val a next.', 'next je na začiatku null.', 'constructor(val) { this.val = val; this.next = null; }'],
    testy: (m, { rovne }) => {
      const n = new m.Node(1);
      rovne([n.val, n.next], [1, null], 'new Node(1) – [val, next]');
    },
  },
  {
    id: 2,
    nazov: 'LinkedStack.push – na vrch (vráť novú veľkosť)',
    napovedy: [
      'Prázdny: first aj last je nový uzol.',
      'Inak: temp = this.first; this.first = node; this.first.next = temp. Nakoniec return ++this.size.',
      'Celé riešenie je v teórii v časti 1 (Stack.push).',
    ],
    testy: (m, { rovne }) => {
      const s = new m.LinkedStack();
      rovne([s.push(1), s.push(2), s.push(3)], [1, 2, 3], 'návratové hodnoty push');
      rovne([hodnoty(s), s.last.val], [[3, 2, 1], 1], '[zvrchu, last.val]');
    },
  },
  {
    id: 3,
    nazov: 'LinkedStack.pop – z vrchu (vráť hodnotu, prázdny → null)',
    napovedy: [
      'Prázdny → null. temp = this.first.',
      'Ak first === last, nastav last = null. Potom first = first.next, size--, return temp.val.',
      'Celé riešenie je v teórii v časti 1 (Stack.pop).',
    ],
    testy: (m, { rovne }) => {
      const s = postav(new m.LinkedStack(), [3, 2, 1]);
      rovne([s.pop(), s.pop()], [3, 2], 'dva pop()');
      rovne([hodnoty(s), s.size], [[1], 1], '[zásobník, size]');
      s.pop();
      rovne([s.first, s.last, s.pop()], [null, null, null], '[first, last, pop()] po vyprázdnení');
    },
  },
  {
    id: 4,
    nazov: 'LinkedStack.peek – hodnota navrchu (prázdny → null)',
    napovedy: ['Vrch je this.first.', 'Ak first neexistuje, vráť null.', 'return this.first ? this.first.val : null;'],
    testy: (m, { rovne }) => {
      rovne(postav(new m.LinkedStack(), [9, 8]).peek(), 9, 'peek() na 9, 8');
      rovne(new m.LinkedStack().peek(), null, 'peek() na prázdnom');
    },
  },
  {
    id: 5,
    nazov: 'LinkedQueue.enqueue – na koniec radu (vráť novú veľkosť)',
    napovedy: [
      'Prázdny: first aj last je nový uzol.',
      'Inak: this.last.next = node; this.last = node. Nakoniec return ++this.size.',
      'Celé riešenie je v teórii v časti 2 (Queue.enqueue).',
    ],
    testy: (m, { rovne }) => {
      const q = new m.LinkedQueue();
      rovne([q.enqueue('a'), q.enqueue('b'), q.enqueue('c')], [1, 2, 3], 'návratové hodnoty enqueue');
      rovne([hodnoty(q), q.first.val, q.last.val], [['a', 'b', 'c'], 'a', 'c'], '[rad, first.val, last.val]');
    },
  },
  {
    id: 6,
    nazov: 'LinkedQueue.dequeue – zo začiatku (vráť hodnotu, prázdny → null)',
    napovedy: [
      'Prázdny → null. temp = this.first.',
      'Ak first === last, last = null. Potom first = first.next, size--, return temp.val.',
      'Celé riešenie je v teórii v časti 2 (Queue.dequeue).',
    ],
    testy: (m, { rovne }) => {
      const q = postav(new m.LinkedQueue(), ['a', 'b']);
      rovne([q.dequeue(), q.dequeue(), q.dequeue()], ['a', 'b', null], 'tri dequeue()');
      rovne([q.first, q.last, q.size], [null, null, 0], '[first, last, size]');
    },
  },
  {
    id: 7,
    nazov: 'LinkedQueue.front – kto je na rade (prázdny → null)',
    napovedy: ['Na rade je first.', 'Ak first neexistuje, vráť null.', 'return this.first ? this.first.val : null;'],
    testy: (m, { rovne }) => {
      rovne(postav(new m.LinkedQueue(), ['x', 'y']).front(), 'x', 'front()');
      rovne(new m.LinkedQueue().front(), null, 'front() na prázdnom');
    },
  },
  {
    id: 8,
    nazov: 'reverseWithStack – otoč text pomocou zásobníka',
    napovedy: [
      'Všetky písmená daj na zásobník (pole, push).',
      'Potom ich vyberaj pop-om a lep do výsledku, kým nie je zásobník prázdny.',
      "const s = []; for (const ch of str) s.push(ch); let r = ''; while (s.length) r += s.pop(); return r;",
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.reverseWithStack('stack'), 'kcats', "reverseWithStack('stack')");
      rovne(m.reverseWithStack(''), '', "reverseWithStack('')");
      nepouziva(m.reverseWithStack, /reverse\s*\(/, 'použi zásobník, nie .reverse()');
    },
  },
  {
    id: 9,
    nazov: 'balancedBrackets – sú zátvorky ( ) [ ] { } v poriadku?',
    napovedy: [
      'Otváracie daj na zásobník. Pri zatváracej skontroluj, či je navrchu správna otváracia.',
      "Použi objekt párov { ')': '(', ']': '[', '}': '{' }. Na konci musí byť zásobník prázdny.",
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.balancedBrackets('a(b[c]{d}e)'), true, "balancedBrackets('a(b[c]{d}e)')");
      rovne(m.balancedBrackets('([)]'), false, "balancedBrackets('([)]')");
      rovne(m.balancedBrackets(')('), false, "balancedBrackets(')(')");
      rovne(m.balancedBrackets(''), true, "balancedBrackets('')");
    },
  },
  {
    id: 10,
    nazov: 'removeAdjacentDuplicates – odstráň susedné rovnaké písmená',
    napovedy: [
      'Prechádzaj písmená. Ak je navrchu zásobníka to isté písmeno, zruš ho (pop). Inak ho pridaj (push).',
      "Na konci spoj zásobník do textu: stack.join('').",
      "const s = []; for (const ch of str) { if (s[s.length - 1] === ch) s.pop(); else s.push(ch); } return s.join('');",
    ],
    testy: (m, { rovne }) => {
      rovne(m.removeAdjacentDuplicates('abbaca'), 'ca', "removeAdjacentDuplicates('abbaca')");
      rovne(m.removeAdjacentDuplicates('aabb'), '', "removeAdjacentDuplicates('aabb')");
      rovne(m.removeAdjacentDuplicates('abc'), 'abc', "removeAdjacentDuplicates('abc')");
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
