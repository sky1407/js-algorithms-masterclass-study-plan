'use strict';
const spravne = require('./riesenie');

class PovodnaHashTable extends spravne.HashTable {
  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const value = key.charCodeAt(i) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }
}

const povodne = {
  twoSum(nums, target) {
    const seen = new Map();
    nums.forEach((n, i) => seen.set(n, i));
    for (let i = 0; i < nums.length; i++) {
      const need = target - nums[i];
      if (seen.has(need)) return [i, seen.get(need)];
    }
    return null;
  },
  groupAnagrams(words) {
    const groups = new Map();
    for (const w of words) {
      let key = 0;
      for (const ch of w) key += ch.charCodeAt(0);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(w);
    }
    return [...groups.values()];
  },
};

const zoradene = (x, navrat) => {
  if (!navrat) return null;
  return Array.isArray(x) ? [...x].sort() : x;
};

function popisOps(ops) {
  return ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
}

function overOps(Trieda, Vzor, scenare, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', `trieda ${Vzor.name} nie je exportovaná`);
  for (const ops of scenare) rovne(prehraj(Trieda, ops, zoradene), prehraj(Vzor, ops, zoradene), popisOps(ops));
}

function mala(Trieda, velkost) {
  return class extends Trieda {
    constructor() {
      super(velkost);
    }
  };
}

function sHashom(Trieda, velkost) {
  return class extends Trieda {
    constructor() {
      super(velkost);
    }

    _hash(key) {
      return spravne.HashTable.prototype._hash.call(this, key);
    }
  };
}

const FARBY = [['maroon', '#800000'], ['yellow', '#FFFF00'], ['olive', '#808000'], ['salmon', '#FA8072'], ['lightcoral', '#F08080'], ['mediumvioletred', '#C71585'], ['plum', '#DDA0DD'], ['purple', '#DDA0DD']];

const debug = [
  {
    id: 1,
    nazov: '_hash – hašovacia funkcia',
    testy: (m, { rovne, pravda }) => {
      const t = new m.HashTable(53);
      const v = new spravne.HashTable(53);
      for (const k of ['pink', 'orangered', 'cyan', 'a', 'hello', 'x'.repeat(150)]) {
        const h = t._hash(k);
        pravda(Number.isInteger(h) && h >= 0 && h < 53, `_hash('${k.slice(0, 20)}') = ${h} – index musí byť celé číslo v rozsahu 0 … 52`);
        rovne(h, v._hash(k), `_hash('${k.slice(0, 20)}')`);
      }
      const t7 = new m.HashTable(7);
      rovne(t7._hash('abc'), new spravne.HashTable(7)._hash('abc'), "_hash('abc') pri veľkosti 7");
    },
  },
  {
    id: 2,
    nazov: 'set a get – separate chaining',
    testy: (m, p) => overOps(sHashom(m.HashTable, 4), mala(spravne.HashTable, 4), [
      [...FARBY.map(([k, v]) => ['set', k, v]), ...FARBY.map(([k]) => ['get', k]), ['get', 'black']],
      [['get', 'nic']],
    ], p),
  },
  {
    id: 3,
    nazov: 'keys a values – bez duplicít',
    testy: (m, p) => overOps(sHashom(m.HashTable, 7), mala(spravne.HashTable, 7), [
      [...FARBY.map(([k, v]) => ['set', k, v]), ['keys'], ['values']],
      [['keys'], ['values']],
    ], p),
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'set – aktualizácia existujúceho kľúča',
    testy: (m, p) => overOps(mala(m.HashTable, 5), mala(spravne.HashTable, 5), [
      [['set', 'eva', 1], ['set', 'adam', 2], ['set', 'eva', 3], ['get', 'eva'], ['keys'], ['values']],
      [...FARBY.map(([k, v]) => ['set', k, v]), ['set', 'plum', 'x'], ['get', 'plum'], ['get', 'purple'], ['keys']],
    ], p),
  },
  {
    id: 5,
    nazov: 'delete – odstránenie kľúča',
    testy: (m, p) => overOps(mala(m.HashTable, 3), mala(spravne.HashTable, 3), [
      [...FARBY.map(([k, v]) => ['set', k, v]), ['delete', 'olive'], ['get', 'olive'], ['delete', 'olive'], ['get', 'salmon'], ['keys']],
      [['delete', 'nic']],
      [['set', 'a', 1], ['delete', 'a'], ['set', 'a', 2], ['get', 'a']],
    ], p),
  },
  {
    id: 6,
    nazov: 'ResizableHashTable – zväčšenie pri zaplnení',
    testy: (m, { rovne, pravda }) => {
      pravda(typeof m.ResizableHashTable === 'function', 'chýba trieda ResizableHashTable');
      const t = new m.ResizableHashTable(4);
      const v = new spravne.ResizableHashTable(4);
      const velkosti = [];
      const ocakavane = [];
      for (let i = 0; i < 40; i++) {
        const k = `kluc${String.fromCharCode(97 + (i % 26))}${i}`;
        t.set(k, i);
        v.set(k, i);
        velkosti.push(t.keyMap.length);
        ocakavane.push(v.keyMap.length);
      }
      rovne(velkosti, ocakavane, 'veľkosť keyMap po každom vložení');
      for (let i = 0; i < 40; i++) {
        const k = `kluc${String.fromCharCode(97 + (i % 26))}${i}`;
        rovne(t.get(k), i, `get('${k}') po zväčšení`);
      }
      t.set('kluca0', 'nová');
      rovne(t.count, 40, 'count po aktualizácii existujúceho kľúča');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'HashTable._hash',
    testy: (m, p) => {
      const ops = m.protipriklad7;
      if (!Array.isArray(ops)) {
        throw new p.TestChyba("protipríklad ešte nie je doplnený – zadaj pole operácií, napr. [['set', 'a', 1], ['keys']]");
      }
      p.protipriklad([ops], (o) => p.prehraj(PovodnaHashTable, o, zoradene), (o) => p.prehraj(spravne.HashTable, o, zoradene));
      overOps(m.HashTable, spravne.HashTable, [
        [['set', 'Bratislava', 1], ['set', 'košice', 2], ['set', 'ŽILINA', 3], ['set', 'Nitra 2', 4], ['keys'], ['values'], ['get', 'ŽILINA']],
        [['set', 'A', 1], ['set', 'a', 2], ['keys']],
      ], p);
      const t = new m.HashTable(53);
      for (const k of ['A', 'Z', 'ABC', '123', '!?', 'Šťastie']) {
        const h = t._hash(k);
        p.pravda(Number.isInteger(h) && h >= 0 && h < 53, `_hash('${k}') = ${h} – index mimo rozsahu 0 … 52`);
      }
    },
  },
  {
    id: 8,
    nazov: 'twoSum – dva indexy so súčtom target',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.twoSum, spravne.twoSum);
      rovne(m.twoSum([2, 7, 11, 15], 9), [0, 1], 'twoSum([2, 7, 11, 15], 9)');
      rovne(m.twoSum([3, 3], 6), [0, 1], 'twoSum([3, 3], 6)');
      rovne(m.twoSum([1, 5, 3, 4], 7), [2, 3], 'twoSum([1, 5, 3, 4], 7)');
      rovne(m.twoSum([5], 10), null, 'twoSum([5], 10)');
    },
  },
  {
    id: 9,
    nazov: 'groupAnagrams – zoskupenie anagramov',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.groupAnagrams, spravne.groupAnagrams);
      rovne(
        m.groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']),
        [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']],
        "groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])",
      );
      rovne(m.groupAnagrams(['ac', 'bb']), [['ac'], ['bb']], "groupAnagrams(['ac', 'bb'])");
      rovne(m.groupAnagrams([]), [], 'groupAnagrams([])');
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'firstUniqueChar – prvý neopakujúci sa znak',
    testy: (m, { rovne }) => {
      rovne(m.firstUniqueChar('leetcode'), 0, "firstUniqueChar('leetcode')");
      rovne(m.firstUniqueChar('loveleetcode'), 2, "firstUniqueChar('loveleetcode')");
      rovne(m.firstUniqueChar('aabb'), -1, "firstUniqueChar('aabb')");
      rovne(m.firstUniqueChar(''), -1, "firstUniqueChar('')");
    },
  },
  {
    id: 11,
    nazov: 'longestConsecutive – najdlhšia postupnosť po sebe idúcich čísel v O(n)',
    testy: (m, { rovne, pravda, nepouziva }) => {
      nepouziva(m.longestConsecutive, /\.sort\(/, 'nepoužívaj .sort() – to je O(n log n); použi Set');
      rovne(m.longestConsecutive([100, 4, 200, 1, 3, 2]), 4, 'longestConsecutive([100, 4, 200, 1, 3, 2])');
      rovne(m.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9, 'longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])');
      rovne(m.longestConsecutive([1, 2, 2, 3]), 3, 'longestConsecutive([1, 2, 2, 3])');
      rovne(m.longestConsecutive([]), 0, 'longestConsecutive([])');
      const velke = Array.from({ length: 200000 }, (_, i) => 200000 - i);
      const start = Date.now();
      rovne(m.longestConsecutive(velke), 200000, 'longestConsecutive(200 000 čísel)');
      pravda(Date.now() - start < 300, 'príliš pomalé – rozbiehaj počítanie len od začiatku postupnosti (keď n - 1 nie je v množine)');
    },
  },
  {
    id: 12,
    nazov: 'subarraySum – počet súvislých úsekov so súčtom k',
    testy: (m, { rovne, pravda }) => {
      rovne(m.subarraySum([1, 1, 1], 2), 2, 'subarraySum([1, 1, 1], 2)');
      rovne(m.subarraySum([1, 2, 3], 3), 2, 'subarraySum([1, 2, 3], 3)');
      rovne(m.subarraySum([1, -1, 0], 0), 3, 'subarraySum([1, -1, 0], 0)');
      rovne(m.subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7), 4, 'subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7)');
      rovne(m.subarraySum([], 0), 0, 'subarraySum([], 0)');
      const velke = Array.from({ length: 100000 }, (_, i) => (i % 7) - 3);
      const start = Date.now();
      rovne(m.subarraySum(velke, 3), spravne.subarraySum(velke, 3), 'subarraySum(100 000 čísel, 3)');
      pravda(Date.now() - start < 200, 'príliš pomalé – použi prefixové súčty v Map (O(n))');
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'RateLimiter – max. N requestov za časové okno',
    testy: (m, { rovne, pravda }) => {
      pravda(typeof m.RateLimiter === 'function', 'chýba trieda RateLimiter');
      const r = new m.RateLimiter(3, 1000);
      const vysledky = [
        r.allow('eva', 0), r.allow('eva', 100), r.allow('eva', 200), r.allow('eva', 300),
        r.allow('adam', 300),
        r.allow('eva', 999), r.allow('eva', 1000), r.allow('eva', 1001), r.allow('eva', 1150), r.allow('eva', 1200),
      ];
      rovne(vysledky, [true, true, true, false, true, false, true, false, true, true], 'sekvencia allow(...)');
    },
  },
  {
    id: 14,
    nazov: 'findDuplicateFiles – duplicitné súbory podľa obsahu',
    testy: (m, { rovne }) => {
      const files = [
        { path: '/fotky/dovolenka.jpg', content: 'abc123' },
        { path: '/zaloha/IMG_001.jpg', content: 'abc123' },
        { path: '/dokumenty/cv.pdf', content: 'cv-v2' },
        { path: '/stiahnute/cv(1).pdf', content: 'cv-v2' },
        { path: '/stiahnute/cv.pdf', content: 'cv-v2' },
        { path: '/hudba/song.mp3', content: 'zzz' },
      ];
      rovne(
        m.findDuplicateFiles(files),
        [['/dokumenty/cv.pdf', '/stiahnute/cv(1).pdf', '/stiahnute/cv.pdf'], ['/fotky/dovolenka.jpg', '/zaloha/IMG_001.jpg']],
        'findDuplicateFiles(files)',
      );
      rovne(m.findDuplicateFiles([{ path: '/a', content: 'x' }]), [], 'žiadne duplikáty');
      rovne(m.findDuplicateFiles([]), [], 'findDuplicateFiles([])');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
