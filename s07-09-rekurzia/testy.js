'use strict';

const teoria = [
  {
    id: 1,
    otazka: 'Čo je rekurzia?',
    moznosti: ['Cyklus for, ktorý beží odzadu.', 'Funkcia, ktorá volá samu seba.', 'Funkcia bez parametrov.', 'Funkcia, ktorá vracia pole.'],
    spravna: 'b',
    napoveda: 'Spomeň si na matriošku v matrioške.',
    vysvetlenie: 'Rekurzívna funkcia vo svojom tele zavolá samu seba, zakaždým s menším vstupom.',
  },
  {
    id: 2,
    otazka: 'Ktoré DVE časti musí mať každá rekurzívna funkcia?',
    moznosti: [
      'Cyklus a podmienku.',
      'Base case (kde sa zastaví) a volanie samej seba s menším vstupom.',
      'Dva parametre a return.',
      'console.log a return.',
    ],
    spravna: 'b',
    napoveda: 'Jedna časť povie „stop“, druhá „pokračuj s menšou matrioškou“.',
    vysvetlenie: 'Base case zastaví rekurziu. Volanie s menším vstupom zaručí, že sa k base case raz dostaneme.',
  },
  {
    id: 3,
    otazka: 'Čo sa stane, keď rekurzívna funkcia nemá base case?',
    moznosti: [
      'Vráti undefined.',
      'Vráti 0.',
      'Volá sa donekonečna, až spadne s RangeError: Maximum call stack size exceeded.',
      'JavaScript ju automaticky zastaví po 10 volaniach a vráti výsledok.',
    ],
    spravna: 'c',
    napoveda: 'Kôpka tanierov rastie a rastie…',
    vysvetlenie: 'Bez base case sa funkcia volá stále ďalej. Zásobník volaní (call stack) sa preplní a program spadne. Tomu sa hovorí stack overflow.',
  },
  {
    id: 4,
    otazka: 'Ako funguje call stack (zásobník volaní)?',
    moznosti: [
      'Ako rad v obchode – kto prišiel prvý, ide prvý.',
      'Ako kôpka tanierov – posledná zavolaná funkcia skončí prvá.',
      'Funkcie bežia všetky naraz.',
      'Funkcie sa spúšťajú v abecednom poradí.',
    ],
    spravna: 'b',
    napoveda: 'Nový tanier ide navrch. Ktorý tanier vezmeš ako prvý?',
    vysvetlenie: 'Každé volanie sa položí navrch kôpky. Musí skončiť to najvrchnejšie a až potom pokračuje to pod ním.',
  },
  {
    id: 5,
    otazka: 'V rekurzívnom kroku je napísané len sumRange(n - 1); bez return. Čo vráti funkcia?',
    moznosti: ['Správny výsledok.', 'undefined', '0', 'Spadne s chybou.'],
    spravna: 'b',
    napoveda: 'Výsledok volania sa vypočíta… ale kam sa podeje?',
    vysvetlenie: 'Bez return sa výsledok rekurzívneho volania zahodí a funkcia skončí bez návratovej hodnoty, teda vráti undefined.',
  },
  {
    id: 6,
    otazka: 'Prečo má factorial base case if (n <= 1) return 1; a nie return 0?',
    moznosti: [
      'Lebo 0 nie je číslo.',
      'Lebo všetko sa násobí a keby na konci bola 0, celý výsledok by bol 0.',
      'Lebo inak by funkcia bežala donekonečna.',
      'Je to jedno.',
    ],
    spravna: 'b',
    napoveda: 'Koľko je 4 · 3 · 2 · 0?',
    vysvetlenie: 'Faktoriál násobí. Násobenie nulou dá vždy 0, preto base case musí vrátiť 1 (neutrálne číslo pre násobenie).',
  },
  {
    id: 7,
    otazka: "Čo vráti 'ahoj'.slice(1)?",
    moznosti: ["'a'", "'hoj'", "'aho'", "'ahoj'"],
    spravna: 'b',
    napoveda: 'slice(1) = od indexu 1 do konca.',
    vysvetlenie: "slice(1) vráti všetko okrem prvého znaku: 'hoj'. Preto je to obľúbený spôsob, ako v rekurzii zmenšiť text.",
  },
  {
    id: 8,
    otazka: 'Prečo pri „helper method recursion“ dávame pole result do VONKAJŠEJ funkcie?',
    moznosti: [
      'Aby bolo rýchlejšie.',
      'Lebo keby bolo v rekurzívnej funkcii, pri každom volaní by vzniklo nové prázdne pole a výsledky by sa stratili.',
      'Lebo vnútorná funkcia nemôže používať polia.',
      'Lebo JavaScript to vyžaduje.',
    ],
    spravna: 'b',
    napoveda: 'Čo urobí const result = [] pri každom spustení funkcie?',
    vysvetlenie: 'Každé volanie funkcie vytvorí vlastné premenné. Spoločný košík preto musí byť mimo rekurzívneho pomocníka.',
  },
  {
    id: 9,
    otazka: 'Fibonacciho postupnosť je 1, 1, 2, 3, 5, 8, … Ako sa vypočíta ďalšie číslo?',
    moznosti: [
      'Predchádzajúce číslo krát 2.',
      'Súčet dvoch predchádzajúcich čísel.',
      'Predchádzajúce číslo plus 1.',
      'Súčin dvoch predchádzajúcich čísel.',
    ],
    spravna: 'b',
    napoveda: '2 = 1 + 1, 3 = 1 + 2, 5 = 2 + 3…',
    vysvetlenie: 'fib(n) = fib(n - 1) + fib(n - 2). Ďalšie číslo po 8 je 5 + 8 = 13.',
  },
  {
    id: 10,
    otazka: 'Ako zistíš, či je hodnota x pole (napríklad pri rozbaľovaní vnorených polí)?',
    moznosti: ["typeof x === 'array'", 'Array.isArray(x)', 'x.length > 0', "x === 'pole'"],
    spravna: 'b',
    napoveda: "typeof pre pole vráti 'object', nie 'array'.",
    vysvetlenie: "Array.isArray(x) vráti true len pre pole. typeof [] je 'object', takže by nerozlíšil pole od objektu.",
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'function f(n) {\n  if (n === 0) return 0;\n  return n + f(n - 1);\n}\nconsole.log(f(3));',
    moznosti: ['3', '6', '0', '5'],
    spravna: 'b',
    napoveda: 'f(3) = 3 + f(2) = 3 + 2 + f(1) = …',
    vysvetlenie: 'f(3) = 3 + 2 + 1 + 0 = 6.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: 'function f(n) {\n  if (n <= 0) return;\n  console.log(n);\n  f(n - 1);\n}\nf(3);',
    moznosti: ['3\n2\n1', '1\n2\n3', '3\n2\n1\n0', '3'],
    spravna: 'a',
    napoveda: 'console.log je PRED rekurzívnym volaním.',
    vysvetlenie: 'Najprv sa vypíše n, potom sa funkcia ponorí ďalej: 3, 2, 1. Pri 0 sa zastaví a nič nevypíše.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód? (pozor, console.log je teraz ZA volaním)',
    kod: 'function f(n) {\n  if (n <= 0) return;\n  f(n - 1);\n  console.log(n);\n}\nf(3);',
    moznosti: ['3\n2\n1', '1\n2\n3', '0\n1\n2\n3', '3'],
    spravna: 'b',
    napoveda: 'Funkcia sa najprv ponorí až na dno a vypisuje až pri návrate. Ktorý tanier je navrchu?',
    vysvetlenie: 'f(3) zavolá f(2), to f(1), to f(0) a vráti sa. Potom f(1) vypíše 1, vráti sa do f(2), ktoré vypíše 2, a nakoniec f(3) vypíše 3.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: 'function f(n) {\n  if (n === 1) return 1;\n  return n * f(n - 1);\n}\nconsole.log(f(4));',
    moznosti: ['10', '24', '4', '12'],
    spravna: 'b',
    napoveda: '4 · 3 · 2 · 1',
    vysvetlenie: 'Je to faktoriál: 4 · 3 · 2 · 1 = 24.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log('ahoj'.slice(1));",
    moznosti: ['a', 'hoj', 'aho', 'ahoj'],
    spravna: 'b',
    napoveda: 'slice(1) = od indexu 1 do konca.',
    vysvetlenie: 'Index 0 je a, od indexu 1 je to hoj.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log([1].concat([2, 3]));',
    moznosti: ['[ 1, 2, 3 ]', '[ 1, [ 2, 3 ] ]', '[ 2, 3, 1 ]', '6'],
    spravna: 'a',
    napoveda: 'concat spojí polia do jedného.',
    vysvetlenie: 'concat vytvorí nové pole: prvky prvého a za nimi prvky druhého → [ 1, 2, 3 ].',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: 'function f(n) {\n  return n + f(n - 1);\n}\nconsole.log(f(3));',
    moznosti: ['6', '0', 'undefined', 'Chyba: RangeError (Maximum call stack size exceeded)'],
    spravna: 'd',
    napoveda: 'Kde je base case?',
    vysvetlenie: 'Funkcia nemá base case, takže sa volá donekonečna: f(3), f(2), …, f(-1000)… až spadne s RangeError (stack overflow).',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód? (dva riadky)',
    kod: "console.log(Array.isArray([1]));\nconsole.log(Array.isArray('a'));",
    moznosti: ['true\nfalse', 'true\ntrue', 'false\nfalse', 'object\nstring'],
    spravna: 'a',
    napoveda: 'Je [1] pole? Je text "a" pole?',
    vysvetlenie: '[1] je pole → true. Text "a" nie je pole → false.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: 'function f(n) {\n  if (n <= 1) return n;\n  f(n - 1);\n}\nconsole.log(f(3));',
    moznosti: ['1', '3', 'undefined', '0'],
    spravna: 'c',
    napoveda: 'Čo vráti f(3)? Má posledný riadok return?',
    vysvetlenie: 'f(3) zavolá f(2), ale výsledok nevráti (chýba return). f(3) skončí bez return, takže vráti undefined.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log('abcd'.slice(1, -1));",
    moznosti: ['bcd', 'bc', 'abc', 'abcd'],
    spravna: 'b',
    napoveda: '-1 znamená „po posledný znak“, ten sa už nepočíta.',
    vysvetlenie: 'slice(1, -1) odreže prvý aj posledný znak → bc. Hodí sa pri kontrole palindrómu.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'countDown – pole [n, n-1, …, 1]',
    napovedy: [
      'countDown(3) vráti [3, 2] – chýba 1. Kedy sa rekurzia zastaví?',
      'Base case má zastaviť až pri 0, aby sa 1 ešte pridala.',
      'Zmeň if (n === 1) na if (n === 0).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countDown(3), [3, 2, 1], 'countDown(3)');
      rovne(m.countDown(1), [1], 'countDown(1)');
    },
  },
  {
    id: 2,
    nazov: 'sumRange – súčet 1 + 2 + … + n',
    napovedy: [
      'Chyba je RangeError – funkcia sa volá donekonečna. Zmenšuje sa vstup?',
      'sumRange(n) volá znova sumRange(n). Má volať menšie číslo.',
      'Zmeň sumRange(n) na sumRange(n - 1) v poslednom riadku.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sumRange(3), 6, 'sumRange(3)');
      rovne(m.sumRange(10), 55, 'sumRange(10)');
    },
  },
  {
    id: 3,
    nazov: 'factorial – n!',
    napovedy: [
      'Výsledok je vždy 0. Čo vracia base case?',
      'Násobenie nulou dá 0. 0! aj 1! sú podľa dohody 1.',
      'Zmeň return 0; na return 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.factorial(4), 24, 'factorial(4)');
      rovne(m.factorial(0), 1, 'factorial(0)');
    },
  },
  {
    id: 4,
    nazov: 'power – base na exponent',
    napovedy: [
      'power(2, 3) má byť 2 · 2 · 2 = 8. Akú operáciu robí funkcia?',
      'Mocnina je opakované NÁSOBENIE, nie sčítanie.',
      'Zmeň base + power(...) na base * power(...).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.power(2, 3), 8, 'power(2, 3)');
      rovne(m.power(5, 0), 1, 'power(5, 0)');
      rovne(m.power(3, 2), 9, 'power(3, 2)');
    },
  },
  {
    id: 5,
    nazov: 'productOfArray – súčin všetkých čísel',
    napovedy: [
      'Výsledok je vždy 0. Čo vráti funkcia pre prázdne pole?',
      'Na konci rekurzie sa násobí výsledkom pre prázdne pole. Prázdny súčin je 1.',
      'Zmeň return 0; na return 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.productOfArray([1, 2, 3]), 6, 'productOfArray([1, 2, 3])');
      rovne(m.productOfArray([1, 2, 3, 10]), 60, 'productOfArray([1, 2, 3, 10])');
    },
  },
  {
    id: 6,
    nazov: 'fib – n-té Fibonacciho číslo',
    napovedy: [
      'fib(1) a fib(2) majú byť 1. Čo vráti fib(2)?',
      'Pri n = 2 sa base case nespustí a funkcia počíta fib(1) + fib(0) = 2.',
      'Zmeň if (n <= 1) na if (n <= 2).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.fib(4), 3, 'fib(4)');
      rovne(m.fib(10), 55, 'fib(10)');
      rovne(m.fib(2), 1, 'fib(2)');
    },
  },
  {
    id: 7,
    nazov: 'reverse – otoč text',
    napovedy: [
      "reverse('ahoj') vyjde zle. Ktoré písmeno sa dáva na koniec?",
      'Otočíš zvyšok (bez prvého písmena) a na koniec pridáš PRVÉ písmeno. Aký index má prvé?',
      'Zmeň str[1] na str[0].',
    ],
    testy: (m, { rovne }) => {
      rovne(m.reverse('ahoj'), 'joha', "reverse('ahoj')");
      rovne(m.reverse('a'), 'a', "reverse('a')");
    },
  },
  {
    id: 8,
    nazov: 'isPalindrome – číta sa rovnako spredu aj zozadu?',
    napovedy: [
      "Pre 'abba' vráti false. Čo sa posiela do ďalšieho volania?",
      'Po kontrole prvého a posledného písmena treba odrezať OBE. slice(1) odreže len prvé.',
      'Zmeň str.slice(1) na str.slice(1, -1).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isPalindrome('abba'), true, "isPalindrome('abba')");
      rovne(m.isPalindrome('tacocat'), true, "isPalindrome('tacocat')");
      rovne(m.isPalindrome('ab'), false, "isPalindrome('ab')");
    },
  },
  {
    id: 9,
    nazov: 'flatten – rozbaľ vnorené polia',
    napovedy: [
      'Pre [1, [2, [3]]] ostane [3] zabalené. Rozbaľuje sa vnorené pole rekurzívne?',
      'Keď je x pole, treba ho najprv celé rozbaliť zavolaním flatten(x).',
      'Zmeň result.concat(x) na result.concat(flatten(x)).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.flatten([1, [2, [3]]]), [1, 2, 3], 'flatten([1, [2, [3]]])');
      rovne(m.flatten([[1], [[2]], 3]), [1, 2, 3], 'flatten([[1], [[2]], 3])');
    },
  },
  {
    id: 10,
    nazov: 'nestedEvenSum – súčet párnych čísel aj vo vnorených objektoch',
    napovedy: [
      'Súčet z vnoreného objektu prepíše doterajší súčet. Ktorý znak to robí?',
      '= nastaví novú hodnotu, += pripočíta.',
      'Zmeň sum = nestedEvenSum(v) na sum += nestedEvenSum(v).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.nestedEvenSum({ a: 2, b: { c: 4 }, d: 6 }), 12, 'nestedEvenSum({ a: 2, b: { c: 4 }, d: 6 })');
      rovne(m.nestedEvenSum({ a: 1, b: { c: { d: 2 } }, e: 'x' }), 2, "nestedEvenSum({ a: 1, b: { c: { d: 2 } }, e: 'x' })");
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'sumTo – base case',
    napovedy: ['Pri akom n už nie je čo sčítavať?', 'Súčet čísel do nuly je 0.', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      rovne(m.sumTo(4), 10, 'sumTo(4)');
      rovne(m.sumTo(0), 0, 'sumTo(0)');
    },
  },
  {
    id: 2,
    nazov: 'fact – menší vstup',
    napovedy: ['O koľko sa má n zmenšiť pri každom volaní?', 'n · (n - …)!', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.fact(5), 120, 'fact(5)');
    },
  },
  {
    id: 3,
    nazov: 'pow – čokoľvek na nultú',
    napovedy: ['Koľko je 5 na nultú?', 'Každé číslo na nultú je 1.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.pow(2, 4), 16, 'pow(2, 4)');
      rovne(m.pow(7, 0), 1, 'pow(7, 0)');
    },
  },
  {
    id: 4,
    nazov: 'product – zvyšok poľa',
    napovedy: ['Ktorá metóda vráti pole bez prvého prvku?', 'arr.….(1)', 'Nahraď ___ slovom slice.'],
    testy: (m, { rovne }) => {
      rovne(m.product([2, 3, 4]), 24, 'product([2, 3, 4])');
    },
  },
  {
    id: 5,
    nazov: 'fibo – súčet dvoch predchádzajúcich',
    napovedy: ['fib(n) = fib(n - 1) + fib(n - ?)', 'Dve predchádzajúce čísla sú n - 1 a n - 2.', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne(m.fibo(7), 13, 'fibo(7)');
    },
  },
  {
    id: 6,
    nazov: 'rev – prvé písmeno na koniec',
    napovedy: ['Ktoré písmeno pridávame na koniec otočeného zvyšku?', 'Prvé písmeno má index…', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      rovne(m.rev('abc'), 'cba', "rev('abc')");
    },
  },
  {
    id: 7,
    nazov: 'range – pole [1, 2, …, n]',
    napovedy: ['range(n - 1) dá [1, …, n - 1]. Čo treba pridať na koniec?', 'Na koniec patrí samotné n.', 'Nahraď ___ písmenom n.'],
    testy: (m, { rovne }) => {
      rovne(m.range(4), [1, 2, 3, 4], 'range(4)');
      rovne(m.range(0), [], 'range(0)');
    },
  },
  {
    id: 8,
    nazov: 'deepCount – počet prvkov aj vo vnorených poliach',
    napovedy: ['Keď je x pole, čo treba spočítať rekurzívne?', 'Rekurzívne voláme deepCount na to vnorené pole.', 'Nahraď ___ písmenom x.'],
    testy: (m, { rovne }) => {
      rovne(m.deepCount([1, [2, 3], [[4]]]), 4, 'deepCount([1, [2, 3], [[4]]])');
    },
  },
  {
    id: 9,
    nazov: 'capitalizeFirst – veľké prvé písmeno každého slova',
    napovedy: ['Za veľkým písmenom pridávame zvyšok slova. Od ktorého indexu?', 'Zvyšok slova bez prvého písmena = slice(…)', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.capitalizeFirst(['auto', 'bicykel']), ['Auto', 'Bicykel'], "capitalizeFirst(['auto', 'bicykel'])");
      rovne(m.capitalizeFirst([]), [], 'capitalizeFirst([])');
    },
  },
  {
    id: 10,
    nazov: 'collectStrings – všetky texty z vnoreného objektu (dve ___)',
    napovedy: [
      'Prvé ___: aký má byť na začiatku košík na výsledky? Druhé ___: ktorou metódou pridáš text do poľa?',
      'Košík je prázdne pole. Na koniec poľa pridáva metóda push.',
      'Prvé ___ nahraď [], druhé ___ nahraď push.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.collectStrings({ a: 'x', b: { c: 2, d: 'y' }, e: { f: { g: 'z' } } }), ['x', 'y', 'z'], 'collectStrings(...)');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'sumToN – súčet 1 + … + n rekurzívne',
    napovedy: [
      'Base case: n === 0 → 0.',
      'Inak vráť n + sumToN(n - 1).',
      'if (n === 0) return 0; return n + sumToN(n - 1);',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.sumToN(5), 15, 'sumToN(5)');
      rovne(m.sumToN(0), 0, 'sumToN(0)');
      rekurzivna(m.sumToN);
    },
  },
  {
    id: 2,
    nazov: 'factorialR – n! rekurzívne',
    napovedy: [
      'Base case: n <= 1 → 1.',
      'Inak n * factorialR(n - 1).',
      'if (n <= 1) return 1; return n * factorialR(n - 1);',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.factorialR(5), 120, 'factorialR(5)');
      rovne(m.factorialR(0), 1, 'factorialR(0)');
      rekurzivna(m.factorialR);
    },
  },
  {
    id: 3,
    nazov: 'powerR – mocnina rekurzívne',
    napovedy: [
      'Base case: exp === 0 → 1.',
      'Inak base * powerR(base, exp - 1).',
      'if (exp === 0) return 1; return base * powerR(base, exp - 1);',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.powerR(2, 10), 1024, 'powerR(2, 10)');
      rovne(m.powerR(9, 0), 1, 'powerR(9, 0)');
      rekurzivna(m.powerR);
    },
  },
  {
    id: 4,
    nazov: 'productR – súčin poľa rekurzívne',
    napovedy: [
      'Base case: prázdne pole → 1.',
      'Inak arr[0] * productR(arr.slice(1)).',
      'if (arr.length === 0) return 1; return arr[0] * productR(arr.slice(1));',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.productR([2, 5, 3]), 30, 'productR([2, 5, 3])');
      rovne(m.productR([]), 1, 'productR([])');
      rekurzivna(m.productR);
    },
  },
  {
    id: 5,
    nazov: 'countDigits – počet číslic rekurzívne',
    napovedy: [
      'Číslo menšie ako 10 má 1 číslicu (base case).',
      'Math.floor(n / 10) odsekne poslednú číslicu: 1234 → 123. Výsledok je 1 + countDigits(menšie číslo).',
      'if (n < 10) return 1; return 1 + countDigits(Math.floor(n / 10));',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.countDigits(1234), 4, 'countDigits(1234)');
      rovne(m.countDigits(7), 1, 'countDigits(7)');
      rekurzivna(m.countDigits);
    },
  },
  {
    id: 6,
    nazov: 'fibR – Fibonacci rekurzívne',
    napovedy: [
      'Base case: n <= 2 → 1.',
      'Inak fibR(n - 1) + fibR(n - 2).',
      'if (n <= 2) return 1; return fibR(n - 1) + fibR(n - 2);',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.fibR(6), 8, 'fibR(6)');
      rovne(m.fibR(1), 1, 'fibR(1)');
      rovne(m.fibR(20), 6765, 'fibR(20)');
      rekurzivna(m.fibR);
    },
  },
  {
    id: 7,
    nazov: 'reverseR – otoč text rekurzívne',
    napovedy: [
      'Base case: text s dĺžkou 0 alebo 1 vráť taký, aký je.',
      'Inak reverseR(str.slice(1)) + str[0].',
      'if (str.length <= 1) return str; return reverseR(str.slice(1)) + str[0];',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.reverseR('rithmschool'), 'loohcsmhtir', "reverseR('rithmschool')");
      rovne(m.reverseR(''), '', "reverseR('')");
      rekurzivna(m.reverseR);
    },
  },
  {
    id: 8,
    nazov: 'palindromeR – palindróm rekurzívne',
    napovedy: [
      'Base case: dĺžka 0 alebo 1 → true.',
      'Ak sa prvé a posledné písmeno líšia → false. Inak skontroluj stred: str.slice(1, -1).',
      'if (str.length <= 1) return true; if (str[0] !== str[str.length - 1]) return false; return palindromeR(str.slice(1, -1));',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.palindromeR('tacocat'), true, "palindromeR('tacocat')");
      rovne(m.palindromeR('awesome'), false, "palindromeR('awesome')");
      rovne(m.palindromeR('a'), true, "palindromeR('a')");
      rekurzivna(m.palindromeR);
    },
  },
  {
    id: 9,
    nazov: 'flattenR – rozbaľ vnorené polia',
    napovedy: [
      'Prejdi prvky cyklom. Ak je prvok pole (Array.isArray), rozbaľ ho rekurzívne.',
      'Výsledok spájaj cez result = result.concat(flattenR(x)); obyčajné prvky push-uj.',
      'let result = []; for (const x of arr) { if (Array.isArray(x)) result = result.concat(flattenR(x)); else result.push(x); } return result;',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.flattenR([1, [2, [3, 4], [[5]]]]), [1, 2, 3, 4, 5], 'flattenR([1, [2, [3, 4], [[5]]]])');
      rovne(m.flattenR([]), [], 'flattenR([])');
      rekurzivna(m.flattenR);
    },
  },
  {
    id: 10,
    nazov: 'capitalizeAll – všetky slová VEĽKÝMI písmenami',
    napovedy: [
      'Base case: prázdne pole → [].',
      'Prvé slovo daj veľkými (toUpperCase) a spoj so zvyškom: [prve].concat(capitalizeAll(arr.slice(1))).',
      'if (arr.length === 0) return []; return [arr[0].toUpperCase()].concat(capitalizeAll(arr.slice(1)));',
    ],
    testy: (m, { rovne, rekurzivna }) => {
      rovne(m.capitalizeAll(['ahoj', 'svet']), ['AHOJ', 'SVET'], "capitalizeAll(['ahoj', 'svet'])");
      rovne(m.capitalizeAll([]), [], 'capitalizeAll([])');
      rekurzivna(m.capitalizeAll);
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
