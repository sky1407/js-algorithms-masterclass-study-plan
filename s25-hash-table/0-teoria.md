# s25 – Hash Table (Udemy sekcia 25)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Čo je hash table

Hash table ukladá dvojice **kľúč → hodnota** a vie ich **veľmi rýchlo** (O(1)) nájsť.
V JavaScripte ju už poznáš: **objekt** `{}` a **Map** sú hash tabuľky.

Ako to funguje vo vnútri? Predstav si **šatňu v divadle**:
- Odovzdáš kabát a dostaneš **lístok s číslom** háčika.
- Keď prídeš späť, šatniarka nehľadá kabát po celej šatni – ide **priamo na háčik** podľa čísla.

Hash table má **pole háčikov** (buckets). **Hash funkcia** z kľúča (napr. `'pink'`) vypočíta
**číslo háčika** (index v poli).

## 2. Pomôcka: kód písmena

Každé písmeno má v počítači číslo:

```js
'a'.charCodeAt(0);        // 97
'b'.charCodeAt(0);        // 98
'a'.charCodeAt(0) - 96;   // 1   → a = 1, b = 2, c = 3, …
'ahoj'.charCodeAt(2);     // 111 – kód písmena 'o' (index 2)
17 % 5;                   // 2   – zvyšok po delení; výsledok je vždy 0 … 4
```

`% dlzka` je trik, ako akékoľvek veľké číslo „vtesnať“ do rozsahu indexov poľa `0 … dlzka - 1`.

## 3. Hash funkcia

Dobrá hash funkcia je:
- **rýchla**,
- **deterministická** – ten istý kľúč dá **vždy** ten istý index,
- **rovnomerná** – kľúče rozhádže po celom poli, nie všetky na jedno miesto.

Coltova verzia:

```js
function hash(key, arrayLen) {
  let total = 0;
  const PRIME = 31;                                   // prvočíslo → menej kolízií
  for (let i = 0; i < Math.min(key.length, 100); i++) {   // max 100 znakov (rýchlosť)
    const value = key.charCodeAt(i) - 96;
    total = (total * PRIME + value) % arrayLen;       // stále v rozsahu 0 … arrayLen-1
  }
  return total;
}
hash('pink', 10);   // vždy to isté číslo od 0 do 9
```

Prečo **prvočísla** (31, veľkosť poľa 53…)? Pri násobení a delení prvočíslami sa kľúče rozložia
rovnomernejšie a je menej kolízií.

## 4. Kolízie

**Kolízia** = dva rôzne kľúče dostanú **rovnaký index**. Nedá sa jej úplne vyhnúť
(kľúčov je nekonečne veľa, háčikov len niekoľko). Dve riešenia:

1. **Separate chaining** (reťazenie) – na jednom indexe je **pole dvojíc**:
   `keyMap[4] = [['pink', '#ff69b4'], ['cyan', '#00ffff']]`. Na jeden háčik zavesíš viac kabátov.
2. **Linear probing** – keď je miesto obsadené, hľadáš **najbližšie voľné**.
   Na každom indexe je teda najviac jedna dvojica.

Colt (a tieto úlohy) používa **separate chaining**.

## 5. HashTable – implementácia

```js
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);     // pole „háčikov“, na začiatku prázdne (undefined)
  }

  _hash(key) {                         // _ na začiatku = „vnútorná“ metóda
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      total = (total * PRIME + key.charCodeAt(i) - 96) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) this.keyMap[index] = [];     // prázdny háčik → vytvor zoznam
    for (const pair of this.keyMap[index]) {
      if (pair[0] === key) {           // kľúč už existuje → len zmeň hodnotu
        pair[1] = value;
        return;
      }
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.keyMap[index];
    if (bucket) {
      for (const pair of bucket) {
        if (pair[0] === key) return pair[1];   // pair = [kľúč, hodnota]
      }
    }
    return undefined;
  }

  keys() {
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;           // prázdny háčik preskoč
      for (const pair of bucket) result.push(pair[0]);
    }
    return result;
  }

  values() {                           // každú hodnotu len raz
    const result = [];
    for (const bucket of this.keyMap) {
      if (!bucket) continue;
      for (const pair of bucket) {
        if (!result.includes(pair[1])) result.push(pair[1]);
      }
    }
    return result;
  }
}
```

⚠ Pozor na `pair[0]` (kľúč) a `pair[1]` (hodnota) – ľahko sa pomýlia.

⚠ `for (const bucket of this.keyMap)` prejde aj prázdne miesta (`undefined`), preto `continue`.

## 6. Map a Set – hotové v JavaScripte

```js
const m = new Map();
m.set('jablko', 3);        // pridaj / zmeň
m.get('jablko');           // 3
m.get('hruška');           // undefined
m.has('jablko');           // true
m.delete('jablko');
m.size;                    // počet dvojíc

const s = new Set([1, 2, 2, 3]);   // Set = len UNIKÁTNE hodnoty
s.size;                    // 3
s.add(4);
s.has(2);                  // true
[...new Set('banana')];    // ['b', 'a', 'n'] – odstráni duplikáty
```

## 7. Rýchlosť

| Operácia | priemer | najhorší (všetko na jednom háčiku) |
|---|---|---|
| set (vloženie) | O(1) | O(n) |
| get (prístup) | O(1) | O(n) |
| delete | O(1) | O(n) |
| keys / values | O(n) | O(n) |

Hash table je ideálna, keď potrebuješ **rýchlo hľadať podľa kľúča** – počítadlá výskytov,
„videl som už toto?“, cache… (Spomeň si na Frequency Counter v s04-06 – to bola hash table!)

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá úloha má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš metódy a funkcie sám.

Testy s kolíziami používajú tabuľku veľkosti 1 – vtedy padnú **všetky** kľúče na jeden háčik.
Vzorové riešenia sú v `riesenie.js`.
