'use strict';
const path = require('node:path');
const { isDeepStrictEqual, inspect } = require('node:util');

class TestChyba extends Error {}

const ukaz = (v) => inspect(v, { depth: 5, breakLength: Infinity });

function rovne(skutocne, ocakavane, popis) {
  if (!isDeepStrictEqual(skutocne, ocakavane)) {
    throw new TestChyba(`${popis} → očakávané ${ukaz(ocakavane)}, dostal som ${ukaz(skutocne)}`);
  }
}

function pravda(podmienka, sprava) {
  if (!podmienka) throw new TestChyba(sprava);
}

function hodi(fn, popis) {
  try {
    fn();
  } catch {
    return;
  }
  throw new TestChyba(`${popis} → očakával som, že kód vyhodí chybu, ale nevyhodil`);
}

function normalizujBigO(s) {
  return String(s)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/²/g, '^2')
    .replace(/n\*n/g, 'n^2')
    .replace(/log\(n\)/g, 'logn')
    .replace(/n\*logn/g, 'nlogn')
    .replace(/\*/g, '');
}

function zlozitost(odpoved, spravna, co = 'Časová zložitosť') {
  if (typeof odpoved !== 'string' || odpoved.trim() === '' || odpoved.includes('___')) {
    throw new TestChyba(`${co}: ešte nie je doplnená (napíš napr. 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)' alebo 'O(n^2)')`);
  }
  const o = normalizujBigO(odpoved);
  if (o === normalizujBigO(spravna)) return;
  let tip = '';
  if (/\(\d+n/.test(o) || /n\/\d/.test(o)) tip = ' Tip: konštanty v Big O zahadzujeme (O(2n) → O(n)).';
  else if (o.includes('+')) tip = ' Tip: menšie členy zahadzujeme (O(n + 10) → O(n)).';
  throw new TestChyba(`${co}: '${odpoved}' nie je správne.${tip}`);
}

function nepouziva(fn, vzor, sprava) {
  if (typeof fn === 'function' && vzor.test(fn.toString())) throw new TestChyba(sprava);
}

function rekurzivna(fn) {
  if (typeof fn !== 'function') throw new TestChyba('funkcia chýba');
  const volania = fn.toString().match(new RegExp(`\\b${fn.name}\\s*\\(`, 'g')) || [];
  if (volania.length < 2) {
    throw new TestChyba(`${fn.name} musí byť rekurzívna – vnútri musí volať samu seba (${fn.name}(...))`);
  }
}

function klon(hodnota) {
  try {
    return structuredClone(hodnota);
  } catch {
    return hodnota;
  }
}

function protipriklad(argumenty, chybna, spravna) {
  if (!Array.isArray(argumenty)) {
    throw new TestChyba('protipríklad ešte nie je doplnený – zadaj POLE argumentov, napr. [[1, 2, 3], 5]');
  }
  const ocakavane = spravna(...klon(argumenty));
  let povodne;
  try {
    povodne = chybna(...klon(argumenty));
  } catch {
    return;
  }
  if (isDeepStrictEqual(povodne, ocakavane)) {
    throw new TestChyba(`protipríklad ${ukaz(argumenty)} chybu neodhalí – pôvodný kód vráti správne ${ukaz(ocakavane)}`);
  }
}

function prehraj(Trieda, operacie, stav) {
  const objekt = new Trieda();
  const navraty = operacie.map(([metoda, ...args]) => {
    const vysledok = objekt[metoda](...args);
    return vysledok === objekt ? 'this' : stav(vysledok, true);
  });
  return { navraty, stav: stav(objekt, false) };
}

const pomocnici = { rovne, pravda, hodi, zlozitost, nepouziva, rekurzivna, protipriklad, prehraj, TestChyba };

function vyhodnot(cvicenia, modul) {
  return cvicenia.map((c) => {
    try {
      c.testy(modul, pomocnici);
      return { id: c.id, nazov: c.nazov, ok: true, sprava: '' };
    } catch (err) {
      const sprava = err instanceof TestChyba
        ? err.message
        : `kód hodil chybu: ${err && err.name}: ${err && err.message}`;
      return { id: c.id, nazov: c.nazov, ok: false, sprava };
    }
  });
}

function citajArgumenty(argv) {
  const volby = { vyber: null, napoveda: 0, chyba: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--napoveda' || a === '-n') {
      const dalsi = Number(argv[i + 1]);
      if (Number.isInteger(dalsi) && dalsi > 0) {
        volby.napoveda = dalsi;
        i++;
      } else {
        volby.napoveda = 1;
      }
    } else if (/^\d+$/.test(a)) {
      volby.vyber = Number(a);
    } else {
      volby.chyba = `Neznámy prepínač "${a}".`;
    }
  }
  return volby;
}

function vypisNapovedy(cvicenie, uroven, skript) {
  const napovedy = cvicenie.napovedy || [];
  if (napovedy.length === 0) return;
  const pocet = Math.min(uroven, napovedy.length);
  for (let i = 0; i < pocet; i++) {
    console.log(`       💡 Nápoveda ${i + 1}/${napovedy.length}: ${napovedy[i]}`);
  }
  if (pocet < napovedy.length) {
    console.log(`       👉 Ďalšia nápoveda: node ${skript} ${cvicenie.id} --napoveda ${pocet + 1}`);
  }
}

function spusti(nazov, cvicenia, modul) {
  const volby = citajArgumenty(process.argv.slice(2));
  const skript = path.basename(process.argv[1] || 'subor.js');
  if (volby.chyba) {
    console.error(`${volby.chyba} Použi napr.: node ${skript} 3 alebo node ${skript} 3 --napoveda 2`);
    process.exitCode = 1;
    return;
  }
  if (volby.vyber !== null && !cvicenia.some((c) => c.id === volby.vyber)) {
    const idcka = cvicenia.map((c) => c.id).join(', ');
    console.error(`Cvičenie "${volby.vyber}" neexistuje. Možnosti: ${idcka}.`);
    process.exitCode = 1;
    return;
  }

  const vybrane = cvicenia.filter((c) => volby.vyber === null || c.id === volby.vyber);
  const vysledky = vyhodnot(vybrane, modul);
  console.log(`\n=== ${nazov} ===\n`);
  let prvaChyba = true;
  vysledky.forEach((v, i) => {
    if (v.ok) {
      console.log(`  ✅ ${v.id}. ${v.nazov}`);
      return;
    }
    console.log(`  ❌ ${v.id}. ${v.nazov}\n       ${v.sprava}`);
    const ukazNapovedu = volby.napoveda > 0 || (prvaChyba && vybrane[i].napovedy);
    if (ukazNapovedu) vypisNapovedy(vybrane[i], Math.max(volby.napoveda, 1), skript);
    prvaChyba = false;
  });

  const ok = vysledky.filter((v) => v.ok).length;
  console.log(`\nVýsledok: ${ok}/${vysledky.length}`);
  if (ok === vysledky.length) {
    console.log('🎉 Všetko prešlo!\n');
    return;
  }
  process.exitCode = 1;
  const dalsie = vysledky.find((v) => !v.ok);
  if (volby.vyber === null && dalsie) {
    console.log(`👉 Pokračuj úlohou ${dalsie.id}. Samostatne ju spustíš príkazom: node ${skript} ${dalsie.id}\n`);
  }
}

module.exports = { spusti, vyhodnot };
