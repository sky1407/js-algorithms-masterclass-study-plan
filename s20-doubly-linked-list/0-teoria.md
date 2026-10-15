# s20 – Doubly Linked List (Udemy sekcia 20)

Prečítaj si to celé. Táto téma nadväzuje na **s18-19 (Singly Linked List)** – ak si ju ešte neprešiel, začni tam.

---

## 1. Čo je iné

V jednosmernom zozname má každý uzol len šípku **dopredu** (`next`).
V **obojsmernom** (doubly) zozname má aj šípku **dozadu** (`prev`).

```
null ←[ 1 ]⇄[ 2 ]⇄[ 3 ]→ null
       head        tail
```

Predstav si **vláčik**, kde z každého vagóna vidíš do predchádzajúceho aj do nasledujúceho.
Alebo **históriu v prehliadači**: tlačidlo *Späť* (prev) a *Dopredu* (next).

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;   // NOVÉ
  }
}
```

- `head.prev` je vždy `null` (pred prvým nič nie je).
- `tail.next` je vždy `null` (za posledným nič nie je).
- **Výhoda:** vieš ísť aj odzadu → `pop` je O(1), `get` môže začať od bližšieho konca.
- **Nevýhoda:** každý uzol potrebuje viac pamäte a pri každej zmene treba opraviť **obe** šípky.

## 2. Zlaté pravidlo

Keď meníš susedov, **vždy oprav obe strany**:
ak `A.next = B`, tak musí byť aj `B.prev = A`.

## 3. Metódy

### push(val) – na koniec, O(1)

```js
push(val) {
  const node = new Node(val);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;    // starý posledný → nový
    node.prev = this.tail;    // nový ← starý posledný
    this.tail = node;
  }
  this.length++;
  return this;
}
```

### pop() – z konca, O(1) (v jednosmernom to bolo O(n)!)

```js
pop() {
  if (!this.head) return undefined;
  const oldTail = this.tail;
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = oldTail.prev;   // predposledný poznáme hneď vďaka prev
    this.tail.next = null;
    oldTail.prev = null;        // odpoj starý tail úplne
  }
  this.length--;
  return oldTail;
}
```

### shift() – zo začiatku, O(1)

```js
shift() {
  if (!this.head) return undefined;
  const oldHead = this.head;
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = oldHead.next;
    this.head.prev = null;      // nový prvý nemá nikoho pred sebou
    oldHead.next = null;
  }
  this.length--;
  return oldHead;
}
```

### unshift(val) – na začiatok, O(1)

```js
unshift(val) {
  const node = new Node(val);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.head.prev = node;      // starý prvý ← nový
    node.next = this.head;      // nový → starý prvý
    this.head = node;
  }
  this.length++;
  return this;
}
```

### get(index) – od bližšieho konca

```js
get(index) {
  if (index < 0 || index >= this.length) return null;
  let current;
  if (index <= this.length / 2) {          // prvá polovica → od začiatku
    current = this.head;
    for (let i = 0; i < index; i++) current = current.next;
  } else {                                 // druhá polovica → od konca
    current = this.tail;
    for (let i = this.length - 1; i > index; i--) current = current.prev;
  }
  return current;
}
```

Stále je to **O(n)** (presnejšie n/2, ale konštanty v Big O zahadzujeme).

### set(index, val)

```js
set(index, val) {
  const node = this.get(index);
  if (!node) return false;
  node.val = val;
  return true;
}
```

### insert(index, val) – treba opraviť 4 šípky

```
before ⇄ after      →      before ⇄ node ⇄ after
```

```js
insert(index, val) {
  if (index < 0 || index > this.length) return false;
  if (index === 0) return !!this.unshift(val);
  if (index === this.length) return !!this.push(val);
  const node = new Node(val);
  const before = this.get(index - 1);
  const after = before.next;
  before.next = node;   node.prev = before;    // ľavá strana
  node.next = after;    after.prev = node;     // pravá strana
  this.length++;
  return true;
}
```

### remove(index)

```js
remove(index) {
  if (index < 0 || index >= this.length) return undefined;
  if (index === 0) return this.shift();
  if (index === this.length - 1) return this.pop();
  const removed = this.get(index);
  removed.prev.next = removed.next;   // ľavý sused preskočí removed
  removed.next.prev = removed.prev;   // pravý sused preskočí removed
  removed.next = null;                // odpoj removed úplne
  removed.prev = null;
  this.length--;
  return removed;
}
```

### reverse() – každému uzlu vymeň next a prev

```js
reverse() {
  let current = this.head;
  while (current) {
    [current.next, current.prev] = [current.prev, current.next];
    current = current.prev;           // pozor: „ďalší“ je teraz v prev!
  }
  [this.head, this.tail] = [this.tail, this.head];
  return this;
}
```

## 4. Porovnanie

| Operácia | Singly | Doubly |
|---|---|---|
| push / unshift / shift | O(1) | O(1) |
| **pop** | O(n) | **O(1)** |
| get / hľadanie | O(n) | O(n) (od bližšieho konca) |
| pamäť na uzol | val + next | val + next + **prev** |

---

## Ako pracovať s úlohami

1. `node 1-teoria.js` – kvíz z tejto teórie.
2. `node 2-debug.js` – každá úloha má **jednu** chybu.
3. `node 3-doplnenie.js` – nahraď `___`.
4. `node 4-co-vypise.js` – kvíz „čo vypíše kód?“.
5. `node 5-prakticke.js` – napíš metódy sám.

Testy kontrolujú zoznam **spredu aj odzadu**, takže chybná šípka `prev` sa prejaví.
`node 2-debug.js 3` spustí len úlohu 3, `node 2-debug.js 3 --napoveda 2` ukáže 2. nápovedu.
Vzorové riešenia sú v `riesenie.js`.
