'use strict';

const teoria = [
  {
    id: 1,
    otazka: 'Čo je podľa kurzu PRVÝ krok pri riešení novej úlohy?',
    moznosti: [
      'Hneď začať písať kód.',
      'Pochopiť problém – povedať si ho vlastnými slovami, aký je vstup a výstup.',
      'Vyhľadať riešenie na internete.',
      'Napísať testy na rýchlosť.',
    ],
    spravna: 'b',
    napoveda: 'Než niečo vyriešiš, musíš vedieť, čo vlastne riešiš.',
    vysvetlenie: 'Krok 1 je Understand the Problem: zopakuj si zadanie vlastnými slovami a ujasni si vstup a výstup.',
  },
  {
    id: 2,
    otazka: 'Čo je „edge case“ (okrajový prípad)?',
    moznosti: [
      'Najrýchlejšie riešenie úlohy.',
      'Chyba v JavaScripte.',
      'Zvláštny vstup, napríklad prázdne pole alebo jeden prvok.',
      'Posledný riadok funkcie.',
    ],
    spravna: 'c',
    napoveda: 'Edge = okraj. Na okrajoch sa veci často pokazia.',
    vysvetlenie: 'Edge case je nezvyčajný vstup: prázdne pole, prázdny text, jeden prvok, záporné čísla… Práve na nich programy často padajú.',
  },
  {
    id: 3,
    otazka: 'Kedy sa hodí vzor Frequency Counter?',
    moznosti: [
      'Keď porovnávam, či dve veci majú rovnaké prvky v rovnakom počte.',
      'Keď potrebujem pole zotriediť.',
      'Keď hľadám najväčšie číslo.',
      'Len keď pracujem s textom.',
    ],
    spravna: 'a',
    napoveda: 'Frequency = početnosť, koľkokrát sa niečo vyskytuje.',
    vysvetlenie: 'Frequency Counter si do objektu spočíta výskyty. Typicky pri anagramoch, rovnakých čísliciach či porovnaní dvoch polí.',
  },
  {
    id: 4,
    otazka: 'Riešenie s cyklom v cykle je O(n²). Aké je riešenie s Frequency Counter (dva cykly ZA SEBOU)?',
    moznosti: ['O(1)', 'O(n)', 'O(n²)', 'O(n³)'],
    spravna: 'b',
    napoveda: 'n + n = 2n. Konštanty v Big O zahadzujeme.',
    vysvetlenie: 'Dva cykly za sebou je n + n = 2n krokov, čo je O(n). Cyklus V cykle je n × n = O(n²).',
  },
  {
    id: 5,
    otazka: 'Aká podmienka musí platiť, aby fungoval sumZero s pointermi z oboch koncov?',
    moznosti: ['Pole musí byť zotriedené.', 'Pole musí mať párny počet prvkov.', 'V poli nesmú byť záporné čísla.', 'Pole musí obsahovať nulu.'],
    spravna: 'a',
    napoveda: 'Prečo vieme, že posunom right doľava sa súčet zmenší?',
    vysvetlenie: 'Len v zotriedenom poli platí, že vľavo sú menšie a vpravo väčšie čísla. Iba vďaka tomu vieme, ktorým smerom pointer posunúť.',
  },
  {
    id: 6,
    otazka: 'V sumZero je súčet arr[left] + arr[right] MENŠÍ ako 0. Čo urobíš?',
    moznosti: ['right--', 'left++', 'Vrátim undefined.', 'Začnem odznova.'],
    spravna: 'b',
    napoveda: 'Súčet treba zväčšiť. Kde sú väčšie čísla?',
    vysvetlenie: 'Súčet je moc malý, treba ho zväčšiť. Väčšie čísla sú vpravo, preto posunieme left doprava (left++).',
  },
  {
    id: 7,
    otazka: 'Prečo je v sumZero podmienka while (left < right) a nie left <= right?',
    moznosti: [
      'Lebo <= v JavaScripte neexistuje.',
      'Aby prvok netvoril dvojicu sám so sebou.',
      'Aby to bolo rýchlejšie.',
      'Nemá to žiadny vplyv.',
    ],
    spravna: 'b',
    napoveda: 'Čo by znamenalo left === right?',
    vysvetlenie: 'Keby left === right, sčítali by sme ten istý prvok dvakrát. Napríklad 0 + 0 = 0 by vrátilo nezmyselnú dvojicu [0, 0].',
  },
  {
    id: 8,
    otazka: 'Je "aec" podpostupnosť slova "abcde"?',
    moznosti: [
      'Áno, všetky písmená tam sú.',
      'Nie, lebo písmená nie sú v rovnakom poradí.',
      'Nie, lebo písmená nie sú hneď vedľa seba.',
      'Áno, lebo má menej písmen.',
    ],
    spravna: 'b',
    napoveda: 'Pri podpostupnosti nemusia byť písmená vedľa seba, ale poradie musí sedieť.',
    vysvetlenie: 'V "abcde" je c pred e, ale v "aec" je e pred c. Poradie nesedí, takže to nie je podpostupnosť. "ace" by bola.',
  },
  {
    id: 9,
    otazka: 'Aká je najrýchlejšia prvá kontrola, či sú dve slová anagramy?',
    moznosti: ['Porovnať ich prvé písmená.', 'Porovnať ich dĺžky.', 'Zotriediť ich.', 'Spočítať samohlásky.'],
    spravna: 'b',
    napoveda: 'Môžu byť anagramom slová s rôznym počtom písmen?',
    vysvetlenie: 'Anagramy musia mať rovnaký počet písmen. Ak sa dĺžky líšia, hneď vrátime false a nič nepočítame.',
  },
  {
    id: 10,
    otazka: 'countUniqueValues vráti i + 1. Prečo +1?',
    moznosti: [
      'Lebo i je index posledného unikátneho čísla a indexy začínajú od 0.',
      'Lebo prvé číslo sa nepočíta.',
      'Je to chyba, malo by byť len i.',
      'Lebo pole má vždy aspoň dva prvky.',
    ],
    spravna: 'a',
    napoveda: 'Keď sú unikáty na indexoch 0, 1, 2, koľko ich je?',
    vysvetlenie: 'i ukazuje na posledné unikátne číslo. Ak sú unikáty na indexoch 0 až 2, i je 2, ale počet je 3.',
  },
];

const coVypise = [
  {
    id: 1,
    otazka: 'Čo vypíše tento kód?',
    kod: "const c = {};\nfor (const ch of 'aba') {\n  c[ch] = (c[ch] || 0) + 1;\n}\nconsole.log(c);",
    moznosti: ['{ a: 2, b: 1 }', '{ a: 1, b: 1 }', "[ 'a', 'b', 'a' ]", '{ a: 1, b: 2 }'],
    spravna: 'a',
    napoveda: 'Koľkokrát je v slove "aba" písmeno a a koľkokrát b?',
    vysvetlenie: 'Je to počítadlo: a je v slove dvakrát, b raz → { a: 2, b: 1 }.',
  },
  {
    id: 2,
    otazka: 'Čo vypíše tento kód?',
    kod: "let left = 0;\nlet right = 4;\nlet kroky = 0;\nwhile (left < right) {\n  left++;\n  right--;\n  kroky++;\n}\nconsole.log(kroky);",
    moznosti: ['4', '2', '3', '0'],
    spravna: 'b',
    napoveda: 'Zapíš si left a right po každom kroku: 0/4, 1/3, …',
    vysvetlenie: 'Po 1. kroku left 1, right 3. Po 2. kroku left 2, right 2. Podmienka 2 < 2 neplatí, cyklus končí. Kroky: 2.',
  },
  {
    id: 3,
    otazka: 'Čo vypíše tento kód?',
    kod: "const arr = [1, 2, 3, 4];\nconst left = 0;\nconst right = arr.length - 1;\nconsole.log(arr[left] + arr[right]);",
    moznosti: ['4', '5', '7', 'NaN'],
    spravna: 'b',
    napoveda: 'right je 3. Čo je arr[0] a arr[3]?',
    vysvetlenie: 'arr[0] je 1, arr[3] je 4. Súčet 1 + 4 = 5.',
  },
  {
    id: 4,
    otazka: 'Čo vypíše tento kód?',
    kod: "const s = String(120);\nconsole.log(s[0], s.length);",
    moznosti: ['1 3', '120 3', '1 120', 'undefined 3'],
    spravna: 'a',
    napoveda: 'String(120) je text "120". Čo je jeho prvý znak a koľko má znakov?',
    vysvetlenie: 'String(120) je "120". Prvý znak s[0] je "1" a dĺžka je 3. console.log s dvoma hodnotami ich vypíše oddelené medzerou.',
  },
  {
    id: 5,
    otazka: 'Čo vypíše tento kód?',
    kod: "console.log((1 + 3) / 2, 1 + 3 / 2);",
    moznosti: ['2 2', '2 2.5', '2.5 2', '2.5 2.5'],
    spravna: 'b',
    napoveda: 'Delenie má prednosť pred sčítaním, ak nie sú zátvorky.',
    vysvetlenie: '(1 + 3) / 2 = 4 / 2 = 2. Ale 1 + 3 / 2 = 1 + 1.5 = 2.5. Preto pri priemere vždy daj zátvorky.',
  },
  {
    id: 6,
    otazka: 'Čo vypíše tento kód?',
    kod: "const a = 'ac';\nconst b = 'abc';\nlet i = 0;\nfor (const ch of b) {\n  if (ch === a[i]) i++;\n}\nconsole.log(i);",
    moznosti: ['1', '2', '3', '0'],
    spravna: 'b',
    napoveda: 'Hľadáme najprv a, potom c. Prejdi písmená a, b, c.',
    vysvetlenie: 'a === a[0] → i = 1. b !== a[1] ("c"). c === a[1] → i = 2. Výsledok 2 = našli sme celé "ac".',
  },
  {
    id: 7,
    otazka: 'Čo vypíše tento kód?',
    kod: "const c = { a: 1 };\nc.a = c.a - 1;\nconsole.log(c.a ? 'áno' : 'nie');",
    moznosti: ['áno', 'nie', '0', 'undefined'],
    spravna: 'b',
    napoveda: 'Koľko je v c.a po odčítaní? A je to pravda, či nepravda?',
    vysvetlenie: 'c.a je 1 - 1 = 0. 0 je falsy, takže sa vypíše nie. Presne takto anagram zistí, že kartička „došla“.',
  },
  {
    id: 8,
    otazka: 'Čo vypíše tento kód?',
    kod: "let n = 0;\nfor (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n    n++;\n  }\n}\nconsole.log(n);",
    moznosti: ['3', '6', '9', '0'],
    spravna: 'c',
    napoveda: 'Vnútorný cyklus prebehne celý pre každé i.',
    vysvetlenie: 'Pre každé z 3 hodnôt i prebehnú 3 hodnoty j: 3 × 3 = 9. To je O(n²).',
  },
  {
    id: 9,
    otazka: 'Čo vypíše tento kód?',
    kod: "const arr = [1, 1, 2];\nlet i = 0;\nfor (let j = 1; j < arr.length; j++) {\n  if (arr[i] !== arr[j]) {\n    i++;\n    arr[i] = arr[j];\n  }\n}\nconsole.log(i + 1);",
    moznosti: ['1', '2', '3', '0'],
    spravna: 'b',
    napoveda: 'Koľko rôznych čísel je v [1, 1, 2]?',
    vysvetlenie: 'j = 1: arr[0] === arr[1], nič. j = 2: 1 !== 2 → i = 1. Výsledok i + 1 = 2 unikátne čísla.',
  },
  {
    id: 10,
    otazka: 'Čo vypíše tento kód? (dva riadky)',
    kod: "const c = { a: 1 };\nconsole.log('a' in c);\nconsole.log(c.z);",
    moznosti: ['true\nundefined', 'true\nnull', 'false\nundefined', '1\nundefined'],
    spravna: 'a',
    napoveda: 'in sa pýta, či kľúč existuje. Čo dostaneš z neexistujúceho kľúča?',
    vysvetlenie: '"a" je kľúč objektu → true. Kľúč z neexistuje → undefined.',
  },
];

const debug = [
  {
    id: 1,
    nazov: 'charCount – počet každého písmena',
    napovedy: [
      'Vo výsledku je navyše kľúč undefined. Odkiaľ sa tam vzal?',
      'Cyklus ide až po i <= str.length. Existuje str[str.length]?',
      'Zmeň i <= str.length na i < str.length.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.charCount('aab'), { a: 2, b: 1 }, "charCount('aab')");
      rovne(m.charCount(''), {}, "charCount('')");
    },
  },
  {
    id: 2,
    nazov: 'isAnagram – sú slová anagramy?',
    napovedy: [
      "Skús isAnagram('ab', 'abc'). Majú slová rovnakú dĺžku?",
      'Keď majú slová rôznu dĺžku, nemôžu byť anagramy. Čo má funkcia vtedy vrátiť?',
      'V prvom riadku zmeň return true na return false.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isAnagram('listen', 'silent'), true, "isAnagram('listen', 'silent')");
      rovne(m.isAnagram('ab', 'abc'), false, "isAnagram('ab', 'abc')");
      rovne(m.isAnagram('aab', 'abb'), false, "isAnagram('aab', 'abb')");
    },
  },
  {
    id: 3,
    nazov: 'same – je druhé pole druhými mocninami prvého?',
    napovedy: [
      'Druhá mocnina čísla 3 je 9. Čo počíta funkcia pre 3?',
      'x * 2 je dvojnásobok, nie druhá mocnina.',
      'Zmeň x * 2 na x * x.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.same([1, 2, 3], [1, 4, 9]), true, 'same([1, 2, 3], [1, 4, 9])');
      rovne(m.same([1, 2, 3], [9, 1, 4]), true, 'same([1, 2, 3], [9, 1, 4])');
      rovne(m.same([1, 2], [1, 4, 4]), false, 'same([1, 2], [1, 4, 4])');
    },
  },
  {
    id: 4,
    nazov: 'sameFrequency – majú čísla rovnaké číslice?',
    napovedy: [
      'Skús sameFrequency(1234, 123). Funguje kontrola dĺžky?',
      'Porovnávaš a.length s a.length – to je vždy rovnaké.',
      'Zmeň a.length !== a.length na a.length !== b.length.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sameFrequency(182, 281), true, 'sameFrequency(182, 281)');
      rovne(m.sameFrequency(1234, 123), false, 'sameFrequency(1234, 123)');
      rovne(m.sameFrequency(22, 222), false, 'sameFrequency(22, 222)');
    },
  },
  {
    id: 5,
    nazov: 'sumZero – prvá dvojica so súčtom 0',
    napovedy: [
      'Pre [-2, 0, 1] to vráti [0, 0]. Ale 0 je v poli len raz!',
      'Keď left === right, sčíta sa ten istý prvok sám so sebou.',
      'Zmeň while (left <= right) na while (left < right).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sumZero([-3, -2, -1, 0, 1, 2, 3]), [-3, 3], 'sumZero([-3, -2, -1, 0, 1, 2, 3])');
      rovne(m.sumZero([-2, 0, 1]), undefined, 'sumZero([-2, 0, 1])');
      rovne(m.sumZero([]), undefined, 'sumZero([])');
    },
  },
  {
    id: 6,
    nazov: 'countUniqueValues – počet rôznych čísel',
    napovedy: [
      'Pre [1, 1, 2, 3, 3] vráti 2 namiesto 3. Výsledok je vždy o 1 menší.',
      'i je INDEX posledného unikátneho čísla. Indexy začínajú od 0.',
      'Zmeň return i; na return i + 1;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countUniqueValues([1, 1, 2, 3, 3]), 3, 'countUniqueValues([1, 1, 2, 3, 3])');
      rovne(m.countUniqueValues([7]), 1, 'countUniqueValues([7])');
      rovne(m.countUniqueValues([]), 0, 'countUniqueValues([])');
    },
  },
  {
    id: 7,
    nazov: 'averagePair – je dvojica s daným priemerom?',
    napovedy: [
      'Keď je priemer moc malý, treba ho zväčšiť. Ktorý pointer to urobí?',
      'Väčšie čísla sú vpravo. Ak je priemer malý, posuň left doprava; ak je veľký, right doľava.',
      'Vymeň right-- a left++ (keď avg < target → left++, inak → right--).',
    ],
    testy: (m, { rovne }) => {
      rovne(m.averagePair([1, 2, 3], 2.5), true, 'averagePair([1, 2, 3], 2.5)');
      rovne(m.averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8), true, 'averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)');
      rovne(m.averagePair([-1, 0, 3, 4, 5, 6], 4.1), false, 'averagePair([-1, 0, 3, 4, 5, 6], 4.1)');
      rovne(m.averagePair([], 4), false, 'averagePair([], 4)');
    },
  },
  {
    id: 8,
    nazov: 'isSubsequence – sú písmená a v b v rovnakom poradí?',
    napovedy: [
      'i počíta, koľko písmen zo slova a sme našli. Kedy sme hotoví?',
      'Hotoví sme, keď sme našli všetky písmená slova a, nie b.',
      'Zmeň return i === b.length na return i === a.length.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isSubsequence('abc', 'abracadabra'), true, "isSubsequence('abc', 'abracadabra')");
      rovne(m.isSubsequence('hello', 'hello world'), true, "isSubsequence('hello', 'hello world')");
      rovne(m.isSubsequence('abc', 'acb'), false, "isSubsequence('abc', 'acb')");
    },
  },
  {
    id: 9,
    nazov: 'areThereDuplicates – je niektorá hodnota viackrát?',
    napovedy: [
      'Skús areThereDuplicates(1, 2, 3). Sú tam duplikáty? Čo funkcia vráti?',
      'Ak cyklus dobehne do konca, žiadny duplikát sme nenašli.',
      'Posledný riadok zmeň na return false;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.areThereDuplicates(1, 2, 3), false, 'areThereDuplicates(1, 2, 3)');
      rovne(m.areThereDuplicates(1, 2, 2), true, 'areThereDuplicates(1, 2, 2)');
      rovne(m.areThereDuplicates('a', 'b', 'c', 'a'), true, "areThereDuplicates('a', 'b', 'c', 'a')");
    },
  },
  {
    id: 10,
    nazov: 'firstRepeatedChar – prvé písmeno, ktoré sa zopakuje',
    napovedy: [
      'Funkcia nikdy nenájde opakovanie. Čo si ukladá do seen?',
      'if (seen[ch]) sa pýta „videl som už ch?“. Keď tam uložíš false, odpoveď je stále nie.',
      'Zmeň seen[ch] = false na seen[ch] = true.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.firstRepeatedChar('abca'), 'a', "firstRepeatedChar('abca')");
      rovne(m.firstRepeatedChar('abcbd'), 'b', "firstRepeatedChar('abcbd')");
      rovne(m.firstRepeatedChar('abc'), null, "firstRepeatedChar('abc')");
    },
  },
];

const doplnenie = [
  {
    id: 1,
    nazov: 'tallyChars – počítadlo písmen',
    napovedy: ['Ak šuplík ešte neexistuje, od akého čísla začneme?', 'undefined || 0 dá 0.', 'Nahraď ___ číslom 0.'],
    testy: (m, { rovne }) => {
      rovne(m.tallyChars('hello'), { h: 1, e: 1, l: 2, o: 1 }, "tallyChars('hello')");
    },
  },
  {
    id: 2,
    nazov: 'validAnagram – kontrola dĺžky',
    napovedy: ['Čo platí, keď majú slová rôzne dĺžky?', 'Nemôžu byť anagramy.', 'Nahraď ___ slovom false.'],
    testy: (m, { rovne }) => {
      rovne(m.validAnagram('ab', 'abc'), false, "validAnagram('ab', 'abc')");
      rovne(m.validAnagram('rat', 'tar'), true, "validAnagram('rat', 'tar')");
    },
  },
  {
    id: 3,
    nazov: 'canBuild – dá sa slovo poskladať z písmen?',
    napovedy: ['Keď písmeno použiješ, o koľko ubudne kartičiek?', 'Jedno písmeno = jedna kartička.', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.canBuild('aab', 'abab'), true, "canBuild('aab', 'abab')");
      rovne(m.canBuild('aa', 'ab'), false, "canBuild('aa', 'ab')");
    },
  },
  {
    id: 4,
    nazov: 'zeroPair – right na poslednom indexe',
    napovedy: ['Kde má začínať pravý pointer?', 'Na poslednom indexe: dĺžka mínus…', 'Nahraď ___ číslom 1.'],
    testy: (m, { rovne }) => {
      rovne(m.zeroPair([-3, -1, 0, 2, 3]), [-3, 3], 'zeroPair([-3, -1, 0, 2, 3])');
      rovne(m.zeroPair([1, 2]), undefined, 'zeroPair([1, 2])');
    },
  },
  {
    id: 5,
    nazov: 'pairSum – vráť nájdenú dvojicu',
    napovedy: ['Dvojica je prvok na left a prvok na…?', 'Druhý pointer sa volá right.', 'Nahraď ___ slovom right.'],
    testy: (m, { rovne }) => {
      rovne(m.pairSum([1, 2, 4, 7], 9), [2, 7], 'pairSum([1, 2, 4, 7], 9)');
      rovne(m.pairSum([1, 2], 10), undefined, 'pairSum([1, 2], 10)');
    },
  },
  {
    id: 6,
    nazov: 'uniqueCount – zapíš nové unikátne číslo',
    napovedy: ['Nové unikátne číslo našiel prieskumník. Ako sa volá jeho index?', 'Prieskumník v cykle je j.', 'Nahraď ___ písmenom j.'],
    testy: (m, { rovne }) => {
      rovne(m.uniqueCount([1, 2, 2, 5, 7, 7, 99]), 5, 'uniqueCount([1, 2, 2, 5, 7, 7, 99])');
      rovne(m.uniqueCount([]), 0, 'uniqueCount([])');
    },
  },
  {
    id: 7,
    nazov: 'subsequence – našli sme všetky písmená?',
    napovedy: ['i počíta nájdené písmená z hľadaného slova. Ktoré to je?', 'Hľadané (kratšie) slovo je a.', 'Nahraď ___ písmenom a.'],
    testy: (m, { rovne }) => {
      rovne(m.subsequence('sing', 'sting'), true, "subsequence('sing', 'sting')");
      rovne(m.subsequence('abc', 'acb'), false, "subsequence('abc', 'acb')");
    },
  },
  {
    id: 8,
    nazov: 'digitsMatch – číslo na text',
    napovedy: ['Ktoré číslo meníme na text a?', 'b je String(n2), a je String(…).', 'Nahraď ___ textom n1.'],
    testy: (m, { rovne }) => {
      rovne(m.digitsMatch(3589, 5879), false, 'digitsMatch(3589, 5879)');
      rovne(m.digitsMatch(3589, 5983), true, 'digitsMatch(3589, 5983)');
    },
  },
  {
    id: 9,
    nazov: 'maxFrequency – najväčší počet výskytov',
    napovedy: ['Potrebujeme prejsť POČTY, nie kľúče. Ktorá funkcia Object.… ich vráti?', 'keys = kľúče, values = hodnoty.', 'Nahraď ___ slovom values.'],
    testy: (m, { rovne }) => {
      rovne(m.maxFrequency(['a', 'b', 'a', 'a']), 3, "maxFrequency(['a', 'b', 'a', 'a'])");
      rovne(m.maxFrequency([]), 0, 'maxFrequency([])');
    },
  },
  {
    id: 10,
    nazov: 'avgPair – priemer a posun pointera (dve ___)',
    napovedy: [
      'Prvé ___: priemer dvoch čísel je súčet delený… Druhé ___: priemer je malý, ktorý pointer posunieš doprava?',
      'Priemer dvoch čísel = súčet / 2. Väčšie čísla sú vpravo.',
      'Prvé ___ nahraď 2, druhé ___ nahraď left.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.avgPair([1, 2, 3], 2.5), true, 'avgPair([1, 2, 3], 2.5)');
      rovne(m.avgPair([1, 2, 3], 9), false, 'avgPair([1, 2, 3], 9)');
    },
  },
];

const prakticke = [
  {
    id: 1,
    nazov: 'countChar – koľkokrát je písmeno v texte',
    napovedy: [
      'Prejdi text cyklom for...of a počítaj zhody.',
      'let pocet = 0; for (const c of str) { if (c === ch) pocet++; }',
      'let pocet = 0; for (const c of str) { if (c === ch) pocet++; } return pocet;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.countChar('banana', 'a'), 3, "countChar('banana', 'a')");
      rovne(m.countChar('abc', 'z'), 0, "countChar('abc', 'z')");
    },
  },
  {
    id: 2,
    nazov: 'charFrequency – objekt s počtami písmen',
    napovedy: [
      'Vzor počítadlo z teórie, časť 3.',
      'const c = {}; for (const ch of str) c[ch] = (c[ch] || 0) + 1;',
      'const c = {}; for (const ch of str) { c[ch] = (c[ch] || 0) + 1; } return c;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.charFrequency('aab'), { a: 2, b: 1 }, "charFrequency('aab')");
      rovne(m.charFrequency(''), {}, "charFrequency('')");
    },
  },
  {
    id: 3,
    nazov: 'isPermutation – anagram',
    napovedy: [
      'Kroky: 1) porovnaj dĺžky, 2) spočítaj písmená prvého slova, 3) odškrtávaj písmená druhého.',
      'Pri odškrtávaní: if (!c[ch]) return false; c[ch] = c[ch] - 1;',
      'Celé riešenie je v teórii v časti 3 – funkcia isAnagram.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isPermutation('anagram', 'nagaram'), true, "isPermutation('anagram', 'nagaram')");
      rovne(m.isPermutation('rat', 'car'), false, "isPermutation('rat', 'car')");
      rovne(m.isPermutation('', ''), true, "isPermutation('', '')");
      rovne(m.isPermutation('aaz', 'zza'), false, "isPermutation('aaz', 'zza')");
    },
  },
  {
    id: 4,
    nazov: 'sameSquared – druhé mocniny s rovnakou početnosťou',
    napovedy: [
      'Ako anagram: spočítaj x * x pre prvé pole, potom odškrtávaj prvky druhého poľa.',
      'Nezabudni na kontrolu dĺžok. Kľúč šuplíka je x * x.',
      'if (a.length !== b.length) return false; const c = {}; for (const x of a) c[x * x] = (c[x * x] || 0) + 1; for (const y of b) { if (!c[y]) return false; c[y]--; } return true;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.sameSquared([1, 2, 3], [4, 1, 9]), true, 'sameSquared([1, 2, 3], [4, 1, 9])');
      rovne(m.sameSquared([1, 2, 3], [1, 9]), false, 'sameSquared([1, 2, 3], [1, 9])');
      rovne(m.sameSquared([1, 2, 1], [4, 4, 1]), false, 'sameSquared([1, 2, 1], [4, 4, 1])');
    },
  },
  {
    id: 5,
    nazov: 'hasDuplicates – je v poli nejaká hodnota viackrát?',
    napovedy: [
      'Pamätaj si, čo si už videl, v objekte seen.',
      'Ak seen[x] už je true, našiel si duplikát. Inak ulož seen[x] = true.',
      'const seen = {}; for (const x of arr) { if (seen[x]) return true; seen[x] = true; } return false;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.hasDuplicates([1, 2, 3]), false, 'hasDuplicates([1, 2, 3])');
      rovne(m.hasDuplicates([1, 2, 1]), true, 'hasDuplicates([1, 2, 1])');
      rovne(m.hasDuplicates([]), false, 'hasDuplicates([])');
    },
  },
  {
    id: 6,
    nazov: 'pairToZero – dvojica so súčtom 0 (pointery)',
    napovedy: [
      'left = 0, right = arr.length - 1, cyklus while (left < right).',
      'Súčet 0 → vráť dvojicu. Súčet > 0 → right--. Inak left++.',
      'Celé riešenie je v teórii v časti 5A – funkcia sumZero.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.pairToZero([-4, -3, -2, -1, 0, 1, 2, 5]), [-2, 2], 'pairToZero([-4, -3, -2, -1, 0, 1, 2, 5])');
      rovne(m.pairToZero([-2, 0, 1, 3]), undefined, 'pairToZero([-2, 0, 1, 3])');
      rovne(m.pairToZero([1, 2, 3]), undefined, 'pairToZero([1, 2, 3])');
    },
  },
  {
    id: 7,
    nazov: 'howManyUnique – počet rôznych čísel v zotriedenom poli',
    napovedy: [
      'Najjednoduchšie: počítaj, koľkokrát sa číslo LÍŠI od predchádzajúceho.',
      'Prázdne pole → 0. Inak začni s pocet = 1 a pre i od 1: ak arr[i] !== arr[i - 1], pocet++.',
      'if (arr.length === 0) return 0; let pocet = 1; for (let i = 1; i < arr.length; i++) { if (arr[i] !== arr[i - 1]) pocet++; } return pocet;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.howManyUnique([1, 1, 1, 1, 2]), 2, 'howManyUnique([1, 1, 1, 1, 2])');
      rovne(m.howManyUnique([-2, -1, -1, 0, 1]), 4, 'howManyUnique([-2, -1, -1, 0, 1])');
      rovne(m.howManyUnique([]), 0, 'howManyUnique([])');
    },
  },
  {
    id: 8,
    nazov: 'isSubseq – podpostupnosť',
    napovedy: [
      'Pointer i ukazuje na písmeno, ktoré v slove a práve hľadáš.',
      'Prechádzaj b; keď ch === a[i], posuň i. Na konci porovnaj i s a.length.',
      'Celé riešenie je v teórii v časti 5C.',
    ],
    testy: (m, { rovne }) => {
      rovne(m.isSubseq('ace', 'abcde'), true, "isSubseq('ace', 'abcde')");
      rovne(m.isSubseq('aec', 'abcde'), false, "isSubseq('aec', 'abcde')");
      rovne(m.isSubseq('', 'abc'), true, "isSubseq('', 'abc')");
    },
  },
  {
    id: 9,
    nazov: 'pairAverage – existuje dvojica s daným priemerom?',
    napovedy: [
      'Rovnaké ako sumZero, len namiesto súčtu porovnávaš priemer s target.',
      'const avg = (arr[left] + arr[right]) / 2; ak avg === target → true; avg < target → left++; inak right--.',
      'let left = 0, right = arr.length - 1; while (left < right) { const avg = (arr[left] + arr[right]) / 2; if (avg === target) return true; if (avg < target) left++; else right--; } return false;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.pairAverage([1, 2, 3], 2.5), true, 'pairAverage([1, 2, 3], 2.5)');
      rovne(m.pairAverage([-1, 0, 3, 4, 5, 6], 4.1), false, 'pairAverage([-1, 0, 3, 4, 5, 6], 4.1)');
      rovne(m.pairAverage([], 4), false, 'pairAverage([], 4)');
    },
  },
  {
    id: 10,
    nazov: 'commonElements – prvky, ktoré sú v oboch poliach',
    napovedy: [
      'Daj si prvky druhého poľa do objektu (vB[x] = true). Potom prejdi prvé pole.',
      'Aby sa prvok nezopakoval, pamätaj si v ďalšom objekte, čo už je vo výsledku.',
      'const vB = {}; for (const x of b) vB[x] = true; const pridane = {}; const v = []; for (const x of a) { if (vB[x] && !pridane[x]) { v.push(x); pridane[x] = true; } } return v;',
    ],
    testy: (m, { rovne }) => {
      rovne(m.commonElements([1, 2, 3, 4], [4, 2, 9]), [2, 4], 'commonElements([1, 2, 3, 4], [4, 2, 9])');
      rovne(m.commonElements([1, 1, 2], [1]), [1], 'commonElements([1, 1, 2], [1])');
      rovne(m.commonElements([1], []), [], 'commonElements([1], [])');
    },
  },
];

module.exports = { teoria, coVypise, debug, doplnenie, prakticke };
