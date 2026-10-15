'use strict';

const ZAKLAD = [41, 39, 33, 18, 27, 12];

function jeMaxHeap(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (const c of [2 * i + 1, 2 * i + 2]) {
      if (c < arr.length && arr[c] > arr[i]) return false;
    }
  }
  return true;
}

function jeMinHeapPriorit(values) {
  for (let i = 0; i < values.length; i++) {
    for (const c of [2 * i + 1, 2 * i + 2]) {
      if (c < values.length && values[c].priority < values[i].priority) return false;
    }
  }
  return true;
}

const zoradene = (arr) => arr.slice().sort((a, b) => a - b);

function heap(Trieda, hodnoty) {
  const h = new Trieda();
  h.values = hodnoty.slice();
  return h;
}

function pq(Trieda, dvojice) {
  const q = new Trieda();
  q.values = [];
  for (const [val, priority] of dvojice) {
    const node = { val, priority };
    q.values.push(node);
    let i = q.values.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (q.values[i].priority >= q.values[p].priority) break;
      [q.values[i], q.values[p]] = [q.values[p], q.values[i]];
      i = p;
    }
  }
  return q;
}

const PACIENTI = [['nádcha', 5], ['zlomenina', 1], ['horúčka', 3], ['popálenina', 2]];

const teoria = [
  {
    id: 1,
    otazka: 'Čo platí v MAX binary heape?',
    moznosti: [
      'Každý rodič je väčší ako jeho deti.',
      'Ľavé dieťa je menšie ako rodič, pravé väčšie.',
      'Hodnoty sú zotriedené zľava doprava.',
      'Koreň je najmenší prvok.',
    ],
    spravna: 'a',
    napoveda: 'Šéf firmy je nad všetkými.',
    vysvetlenie: 'V max heape je rodič vždy väčší ako jeho deti. Na poradí ľavé/pravé nezáleží, to nie je BST.',
  },
  {
    id: 2,
    otazka: 'Kde je v max heape najväčší prvok?',
    moznosti: ['V koreni (index 0 v poli).', 'Na konci poľa.', 'V ľubovoľnom liste.', 'V strede poľa.'],
    spravna: 'a',
    napoveda: 'Kto je nad všetkými?',
    vysvetlenie: 'Keďže každý rodič je väčší ako deti, najväčší prvok je úplne hore – v koreni, na indexe 0.',
  },
  {
    id: 3,
    otazka: 'Heap je uložený v poli. Kde sú deti prvku na indexe n?',
    moznosti: ['2n + 1 a 2n + 2', 'n + 1 a n + 2', '2n a 2n + 1', 'n / 2 a n / 2 + 1'],
    spravna: 'a',
    napoveda: 'Koreň (0) má deti na indexoch 1 a 2. Over vzorec pre n = 0.',
    vysvetlenie: 'Ľavé dieťa je na 2n + 1, pravé na 2n + 2. Pre koreň (n = 0) sú to indexy 1 a 2.',
  },
  {
    id: 4,
    otazka: 'Ako zistíš index rodiča prvku na indexe n?',
    moznosti: ['Math.floor((n - 1) / 2)', 'n - 1', 'n / 2', '2n'],
    spravna: 'a',
    napoveda: 'Prvky 3 a 4 majú rodiča 1. Over vzorec.',
    vysvetlenie: 'Math.floor((3 - 1) / 2) = 1 aj Math.floor((4 - 1) / 2) = 1. Funguje pre ľavé aj pravé dieťa.',
  },
  {
    id: 5,
    otazka: 'Ako funguje insert do max heapu?',
    moznosti: [
      'Pridá prvok na koniec a vymieňa ho s rodičom, kým je väčší (bubble up).',
      'Pridá prvok na začiatok a zotriedi pole.',
      'Nájde správne miesto ako v BST.',
      'Pridá prvok na koniec a nič viac.',
    ],
    spravna: 'a',
    napoveda: 'Nový prvok „vybuble“ hore.',
    vysvetlenie: 'Nový prvok ide na koniec poľa a potom stúpa (bubble up), kým nemá väčšieho rodiča alebo kým nie je koreňom.',
  },
  {
    id: 6,
    otazka: 'extractMax odobral koreň. Čo dá na jeho miesto?',
    moznosti: [
      'Posledný prvok poľa a ten potom nechá klesať (sink down).',
      'Väčšie z detí koreňa.',
      'Nič, koreň ostane prázdny.',
      'Najmenší prvok.',
    ],
    spravna: 'a',
    napoveda: 'Ktorý prvok sa dá vybrať z poľa bez posúvania ostatných?',
    vysvetlenie: 'Posledný prvok sa vyberie pop-om (O(1)), dá sa na index 0 a vymieňa sa s väčším dieťaťom, kým treba.',
  },
  {
    id: 7,
    otazka: 'Aká rýchla je insert aj extractMax v binary heape?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    spravna: 'b',
    napoveda: 'Prvok sa posúva najviac o toľko krokov, koľko má strom poschodí.',
    vysvetlenie: 'Heap je vždy vyvážený, má log n poschodí. Bubble up aj sink down urobia najviac log n výmen.',
  },
  {
    id: 8,
    otazka: 'Čo je prioritný rad (priority queue)?',
    moznosti: [
      'Rad, kde ide von prvok s najvyššou prioritou, nie ten, čo prišiel prvý.',
      'Obyčajný rad FIFO.',
      'Zásobník LIFO.',
      'Zotriedené pole.',
    ],
    spravna: 'a',
    napoveda: 'Pohotovosť v nemocnici.',
    vysvetlenie: 'Na pohotovosti ide prvá zlomenina, aj keď nádcha prišla skôr. Rozhoduje priorita.',
  },
  {
    id: 9,
    otazka: 'V Coltovom PriorityQueue (min heap podľa priority) ktorý prvok ide von prvý?',
    moznosti: ['Ten s NAJMENŠÍM číslom priority.', 'Ten s najväčším číslom priority.', 'Ten, čo prišiel prvý.', 'Náhodný.'],
    spravna: 'a',
    napoveda: 'Priorita 1 = najdôležitejšie.',
    vysvetlenie: 'Je to min heap: najmenšia priorita je v koreni a dequeue ju vyberie prvú.',
  },
  {
    id: 10,
    otazka: 'Prečo heap na rozdiel od BST nikdy nevyzerá ako „palica“?',
    moznosti: [
      'Lebo sa plní po poschodiach zľava doprava, takže je vždy vyvážený.',
      'Lebo má len 3 poschodia.',
      'Lebo prvky sú zotriedené.',
      'Môže vyzerať ako palica.',
    ],
    spravna: 'a',
    napoveda: 'Kde sa pridáva nový prvok?',
    vysvetlenie: 'Nový prvok ide vždy na prvé voľné miesto v poslednom poschodí. Nové poschodie začne až po zaplnení predchádzajúceho.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód? (rodič indexu 5)',
    kod: 'console.log(Math.floor((5 - 1) / 2));',
    moznosti: ['2', '3', '2.5', '1'],
    spravna: 'a',
    napoveda: '(5 - 1) / 2 = 2.',
    vysvetlenie: '(5 - 1) / 2 = 2 a Math.floor(2) = 2. Rodič indexu 5 je index 2.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód? (deti indexu 1)',
    kod: 'const i = 1;\nconsole.log(2 * i + 1, 2 * i + 2);',
    moznosti: ['3 4', '2 3', '1 2', '4 5'],
    spravna: 'a',
    napoveda: '2 · 1 + 1 a 2 · 1 + 2.',
    vysvetlenie: 'Ľavé dieťa indexu 1 je 3, pravé 4.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const heap = [41, 39, 33, 18, 27, 12];\nconsole.log(heap[0], heap[2 * 0 + 2]);',
    moznosti: ['41 33', '41 39', '12 33', '39 33'],
    spravna: 'a',
    napoveda: 'heap[0] je koreň. 2 · 0 + 2 je jeho pravé dieťa.',
    vysvetlenie: 'Koreň je 41 a jeho pravé dieťa (index 2) je 33.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód? (bubble up)',
    kod: 'const h = [10, 5, 8];\nh.push(12);\nlet i = 3;\nwhile (i > 0) {\n  const p = Math.floor((i - 1) / 2);\n  if (h[i] <= h[p]) break;\n  [h[i], h[p]] = [h[p], h[i]];\n  i = p;\n}\nconsole.log(h);',
    moznosti: ['[ 12, 10, 8, 5 ]', '[ 10, 12, 8, 5 ]', '[ 10, 5, 8, 12 ]', '[ 12, 5, 8, 10 ]'],
    spravna: 'a',
    napoveda: '12 je na indexe 3, rodič index 1 (5). Potom rodič index 0 (10).',
    vysvetlenie: '12 sa vymení s 5 → [10, 12, 8, 5], potom s 10 → [ 12, 10, 8, 5 ].',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód? (začiatok extractMax)',
    kod: 'const h = [12, 10, 8, 5];\nconst max = h[0];\nconst end = h.pop();\nh[0] = end;\nconsole.log(max, h);',
    moznosti: ['12 [ 5, 10, 8 ]', '12 [ 10, 8, 5 ]', '5 [ 5, 10, 8 ]', '12 [ 12, 10, 8 ]'],
    spravna: 'a',
    napoveda: 'Posledný prvok (5) sa presunie na index 0.',
    vysvetlenie: 'max je 12, pop vyberie 5 a 5 ide na index 0: [ 5, 10, 8 ]. Potom by nasledoval sink down.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(Math.log2(1024));',
    moznosti: ['10', '512', '32', '2'],
    spravna: 'a',
    napoveda: '2 na koľkú je 1024?',
    vysvetlenie: '2^10 = 1024. Heap s 1024 prvkami má asi 10 poschodí, preto insert stojí najviac asi 10 výmen.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: "const a = { val: 'nádcha', priority: 3 };\nconst b = { val: 'zlomenina', priority: 1 };\nconsole.log(a.priority < b.priority ? a.val : b.val);",
    moznosti: ['zlomenina', 'nádcha', '1', '3'],
    spravna: 'a',
    napoveda: 'Ktorá priorita je menšia?',
    vysvetlenie: '3 < 1 neplatí, takže sa vypíše b.val – zlomenina. Menšie číslo = dôležitejšie.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const h = [10, 9, 8, 7];\nconsole.log(h[1] >= h[2 * 1 + 1]);',
    moznosti: ['true', 'false', '9', '7'],
    spravna: 'a',
    napoveda: 'Porovnáva sa h[1] s jeho ľavým dieťaťom h[3].',
    vysvetlenie: 'h[1] je 9, jeho ľavé dieťa h[3] je 7. 9 >= 7 → true.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const h = [5, 4, 3, 2, 1];\nconsole.log(h[2 * 2 + 1]);',
    moznosti: ['undefined', '1', '2', 'Chyba: RangeError'],
    spravna: 'a',
    napoveda: '2 · 2 + 1 = 5. Má pole index 5?',
    vysvetlenie: 'Pole má indexy 0 až 4. Index 5 neexistuje, takže undefined – prvok na indexe 2 nemá deti.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód? (výška heapu so 7 prvkami)',
    kod: 'console.log(Math.floor(Math.log2(7)) + 1);',
    moznosti: ['3', '7', '2', '4'],
    spravna: 'a',
    napoveda: 'log2(7) je medzi 2 a 3.',
    vysvetlenie: 'Math.floor(2.807) + 1 = 3. Heap so 7 prvkami má 3 plné poschodia: 1 + 2 + 4.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'parentIndex – index rodiča',
    napovedy: [
      'parentIndex(2) má byť 0 (koreň). Vzorec dáva 1.',
      'Vzorec je Math.floor((n - 1) / 2).',
      'Zmeň Math.floor(i / 2) na Math.floor((i - 1) / 2).',
    ],
    testy: (m, { rovne }) => {
      rovne([m.parentIndex(1), m.parentIndex(2), m.parentIndex(5), m.parentIndex(6)], [0, 0, 2, 2], '[parentIndex(1), (2), (5), (6)]');
    },
  },
  {
    id: 2,
    nazov: 'leftChildIndex – index ľavého dieťaťa',
    napovedy: [
      'leftChildIndex(0) má byť 1. Vzorec dáva 2 – to je pravé dieťa.',
      'Ľavé dieťa je 2n + 1.',
      'Zmeň 2 * i + 2 na 2 * i + 1.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.leftChildIndex(0), m.leftChildIndex(1), m.leftChildIndex(2)], [1, 3, 5], '[leftChildIndex(0), (1), (2)]');
    },
  },
  {
    id: 3,
    nazov: 'MaxBinaryHeap.insert – bubble up',
    napovedy: [
      'Nový prvok 55 nevybublá hore. Kedy má cyklus skončiť?',
      'Skončiť má, keď je prvok MENŠÍ alebo rovný rodičovi. Teraz končí, keď je väčší.',
      'Zmeň element >= parent na element <= parent.',
    ],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxBinaryHeap, ZAKLAD);
      h.insert(55);
      rovne(h.values, [55, 39, 41, 18, 27, 12, 33], 'values po insert(55)');
    },
  },
  {
    id: 4,
    nazov: 'MaxBinaryHeap.extractMax – vráť maximum',
    napovedy: [
      'Vráti 39 namiesto 41. Ktorý prvok bol maximum?',
      'Po sinkDown je na indexe 0 už iný prvok. Maximum sme si odložili do max.',
      'Zmeň return this.values[0] na return max.',
    ],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxBinaryHeap, ZAKLAD);
      rovne(h.extractMax(), 41, 'extractMax()');
      rovne(h.values, [39, 27, 33, 18, 12], 'values po extractMax()');
    },
  },
  {
    id: 5,
    nazov: 'MaxBinaryHeap.extractMax2 – posledný prvok',
    napovedy: [
      'Heap s jedným prvkom sa nevyprázdni. Čo sa stane po pop?',
      'Po pop je pole prázdne, ale end sa hneď vráti na index 0. To sa smie urobiť, len ak v poli niečo ostalo.',
      'Obal riadky this.values[0] = end; this.sinkDown(); do if (this.values.length > 0) { ... }.',
    ],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxBinaryHeap, [5]);
      rovne(h.extractMax2(), 5, 'extractMax2() na [5]');
      rovne(h.values, [], 'values po extractMax2()');
    },
  },
  {
    id: 6,
    nazov: 'MaxBinaryHeap.sinkDown – vymeň s väčším dieťaťom',
    napovedy: [
      'Po extractMax je na vrchu 33 namiesto 39. S ktorým dieťaťom sa má prvok vymeniť?',
      'Pravé dieťa sa má vybrať, len keď je VÄČŠIE ako ľavé.',
      'Zmeň right < this.values[leftIdx] na right > this.values[leftIdx].',
    ],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxBinaryHeap, ZAKLAD);
      h.extractMax();
      rovne(h.values, [39, 27, 33, 18, 12], 'values po extractMax()');
    },
  },
  {
    id: 7,
    nazov: 'PriorityQueue.enqueue – porovnávaj prioritu',
    napovedy: [
      'Navrchu nie je prvok s najmenšou prioritou. Čo sa porovnáva v podmienke?',
      'Porovnávať treba .priority, nie .val (meno pacienta).',
      'Zmeň node.val >= parent.val na node.priority >= parent.priority.',
    ],
    testy: (m, { rovne }) => {
      const q = new m.PriorityQueue();
      for (const [v, p] of PACIENTI) q.enqueue(v, p);
      rovne(q.values[0].val, 'zlomenina', 'values[0].val po enqueue všetkých pacientov');
      rovne(jeMinHeapPriorit(q.values), true, 'values je min heap podľa priority');
    },
  },
  {
    id: 8,
    nazov: 'PriorityQueue.dequeue – vyber najdôležitejšieho',
    napovedy: [
      'Vráti iného pacienta ako zlomeninu. Kde je prvok s najmenšou prioritou?',
      'V min heape je najmenšia priorita v koreni – na indexe 0.',
      'Zmeň this.values[this.values.length - 1] na this.values[0].',
    ],
    testy: (m, { rovne }) => {
      const q = pq(m.PriorityQueue, PACIENTI);
      rovne(q.dequeue().val, 'zlomenina', 'dequeue().val');
      rovne(q.dequeue().val, 'popálenina', 'druhé dequeue().val');
    },
  },
  {
    id: 9,
    nazov: 'isMaxHeap – je pole max heap?',
    napovedy: [
      'Pre [10, 3, 2, 7] vráti true, hoci 7 je väčšie ako jeho rodič 3. Ktoré prvky porovnávaš ako deti?',
      'Ľavé dieťa je 2i + 1, nie 2i (pre i = 0 by sa porovnával prvok sám so sebou).',
      'Zmeň const left = 2 * i na const left = 2 * i + 1.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isMaxHeap([10, 9, 8, 7]), true, 'isMaxHeap([10, 9, 8, 7])');
      rovne(m.isMaxHeap([10, 3, 2, 7]), false, 'isMaxHeap([10, 3, 2, 7])');
    },
  },
  {
    id: 10,
    nazov: 'topK – k najväčších čísel',
    napovedy: [
      'topK([5, 1, 9, 3], 2) vráti 3 čísla. Koľkokrát sa volá extractMax?',
      'Cyklus i <= k prebehne k + 1 krát.',
      'Zmeň i <= k na i < k.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.topK([5, 1, 9, 3], 2), [9, 5], 'topK([5, 1, 9, 3], 2)');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'parent – index rodiča',
    napovedy: ['(n - 1) delené čím?', 'Každý rodič má 2 deti.', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne([m.parent(3), m.parent(4), m.parent(6)], [1, 1, 2], '[parent(3), parent(4), parent(6)]');
    },
  },
  {
    id: 2,
    nazov: 'rightChild – index pravého dieťaťa',
    napovedy: ['Ľavé je 2n + 1. Pravé je hneď vedľa.', '2n + ?', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne([m.rightChild(0), m.rightChild(1)], [2, 4], '[rightChild(0), rightChild(1)]');
    },
  },
  {
    id: 3,
    nazov: 'MaxHeap.insert – pridaj na koniec',
    napovedy: ['Ktorá metóda poľa pridáva na koniec?', 'Opak pop.', 'Nahraď ___ slovom push.'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeap, ZAKLAD);
      h.insert(55);
      rovne(h.values, [55, 39, 41, 18, 27, 12, 33], 'values po insert(55)');
    },
  },
  {
    id: 4,
    nazov: 'MaxHeap.insert2 – porovnaj s rodičom',
    napovedy: ['S čím porovnávame nový prvok?', 'S hodnotou rodiča – je v premennej parent.', 'Nahraď ___ slovom parent.'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeap, ZAKLAD);
      h.insert2(1);
      h.insert2(40);
      rovne(h.values, [41, 40, 33, 39, 27, 12, 1, 18], 'values po insert2(1), insert2(40)');
    },
  },
  {
    id: 5,
    nazov: 'MaxHeap.insert3 – pokračuj z miesta rodiča',
    napovedy: ['Prvok sa presunul na miesto rodiča. Kde pokračujeme?', 'Nový idx je index rodiča.', 'Nahraď ___ slovom parentIdx.'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeap, ZAKLAD);
      h.insert3(55);
      rovne(h.values, [55, 39, 41, 18, 27, 12, 33], 'values po insert3(55)');
    },
  },
  {
    id: 6,
    nazov: 'MaxHeap.extractMax – vyber posledný',
    napovedy: ['Ktorou metódou vyberieš posledný prvok poľa?', 'Opak push.', 'Nahraď ___ slovom pop.'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeap, ZAKLAD);
      rovne(h.extractMax(), 41, 'extractMax()');
      rovne(h.values, [39, 27, 33, 18, 12], 'values po extractMax()');
    },
  },
  {
    id: 7,
    nazov: 'MaxHeap.sinkDown – ľavé dieťa',
    napovedy: ['Index ľavého dieťaťa je 2 · idx + ?', 'Pre idx = 0 je ľavé dieťa index 1.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeap, [12, 39, 33, 18, 27]);
      h.sinkDown();
      rovne(h.values, [39, 27, 33, 18, 12], 'values po sinkDown()');
    },
  },
  {
    id: 8,
    nazov: 'MaxHeap.sinkDown2 – výmena',
    napovedy: ['Vymieňame prvok na idx s prvkom na swap. Čo je na pravej strane?', '[values[swap], values[?]]', 'Nahraď ___ slovom idx.'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeap, [12, 39, 33, 18, 27]);
      h.sinkDown2();
      rovne(h.values, [39, 27, 33, 18, 12], 'values po sinkDown2()');
    },
  },
  {
    id: 9,
    nazov: 'PQ.enqueue – porovnaj prioritu',
    napovedy: ['Podľa čoho sa v prioritnom rade porovnáva?', 'node.… >= parent.priority', 'Nahraď ___ slovom priority.'],
    testy: (m, { rovne }) => {
      const q = new m.PQ();
      for (const [v, p] of PACIENTI) q.enqueue(v, p);
      rovne([q.values[0].val, jeMinHeapPriorit(q.values)], ['zlomenina', true], '[values[0].val, je min heap]');
    },
  },
  {
    id: 10,
    nazov: 'PQ.dequeue (dve ___)',
    napovedy: [
      'Prvé ___: na akom indexe je najdôležitejší prvok? Druhé ___: čo dáme na jeho miesto?',
      'Koreň je index 0. Na jeho miesto ide posledný prvok – je v premennej end.',
      'Prvé ___ nahraď 0, druhé ___ nahraď end.',
    ],
    testy: (m, { rovne }) => {
      const q = pq(m.PQ, PACIENTI);
      rovne([q.dequeue().val, q.dequeue().val, q.dequeue().val, q.dequeue().val], ['zlomenina', 'popálenina', 'horúčka', 'nádcha'], 'poradie dequeue()');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'parentIdx – index rodiča',
    napovedy: ['Vzorec je v teórii v časti 2.', 'Math.floor((n - 1) / 2)', 'return Math.floor((i - 1) / 2);'],
    testy: (m, { rovne }) => {
      rovne([m.parentIdx(1), m.parentIdx(2), m.parentIdx(9)], [0, 0, 4], '[parentIdx(1), (2), (9)]');
    },
  },
  {
    id: 2,
    nazov: 'childIdxs – [ľavé, pravé] dieťa',
    napovedy: ['Ľavé 2n + 1, pravé 2n + 2.', 'Vráť pole s dvoma číslami.', 'return [2 * i + 1, 2 * i + 2];'],
    testy: (m, { rovne }) => {
      rovne([m.childIdxs(0), m.childIdxs(3)], [[1, 2], [7, 8]], '[childIdxs(0), childIdxs(3)]');
    },
  },
  {
    id: 3,
    nazov: 'MaxHeapP.insert – pridaj a bubble up (vráť this)',
    napovedy: [
      'push na koniec, idx = posledný index.',
      'Kým idx > 0: nájdi rodiča; ak je prvok <= rodič, skonči; inak vymeň a idx = parentIdx.',
      'Celé riešenie je v teórii v časti 3 (insert).',
    ],
    testy: (m, { rovne }) => {
      const h = new m.MaxHeapP();
      rovne(h.insert(5), h, 'insert vracia this');
      for (const x of [3, 17, 10, 84, 19, 6, 22, 9]) h.insert(x);
      rovne([h.values[0], jeMaxHeap(h.values), zoradene(h.values)], [84, true, [3, 5, 6, 9, 10, 17, 19, 22, 84]], '[koreň, je max heap, obsah]');
    },
  },
  {
    id: 4,
    nazov: 'MaxHeapP.extractMax – vyber maximum (prázdny → undefined)',
    napovedy: [
      'max = values[0], end = values.pop(). Ak ešte niečo ostalo, values[0] = end a sink down.',
      'Sink down: vymieňaj s väčším z detí, kým je niektoré dieťa väčšie.',
      'Celé riešenie je v teórii v časti 3 (extractMax a sinkDown).',
    ],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeapP, ZAKLAD);
      const vybrate = [];
      for (let i = 0; i < 6; i++) {
        vybrate.push(h.extractMax());
        rovne(jeMaxHeap(h.values), true, `po ${i + 1}. extractMax je values stále max heap`);
      }
      rovne(vybrate, [41, 39, 33, 27, 18, 12], 'postupne vybraté hodnoty');
      rovne([h.values, h.extractMax()], [[], undefined], '[values, extractMax() na prázdnom]');
    },
  },
  {
    id: 5,
    nazov: 'MaxHeapP.peek – maximum bez odobratia (prázdny → undefined)',
    napovedy: ['Maximum je na indexe 0.', 'Nič neodoberaj.', 'return this.values[0];'],
    testy: (m, { rovne }) => {
      const h = heap(m.MaxHeapP, ZAKLAD);
      rovne([h.peek(), h.values.length, new m.MaxHeapP().peek()], [41, 6, undefined], '[peek(), dĺžka po peek, peek() na prázdnom]');
    },
  },
  {
    id: 6,
    nazov: 'isMaxHeapArr – je pole max heap?',
    napovedy: [
      'Pre každý index i skontroluj obe deti 2i + 1 a 2i + 2 (ak existujú).',
      'Ak je niektoré dieťa väčšie ako arr[i], vráť false. Na konci true.',
      'for (let i = 0; i < arr.length; i++) { const l = 2 * i + 1, r = 2 * i + 2; if (l < arr.length && arr[l] > arr[i]) return false; if (r < arr.length && arr[r] > arr[i]) return false; } return true;',
    ],
    testy: (m, { rovne }) => {
      rovne([m.isMaxHeapArr(ZAKLAD), m.isMaxHeapArr([5, 6]), m.isMaxHeapArr([9, 8, 7, 1, 2, 10]), m.isMaxHeapArr([])], [true, false, false, true], '[ZAKLAD, [5, 6], [9, 8, 7, 1, 2, 10], []]');
    },
  },
  {
    id: 7,
    nazov: 'PNode – prvok s hodnotou a prioritou',
    napovedy: ['Dve vlastnosti: val a priority.', 'this.val = val; this.priority = priority;', 'constructor(val, priority) { this.val = val; this.priority = priority; }'],
    testy: (m, { rovne }) => {
      const n = new m.PNode('x', 2);
      rovne([n.val, n.priority], ['x', 2], '[val, priority]');
    },
  },
  {
    id: 8,
    nazov: 'PriorityQ.enqueue – pridaj podľa priority (min heap)',
    napovedy: [
      'Ako insert do heapu, len porovnávaš .priority a menšia priorita ide hore.',
      'Skonči, keď node.priority >= parent.priority.',
      'Celé riešenie je v teórii v časti 4 (enqueue).',
    ],
    testy: (m, { rovne }) => {
      const q = new m.PriorityQ();
      for (const [v, p] of PACIENTI) q.enqueue(v, p);
      rovne([q.values.length, q.values[0].val, jeMinHeapPriorit(q.values)], [4, 'zlomenina', true], '[počet, values[0].val, je min heap]');
    },
  },
  {
    id: 9,
    nazov: 'PriorityQ.dequeue – vyber najdôležitejší (vráť uzol, prázdny → undefined)',
    napovedy: [
      'Ako extractMax, len hľadáš dieťa s MENŠOU prioritou.',
      'min = values[0], end = pop(), ak niečo ostalo: values[0] = end a sink down podľa .priority.',
      'Pozri teóriu v časti 3 (sinkDown) a otoč porovnania na .priority <.',
    ],
    testy: (m, { rovne }) => {
      const q = pq(m.PriorityQ, [...PACIENTI, ['kašeľ', 4], ['infarkt', 0]]);
      const poradie = [];
      for (let i = 0; i < 6; i++) poradie.push(q.dequeue().val);
      rovne(poradie, ['infarkt', 'zlomenina', 'popálenina', 'horúčka', 'kašeľ', 'nádcha'], 'poradie dequeue()');
      rovne(q.dequeue(), undefined, 'dequeue() na prázdnom');
    },
  },
  {
    id: 10,
    nazov: 'heapSortDesc – zoraď od najväčšieho pomocou heapu',
    napovedy: [
      'Vlož všetky čísla do MaxHeapP (úloha 3).',
      'Potom n-krát zavolaj extractMax (úloha 4) a výsledky daj do poľa.',
      'const h = new MaxHeapP(); for (const x of arr) h.insert(x); const v = []; while (h.values.length) v.push(h.extractMax()); return v;',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne(m.heapSortDesc([3, 9, 1, 7, 5]), [9, 7, 5, 3, 1], 'heapSortDesc([3, 9, 1, 7, 5])');
      nepouziva(m.heapSortDesc, /\.sort\s*\(/, 'použi heap, nie .sort()');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
