'use strict';

const LIMIT = 10000;

function naPole(list) {
  const vysledok = [];
  let uzol = list.head;
  while (uzol) {
    vysledok.push(uzol.val);
    if (vysledok.length > LIMIT) throw new Error('zoznam je zacyklený – next niekde ukazuje späť');
    uzol = uzol.next;
  }
  return vysledok;
}

function naPoleOdzadu(list) {
  const vysledok = [];
  let uzol = list.tail;
  while (uzol) {
    vysledok.push(uzol.val);
    if (vysledok.length > LIMIT) throw new Error('zoznam je zacyklený – prev niekde ukazuje dopredu');
    uzol = uzol.prev;
  }
  return vysledok;
}

function postav(list, hodnoty, obojsmerny = false) {
  const uzly = hodnoty.map((val) => (obojsmerny ? { val, next: null, prev: null } : { val, next: null }));
  for (let i = 0; i < uzly.length - 1; i++) {
    uzly[i].next = uzly[i + 1];
    if (obojsmerny) uzly[i + 1].prev = uzly[i];
  }
  list.head = uzly[0] || null;
  list.tail = uzly[uzly.length - 1] || null;
  list.length = uzly.length;
  return list;
}

module.exports = { naPole, naPoleOdzadu, postav };
