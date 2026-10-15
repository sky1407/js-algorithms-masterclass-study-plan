'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const { format, isDeepStrictEqual } = require('node:util');
const { vyhodnot } = require('./test-runner');
const { nacitajPokrok, PISMENA } = require('./kviz');

const KOREN = path.join(__dirname, '..');
const KVIZY = [
  ['teoria', 'teória'],
  ['coVypise', 'výpis'],
];
const TESTY = [
  ['2-debug.js', 'debug', 'debug'],
  ['3-doplnenie.js', 'doplnenie', 'doplň'],
  ['5-prakticke.js', 'prakticke', 'prax'],
];
const LIMIT_MS = 10000;

function dieta(tema, subor, kluc) {
  const testy = require(path.join(KOREN, tema, 'testy.js'))[kluc];
  const modul = require(path.join(KOREN, tema, subor));
  process.stdout.write(JSON.stringify(vyhodnot(testy, modul)));
}

function vyhodnotVProcese(tema, subor, kluc) {
  const r = spawnSync(process.execPath, [__filename, '--dieta', tema, subor, kluc], {
    encoding: 'utf8',
    timeout: LIMIT_MS,
  });
  if (r.error && r.error.code === 'ETIMEDOUT') return { chyba: `${subor}: prekročený čas ${LIMIT_MS / 1000} s (nekonečný cyklus?)` };
  if (r.status !== 0) {
    const riadok = (r.stderr || '').split('\n').find((l) => /Error/.test(l)) || 'neznáma chyba';
    return { chyba: `${subor}: ${riadok.trim()}` };
  }
  try {
    return { vysledky: JSON.parse(r.stdout) };
  } catch {
    return { chyba: `${subor}: neplatný výstup testov` };
  }
}

function temy() {
  return fs.readdirSync(KOREN)
    .filter((d) => /^s\d{2}(-\d{2})?-/.test(d) && fs.existsSync(path.join(KOREN, d, 'testy.js')))
    .sort();
}

function nacitajTesty(tema) {
  try {
    return require(path.join(KOREN, tema, 'testy.js'));
  } catch {
    return null;
  }
}

function pokrok() {
  let spolu = 0;
  let hotovo = 0;
  console.log('\n=== Pokrok ===\n');
  for (const tema of temy()) {
    const casti = [];
    const chyby = [];
    let temaSpolu = 0;
    let temaHotovo = 0;
    const testy = nacitajTesty(tema);
    if (!testy) {
      console.log(`  ⚠ ${tema}: testy.js sa nedá načítať`);
      continue;
    }
    const ulozene = nacitajPokrok(path.join(KOREN, tema));
    for (const [kluc, skratka] of KVIZY) {
      const otazky = testy[kluc] || [];
      const ok = otazky.filter((o) => (ulozene[kluc] || {})[o.id] === true).length;
      casti.push(`${skratka} ${ok}/${otazky.length}`);
      temaSpolu += otazky.length;
      temaHotovo += ok;
    }
    for (const [subor, kluc, skratka] of TESTY) {
      const pocet = (testy[kluc] || []).length;
      const r = vyhodnotVProcese(tema, subor, kluc);
      const ok = r.vysledky ? r.vysledky.filter((v) => v.ok).length : 0;
      if (r.chyba) chyby.push(r.chyba);
      casti.push(`${skratka} ${ok}/${pocet}`);
      temaSpolu += pocet;
      temaHotovo += ok;
    }
    spolu += temaSpolu;
    hotovo += temaHotovo;
    const znak = temaHotovo === temaSpolu ? '✅' : temaHotovo > 0 ? '🟡' : '⬜';
    console.log(`  ${znak} ${tema.padEnd(40)} ${String(`${temaHotovo}/${temaSpolu}`).padStart(5)}   ${casti.join(' · ')}`);
    for (const c of chyby) console.log(`       ⚠ ${c}`);
  }
  console.log(`\nSpolu: ${hotovo}/${spolu}\n`);
}

function spustiKod(kod) {
  const vystup = [];
  const konzola = { log: (...args) => vystup.push(format(...args)) };
  try {
    vm.runInNewContext(`'use strict';\n${kod}`, { console: konzola }, { timeout: 1000 });
    return { vystup: vystup.join('\n') };
  } catch (err) {
    return { vystup: vystup.join('\n'), chyba: err && err.name ? err.name : 'Error' };
  }
}

function kontrolaKvizu(tema, testy) {
  const problemy = [];
  for (const [kluc] of KVIZY) {
    const otazky = testy[kluc] || [];
    const idcka = new Set();
    for (const o of otazky) {
      const kde = `${tema} ${kluc} #${o.id}`;
      if (idcka.has(o.id)) problemy.push(`${kde}: duplicitné id`);
      idcka.add(o.id);
      const index = PISMENA.indexOf(o.spravna);
      if (!Array.isArray(o.moznosti) || index < 0 || index >= o.moznosti.length) {
        problemy.push(`${kde}: neplatná správna odpoveď`);
        continue;
      }
      if (new Set(o.moznosti).size !== o.moznosti.length) problemy.push(`${kde}: dve rovnaké možnosti`);
      if (!o.vysvetlenie || !o.napoveda) problemy.push(`${kde}: chýba vysvetlenie alebo nápoveda`);
      if (kluc !== 'coVypise') continue;
      const r = spustiKod(o.kod);
      const ocakavane = r.chyba ? `Chyba: ${r.chyba}` : r.vystup;
      const zhody = o.moznosti.filter((m) => (r.chyba ? m.startsWith(ocakavane) : m === ocakavane));
      if (!isDeepStrictEqual(zhody, [o.moznosti[index]])) {
        problemy.push(`${kde}: skutočný výstup je ${JSON.stringify(ocakavane)}, správna možnosť ${o.spravna}) je ${JSON.stringify(o.moznosti[index])}`);
      }
    }
  }
  return problemy;
}

function kontrolaRieseni() {
  let problemy = 0;
  let pocet = 0;
  for (const tema of temy()) {
    const testy = nacitajTesty(tema);
    if (!testy) {
      problemy++;
      console.log(`  ⚠ ${tema}: testy.js sa nedá načítať`);
      continue;
    }
    for (const p of kontrolaKvizu(tema, testy)) {
      problemy++;
      console.log(`  ❌ ${p}`);
    }
    pocet += KVIZY.reduce((s, [k]) => s + (testy[k] || []).length, 0);
    for (const [subor, kluc] of TESTY) {
      const riesenie = vyhodnotVProcese(tema, 'riesenie.js', kluc);
      const zadanie = vyhodnotVProcese(tema, subor, kluc);
      for (const r of [riesenie, zadanie]) {
        if (r.chyba) {
          problemy++;
          console.log(`  ⚠ ${tema} ${r.chyba}`);
        }
      }
      for (const c of testy[kluc] || []) {
        if (!Array.isArray(c.napovedy) || c.napovedy.length === 0) {
          problemy++;
          console.log(`  ❌ ${tema} ${kluc} #${c.id}: chýbajú nápovedy`);
        }
      }
      if (riesenie.vysledky) {
        pocet += riesenie.vysledky.length;
        for (const v of riesenie.vysledky.filter((x) => !x.ok)) {
          problemy++;
          console.log(`  ❌ ${tema} riešenie ${kluc} #${v.id} ${v.nazov}: ${v.sprava}`);
        }
      }
      if (zadanie.vysledky) {
        for (const v of zadanie.vysledky.filter((x) => x.ok)) {
          problemy++;
          console.log(`  ❌ ${tema} ${subor} #${v.id} ${v.nazov}: prejde už bez úpravy`);
        }
      }
    }
  }
  console.log(`\nKontrola riešení: ${pocet} úloh, ${problemy} problémov\n`);
  if (problemy > 0) process.exitCode = 1;
}

const [prepinac, ...zvysok] = process.argv.slice(2);
if (prepinac === '--dieta') dieta(...zvysok);
else if (prepinac === '--riesenia') kontrolaRieseni();
else pokrok();
