# s07-09 – Rekurzia (Udemy sekcie 7, 8, 9)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Čo je rekurzia

**Rekurzia = funkcia, ktorá volá samu seba.**

Predstav si **matriošku** (ruskú bábiku). Otvoríš ju a vnútri je menšia matrioška. Otvoríš tú
a vnútri je ešte menšia… až nakoniec nájdeš **najmenšiu, ktorá sa už neotvára**. Tam končíš.

Každá rekurzívna funkcia má **dve nevyhnutné časti**:

1. **Base case (základný prípad)** – najmenšia matrioška. Podmienka, kedy funkcia **už nevolá samu seba**
   a rovno vráti výsledok.
2. **Rekurzívne volanie s MENŠÍM vstupom** – otvoríš matriošku a pracuješ s menšou.
   Vstup sa musí zmenšovať, aby si raz došiel k base case.

```js
function countDown(n) {
  if (n <= 0) {                 // 1. base case – stop
    console.log('Hotovo!');
    return;
  }
  console.log(n);
  countDown(n - 1);             // 2. volám samu seba s menším číslom
}
countDown(3);   // 3, 2, 1, Hotovo!
```

## 2. Funkcia, ktorá vracia výsledok

Súčet 1 + 2 + … + n:

```js
function sumRange(n) {
  if (n === 1) return 1;            // base case
  return n + sumRange(n - 1);       // n + súčet menších čísel
}
```

Ako to počíta `sumRange(3)`:

```
sumRange(3) = 3 + sumRange(2)
                  sumRange(2) = 2 + sumRange(1)
                                    sumRange(1) = 1        ← base case
                  sumRange(2) = 2 + 1 = 3
sumRange(3) = 3 + 3 = 6
```

Funkcia sa najprv „ponorí“ až na dno (base case) a potom sa výsledky **skladajú späť hore**.

**Faktoriál** `n! = n · (n-1) · … · 1`, napr. `4! = 24`. Dohoda: `0! = 1`.

```js
function factorial(n) {
  if (n <= 1) return 1;             // 0! a 1! sú 1 (nie 0! – inak by všetko vyšlo 0)
  return n * factorial(n - 1);
}
```

## 3. Call stack (zásobník volaní) – kôpka tanierov

Keď funkcia zavolá inú funkciu (alebo samu seba), JavaScript si to zapíše na **kôpku tanierov**.
Nový tanier ide **navrch**. Funkcia, ktorá je navrchu, musí **skončiť prvá** a až potom sa pokračuje
v tej pod ňou.

Preto tento kód vypíše **1, 2, 3** (nie 3, 2, 1):

```js
function f(n) {
  if (n <= 0) return;
  f(n - 1);          // najprv sa ponor
  console.log(n);    // vypíš až pri návrate
}
f(3);
```

Vo VS Code to krásne vidíš: daj breakpoint do funkcie, F5, a vľavo v paneli **Call Stack** vidíš kôpku.

## 4. Tri typické chyby

| Chyba | Čo sa stane |
|---|---|
| **chýba base case** (alebo sa k nemu nikdy nedôjde) | funkcia sa volá donekonečna → `RangeError: Maximum call stack size exceeded` (kôpka tanierov spadne – **stack overflow**) |
| **vstup sa nezmenšuje**, napr. `sumRange(n)` namiesto `sumRange(n - 1)` | to isté – stack overflow |
| **zabudnutý `return`** pri rekurzívnom volaní | výsledok sa zahodí, funkcia vráti `undefined` |

## 5. Pomocníci na texty a polia

```js
'ahoj'[0];              // 'a'      – prvé písmeno
'ahoj'.slice(1);        // 'hoj'    – všetko OKREM prvého
'abcd'.slice(1, -1);    // 'bc'     – bez prvého aj posledného (-1 = „od konca“)
'ahoj'.toUpperCase();   // 'AHOJ'

[1, 2, 3].slice(1);     // [2, 3]   – pole bez prvého prvku
[1].concat([2, 3]);     // [1, 2, 3] – spojí polia
[1].concat(2);          // [1, 2]

Array.isArray([1, 2]);  // true  – je to pole?
Array.isArray('a');     // false
typeof 'a';             // 'string'
typeof 5;               // 'number'
typeof { a: 1 };        // 'object'
```

Typický vzor **rekurzie na poli**: spracuj **prvý prvok** a na **zvyšok** zavolaj samu seba.

```js
function productOfArray(arr) {
  if (arr.length === 0) return 1;              // prázdny súčin je 1 (nie 0!)
  return arr[0] * productOfArray(arr.slice(1));
}
```

To isté na **texte** – otočenie slova:

```js
function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];   // otoč zvyšok a prvé písmeno daj na koniec
}
```

## 6. Fibonacci

Postupnosť 1, 1, 2, 3, 5, 8, 13… Každé číslo je **súčet dvoch predchádzajúcich**.

```js
function fib(n) {
  if (n <= 2) return 1;              // fib(1) = 1, fib(2) = 1
  return fib(n - 1) + fib(n - 2);
}
fib(6);  // 8
```

## 7. Helper method recursion (rekurzia s pomocníkom)

Niekedy chceš výsledky **zbierať do jedného poľa**. Vonkajšia funkcia si pole vytvorí a
vnútorná funkcia (pomocník) sa rekurzívne volá a pole plní:

```js
function collectOdds(arr) {
  const result = [];                    // spoločný „košík“
  function helper(zvysok) {
    if (zvysok.length === 0) return;    // base case
    if (zvysok[0] % 2 !== 0) result.push(zvysok[0]);
    helper(zvysok.slice(1));
  }
  helper(arr);
  return result;
}
collectOdds([1, 2, 3, 4, 5]);  // [1, 3, 5]
```

Prečo nie bez pomocníka? Keby si `const result = []` dal priamo do rekurzívnej funkcie,
pri každom volaní by vznikol **nový prázdny košík** a výsledky by sa stratili.

## 8. Vnorené polia a objekty

Rekurzia je ideálna na veci, ktoré majú **v sebe ďalšie veci rovnakého druhu**:

```js
function flatten(arr) {                         // [1, [2, [3]]] → [1, 2, 3]
  let result = [];
  for (const x of arr) {
    if (Array.isArray(x)) result = result.concat(flatten(x));  // pole → rozbaľ ho rekurzívne
    else result.push(x);                                        // obyčajný prvok
  }
  return result;
}
```

Objekt v objekte – sčítaj všetky párne čísla, nech sú akokoľvek hlboko:

```js
function nestedEvenSum(obj) {
  let sum = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object') sum += nestedEvenSum(v);   // vnorený objekt → rekurzia
    else if (typeof v === 'number' && v % 2 === 0) sum += v;
  }
  return sum;
}
```

## 9. Zhrnutie

- Vždy si najprv napíš **base case**.
- Pri každom volaní musí byť vstup **menší** (n - 1, slice(1), polovica…).
- Nezabudni na **return**.
- Keď si nevieš rady, nakresli si strom volaní ako v časti 2.

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá funkcia má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš funkcie sám. **Musia byť rekurzívne** (test to kontroluje).

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
