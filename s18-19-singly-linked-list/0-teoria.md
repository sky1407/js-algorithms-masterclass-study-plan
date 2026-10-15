# s18-19 – Triedy (class) a Singly Linked List (Udemy sekcie 18, 19)

Prečítaj si to celé. Kúsky kódu si môžeš skúsiť v súbore `skuska.js` (`node skuska.js`).

---

## 1. Trieda (class) = formička na koláčiky

**Trieda** je **šablóna** (formička). Podľa nej vyrobíš ľubovoľne veľa **objektov** (koláčikov).
Každému vyrobenému objektu sa hovorí **inštancia**.

```js
class Pes {
  constructor(meno, vek) {     // spustí sa pri vytvorení cez new
    this.meno = meno;          // this = práve vytváraný pes
    this.vek = vek;
  }

  stekaj() {                   // metóda = funkcia, ktorú má každý pes
    return this.meno + ' robí haf!';
  }

  narodeniny() {
    this.vek++;                // mení vek TOHTO psa
    return this;               // vráti samého seba (umožní reťazenie)
  }
}

const rex = new Pes('Rex', 3);   // new → vytvorí objekt a spustí constructor
const max = new Pes('Max', 5);
rex.stekaj();                    // 'Rex robí haf!'
rex.narodeniny().narodeniny();   // reťazenie vďaka return this
rex.vek;                         // 5
```

- `constructor` sa spustí **automaticky** pri `new`. Nastaví počiatočné vlastnosti.
- `this` = **ten konkrétny objekt**, na ktorom metódu voláš. V `rex.stekaj()` je `this` práve `rex`.
- ⚠ Vnútri metódy **vždy** píš `this.vek`, nie len `vek`. Bez `this` JavaScript hľadá
  obyčajnú premennú `vek`, ktorá neexistuje → `ReferenceError`.
- `static` metóda patrí triede, nie inštancii: `Pes.druh()` – používa sa zriedka.

## 2. Linked List = hľadanie pokladu

Pole je ako **rad očíslovaných šuplíkov** – do šuplíka 5 skočíš hneď.

**Linked list (spájaný zoznam)** je ako **hľadanie pokladu**: na každom mieste je **vec** a
**lístok, kde je ďalšie miesto**. K piatej veci sa dostaneš len tak, že prejdeš prvé štyri.

```
 head                              tail
  ↓                                 ↓
[ 1 | •]──→[ 2 | •]──→[ 3 | •]──→[ 4 | null]
  val next
```

### Uzol (Node)

```js
class Node {
  constructor(val) {
    this.val = val;     // hodnota
    this.next = null;   // odkaz na ďalší uzol (zatiaľ nikam)
  }
}
```

### Zoznam

```js
class SinglyLinkedList {
  constructor() {
    this.head = null;   // prvý uzol
    this.tail = null;   // posledný uzol
    this.length = 0;
  }
}
```

### Prechádzanie zoznamu

```js
let current = list.head;
while (current) {              // kým nie sme na konci (null)
  console.log(current.val);
  current = current.next;      // choď na ďalší lístok
}
```

## 3. Metódy

### push(val) – pridaj na koniec – O(1)

```js
push(val) {
  const node = new Node(val);
  if (!this.head) {            // prázdny zoznam
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;     // starý posledný ukáže na nový
    this.tail = node;          // nový je teraz posledný
  }
  this.length++;
  return this;
}
```

### pop() – odober z konca – O(n)

Nevieme ísť „dozadu“, takže musíme od začiatku nájsť **predposledný** uzol.

```js
pop() {
  if (!this.head) return undefined;
  let current = this.head;
  let newTail = current;
  while (current.next) {       // current dôjde na posledný, newTail je o krok za ním
    newTail = current;
    current = current.next;
  }
  this.tail = newTail;
  this.tail.next = null;       // odstrihni posledný
  this.length--;
  if (this.length === 0) {     // zoznam je prázdny
    this.head = null;
    this.tail = null;
  }
  return current;              // vrátime odobratý uzol
}
```

### shift() – odober zo začiatku – O(1)

```js
shift() {
  if (!this.head) return undefined;
  const oldHead = this.head;
  this.head = oldHead.next;    // nový začiatok je druhý uzol
  this.length--;
  if (this.length === 0) this.tail = null;
  return oldHead;
}
```

### unshift(val) – pridaj na začiatok – O(1)

```js
unshift(val) {
  const node = new Node(val);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;     // nový ukáže na doterajší prvý
    this.head = node;          // nový je teraz prvý
  }
  this.length++;
  return this;
}
```

### get(index) – uzol na pozícii – O(n)

```js
get(index) {
  if (index < 0 || index >= this.length) return null;
  let counter = 0;
  let current = this.head;
  while (counter !== index) {
    current = current.next;
    counter++;
  }
  return current;
}
```

### set(index, val) – zmeň hodnotu

```js
set(index, val) {
  const node = this.get(index);
  if (!node) return false;
  node.val = val;
  return true;
}
```

### insert(index, val) – vlož na pozíciu

```js
insert(index, val) {
  if (index < 0 || index > this.length) return false;
  if (index === 0) return !!this.unshift(val);
  if (index === this.length) return !!this.push(val);
  const node = new Node(val);
  const prev = this.get(index - 1);   // uzol PRED miestom vloženia
  node.next = prev.next;              // 1. nový ukáže na ten, čo bol za prev
  prev.next = node;                   // 2. prev ukáže na nový
  this.length++;
  return true;
}
```

⚠ **Poradie je dôležité!** Keby si najprv urobil `prev.next = node`, stratil by si odkaz
na zvyšok zoznamu a `node.next = prev.next` by ukázal sám na seba → zacyklený zoznam.

`!!x` premení hodnotu na `true`/`false`.

### remove(index) – odober z pozície

```js
remove(index) {
  if (index < 0 || index >= this.length) return undefined;
  if (index === 0) return this.shift();
  if (index === this.length - 1) return this.pop();
  const prev = this.get(index - 1);
  const removed = prev.next;
  prev.next = removed.next;           // preskoč odstraňovaný uzol
  this.length--;
  return removed;
}
```

### reverse() – otoč zoznam na mieste

```js
reverse() {
  let node = this.head;
  this.head = this.tail;
  this.tail = node;
  let prev = null;
  let next;
  for (let i = 0; i < this.length; i++) {
    next = node.next;       // 1. zapamätaj si ďalší
    node.next = prev;       // 2. otoč šípku dozadu
    prev = node;            // 3. posuň prev
    node = next;            // 4. posuň node
  }
  return this;
}
```

## 4. Linked list vs. pole

| Operácia | Linked list | Pole |
|---|---|---|
| vloženie na začiatok | **O(1)** | O(n) |
| vloženie na koniec | O(1) | O(1) |
| odobratie zo začiatku | **O(1)** | O(n) |
| odobratie z konca | O(n) | O(1) |
| prístup k i-temu prvku | **O(n)** | O(1) |
| hľadanie | O(n) | O(n) |

Linked list sa oplatí, keď často pridávaš/odoberáš **na začiatku** a nepotrebuješ skákať na index.

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá úloha má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš metódy sám.

Testy každej metódy si zoznam pripravia samy, takže môžeš robiť úlohy v ľubovoľnom poradí.

`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
