'use strict';

const teoria = [
  {
    id: 1,
    otazka: 'Čo je dynamické programovanie?',
    moznosti: [
      'Rozložiť problém na menšie podproblémy, každý vyriešiť len raz a výsledok si zapamätať.',
      'Programovanie, ktoré beží veľmi rýchlo.',
      'Triedenie poľa počas behu programu.',
      'Písanie kódu bez funkcií.',
    ],
    spravna: 'a',
    napoveda: 'Spomeň si na 1 + 1 + 1 + 1 + 1 a potom „+ 1“.',
    vysvetlenie: 'DP si pamätá výsledky menších podproblémov, aby ich nemuselo počítať znova.',
  },
  {
    id: 2,
    otazka: 'Čo znamenajú „prekrývajúce sa podproblémy“ (overlapping subproblems)?',
    moznosti: [
      'Tie isté menšie úlohy sa pri výpočte počítajú opakovane.',
      'Problém sa nedá rozdeliť.',
      'Podproblémy sú úplne rôzne.',
      'Problém má viac správnych odpovedí.',
    ],
    spravna: 'a',
    napoveda: 'Koľkokrát sa vo fib(5) počíta fib(3)?',
    vysvetlenie: 'Pri naivnom fib(5) sa fib(3) počíta dvakrát, fib(2) trikrát… Tie isté úlohy sa opakujú.',
  },
  {
    id: 3,
    otazka: 'Čo znamená „optimálna podštruktúra“ (optimal substructure)?',
    moznosti: [
      'Najlepšie riešenie celku sa dá poskladať z najlepších riešení menších častí.',
      'Problém má len jedno riešenie.',
      'Kód má dobrú štruktúru.',
      'Podproblémy sa neopakujú.',
    ],
    spravna: 'a',
    napoveda: 'Najkratšia cesta A → E cez F obsahuje najkratšiu cestu A → F.',
    vysvetlenie: 'Ak sa optimálne riešenie skladá z optimálnych riešení podproblémov, môžeme ich riešiť zvlášť a kombinovať.',
  },
  {
    id: 4,
    otazka: 'Aká je rýchlosť naivného rekurzívneho Fibonacciho (bez memo)?',
    moznosti: ['O(2ⁿ)', 'O(n)', 'O(log n)', 'O(n²)'],
    spravna: 'a',
    napoveda: 'Každé volanie vyvolá dve ďalšie.',
    vysvetlenie: 'Strom volaní sa pri každej úrovni zhruba zdvojnásobí, takže O(2ⁿ). fib(50) by trvalo minúty.',
  },
  {
    id: 5,
    otazka: 'Čo je memoizácia?',
    moznosti: [
      'Ukladanie výsledkov funkcie (napr. do objektu memo), aby sa ten istý vstup nepočítal znova.',
      'Mazanie premenných z pamäte.',
      'Triedenie výsledkov.',
      'Prepísanie rekurzie na cyklus.',
    ],
    spravna: 'a',
    napoveda: 'Memo = poznámkový blok.',
    vysvetlenie: 'Pred výpočtom sa pozrieme do memo. Ak tam výsledok je, vrátime ho. Inak ho vypočítame a zapíšeme. Je to prístup zhora nadol (top-down).',
  },
  {
    id: 6,
    otazka: 'Čo je tabulácia?',
    moznosti: [
      'Vyplnenie tabuľky (poľa) cyklom od najmenších prípadov po n – zdola nahor.',
      'Rekurzia s objektom memo.',
      'Vypísanie výsledkov do tabuľky v konzole.',
      'Triedenie poľa.',
    ],
    spravna: 'a',
    napoveda: 'Tab = tabuľka. Smer zdola nahor.',
    vysvetlenie: 'Tabulácia začne malými prípadmi (table[1], table[2]…) a cyklom dopočíta table[n]. Nepoužíva rekurziu.',
  },
  {
    id: 7,
    otazka: 'Aká je rýchlosť Fibonacciho s memoizáciou alebo tabuláciou?',
    moznosti: ['O(n)', 'O(2ⁿ)', 'O(n²)', 'O(1)'],
    spravna: 'a',
    napoveda: 'Koľkokrát sa vypočíta každé fib(k)?',
    vysvetlenie: 'Každé fib(k) pre k od 1 po n sa vypočíta len raz, takže O(n).',
  },
  {
    id: 8,
    otazka: 'Aká je výhoda tabulácie oproti memoizácii?',
    moznosti: [
      'Nepoužíva rekurziu, takže nehrozí stack overflow pri veľkom n.',
      'Je vždy kratšia na zápis.',
      'Nepotrebuje žiadnu pamäť.',
      'Funguje aj bez base case.',
    ],
    spravna: 'a',
    napoveda: 'Čo sa stane s kôpkou tanierov pri fibMemo(100000)?',
    vysvetlenie: 'Memoizácia je rekurzívna – pri veľmi veľkom n sa preplní call stack. Tabulácia používa obyčajný cyklus.',
  },
  {
    id: 9,
    otazka: 'Pri ktorom algoritme dynamické programovanie NEPOMÔŽE?',
    moznosti: ['Merge sort – jeho podproblémy (polovice) sa neprekrývajú.', 'Fibonacci', 'Počet spôsobov zaplatenia mincami', 'Počet ciest v mriežke'],
    spravna: 'a',
    napoveda: 'Kde sa podproblémy neopakujú?',
    vysvetlenie: 'Merge sort rieši každú polovicu len raz, nič sa neopakuje. Nie je čo si pamätať.',
  },
  {
    id: 10,
    otazka: 'Prečo je pri počte spôsobov zaplatenia mincami dp[0] = 1?',
    moznosti: [
      'Sumu 0 zaplatíš presne jedným spôsobom – nepoužiješ žiadnu mincu.',
      'Lebo najmenšia minca je 1.',
      'Lebo pole musí začínať jednotkou.',
      'Je to chyba, má byť 0.',
    ],
    spravna: 'a',
    napoveda: 'Koľkými spôsobmi sa dá „nič nezaplatiť“?',
    vysvetlenie: 'Prázdny výber mincí je jeden spôsob. Keby dp[0] = 0, žiadna suma by nemala žiadny spôsob.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const memo = {};\nmemo[5] = 5;\nconsole.log(5 in memo, 6 in memo);',
    moznosti: ['true false', 'false false', 'true true', '5 undefined'],
    spravna: 'a',
    napoveda: 'in sa pýta, či kľúč existuje.',
    vysvetlenie: 'Kľúč 5 v memo je, kľúč 6 nie.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód? (tabulácia)',
    kod: 'const t = [0, 1, 1];\nfor (let i = 3; i <= 6; i++) {\n  t[i] = t[i - 1] + t[i - 2];\n}\nconsole.log(t[6]);',
    moznosti: ['8', '5', '13', '6'],
    spravna: 'a',
    napoveda: 't bude 0, 1, 1, 2, 3, 5, 8.',
    vysvetlenie: 't[3] = 2, t[4] = 3, t[5] = 5, t[6] = 8.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód? (počet volaní naivného fib)',
    kod: 'let volania = 0;\nfunction f(n) {\n  volania++;\n  if (n <= 2) return 1;\n  return f(n - 1) + f(n - 2);\n}\nf(5);\nconsole.log(volania);',
    moznosti: ['9', '5', '7', '15'],
    spravna: 'a',
    napoveda: 'Nakresli si strom volaní z teórie a spočítaj uzly.',
    vysvetlenie: 'Strom pre f(5) má 9 uzlov: f(5), f(4), f(3), f(2), f(1), f(2), f(3), f(2), f(1).',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód? (počet volaní s memo)',
    kod: 'let volania = 0;\nfunction f(n, memo = {}) {\n  volania++;\n  if (n in memo) return memo[n];\n  if (n <= 2) return 1;\n  memo[n] = f(n - 1, memo) + f(n - 2, memo);\n  return memo[n];\n}\nf(10);\nconsole.log(volania);',
    moznosti: ['17', '109', '10', '55'],
    spravna: 'a',
    napoveda: 'Bez memo by to bolo 109. S memo sa každé f(k) počíta len raz.',
    vysvetlenie: 'S memo je volaní 17 (bez memo 109). Každé f(k) sa reálne vypočíta raz, ďalšie volania len vrátia hodnotu z memo.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: 'const dp = new Array(4).fill(Infinity);\ndp[0] = 0;\nconsole.log(dp);',
    moznosti: ['[ 0, Infinity, Infinity, Infinity ]', '[ 0, 0, 0, 0 ]', '[ Infinity, Infinity, Infinity, Infinity ]', '[ 0 ]'],
    spravna: 'a',
    napoveda: 'fill naplní celé pole, potom sa prepíše index 0.',
    vysvetlenie: 'Pole má 4 prvky Infinity a prvý sa zmení na 0.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód? (spôsoby zaplatenia sumy 3 mincami 1 a 2)',
    kod: 'const dp = [1, 0, 0, 0];\nfor (const coin of [1, 2]) {\n  for (let a = coin; a <= 3; a++) {\n    dp[a] += dp[a - coin];\n  }\n}\nconsole.log(dp[3]);',
    moznosti: ['2', '3', '1', '4'],
    spravna: 'a',
    napoveda: 'Sumu 3 zaplatíš ako 1+1+1 alebo 2+1.',
    vysvetlenie: 'Spôsoby sú 1+1+1 a 1+2 (poradie mincí sa nepočíta), teda 2.',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód? (krok Kadaneho algoritmu)',
    kod: 'let cur = -1;\nconst x = 4;\ncur = Math.max(x, cur + x);\nconsole.log(cur);',
    moznosti: ['4', '3', '-1', '5'],
    spravna: 'a',
    napoveda: 'Je lepšie pokračovať (cur + x = 3), alebo začať odznova (x = 4)?',
    vysvetlenie: 'Math.max(4, 3) je 4 – oplatí sa začať nový úsek od 4.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "const r = 2;\nconst c = 3;\nconst key = r + ',' + c;\nconsole.log(key, typeof key);",
    moznosti: ['2,3 string', '5 number', '2,3 number', '23 string'],
    spravna: 'a',
    napoveda: 'Číslo + text = text.',
    vysvetlenie: '2 + "," dá text "2," a + 3 dá "2,3". Je to text (string) – vhodný ako kľúč do memo.',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód? (schody)',
    kod: 'const dp = [1, 1];\nfor (let i = 2; i <= 4; i++) {\n  dp[i] = dp[i - 1] + dp[i - 2];\n}\nconsole.log(dp[4]);',
    moznosti: ['5', '4', '3', '8'],
    spravna: 'a',
    napoveda: 'dp bude 1, 1, 2, 3, 5.',
    vysvetlenie: 'dp[2] = 2, dp[3] = 3, dp[4] = 5. Na 4 schody sa dá vyjsť 5 spôsobmi.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód?',
    kod: 'console.log(new Array(3).fill(0));',
    moznosti: ['[ 0, 0, 0 ]', '[ 3 ]', '[ , , ]', '[ 0 ]'],
    spravna: 'a',
    napoveda: 'Pole s 3 miestami, všetky vyplnené nulou.',
    vysvetlenie: 'new Array(3) vytvorí 3 prázdne miesta a fill(0) ich vyplní nulami.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'fibMemo – Fibonacci s memo',
    napovedy: [
      'fibMemo(10) nevráti 55. Aký je vzorec fib(n)?',
      'fib(n) = fib(n - 1) + fib(n - 2). V kóde je dvakrát n - 1.',
      'V druhom volaní zmeň n - 1 na n - 2.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.fibMemo(1), m.fibMemo(10), m.fibMemo(50)], [1, 55, 12586269025], '[fibMemo(1), (10), (50)]');
    },
  },
  {
    id: 2,
    nazov: 'fibTab – Fibonacci tabuláciou',
    napovedy: [
      'fibTab(6) vráti undefined. Doplní cyklus aj table[n]?',
      'Cyklus i < n skončí pred n. Treba aj i = n.',
      'Zmeň i < n na i <= n.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.fibTab(6), m.fibTab(10)], [8, 55], '[fibTab(6), fibTab(10)]');
    },
  },
  {
    id: 3,
    nazov: 'fibTab2 – začiatok tabuľky',
    napovedy: [
      'Všetky výsledky sú väčšie, ako majú byť. Aké sú prvé Fibonacciho čísla?',
      'fib(0) = 0, fib(1) = 1, fib(2) = 1 – nie 2.',
      'Zmeň [0, 1, 2] na [0, 1, 1].',
    ],
    testy: (m, { rovne }) => {
      rovne([m.fibTab2(3), m.fibTab2(10)], [2, 55], '[fibTab2(3), fibTab2(10)]');
    },
  },
  {
    id: 4,
    nazov: 'climbStairs – schody po 1 alebo 2',
    napovedy: [
      'Výsledok je vždy 0. Koľkými spôsobmi vyjdeš 0 alebo 1 schod?',
      'Na 0 schodov je 1 spôsob (nič nerob), na 1 schod tiež 1.',
      'Zmeň return 0 v base case na return 1.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.climbStairs(1), m.climbStairs(4), m.climbStairs(10)], [1, 5, 89], '[climbStairs(1), (4), (10)]');
    },
  },
  {
    id: 5,
    nazov: 'climbStairsTab – schody tabuláciou',
    napovedy: [
      'Výsledky sú mocniny 2. Odkiaľ sa dá prísť na schod i?',
      'Zo schodu i - 1 alebo i - 2.',
      'Zmeň dp[i - 1] + dp[i - 1] na dp[i - 1] + dp[i - 2].',
    ],
    testy: (m, { rovne }) => {
      rovne([m.climbStairsTab(4), m.climbStairsTab(5)], [5, 8], '[climbStairsTab(4), (5)]');
    },
  },
  {
    id: 6,
    nazov: 'coinWays – počet spôsobov zaplatenia',
    napovedy: [
      'Výsledok je vždy 0. Koľkými spôsobmi sa dá zaplatiť suma 0?',
      'Sumu 0 zaplatíš jedným spôsobom – žiadnou mincou.',
      'Zmeň dp[0] = 0 na dp[0] = 1.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.coinWays([1, 2, 5], 5), m.coinWays([2], 3)], [4, 0], '[coinWays([1, 2, 5], 5), coinWays([2], 3)]');
    },
  },
  {
    id: 7,
    nazov: 'minCoins – najmenej mincí',
    napovedy: [
      'Vráti vždy -1. Hľadáme najmenší, alebo najväčší počet mincí?',
      'Najmenej mincí = minimum.',
      'Zmeň Math.max na Math.min.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.minCoins([1, 2, 5], 11), m.minCoins([2], 3), m.minCoins([1], 0)], [3, -1, 0], '[minCoins([1, 2, 5], 11), ([2], 3), ([1], 0)]');
    },
  },
  {
    id: 8,
    nazov: 'gridPaths – cesty v mriežke',
    napovedy: [
      'gridPaths(3, 3) nevráti 6. Ktoré rozmery obsahuje kľúč do memo?',
      'Kľúč obsahuje len r, takže (2, 3) a (2, 2) majú rovnaký kľúč a zamieňajú sa.',
      "Zmeň const key = String(r) na const key = r + ',' + c.",
    ],
    testy: (m, { rovne }) => {
      rovne([m.gridPaths(2, 2), m.gridPaths(3, 3), m.gridPaths(3, 7)], [2, 6, 28], '[gridPaths(2, 2), (3, 3), (3, 7)]');
    },
  },
  {
    id: 9,
    nazov: 'maxSubarray – najväčší súčet súvislého úseku (Kadane)',
    napovedy: [
      'Pre [-3, -1, -2] vráti 0. Ktorý úsek má súčet 0?',
      'best nemôže začínať nulou – pole môže mať len záporné čísla.',
      'Zmeň let best = 0 na let best = arr[0].',
    ],
    testy: (m, { rovne }) => {
      rovne([m.maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), m.maxSubarray([-3, -1, -2])], [6, -1], '[maxSubarray(príklad z teórie), maxSubarray([-3, -1, -2])]');
    },
  },
  {
    id: 10,
    nazov: 'houseRobber – zlodej nesmie vykradnúť dva susedné domy',
    napovedy: [
      'Výsledok je príliš veľký – započítajú sa aj susedné domy. Čo znamená prev1 + x?',
      'Ak vykradne aktuálny dom x, predchádzajúci (prev1) vykradnúť nesmel. Musí nadviazať na prev2.',
      'Zmeň prev1 + x na prev2 + x.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.houseRobber([1, 2, 3, 1]), m.houseRobber([2, 7, 9, 3, 1]), m.houseRobber([])], [4, 12, 0], '[houseRobber([1, 2, 3, 1]), ([2, 7, 9, 3, 1]), ([])]');
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'fibM – base case',
    napovedy: ['Pre ktoré n je fib(n) = 1 bez počítania?', 'fib(1) = fib(2) = 1.', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne([m.fibM(2), m.fibM(20)], [1, 6765], '[fibM(2), fibM(20)]');
    },
  },
  {
    id: 2,
    nazov: 'fibM2 – vráť hodnotu z memo',
    napovedy: ['Výsledok sme zapísali do poznámkového bloku. Ako sa volá?', 'memo[n]', 'Nahraď ___ slovom memo.'],
    testy: (m, { rovne }) => {
      rovne(m.fibM2(30), 832040, 'fibM2(30)');
    },
  },
  {
    id: 3,
    nazov: 'fibT – začiatok tabuľky',
    napovedy: ['table[2] = fib(2) = ?', 'fib(2) je 1.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.fibT(10), 55, 'fibT(10)');
    },
  },
  {
    id: 4,
    nazov: 'fibT2 – dve predchádzajúce',
    napovedy: ['table[i] = table[i - 1] + table[i - ?]', 'Dve predchádzajúce čísla.', 'Nahraď ___ číslom 2.'],
    testy: (m, { rovne }) => {
      rovne(m.fibT2(12), 144, 'fibT2(12)');
    },
  },
  {
    id: 5,
    nazov: 'stairsMemo – vráť z memo',
    napovedy: ['Je výsledok pre n v memo? Pod akým kľúčom?', 'Kľúč je samotné n.', 'Nahraď ___ písmenom n.'],
    testy: (m, { rovne }) => {
      rovne([m.stairsMemo(4), m.stairsMemo(30)], [5, 1346269], '[stairsMemo(4), stairsMemo(30)]');
    },
  },
  {
    id: 6,
    nazov: 'waysToPay – spôsoby pre sumu 0',
    napovedy: ['Koľkými spôsobmi zaplatíš sumu 0?', 'Žiadna minca = jeden spôsob.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.waysToPay([1, 2, 5], 5), 4, 'waysToPay([1, 2, 5], 5)');
    },
  },
  {
    id: 7,
    nazov: 'waysToPay2 – zvyšok sumy',
    napovedy: ['Keď použijeme mincu, aká suma ostane zaplatiť?', 'a - hodnota mince.', 'Nahraď ___ slovom coin.'],
    testy: (m, { rovne }) => {
      rovne(m.waysToPay2([1, 2, 5], 5), 4, 'waysToPay2([1, 2, 5], 5)');
    },
  },
  {
    id: 8,
    nazov: 'fewestCoins – pridaj jednu mincu',
    napovedy: ['dp[a - coin] mincí plus táto jedna minca = ?', '+ 1', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne([m.fewestCoins([1, 2, 5], 11), m.fewestCoins([3], 7)], [3, -1], '[fewestCoins([1, 2, 5], 11), ([3], 7)]');
    },
  },
  {
    id: 9,
    nazov: 'paths – kľúč do memo',
    napovedy: ['Kľúč musí obsahovať oba rozmery mriežky.', "r + ',' + ?", 'Nahraď ___ písmenom c.'],
    testy: (m, { rovne }) => {
      rovne([m.paths(3, 3), m.paths(4, 5)], [6, 35], '[paths(3, 3), paths(4, 5)]');
    },
  },
  {
    id: 10,
    nazov: 'kadane (dve ___)',
    napovedy: [
      'Prvé ___: pokračovať znamená k cur pripočítať aktuálne číslo – ktoré? Druhé ___: best je najväčšie doteraz – ktorá funkcia Math.…?',
      'Aktuálne číslo je x. Najväčšie = max.',
      'Prvé ___ nahraď x, druhé ___ nahraď max.',
    ],
    testy: (m, { rovne }) => {
      rovne([m.kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]), m.kadane([5, -9, 6])], [6, 6], '[kadane(príklad z teórie), kadane([5, -9, 6])]');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'fibMemoP – Fibonacci s memoizáciou',
    napovedy: [
      'Parameter memo = {}. Najprv: ak n je v memo, vráť memo[n].',
      'Base case n <= 2 → 1. Inak memo[n] = fibMemoP(n - 1, memo) + fibMemoP(n - 2, memo); return memo[n].',
      'Celé riešenie je v teórii v časti 3.',
    ],
    testy: (m, { rovne, pravda }) => {
      rovne([m.fibMemoP(1), m.fibMemoP(10), m.fibMemoP(70)], [1, 55, 190392490709135], '[fibMemoP(1), (10), (70)]');
      const memo = {};
      m.fibMemoP(30, memo);
      pravda(memo[30] === 832040, 'memo nebolo naplnené – výsledok treba zapísať do memo[n] a memo posielať ďalej v rekurzii');
    },
  },
  {
    id: 2,
    nazov: 'fibTabP – Fibonacci tabuláciou (bez rekurzie)',
    napovedy: [
      'table = [0, 1, 1] a cyklus od 3 po n.',
      'table[i] = table[i - 1] + table[i - 2].',
      'Celé riešenie je v teórii v časti 4.',
    ],
    testy: (m, { rovne, nepouziva }) => {
      rovne([m.fibTabP(1), m.fibTabP(2), m.fibTabP(70)], [1, 1, 190392490709135], '[fibTabP(1), (2), (70)]');
      nepouziva(m.fibTabP, /fibTabP\s*\([^)]*\)\s*[+;]/, 'použi cyklus, nie rekurziu');
    },
  },
  {
    id: 3,
    nazov: 'climbStairsP – schody po 1 alebo 2',
    napovedy: ['dp = [1, 1] a cyklus od 2.', 'dp[i] = dp[i - 1] + dp[i - 2].', 'Celé riešenie je v teórii v časti 5 (schody).'],
    testy: (m, { rovne }) => {
      rovne([m.climbStairsP(0), m.climbStairsP(2), m.climbStairsP(5), m.climbStairsP(40)], [1, 2, 8, 165580141], '[climbStairsP(0), (2), (5), (40)]');
    },
  },
  {
    id: 4,
    nazov: 'climbStairs3 – schody po 1, 2 alebo 3',
    napovedy: [
      'Na schod i sa dostaneš z i - 1, i - 2 alebo i - 3.',
      'dp = [1, 1, 2] a dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3].',
      'const dp = [1, 1, 2]; for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]; return dp[n];',
    ],
    testy: (m, { rovne }) => {
      rovne([m.climbStairs3(0), m.climbStairs3(1), m.climbStairs3(3), m.climbStairs3(4), m.climbStairs3(10)], [1, 1, 4, 7, 274], '[climbStairs3(0), (1), (3), (4), (10)]');
    },
  },
  {
    id: 5,
    nazov: 'coinWaysP – počet spôsobov zaplatenia',
    napovedy: [
      'dp = new Array(amount + 1).fill(0); dp[0] = 1.',
      'Pre každú mincu: for (let a = coin; a <= amount; a++) dp[a] += dp[a - coin].',
      'Celé riešenie je v teórii v časti 5 (mince – počet spôsobov).',
    ],
    testy: (m, { rovne }) => {
      rovne([m.coinWaysP([1, 2, 5], 5), m.coinWaysP([2, 5, 3, 6], 10), m.coinWaysP([3], 2), m.coinWaysP([1], 0)], [4, 5, 0, 1], '[([1, 2, 5], 5), ([2, 5, 3, 6], 10), ([3], 2), ([1], 0)]');
    },
  },
  {
    id: 6,
    nazov: 'minCoinsP – najmenej mincí (nedá sa → -1)',
    napovedy: [
      'dp = new Array(amount + 1).fill(Infinity); dp[0] = 0.',
      'Pre každú sumu a a mincu coin <= a: dp[a] = Math.min(dp[a], dp[a - coin] + 1). Na konci Infinity → -1.',
      'Celé riešenie je v teórii v časti 5 (mince – najmenej mincí).',
    ],
    testy: (m, { rovne }) => {
      rovne([m.minCoinsP([1, 2, 5], 11), m.minCoinsP([2], 3), m.minCoinsP([1, 3, 4], 6), m.minCoinsP([7], 0)], [3, -1, 2, 0], '[([1, 2, 5], 11), ([2], 3), ([1, 3, 4], 6), ([7], 0)]');
    },
  },
  {
    id: 7,
    nazov: 'gridPathsP – cesty v mriežke r × c',
    napovedy: [
      'Base case: r === 1 alebo c === 1 → 1.',
      "Inak paths(r - 1, c) + paths(r, c - 1). Pridaj memo s kľúčom r + ',' + c.",
      'Celé riešenie je v teórii v časti 5 (cesty v mriežke).',
    ],
    testy: (m, { rovne }) => {
      rovne([m.gridPathsP(1, 5), m.gridPathsP(3, 3), m.gridPathsP(18, 18)], [1, 6, 2333606220], '[gridPathsP(1, 5), (3, 3), (18, 18)]');
    },
  },
  {
    id: 8,
    nazov: 'maxSubarrayP – najväčší súčet súvislého úseku',
    napovedy: [
      'cur a best začnú na arr[0].',
      'Pre ďalšie čísla: cur = Math.max(x, cur + x); best = Math.max(best, cur).',
      'Celé riešenie je v teórii v časti 5 (Kadane).',
    ],
    testy: (m, { rovne }) => {
      rovne([m.maxSubarrayP([-2, 1, -3, 4, -1, 2, 1, -5, 4]), m.maxSubarrayP([5, 4, -1, 7, 8]), m.maxSubarrayP([-5])], [6, 23, -5], '[príklad z teórie, [5, 4, -1, 7, 8], [-5]]');
    },
  },
  {
    id: 9,
    nazov: 'houseRobberP – najviac peňazí bez dvoch susedných domov',
    napovedy: [
      'Pre každý dom: buď ho vykradneš (prev2 + x), alebo nie (prev1). Vyber väčšie.',
      'prev2 = 0, prev1 = 0. V cykle: cur = Math.max(prev1, prev2 + x); prev2 = prev1; prev1 = cur.',
      'let prev2 = 0, prev1 = 0; for (const x of houses) { const cur = Math.max(prev1, prev2 + x); prev2 = prev1; prev1 = cur; } return prev1;',
    ],
    testy: (m, { rovne }) => {
      rovne([m.houseRobberP([1, 2, 3, 1]), m.houseRobberP([2, 7, 9, 3, 1]), m.houseRobberP([2, 1, 1, 2]), m.houseRobberP([])], [4, 12, 4, 0], '[[1, 2, 3, 1], [2, 7, 9, 3, 1], [2, 1, 1, 2], []]');
    },
  },
  {
    id: 10,
    nazov: 'lcsLength – dĺžka najdlhšej spoločnej podpostupnosti dvoch textov',
    napovedy: [
      'Tabuľka dp s rozmermi (a.length + 1) × (b.length + 1) plná núl. dp[i][j] = výsledok pre prvých i písmen a a prvých j písmen b.',
      'Ak a[i - 1] === b[j - 1], dp[i][j] = dp[i - 1][j - 1] + 1. Inak dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]).',
      'const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0)); for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]); return dp[a.length][b.length];',
    ],
    testy: (m, { rovne }) => {
      rovne([m.lcsLength('abcde', 'ace'), m.lcsLength('abc', 'def'), m.lcsLength('kocka', 'okno'), m.lcsLength('', 'abc')], [3, 0, 2, 0], "[('abcde', 'ace'), ('abc', 'def'), ('kocka', 'okno'), ('', 'abc')]");
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
