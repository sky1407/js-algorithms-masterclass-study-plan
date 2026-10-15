'use strict';

function postavStrom(tree, hodnoty) {
  tree.root = null;
  for (const value of hodnoty) {
    const node = { value, left: null, right: null };
    if (!tree.root) {
      tree.root = node;
      continue;
    }
    let cur = tree.root;
    for (;;) {
      if (value < cur.value) {
        if (!cur.left) { cur.left = node; break; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = node; break; }
        cur = cur.right;
      }
    }
  }
  return tree;
}

function tvar(node, hlbka = 0) {
  if (!node) return null;
  if (hlbka > 1000) throw new Error('strom je zacyklený');
  return [node.value, tvar(node.left, hlbka + 1), tvar(node.right, hlbka + 1)];
}

const ZAKLAD = [10, 6, 15, 3, 8, 20];
const strom = (Trieda, hodnoty = ZAKLAD) => postavStrom(new Trieda(), hodnoty);
const TVAR_ZAKLAD = [10, [6, [3, null, null], [8, null, null]], [15, null, [20, null, null]]];

const teoria = [
  {
    id: 1,
    otazka: 'Čo je koreň (root) stromu?',
    moznosti: ['Jediný uzol úplne hore, ktorý nemá rodiča.', 'Uzol bez detí.', 'Najväčšia hodnota.', 'Posledný pridaný uzol.'],
    spravna: 'a',
    napoveda: 'Strom v informatike rastie zhora nadol.',
    vysvetlenie: 'Root je vrchný uzol stromu, nemá rodiča. Všetky ostatné uzly sú jeho potomkovia.',
  },
  {
    id: 2,
    otazka: 'Čo je list (leaf)?',
    moznosti: ['Uzol bez detí.', 'Koreň stromu.', 'Uzol s dvoma deťmi.', 'Hrana medzi uzlami.'],
    spravna: 'a',
    napoveda: 'Na konci vetvičky je…',
    vysvetlenie: 'Leaf je uzol, ktorý nemá žiadne deti. V strome 10/6/15/3/8/20 sú to 3, 8 a 20.',
  },
  {
    id: 3,
    otazka: 'Aké pravidlo platí v Binary Search Tree?',
    moznosti: [
      'Vľavo od uzla sú menšie hodnoty, vpravo väčšie.',
      'Vľavo väčšie, vpravo menšie.',
      'Deti sú vždy väčšie ako rodič.',
      'Hodnoty sú v náhodnom poradí.',
    ],
    spravna: 'a',
    napoveda: 'Ako na číselnej osi: menšie čísla sú…',
    vysvetlenie: 'Pre každý uzol platí: celý ľavý podstrom má menšie hodnoty, celý pravý väčšie.',
  },
  {
    id: 4,
    otazka: 'Koľko detí môže mať uzol v BINÁRNOM strome?',
    moznosti: ['Najviac 2', 'Presne 2', 'Najviac 3', 'Ľubovoľne veľa'],
    spravna: 'a',
    napoveda: 'Binárny = dvojkový.',
    vysvetlenie: 'Uzol binárneho stromu má 0, 1 alebo 2 deti: left a right.',
  },
  {
    id: 5,
    otazka: 'Aká rýchla je find v BST, keď je strom pekne vyvážený?',
    moznosti: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    spravna: 'b',
    napoveda: 'Každý krok zahodí jednu stranu stromu.',
    vysvetlenie: 'Každým krokom zostúpime o poschodie nižšie a zahodíme polovicu stromu. Poschodí je log n.',
  },
  {
    id: 6,
    otazka: 'Kedy je BST najpomalší (O(n))?',
    moznosti: [
      'Keď vkladáme už zotriedené čísla a strom vyzerá ako zoznam.',
      'Keď je strom vyvážený.',
      'Keď má koreň dve deti.',
      'Nikdy, je vždy O(log n).',
    ],
    spravna: 'a',
    napoveda: 'Čo sa stane, keď vložíš 1, 2, 3, 4, 5?',
    vysvetlenie: 'Pri vkladaní 1, 2, 3, 4, 5 ide každé číslo doprava. Vznikne palica bez rozvetvení a hľadanie je O(n).',
  },
  {
    id: 7,
    otazka: 'Ako prechádza strom BFS (do šírky)?',
    moznosti: [
      'Po poschodiach – najprv celé jedno poschodie, potom ďalšie. Používa queue.',
      'Najprv čo najhlbšie po jednej vetve.',
      'Len po ľavej strane.',
      'Od listov ku koreňu.',
    ],
    spravna: 'a',
    napoveda: 'Breadth = šírka.',
    vysvetlenie: 'BFS ide po úrovniach. Deti uzla zaradí do frontu (queue), takže sa spracujú až po ostatných uzloch rovnakej úrovne.',
  },
  {
    id: 8,
    otazka: 'Čo vráti DFS InOrder na Binary Search Tree?',
    moznosti: ['Hodnoty zoradené od najmenšej po najväčšiu.', 'Hodnoty po poschodiach.', 'Najprv koreň, potom ostatné.', 'Len listy.'],
    spravna: 'a',
    napoveda: 'InOrder = ľavý, uzol, pravý. Čo je v BST vľavo?',
    vysvetlenie: 'Najprv sa navštívi všetko menšie (vľavo), potom uzol, potom všetko väčšie. Výsledok je zotriedený.',
  },
  {
    id: 9,
    otazka: 'V akom poradí navštevuje uzly DFS PreOrder?',
    moznosti: ['Uzol, ľavý podstrom, pravý podstrom.', 'Ľavý, uzol, pravý.', 'Ľavý, pravý, uzol.', 'Po poschodiach.'],
    spravna: 'a',
    napoveda: 'Pre = pred. Kedy sa zapíše uzol vzhľadom na deti?',
    vysvetlenie: 'PreOrder zapíše uzol PRED deťmi. Koreň je preto vždy prvý.',
  },
  {
    id: 10,
    otazka: 'Ktorý DFS zapíše uzol až PO oboch deťoch (koreň je posledný)?',
    moznosti: ['PostOrder', 'PreOrder', 'InOrder', 'BFS'],
    spravna: 'a',
    napoveda: 'Post = po.',
    vysvetlenie: 'PostOrder: ľavý, pravý, uzol. Koreň sa zapíše ako posledný. Hodí sa napríklad pri mazaní stromu.',
  },
];

const STROM_KOD = 'const n = (value, left = null, right = null) => ({ value, left, right });\nconst root = n(10, n(6, n(3), n(8)), n(15, null, n(20)));\n';

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód? (strom 10 / 6 15 / 3 8 _ 20)',
    kod: STROM_KOD + 'console.log(root.left.value, root.right.right.value);',
    moznosti: ['6 20', '15 20', '6 8', '3 20'],
    spravna: 'a',
    napoveda: 'root.left je ľavé dieťa koreňa. root.right.right je pravé dieťa pravého dieťaťa.',
    vysvetlenie: 'Ľavé dieťa 10 je 6. Pravé dieťa 15 je 20.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: "const koren = 10;\nconst nova = 7;\nconsole.log(nova < koren ? 'vľavo' : 'vpravo');",
    moznosti: ['vľavo', 'vpravo', 'true', 'false'],
    spravna: 'a',
    napoveda: 'Menšie hodnoty idú v BST…',
    vysvetlenie: '7 < 10, takže v BST pôjde doľava.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const n = (value, left = null, right = null) => ({ value, left, right });\nconst root = n(2, n(1), n(3));\nfunction t(node) {\n  if (!node) return;\n  t(node.left);\n  console.log(node.value);\n  t(node.right);\n}\nt(root);',
    moznosti: ['1\n2\n3', '2\n1\n3', '1\n3\n2', '3\n2\n1'],
    spravna: 'a',
    napoveda: 'Ľavý, uzol, pravý – ktorý je to DFS?',
    vysvetlenie: 'Je to InOrder: najprv 1 (vľavo), potom 2, potom 3. Výsledok je zotriedený.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const n = (value, left = null, right = null) => ({ value, left, right });\nconst root = n(2, n(1), n(3));\nfunction t(node) {\n  if (!node) return;\n  console.log(node.value);\n  t(node.left);\n  t(node.right);\n}\nt(root);',
    moznosti: ['2\n1\n3', '1\n2\n3', '1\n3\n2', '2\n3\n1'],
    spravna: 'a',
    napoveda: 'console.log je pred volaniami detí.',
    vysvetlenie: 'Je to PreOrder: uzol 2, potom ľavý 1, potom pravý 3.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const n = (value, left = null, right = null) => ({ value, left, right });\nconst root = n(2, n(1), n(3));\nfunction t(node) {\n  if (!node) return;\n  t(node.left);\n  t(node.right);\n  console.log(node.value);\n}\nt(root);',
    moznosti: ['1\n3\n2', '2\n1\n3', '1\n2\n3', '3\n1\n2'],
    spravna: 'a',
    napoveda: 'console.log je až po oboch deťoch.',
    vysvetlenie: 'Je to PostOrder: ľavý 1, pravý 3, nakoniec uzol 2.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód? (BFS)',
    kod: STROM_KOD + 'const visited = [];\nconst queue = [root];\nwhile (queue.length) {\n  const node = queue.shift();\n  visited.push(node.value);\n  if (node.left) queue.push(node.left);\n  if (node.right) queue.push(node.right);\n}\nconsole.log(visited);',
    moznosti: ['[ 10, 6, 15, 3, 8, 20 ]', '[ 10, 6, 3, 8, 15, 20 ]', '[ 3, 6, 8, 10, 15, 20 ]', '[ 3, 8, 6, 20, 15, 10 ]'],
    spravna: 'a',
    napoveda: 'BFS ide po poschodiach: 1. poschodie, 2. poschodie, 3. poschodie.',
    vysvetlenie: 'Poschodie 1: 10. Poschodie 2: 6, 15. Poschodie 3: 3, 8, 20.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód? (výška)',
    kod: STROM_KOD + 'function h(node) {\n  if (!node) return 0;\n  return 1 + Math.max(h(node.left), h(node.right));\n}\nconsole.log(h(root));',
    moznosti: ['3', '6', '2', '4'],
    spravna: 'a',
    napoveda: 'Koľko poschodí má strom?',
    vysvetlenie: 'Poschodia: 10 | 6, 15 | 3, 8, 20. Výška je 3.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód? (počet listov)',
    kod: STROM_KOD + 'function listy(node) {\n  if (!node) return 0;\n  if (!node.left && !node.right) return 1;\n  return listy(node.left) + listy(node.right);\n}\nconsole.log(listy(root));',
    moznosti: ['3', '2', '6', '1'],
    spravna: 'a',
    napoveda: 'Ktoré uzly nemajú žiadne dieťa?',
    vysvetlenie: 'Listy sú 3, 8 a 20, takže 3.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (cesta pri hľadaní 8)',
    kod: STROM_KOD + 'const cesta = [];\nlet cur = root;\nwhile (cur) {\n  cesta.push(cur.value);\n  if (cur.value === 8) break;\n  cur = 8 < cur.value ? cur.left : cur.right;\n}\nconsole.log(cesta);',
    moznosti: ['[ 10, 6, 8 ]', '[ 10, 15, 8 ]', '[ 8 ]', '[ 10, 6, 3, 8 ]'],
    spravna: 'a',
    napoveda: '8 < 10 → doľava. 8 > 6 → doprava.',
    vysvetlenie: 'Z 10 doľava na 6, z 6 doprava na 8. Cesta je [ 10, 6, 8 ].',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód? (počet uzlov)',
    kod: STROM_KOD + 'function pocet(node) {\n  if (!node) return 0;\n  return 1 + pocet(node.left) + pocet(node.right);\n}\nconsole.log(pocet(root));',
    moznosti: ['6', '3', '5', '10'],
    spravna: 'a',
    napoveda: 'Spočítaj všetky uzly: 10, 6, 15, 3, 8, 20.',
    vysvetlenie: 'Každý uzol prispeje 1 a pripočítajú sa uzly v oboch podstromoch. Spolu 6.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'insert – vlož hodnotu',
    napovedy: [
      'Strom je zrkadlovo otočený – menšie hodnoty sú vpravo. Kedy ide hodnota doľava?',
      'Doľava idú MENŠIE hodnoty.',
      'Zmeň value > current.value na value < current.value.',
    ],
    testy: (m, { rovne }) => {
      const t = new m.BinarySearchTree();
      for (const v of ZAKLAD) t.insert(v);
      rovne(tvar(t.root), TVAR_ZAKLAD, 'tvar stromu po insert 10, 6, 15, 3, 8, 20 ([hodnota, ľavý, pravý])');
    },
  },
  {
    id: 2,
    nazov: 'find – nájdi uzol',
    napovedy: [
      'Hodnoty vľavo nájde, vpravo nie. Kam ide current, keď je hodnota väčšia?',
      'Väčšie hodnoty sú vpravo.',
      'V else vetve zmeň current = current.left na current = current.right.',
    ],
    testy: (m, { rovne }) => {
      const t = strom(m.BinarySearchTree);
      rovne(t.find(8).value, 8, 'find(8).value');
      rovne(t.find(20) && t.find(20).value, 20, 'find(20).value');
      rovne(t.find(7), undefined, 'find(7)');
    },
  },
  {
    id: 3,
    nazov: 'contains – je hodnota v strome?',
    napovedy: [
      'contains(7) vráti true, hoci 7 v strome nie je. Čo sa vracia, keď cyklus dobehne?',
      'Keď sme došli až na null, hodnotu sme nenašli.',
      'Posledný riadok zmeň na return false;',
    ],
    testy: (m, { rovne }) => {
      const t = strom(m.BinarySearchTree);
      rovne(t.contains(15), true, 'contains(15)');
      rovne(t.contains(7), false, 'contains(7)');
    },
  },
  {
    id: 4,
    nazov: 'findMin – najmenšia hodnota',
    napovedy: [
      'Vráti 20 namiesto 3. Kde sú v BST najmenšie hodnoty?',
      'Najmenšia hodnota je úplne vľavo.',
      'Zmeň obe .right na .left.',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).findMin(), 3, 'findMin()');
    },
  },
  {
    id: 5,
    nazov: 'findMax – najväčšia hodnota',
    napovedy: [
      'Vráti 8 namiesto 20. Odkiaľ sa začína hľadať?',
      'Treba začať v koreni, nie v jeho ľavom dieťati.',
      'Zmeň let current = this.root.left na let current = this.root.',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).findMax(), 20, 'findMax()');
    },
  },
  {
    id: 6,
    nazov: 'bfs – po poschodiach',
    napovedy: [
      'Poradie nie je po poschodiach. Z ktorého konca radu sa berie uzol?',
      'Queue berie zo začiatku (shift). pop berie z konca, to je stack.',
      'Zmeň queue.pop() na queue.shift().',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).bfs(), [10, 6, 15, 3, 8, 20], 'bfs()');
    },
  },
  {
    id: 7,
    nazov: 'preOrder – uzol, ľavý, pravý',
    napovedy: [
      'Koreň nie je prvý. Kedy sa má zapísať uzol pri PreOrder?',
      'PreOrder zapíše uzol PRED deťmi.',
      'Presuň visited.push(node.value) na začiatok funkcie traverse.',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).preOrder(), [10, 6, 3, 8, 15, 20], 'preOrder()');
    },
  },
  {
    id: 8,
    nazov: 'postOrder – ľavý, pravý, uzol',
    napovedy: [
      'Pravé podstromy sa navštevujú skôr ako ľavé. V akom poradí sa volá traverse?',
      'Najprv ľavé dieťa, potom pravé.',
      'Vymeň poradie riadkov s node.left a node.right.',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).postOrder(), [3, 8, 6, 20, 15, 10], 'postOrder()');
    },
  },
  {
    id: 9,
    nazov: 'inOrder – ľavý, uzol, pravý',
    napovedy: [
      'Chýbajú hodnoty z pravých podstromov. Čo sa volá, keď existuje node.right?',
      'Ak existuje pravé dieťa, treba prejsť pravé dieťa.',
      'Zmeň if (node.right) traverse(node.left) na if (node.right) traverse(node.right).',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).inOrder(), [3, 6, 8, 10, 15, 20], 'inOrder()');
    },
  },
  {
    id: 10,
    nazov: 'height – výška stromu',
    napovedy: [
      'Výška sa ráta podľa najdlhšej vetvy. Ktorú vetvu berieš?',
      'Treba tú VYŠŠIU z dvoch.',
      'Zmeň Math.min na Math.max.',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BinarySearchTree).height(), 3, 'height() stromu 10, 6, 15, 3, 8, 20');
      rovne(strom(m.BinarySearchTree, [1, 2, 3, 4]).height(), 4, 'height() stromu 1, 2, 3, 4');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'TreeNode – nový uzol nemá deti',
    napovedy: ['Kam ukazuje left, keď uzol nemá ľavé dieťa?', 'Hodnota „nič“.', 'Nahraď ___ slovom null.'],
    testy: (m, { rovne }) => {
      const n = new m.TreeNode(5);
      rovne([n.value, n.left, n.right], [5, null, null], 'new TreeNode(5) – [value, left, right]');
    },
  },
  {
    id: 2,
    nazov: 'insert – porovnaj s hodnotou uzla',
    napovedy: ['S čím porovnávame vkladanú hodnotu?', 'S hodnotou aktuálneho uzla: current.…', 'Nahraď ___ slovom value.'],
    testy: (m, { rovne }) => {
      const t = new m.BST();
      for (const v of ZAKLAD) t.insert(v);
      rovne(tvar(t.root), TVAR_ZAKLAD, 'tvar stromu po insert');
    },
  },
  {
    id: 3,
    nazov: 'insert2 – zaves nový uzol',
    napovedy: ['Vľavo je voľno. Čo tam zavesíme?', 'Novo vytvorený uzol.', 'Nahraď ___ slovom node.'],
    testy: (m, { rovne }) => {
      const t = new m.BST();
      for (const v of ZAKLAD) t.insert2(v);
      rovne(tvar(t.root), TVAR_ZAKLAD, 'tvar stromu po insert2');
    },
  },
  {
    id: 4,
    nazov: 'find – choď doprava',
    napovedy: ['Hľadaná hodnota je väčšia. Kam ideme?', 'Väčšie sú vpravo.', 'Nahraď ___ slovom right.'],
    testy: (m, { rovne }) => {
      const t = strom(m.BST);
      rovne(t.find(20) && t.find(20).value, 20, 'find(20).value');
    },
  },
  {
    id: 5,
    nazov: 'contains – nenašli sme',
    napovedy: ['Čo vrátiť, keď sme hodnotu nenašli?', 'contains vracia true / false.', 'Nahraď ___ slovom false.'],
    testy: (m, { rovne }) => {
      const t = strom(m.BST);
      rovne([t.contains(3), t.contains(4)], [true, false], '[contains(3), contains(4)]');
    },
  },
  {
    id: 6,
    nazov: 'bfs – zober prvého z radu',
    napovedy: ['Ktorá metóda poľa berie zo začiatku?', 'Opak unshift.', 'Nahraď ___ slovom shift.'],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).bfs(), [10, 6, 15, 3, 8, 20], 'bfs()');
    },
  },
  {
    id: 7,
    nazov: 'bfs2 – zaraď ľavé dieťa',
    napovedy: ['Ak existuje ľavé dieťa, ktoré dieťa zaradíme do radu?', 'node.…', 'Nahraď ___ slovom left.'],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).bfs2(), [10, 6, 15, 3, 8, 20], 'bfs2()');
    },
  },
  {
    id: 8,
    nazov: 'preOrder – zapíš hodnotu',
    napovedy: ['Do visited dávame hodnoty, nie uzly. Ako sa volá vlastnosť?', 'node.…', 'Nahraď ___ slovom value.'],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).preOrder(), [10, 6, 3, 8, 15, 20], 'preOrder()');
    },
  },
  {
    id: 9,
    nazov: 'inOrder – začni v koreni',
    napovedy: ['Odkiaľ sa začína prechádzanie stromu?', 'Od koreňa: this.…', 'Nahraď ___ slovom root.'],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).inOrder(), [3, 6, 8, 10, 15, 20], 'inOrder()');
    },
  },
  {
    id: 10,
    nazov: 'postOrder (dve ___)',
    napovedy: [
      'Prvé ___: ktoré dieťa sa prechádza v druhom riadku? Druhé ___: čo zapisujeme do visited?',
      'Po ľavom ide pravé dieťa. Zapisujeme hodnotu uzla.',
      'Prvé ___ nahraď right, druhé ___ nahraď value.',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).postOrder(), [3, 8, 6, 20, 15, 10], 'postOrder()');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'Node – uzol stromu',
    napovedy: ['Tri vlastnosti: value, left, right.', 'left a right sú na začiatku null.', 'constructor(value) { this.value = value; this.left = null; this.right = null; }'],
    testy: (m, { rovne }) => {
      const n = new m.Node(7);
      rovne([n.value, n.left, n.right], [7, null, null], 'new Node(7) – [value, left, right]');
    },
  },
  {
    id: 2,
    nazov: 'BST.insert – vlož hodnotu (vráť this, duplikát → undefined)',
    napovedy: [
      'Prázdny strom: root = nový uzol. Inak while (true) a porovnávaj s current.value.',
      'Menšie → ak je left null, zaves tam; inak current = current.left. Väčšie podobne vpravo.',
      'Celé riešenie je v teórii v časti 2 (insert).',
    ],
    testy: (m, { rovne }) => {
      const t = new m.BST();
      rovne(t.insert(10), t, 'insert vracia this');
      for (const v of ZAKLAD.slice(1)) t.insert(v);
      rovne(tvar(t.root), TVAR_ZAKLAD, 'tvar stromu po insert 10, 6, 15, 3, 8, 20');
      rovne(t.insert(8), undefined, 'insert(8) – duplikát');
    },
  },
  {
    id: 3,
    nazov: 'BST.find – vráť uzol, inak undefined',
    napovedy: [
      'Začni v koreni a choď, kým current existuje.',
      'Rovná sa → return current. Menšia → current.left. Väčšia → current.right.',
      'Celé riešenie je v teórii v časti 2 (find).',
    ],
    testy: (m, { rovne }) => {
      const t = strom(m.BST);
      rovne([t.find(3).value, t.find(20).value], [3, 20], '[find(3).value, find(20).value]');
      rovne([t.find(9), new m.BST().find(1)], [undefined, undefined], '[find(9), find na prázdnom strome]');
    },
  },
  {
    id: 4,
    nazov: 'BST.contains – true / false',
    napovedy: ['Môžeš použiť find z úlohy 3.', 'find vracia undefined, keď nič nenájde.', 'return this.find(value) !== undefined;'],
    testy: (m, { rovne }) => {
      const t = strom(m.BST);
      rovne([t.contains(15), t.contains(16)], [true, false], '[contains(15), contains(16)]');
    },
  },
  {
    id: 5,
    nazov: 'BST.min – najmenšia hodnota (prázdny strom → null)',
    napovedy: ['Najmenšia hodnota je úplne vľavo.', 'Choď doľava, kým current.left existuje.', 'if (!this.root) return null; let c = this.root; while (c.left) c = c.left; return c.value;'],
    testy: (m, { rovne }) => {
      rovne([strom(m.BST).min(), new m.BST().min()], [3, null], '[min(), min() na prázdnom]');
    },
  },
  {
    id: 6,
    nazov: 'BST.bfs – po poschodiach',
    napovedy: [
      'Pomocné pole queue. Začni koreňom.',
      'Kým je queue neprázdny: node = queue.shift(), zapíš node.value, deti push do queue.',
      'Celé riešenie je v teórii v časti 3 (BFS).',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).bfs(), [10, 6, 15, 3, 8, 20], 'bfs()');
      rovne(new m.BST().bfs(), [], 'bfs() na prázdnom');
    },
  },
  {
    id: 7,
    nazov: 'BST.preOrder – uzol, ľavý, pravý',
    napovedy: [
      'Vnútri metódy si napíš rekurzívnu funkciu traverse(node).',
      'V traverse: najprv zapíš node.value, potom ľavé dieťa, potom pravé.',
      'Celé riešenie je v teórii v časti 3 (preOrder).',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).preOrder(), [10, 6, 3, 8, 15, 20], 'preOrder()');
      rovne(new m.BST().preOrder(), [], 'preOrder() na prázdnom');
    },
  },
  {
    id: 8,
    nazov: 'BST.postOrder – ľavý, pravý, uzol',
    napovedy: ['Ako preOrder, len zápis hodnoty je až na konci traverse.', 'Najprv ľavé, potom pravé dieťa, nakoniec visited.push(node.value).', 'Celé riešenie je v teórii v časti 3.'],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).postOrder(), [3, 8, 6, 20, 15, 10], 'postOrder()');
    },
  },
  {
    id: 9,
    nazov: 'BST.inOrder – ľavý, uzol, pravý (zotriedené)',
    napovedy: ['Ako preOrder, len zápis hodnoty je medzi deťmi.', 'Ľavé dieťa, visited.push(node.value), pravé dieťa.', 'Celé riešenie je v teórii v časti 3.'],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).inOrder(), [3, 6, 8, 10, 15, 20], 'inOrder()');
      rovne(strom(m.BST, [5, 1, 9, 7, 2]).inOrder(), [1, 2, 5, 7, 9], 'inOrder() iného stromu');
    },
  },
  {
    id: 10,
    nazov: 'BST.height – počet poschodí (prázdny → 0)',
    napovedy: [
      'Napíš si rekurzívnu pomocnú funkciu h(node).',
      'h(null) = 0, inak 1 + Math.max(h(node.left), h(node.right)).',
      'const h = (node) => (node ? 1 + Math.max(h(node.left), h(node.right)) : 0); return h(this.root);',
    ],
    testy: (m, { rovne }) => {
      rovne(strom(m.BST).height(), 3, 'height()');
      rovne(strom(m.BST, [1, 2, 3, 4, 5]).height(), 5, 'height() stromu 1, 2, 3, 4, 5 (palica)');
      rovne(new m.BST().height(), 0, 'height() prázdneho');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
