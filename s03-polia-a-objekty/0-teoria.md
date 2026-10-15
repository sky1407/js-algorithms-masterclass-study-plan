# s03 – Polia a objekty (Udemy sekcia 3)

Prečítaj si to pokojne celé. Všetko, čo tu je, budeš potrebovať v úlohách.
Kúsky kódu si môžeš hneď skúsiť: vytvor si súbor `skuska.js`, vlož kód a spusti `node skuska.js`.

---

## 1. Pole = rad očíslovaných šuplíkov

Predstav si skrinku so šuplíkmi. Každý šuplík má **číslo** a v ňom je jedna vec.

```js
const ovocie = ['jablko', 'hruška', 'slivka'];
//               šuplík 0   šuplík 1   šuplík 2
```

- Číslu šuplíka sa hovorí **index**.
- ⚠ Počítame **od nuly**! Prvý prvok je `ovocie[0]`, nie `ovocie[1]`.
- Koľko je šuplíkov, povie `ovocie.length` → `3`.
- Posledný prvok je preto `ovocie[ovocie.length - 1]` → `'slivka'`.
- Šuplík, ktorý neexistuje, je prázdny: `ovocie[3]` → `undefined` (nič).

```js
console.log(ovocie[0]);                  // jablko
console.log(ovocie.length);              // 3
console.log(ovocie[ovocie.length - 1]);  // slivka
console.log(ovocie[3]);                  // undefined
```

## 2. Pridávanie a odoberanie

| Príkaz | Čo robí | Kde | Rýchlosť |
|---|---|---|---|
| `arr.push(x)` | pridá `x` | na **koniec** | ⚡ rýchle |
| `arr.pop()` | vyberie a vráti posledný | z **konca** | ⚡ rýchle |
| `arr.unshift(x)` | pridá `x` | na **začiatok** | 🐢 pomalé |
| `arr.shift()` | vyberie a vráti prvý | zo **začiatku** | 🐢 pomalé |

**Prečo je začiatok pomalý?** Keď vložíš niečo do šuplíka 0, všetky ostatné veci sa musia
posunúť o jeden šuplík ďalej a dostať nové číslo. Pri 1 000 000 prvkoch je to 1 000 000 presunov.
Na konci sa nič neprečísluje, preto je `push`/`pop` rýchle.

```js
const a = [1, 2];
a.push(3);       // a je [1, 2, 3]
a.pop();         // vráti 3, a je [1, 2]
a.unshift(0);    // a je [0, 1, 2]
a.shift();       // vráti 0, a je [1, 2]
```

Zaujímavosť: `push` vráti **novú dĺžku** poľa, nie pole. `[1, 2].push(3)` vráti `3`.

## 3. Prechádzanie poľa cyklom

Dva spôsoby, ako prejsť všetky prvky:

```js
const cisla = [4, 7, 1];

for (let i = 0; i < cisla.length; i++) {   // i bude 0, 1, 2
  console.log(i, cisla[i]);                // index aj hodnota
}

for (const x of cisla) {                   // x bude 4, 7, 1
  console.log(x);                          // len hodnota
}
```

- `for (let i = 0; ...)` použi, keď potrebuješ **index** (číslo šuplíka).
- `for (const x of ...)` použi, keď ti stačí **hodnota**. Je jednoduchší.
- `for...of` funguje aj na texte: `for (const pismeno of 'mama')` → `m`, `a`, `m`, `a`.

**Vzor „súčet“** (budeš ho používať stále):

```js
let sucet = 0;            // začneme od nuly
for (const x of cisla) {
  sucet = sucet + x;      // každé číslo pripočítame (skrátene: sucet += x)
}
// sucet je 12
```

**Vzor „nové pole“** – zober prázdne pole a postupne doň `push`-uj:

```js
const parne = [];
for (const x of [1, 2, 3, 4]) {
  if (x % 2 === 0) parne.push(x);   // x % 2 je zvyšok po delení 2; 0 znamená párne
}
// parne je [2, 4]
```

## 4. Užitočné metódy polí

| Metóda | Príklad | Výsledok | Mení pôvodné pole? |
|---|---|---|---|
| `includes(x)` | `[1, 2, 3].includes(2)` | `true` | nie |
| `indexOf(x)` | `['a', 'b'].indexOf('b')` | `1` (alebo `-1`, ak nie je) | nie |
| `slice(od, do)` | `[1, 2, 3, 4].slice(1, 3)` | `[2, 3]` (koniec sa nepočíta) | **nie**, robí kópiu |
| `slice()` | `arr.slice()` | celá kópia poľa | nie |
| `reverse()` | `[1, 2, 3].reverse()` | `[3, 2, 1]` | **áno!** |
| `sort(...)` | `[10, 1, 2].sort((a, b) => a - b)` | `[1, 2, 10]` | **áno!** |
| `join(oddelovac)` | `['a', 'b'].join('-')` | `'a-b'` | nie |

⚠ **Pasca so `sort()`:** bez `(a, b) => a - b` triedi čísla ako **text**, teda podľa prvej číslice:
`[10, 1, 2].sort()` → `[1, 10, 2]`. Pri číslach preto vždy píš `sort((a, b) => a - b)`.

⚠ **Pasca s `reverse()` a `sort()`:** zmenia pôvodné pole. Ak ho nechceš pokaziť, urob najprv kópiu:
`arr.slice().reverse()`.

## 5. Objekt = krabica s menovkami

Pole má šuplíky s **číslami**. Objekt má šuplíky s **menami** (menovkami).

```js
const osoba = { meno: 'Eva', vek: 20 };
//              kľúč: hodnota
```

- Meno šuplíka je **kľúč** (`meno`, `vek`), vec v ňom je **hodnota** (`'Eva'`, `20`).
- Čítanie: `osoba.meno` → `'Eva'` alebo `osoba['meno']` → `'Eva'`.
- Zmena alebo pridanie: `osoba.vek = 21;`, `osoba.mesto = 'Bánovce';`
- Zmazanie: `delete osoba.mesto;`
- Neexistujúci kľúč: `osoba.vyska` → `undefined`.
- Je tam kľúč? `'vek' in osoba` → `true`.

⚠ **Bodka vs. hranaté zátvorky.** Keď je meno kľúča v **premennej**, musíš použiť zátvorky:

```js
const kluc = 'meno';
osoba[kluc];   // 'Eva'  ✅ pozrie sa do šuplíka, ktorého meno je v premennej kluc
osoba.kluc;    // undefined ❌ hľadá šuplík, ktorý sa doslova volá "kluc"
```

**Zoznamy z objektu:**

```js
Object.keys(osoba);     // ['meno', 'vek']          – kľúče
Object.values(osoba);   // ['Eva', 20]              – hodnoty
Object.entries(osoba);  // [['meno', 'Eva'], ['vek', 20]] – dvojice
```

Prechádzanie objektu: `for (const kluc of Object.keys(osoba)) { ... osoba[kluc] ... }`

## 6. Pravda a nepravda (truthy / falsy)

V `if (...)` sa každá hodnota berie ako „áno“ alebo „nie“.
Ako **„nie“ (falsy)** sa berie len týchto 6 hodnôt:

```
false   0   ''   undefined   null   NaN
```

Všetko ostatné je „áno“ (aj `'0'`, `[]`, `{}` či `-5`).

Preto `if (counts[slovo])` je zradné: keď je v šuplíku `0`, `if` povie „nie“, hoci šuplík existuje.

## 7. Vzor „počítadlo“ (frequency counter)

Chceš zistiť, koľkokrát sa čo vyskytuje. Objekt bude tvoja tabuľka čiarok:

```js
const pocty = {};
for (const x of ['a', 'b', 'a']) {
  pocty[x] = (pocty[x] || 0) + 1;
}
// pocty je { a: 2, b: 1 }
```

`(pocty[x] || 0)` znamená: „zober hodnotu zo šuplíka, a ak tam nič nie je (`undefined`), zober 0“.
Bez toho by vyšlo `undefined + 1` → `NaN` (Not a Number, „nie je číslo“).

## 8. Text: pár vecí, ktoré sa zídu

```js
'Ahoj'.toLowerCase();       // 'ahoj'   – malé písmená
'a b c'.split(' ');         // ['a', 'b', 'c'] – rozdelí text podľa medzery
'mama'.length;              // 4
```

## 9. Rýchlosť – Big O jednoducho

Big O hovorí, **ako rastie práca, keď rastie počet prvkov `n`**.

- **O(1)** – vždy rovnako rýchlo, jedno či máš 10 alebo milión prvkov. (Otvoríš šuplík č. 5.)
- **O(n)** – práca rastie s počtom prvkov. Dvakrát viac prvkov = dvakrát viac práce. (Prezrieš všetky šuplíky.)
- **O(n log n)** – o niečo viac ako O(n). Typické pre triedenie.
- **O(n²)** – cyklus v cykle. Desaťkrát viac prvkov = stokrát viac práce.

**Objekty:**

| Operácia | Big O |
|---|---|
| prístup `obj[kluc]`, vloženie, zmazanie | O(1) |
| hľadanie, či niekde je nejaká **hodnota** | O(n) |
| `Object.keys` / `values` / `entries` | O(n) |

**Polia:**

| Operácia | Big O |
|---|---|
| prístup `arr[i]` | O(1) |
| `push`, `pop` | O(1) |
| `shift`, `unshift` | O(n) |
| hľadanie (`includes`, `indexOf`) | O(n) |
| `slice`, `map`, `filter`, cyklus cez všetko | O(n) |
| `sort` | O(n log n) |

Pomôcka: **jeden cyklus cez všetky prvky = O(n)**. Žiadny cyklus = O(1).

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – 10 otázok z tejto teórie (kvíz, odpovedáš písmenom).
2. `node 2-debug.js` – 10 funkcií, každá má **jednu** chybu. Oprav ju.
3. `node 3-doplnenie.js` – nahraď `___` správnou vecou.
4. `node 4-co-vypise.js` – 10 otázok „čo vypíše tento kód?“ (kvíz).
5. `node 5-prakticke.js` – napíš 10 malých funkcií sám.

Pri úlohách 2, 3 a 5:
- `node 2-debug.js 3` – spustí len úlohu 3,
- `node 2-debug.js 3 --napoveda 2` – ukáže 2. nápovedu (sú 3, posledná je skoro riešenie),
- `riesenie.js` – vzorové riešenia, pozri sa až keď to máš alebo si naozaj zaseknutý.

Pokrok vo všetkých témach: `node ../lib/over.js`
