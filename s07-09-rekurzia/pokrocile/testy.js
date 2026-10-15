'use strict';
const spravne = require('./riesenie');

const povodne = {
  isPalindrome(str) {
    if (str.length === 1) return true;
    if (str.length === 2) return str[0] === str[1];
    if (str[0] === str.slice(-1)) return povodne.isPalindrome(str.slice(1, -1));
    return false;
  },
  stringifyNumbers(obj) {
    const result = {};
    for (const key in obj) {
      const v = obj[key];
      if (typeof v === 'number') result[key] = String(v);
      else if (typeof v === 'object') result[key] = povodne.stringifyNumbers(v);
      else result[key] = v;
    }
    return result;
  },
  deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) if (!povodne.deepEqual(a[k], b[k])) return false;
    return true;
  },
};

const strom = {
  name: 'projekt',
  children: [
    { name: 'README.md', size: 2 },
    {
      name: 'src',
      children: [
        { name: 'app.js', size: 40 },
        { name: 'utils', children: [{ name: 'math.js', size: 8 }, { name: 'str.js', size: 5 }] },
        { name: 'empty', children: [] },
      ],
    },
    { name: 'assets', children: [{ name: 'logo.png', size: 120 }] },
  ],
};

const kategorie = [
  {
    id: 1,
    name: 'Elektronika',
    children: [
      { id: 2, name: 'Počítače', children: [{ id: 3, name: 'Notebooky' }, { id: 4, name: 'Monitory' }] },
      { id: 5, name: 'Mobily', children: [] },
    ],
  },
  { id: 6, name: 'Záhrada', children: [{ id: 7, name: 'Kosačky', children: [{ id: 8, name: 'Robotické' }] }] },
];

const debug = [
  {
    id: 1,
    nazov: 'productOfArray – súčin prvkov',
    testy: (m, { rovne }) => {
      rovne(m.productOfArray([1, 2, 3]), 6, 'productOfArray([1, 2, 3])');
      rovne(m.productOfArray([1, 2, 3, 10]), 60, 'productOfArray([1, 2, 3, 10])');
      rovne(m.productOfArray([7]), 7, 'productOfArray([7])');
      rovne(m.productOfArray([]), 1, 'productOfArray([])');
    },
  },
  {
    id: 2,
    nazov: 'flatten – sploštenie vnorených polí',
    testy: (m, { rovne }) => {
      rovne(m.flatten([1, 2, 3, [4, 5]]), [1, 2, 3, 4, 5], 'flatten([1, 2, 3, [4, 5]])');
      rovne(m.flatten([1, [2, [3, 4], [[5]]]]), [1, 2, 3, 4, 5], 'flatten([1, [2, [3, 4], [[5]]]])');
      rovne(m.flatten([[1], [2], [3]]), [1, 2, 3], 'flatten([[1], [2], [3]])');
      rovne(m.flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]), [1, 2, 3], 'flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])');
      rovne(m.flatten([]), [], 'flatten([])');
    },
  },
  {
    id: 3,
    nazov: 'fib – Fibonacciho čísla (správne a rýchlo)',
    testy: (m, { rovne, pravda, zlozitost }) => {
      rovne(m.fib(0), 0, 'fib(0)');
      rovne(m.fib(1), 1, 'fib(1)');
      rovne(m.fib(2), 1, 'fib(2)');
      rovne(m.fib(10), 55, 'fib(10)');
      rovne(m.fib(28), 317811, 'fib(28)');
      const start = Date.now();
      rovne(m.fib(40), 102334155, 'fib(40)');
      pravda(Date.now() - start < 50, `fib(40) trvalo ${Date.now() - start} ms – pridaj memoizáciu`);
      rovne(m.fib(70), 190392490709135, 'fib(70)');
      zlozitost(m.zlozitost3, 'O(n)', 'Časová zložitosť s memoizáciou');
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'power – mocnina rekurziou',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.power, /Math\.pow|\*\*/, 'nepoužívaj Math.pow ani ** – rieš to rekurziou');
      rovne(m.power(2, 0), 1, 'power(2, 0)');
      rovne(m.power(2, 2), 4, 'power(2, 2)');
      rovne(m.power(2, 4), 16, 'power(2, 4)');
      rovne(m.power(5, 3), 125, 'power(5, 3)');
    },
  },
  {
    id: 5,
    nazov: 'reverse – otočenie reťazca rekurziou',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.reverse, /\.reverse\(|for\s*\(|while\s*\(/, 'nepoužívaj .reverse() ani cykly');
      rovne(m.reverse('awesome'), 'emosewa', "reverse('awesome')");
      rovne(m.reverse('rithmschool'), 'loohcsmhtir', "reverse('rithmschool')");
      rovne(m.reverse('a'), 'a', "reverse('a')");
      rovne(m.reverse(''), '', "reverse('')");
    },
  },
  {
    id: 6,
    nazov: 'nestedEvenSum – súčet párnych čísel vo vnorenom objekte',
    testy: (m, { rovne }) => {
      const obj1 = { outer: 2, obj: { inner: 2, otherObj: { superInner: 2, notANumber: true, alsoNotANumber: 'yup' } } };
      const obj2 = { a: 2, b: { b: 2, bb: { b: 3, bb: { b: 2 } } }, c: { c: { c: 2 }, cc: 'ball', ccc: 5 }, d: 1, e: { e: { e: 2 }, ee: 'car' } };
      rovne(m.nestedEvenSum(obj1), 6, 'nestedEvenSum(obj1)');
      rovne(m.nestedEvenSum(obj2), 10, 'nestedEvenSum(obj2)');
      rovne(m.nestedEvenSum({ a: null, b: { c: 4 } }), 4, 'nestedEvenSum({ a: null, b: { c: 4 } })');
      rovne(m.nestedEvenSum({}), 0, 'nestedEvenSum({})');
    },
  },
];

const hladanie = [
  {
    id: 7,
    nazov: 'isPalindrome',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.isPalindrome, spravne.isPalindrome);
      rovne(m.isPalindrome('awesome'), false, "isPalindrome('awesome')");
      rovne(m.isPalindrome('foobar'), false, "isPalindrome('foobar')");
      rovne(m.isPalindrome('tacocat'), true, "isPalindrome('tacocat')");
      rovne(m.isPalindrome('abba'), true, "isPalindrome('abba')");
      rovne(m.isPalindrome('a'), true, "isPalindrome('a')");
      rovne(m.isPalindrome(''), true, "isPalindrome('')");
    },
  },
  {
    id: 8,
    nazov: 'stringifyNumbers – čísla na reťazce',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad8, povodne.stringifyNumbers, spravne.stringifyNumbers);
      const obj = { num: 1, test: [1, 2], data: { val: 4, info: { isRight: true, random: 66 } }, nic: null };
      rovne(
        m.stringifyNumbers(obj),
        { num: '1', test: [1, 2], data: { val: '4', info: { isRight: true, random: '66' } }, nic: null },
        'stringifyNumbers(obj)',
      );
      rovne(obj.data.val, 4, 'vstupný objekt sa nesmie zmeniť (obj.data.val)');
    },
  },
  {
    id: 9,
    nazov: 'deepEqual – hĺbkové porovnanie',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad9, povodne.deepEqual, spravne.deepEqual);
      rovne(m.deepEqual({ a: 1, b: { c: [1, 2] } }, { b: { c: [1, 2] }, a: 1 }), true, 'deepEqual(rovnaké objekty)');
      rovne(m.deepEqual({ a: 1 }, { a: 2 }), false, 'deepEqual({ a: 1 }, { a: 2 })');
      rovne(m.deepEqual([1, 2], [1, 2, 3]), false, 'deepEqual([1, 2], [1, 2, 3])');
      rovne(m.deepEqual([1], { 0: 1 }), false, 'deepEqual([1], { 0: 1 })');
      rovne(m.deepEqual({ a: undefined }, { b: undefined }), false, 'deepEqual({ a: undefined }, { b: undefined })');
      rovne(m.deepEqual(null, {}), false, 'deepEqual(null, {})');
      rovne(m.deepEqual(null, null), true, 'deepEqual(null, null)');
      rovne(m.deepEqual('1', 1), false, "deepEqual('1', 1)");
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'someRecursive – spĺňa aspoň jeden prvok podmienku?',
    testy: (m, { rovne, nepouziva }) => {
      nepouziva(m.someRecursive, /\.some\(|for\s*\(|while\s*\(/, 'nepoužívaj .some() ani cykly – rieš to rekurziou');
      const isOdd = (x) => x % 2 !== 0;
      rovne(m.someRecursive([1, 2, 3, 4], isOdd), true, 'someRecursive([1, 2, 3, 4], isOdd)');
      rovne(m.someRecursive([4, 6, 8, 9], isOdd), true, 'someRecursive([4, 6, 8, 9], isOdd)');
      rovne(m.someRecursive([4, 6, 8], isOdd), false, 'someRecursive([4, 6, 8], isOdd)');
      rovne(m.someRecursive([], isOdd), false, 'someRecursive([], isOdd)');
    },
  },
  {
    id: 11,
    nazov: 'collectStrings – všetky reťazce z vnoreného objektu',
    testy: (m, { rovne }) => {
      const obj = {
        stuff: 'foo',
        data: { val: { thing: { info: 'bar', moreInfo: { evenMoreInfo: { weMadeIt: 'baz' } } } } },
        nic: null,
        cislo: 5,
      };
      rovne(m.collectStrings(obj), ['foo', 'bar', 'baz'], 'collectStrings(obj)');
      rovne(m.collectStrings({}), [], 'collectStrings({})');
      rovne(m.collectStrings({ a: ['x', { b: 'y' }] }), ['x', 'y'], "collectStrings({ a: ['x', { b: 'y' }] })");
    },
  },
  {
    id: 12,
    nazov: 'permutations – všetky permutácie reťazca',
    testy: (m, { rovne }) => {
      rovne(m.permutations('abc'), ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'], "permutations('abc')");
      rovne(m.permutations('aab'), ['aab', 'aba', 'baa'], "permutations('aab')");
      rovne(m.permutations('a'), ['a'], "permutations('a')");
      rovne(m.permutations(''), [''], "permutations('')");
      rovne(m.permutations('abcde').length, 120, "permutations('abcde').length");
    },
  },
];

const scenare = [
  {
    id: 13,
    nazov: 'folderSizes – veľkosť priečinkov (ako príkaz du)',
    testy: (m, { rovne }) => {
      rovne(
        m.folderSizes(strom),
        { 'projekt/src/utils': 13, 'projekt/src/empty': 0, 'projekt/src': 53, 'projekt/assets': 120, projekt: 175 },
        'folderSizes(strom)',
      );
      rovne(m.folderSizes({ name: 'x', children: [] }), { x: 0 }, 'prázdny priečinok');
    },
  },
  {
    id: 14,
    nazov: 'findPath – breadcrumb navigácia v kategóriách e-shopu',
    testy: (m, { rovne }) => {
      rovne(m.findPath(kategorie, 3), ['Elektronika', 'Počítače', 'Notebooky'], 'findPath(kategorie, 3)');
      rovne(m.findPath(kategorie, 8), ['Záhrada', 'Kosačky', 'Robotické'], 'findPath(kategorie, 8)');
      rovne(m.findPath(kategorie, 5), ['Elektronika', 'Mobily'], 'findPath(kategorie, 5)');
      rovne(m.findPath(kategorie, 6), ['Záhrada'], 'findPath(kategorie, 6)');
      rovne(m.findPath(kategorie, 99), null, 'findPath(kategorie, 99)');
      rovne(m.findPath([], 1), null, 'findPath([], 1)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
