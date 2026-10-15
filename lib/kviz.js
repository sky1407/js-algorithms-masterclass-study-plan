'use strict';
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const PISMENA = ['a', 'b', 'c', 'd', 'e', 'f'];
const SUBOR_POKROKU = '.pokrok.json';

function nacitajPokrok(priecinok) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(priecinok, SUBOR_POKROKU), 'utf8'));
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

function ulozPokrok(priecinok, pokrok) {
  const ciel = path.join(priecinok, SUBOR_POKROKU);
  const docasny = `${ciel}.tmp`;
  try {
    fs.writeFileSync(docasny, JSON.stringify(pokrok, null, 2));
    fs.renameSync(docasny, ciel);
  } catch (err) {
    console.error(`⚠ Pokrok sa nepodarilo uložiť: ${err.message}`);
  }
}

function odsad(text, predpona) {
  return String(text).split('\n').map((r, i) => (i === 0 ? r : predpona + r)).join('\n');
}

function zamiesaj(o) {
  const spravnyText = o.moznosti[PISMENA.indexOf(o.spravna)];
  const moznosti = o.moznosti.slice();
  for (let i = moznosti.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [moznosti[i], moznosti[j]] = [moznosti[j], moznosti[i]];
  }
  return { ...o, moznosti, spravna: PISMENA[moznosti.indexOf(spravnyText)] };
}

function vypisOtazku(o, poradie, spolu) {
  console.log(`\n────────── Otázka ${poradie}/${spolu} (č. ${o.id}) ──────────\n`);
  console.log(o.otazka);
  if (o.kod) {
    console.log('');
    const riadky = o.kod.split('\n');
    const sirka = String(riadky.length).length;
    riadky.forEach((r, i) => console.log(`  ${String(i + 1).padStart(sirka)} │ ${r}`));
  }
  console.log('');
  o.moznosti.forEach((m, i) => console.log(`  ${PISMENA[i]}) ${odsad(m, '     ')}`));
  console.log('');
}

function vytvorCitac() {
  const rl = readline.createInterface({ input: process.stdin, terminal: false });
  const riadky = rl[Symbol.asyncIterator]();
  return {
    async otazka(vyzva) {
      process.stdout.write(vyzva);
      const { value, done } = await riadky.next();
      return done ? null : value.trim().toLowerCase();
    },
    zavri() {
      rl.close();
    },
  };
}

function citajArgumenty(argv, otazky) {
  const volby = { vyber: null, lenChyby: false, chyba: null };
  for (const a of argv) {
    if (a === '--chyby') volby.lenChyby = true;
    else if (/^\d+$/.test(a)) volby.vyber = Number(a);
    else volby.chyba = `Neznámy prepínač "${a}".`;
  }
  if (volby.vyber !== null && !otazky.some((o) => o.id === volby.vyber)) {
    volby.chyba = `Otázka ${volby.vyber} neexistuje. Možnosti: ${otazky.map((o) => o.id).join(', ')}.`;
  }
  return volby;
}

async function polozOtazku(o, citac) {
  const platne = PISMENA.slice(0, o.moznosti.length);
  const spravna = o.spravna;
  let pokusy = 0;
  for (;;) {
    const odpoved = await citac.otazka(`Tvoja odpoveď (${platne[0]}–${platne[platne.length - 1]}, n = nápoveda, q = koniec): `);
    if (odpoved === null || odpoved === 'q') return 'koniec';
    if (odpoved === 'n') {
      console.log(`💡 ${o.napoveda || 'Pri tejto otázke nápoveda nie je, skús si znova prečítať 0-teoria.md.'}`);
      continue;
    }
    if (!platne.includes(odpoved)) {
      console.log(`Napíš jedno písmeno: ${platne.join(', ')}.`);
      continue;
    }
    pokusy++;
    if (odpoved === spravna) {
      console.log(pokusy === 1 ? '✅ Správne!' : '✅ Správne, na druhý pokus!');
      console.log(`📘 ${o.vysvetlenie}`);
      return true;
    }
    if (pokusy === 1) {
      console.log('❌ To nie je ono. Skús ešte raz (alebo napíš n pre nápovedu).');
      continue;
    }
    console.log(`❌ Ani toto nie. Správna odpoveď je ${spravna}).`);
    console.log(`📘 ${o.vysvetlenie}`);
    return false;
  }
}

async function spusti(nazov, priecinok, kluc) {
  const otazky = require(path.join(priecinok, 'testy.js'))[kluc];
  const skript = path.basename(process.argv[1] || 'kviz.js');
  const volby = citajArgumenty(process.argv.slice(2), otazky);
  if (volby.chyba) {
    console.error(`${volby.chyba} Použi napr.: node ${skript}, node ${skript} 3 alebo node ${skript} --chyby`);
    process.exitCode = 1;
    return;
  }

  const pokrok = nacitajPokrok(priecinok);
  const vysledky = { ...(pokrok[kluc] || {}) };
  const vybrane = otazky.filter((o) => {
    if (volby.vyber !== null) return o.id === volby.vyber;
    if (volby.lenChyby) return vysledky[o.id] !== true;
    return true;
  });
  if (vybrane.length === 0) {
    console.log('\n🎉 Všetky otázky už máš zodpovedané správne. Celý kvíz zopakuješ príkazom bez prepínača.\n');
    return;
  }

  console.log(`\n=== ${nazov} ===`);
  console.log('Odpovedaj písmenom a stlač Enter. n = nápoveda, q = koniec (pokrok sa uloží).');

  const citac = vytvorCitac();
  let spravne = 0;
  let zodpovedane = 0;
  try {
    for (let i = 0; i < vybrane.length; i++) {
      const zamiesana = zamiesaj(vybrane[i]);
      vypisOtazku(zamiesana, i + 1, vybrane.length);
      const vysledok = await polozOtazku(zamiesana, citac);
      if (vysledok === 'koniec') break;
      zodpovedane++;
      if (vysledok) spravne++;
      vysledky[vybrane[i].id] = vysledok;
      ulozPokrok(priecinok, { ...nacitajPokrok(priecinok), [kluc]: vysledky });
    }
  } finally {
    citac.zavri();
  }

  const celkom = otazky.filter((o) => vysledky[o.id] === true).length;
  console.log(`\nV tomto kole: ${spravne}/${zodpovedane} správne. Celkovo máš správne ${celkom}/${otazky.length}.`);
  if (celkom === otazky.length) console.log('🎉 Celý kvíz máš hotový!\n');
  else console.log(`👉 Chybné a nezodpovedané zopakuješ príkazom: node ${skript} --chyby\n`);
}

function spustiBezpecne(nazov, priecinok, kluc) {
  spusti(nazov, priecinok, kluc).catch((err) => {
    console.error(`\n⚠ Kvíz sa nepodarilo spustiť: ${err && err.message}`);
    process.exitCode = 1;
  });
}

module.exports = { spusti: spustiBezpecne, nacitajPokrok, PISMENA };
