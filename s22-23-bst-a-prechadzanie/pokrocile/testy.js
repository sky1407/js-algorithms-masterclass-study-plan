'use strict';
const spravne = require('./riesenie');
const { BinarySearchTree: Vzor } = spravne;

class PovodnyBST extends Vzor {
  remove(value) {
    let parent = null;
    let node = this.root;
    while (node && node.value !== value) {
      parent = node;
      node = value < node.value ? node.left : node.right;
    }
    if (!node) return this;
    if (node.left && node.right) {
      let succParent = node;
      let succ = node.right;
      while (succ.left) {
        succParent = succ;
        succ = succ.left;
      }
      node.value = succ.value;
      if (succParent === node) succParent.right = succ.right;
      else succParent.left = null;
      return this;
    }
    const child = node.left || node.right;
    if (!parent) this.root = child;
    else if (parent.left === node) parent.left = child;
    else parent.right = child;
    return this;
  }

  findSecondLargest() {
    let parent = null;
    let current = this.root;
    if (!current) return undefined;
    while (current.right) {
      parent = current;
      current = current.right;
    }
    return parent ? parent.value : undefined;
  }
}

const povodne = {
  validateBST(root) {
    if (!root) return true;
    if (root.left && root.left.value >= root.value) return false;
    if (root.right && root.right.value <= root.value) return false;
    return povodne.validateBST(root.left) && povodne.validateBST(root.right);
  },
};

function strom(node) {
  return node ? [node.value, strom(node.left), strom(node.right)] : null;
}

function stav(x, navrat) {
  if (navrat) {
    if (x && typeof x === 'object' && 'value' in x && 'left' in x) return { uzol: x.value };
    return x;
  }
  return strom(x.root);
}

function postav(hodnoty) {
  const t = new Vzor();
  for (const v of hodnoty) t.insert(v);
  return t;
}

function zoStromu(Trieda, hodnoty) {
  const t = new Trieda();
  t.root = postav(hodnoty).root;
  return t;
}

function popisOps(ops) {
  return ops.map(([meno, ...a]) => `${meno}(${a.map((x) => JSON.stringify(x)).join(', ')})`).join(' → ');
}

function overOps(Trieda, scenare, { rovne, prehraj, pravda }) {
  pravda(typeof Trieda === 'function', 'trieda BinarySearchTree nie je exportovaná');
  for (const ops of scenare) rovne(prehraj(Trieda, ops, stav), prehraj(Vzor, ops, stav), popisOps(ops));
}

const I = (...vals) => vals.map((v) => ['insert', v]);
const ZAKLAD = [10, 6, 15, 3, 8, 20];

const debug = [
  {
    id: 1,
    nazov: 'insert',
    testy: (m, p) => overOps(m.BinarySearchTree, [
      I(10, 5, 13, 11, 2, 16, 7),
      I(1, 2, 3, 4),
      I(4, 3, 2, 1),
      [...I(10, 5), ['insert', 5]],
    ], p),
  },
  {
    id: 2,
    nazov: 'find a contains',
    testy: (m, { rovne }) => {
      const t = zoStromu(m.BinarySearchTree, [10, 5, 13, 11, 2, 16, 7]);
      for (const v of [7, 13, 10, 2, 16]) rovne(stav(t.find(v), true), { uzol: v }, `find(${v})`);
      for (const v of [99, 1, 12]) rovne(t.find(v), undefined, `find(${v})`);
      rovne(t.contains(11), true, 'contains(11)');
      rovne(t.contains(6), false, 'contains(6)');
      const prazdny = zoStromu(m.BinarySearchTree, []);
      rovne(prazdny.find(1), undefined, 'find(1) v prázdnom strome');
      rovne(prazdny.contains(1), false, 'contains(1) v prázdnom strome');
    },
  },
  {
    id: 3,
    nazov: 'DFSPreOrder a DFSInOrder',
    testy: (m, { rovne }) => {
      for (const hodnoty of [ZAKLAD, [5, 4, 3, 2, 1], [1, 3, 2], []]) {
        const t = zoStromu(m.BinarySearchTree, hodnoty);
        const vzor = postav(hodnoty);
        rovne(t.DFSPreOrder(), vzor.DFSPreOrder(), `DFSPreOrder() pre strom [${hodnoty}]`);
        rovne(t.DFSInOrder(), vzor.DFSInOrder(), `DFSInOrder() pre strom [${hodnoty}]`);
      }
    },
  },
];

const doplnenie = [
  {
    id: 4,
    nazov: 'BFS – prechod po úrovniach',
    testy: (m, p) => overOps(m.BinarySearchTree, [
      [...I(...ZAKLAD), ['BFS']],
      [...I(1, 2, 3), ['BFS']],
      [...I(8, 4, 12, 2, 6, 10, 14, 1), ['BFS']],
      [['BFS']],
    ], p),
  },
  {
    id: 5,
    nazov: 'DFSPostOrder',
    testy: (m, p) => overOps(m.BinarySearchTree, [
      [...I(...ZAKLAD), ['DFSPostOrder']],
      [...I(3, 2, 1), ['DFSPostOrder']],
      [['DFSPostOrder']],
    ], p),
  },
  {
    id: 6,
    nazov: 'height – výška stromu',
    testy: (m, { rovne }) => {
      rovne(m.height(null), 0, 'height(null)');
      rovne(m.height(postav([5]).root), 1, 'height(strom [5])');
      rovne(m.height(postav(ZAKLAD).root), 3, `height(strom [${ZAKLAD}])`);
      rovne(m.height(postav([1, 2, 3, 4, 5]).root), 5, 'height(strom [1, 2, 3, 4, 5])');
      rovne(m.height(postav([8, 4, 12, 2, 6, 10, 14]).root), 3, 'height(vyvážený strom so 7 uzlami)');
    },
  },
];

function overProtipriklad(ops, p) {
  if (!Array.isArray(ops)) {
    throw new p.TestChyba("protipríklad ešte nie je doplnený – zadaj pole operácií, napr. [['insert', 5], ['remove', 5]]");
  }
  p.protipriklad([ops], (o) => p.prehraj(PovodnyBST, o, stav), (o) => p.prehraj(Vzor, o, stav));
}

const hladanie = [
  {
    id: 7,
    nazov: 'validateBST – je strom platný BST?',
    testy: (m, { rovne, protipriklad }) => {
      protipriklad(m.protipriklad7, povodne.validateBST, spravne.validateBST);
      rovne(m.validateBST(postav(ZAKLAD).root), true, 'validateBST(platný strom)');
      rovne(m.validateBST(null), true, 'validateBST(null)');
      rovne(m.validateBST({ value: 5, left: { value: 7 }, right: null }), false, 'validateBST(5 s ľavým synom 7)');
      rovne(
        m.validateBST({ value: 10, left: { value: 5 }, right: { value: 15, left: { value: 6 }, right: { value: 20 } } }),
        false,
        'validateBST(6 v pravom podstrome 10)',
      );
      rovne(m.validateBST({ value: 5, left: { value: 5 } }), false, 'validateBST(duplicitná hodnota)');
    },
  },
  {
    id: 8,
    nazov: 'remove – odstránenie uzla z BST',
    testy: (m, p) => {
      overProtipriklad(m.protipriklad8, p);
      overOps(m.BinarySearchTree, [
        [...I(...ZAKLAD), ['remove', 3]],
        [...I(...ZAKLAD), ['remove', 15]],
        [...I(...ZAKLAD), ['remove', 6]],
        [...I(...ZAKLAD), ['remove', 10]],
        [...I(50, 30, 70, 60, 65, 62, 80), ['remove', 50]],
        [...I(5), ['remove', 5], ['insert', 1]],
        [...I(5, 3), ['remove', 99]],
      ], p);
    },
  },
  {
    id: 9,
    nazov: 'findSecondLargest – druhá najväčšia hodnota',
    testy: (m, p) => {
      overProtipriklad(m.protipriklad9, p);
      overOps(m.BinarySearchTree, [
        [...I(...ZAKLAD), ['findSecondLargest']],
        [...I(5, 10, 7, 8), ['findSecondLargest']],
        [...I(5, 3), ['findSecondLargest']],
        [...I(5), ['findSecondLargest']],
        [['findSecondLargest']],
      ], p);
    },
  },
];

const prakticke = [
  {
    id: 10,
    nazov: 'kthSmallest – k-ta najmenšia hodnota',
    testy: (m, { rovne }) => {
      const root = postav([50, 30, 70, 20, 40, 60, 80]).root;
      for (const [k, r] of [[1, 20], [3, 40], [4, 50], [7, 80], [8, undefined]]) {
        rovne(m.kthSmallest(root, k), r, `kthSmallest(strom, ${k})`);
      }
      rovne(m.kthSmallest(null, 1), undefined, 'kthSmallest(null, 1)');
    },
  },
  {
    id: 11,
    nazov: 'isBalanced – je strom výškovo vyvážený?',
    testy: (m, { rovne }) => {
      rovne(m.isBalanced(postav(ZAKLAD).root), true, `isBalanced([${ZAKLAD}])`);
      rovne(m.isBalanced(postav([1, 2, 3]).root), false, 'isBalanced([1, 2, 3])');
      rovne(m.isBalanced(postav([5, 3, 8, 1, 4, 2]).root), false, 'isBalanced([5, 3, 8, 1, 4, 2])');
      rovne(m.isBalanced(postav([5, 3, 8, 1, 4, 7, 9, 2]).root), true, 'isBalanced([5, 3, 8, 1, 4, 7, 9, 2])');
      rovne(m.isBalanced(null), true, 'isBalanced(null)');
    },
  },
  {
    id: 12,
    nazov: 'lowestCommonAncestor – najnižší spoločný predok v BST',
    testy: (m, { rovne }) => {
      const root = postav([20, 10, 30, 5, 15, 25, 35, 12, 17]).root;
      rovne(m.lowestCommonAncestor(root, 5, 15), 10, 'LCA(5, 15)');
      rovne(m.lowestCommonAncestor(root, 12, 17), 15, 'LCA(12, 17)');
      rovne(m.lowestCommonAncestor(root, 5, 35), 20, 'LCA(5, 35)');
      rovne(m.lowestCommonAncestor(root, 10, 17), 10, 'LCA(10, 17) – uzol môže byť predkom sám sebe');
      rovne(m.lowestCommonAncestor(root, 25, 25), 25, 'LCA(25, 25)');
    },
  },
];

function sledovanyStrom(hodnoty) {
  let navstivene = 0;
  const obal = (node) => {
    if (!node) return null;
    const l = obal(node.left);
    const r = obal(node.right);
    const value = node.value;
    return {
      get value() {
        navstivene++;
        return value;
      },
      left: l,
      right: r,
    };
  };
  return { root: obal(postav(hodnoty).root), navstivene: () => navstivene };
}

const scenare = [
  {
    id: 13,
    nazov: 'priceRange – filter produktov podľa ceny',
    testy: (m, { rovne, pravda }) => {
      const root = postav([50, 20, 80, 10, 30, 70, 90, 25, 35]).root;
      rovne(m.priceRange(root, 25, 70), [25, 30, 35, 50, 70], 'priceRange(strom, 25, 70)');
      rovne(m.priceRange(root, 0, 15), [10], 'priceRange(strom, 0, 15)');
      rovne(m.priceRange(root, 91, 100), [], 'priceRange(strom, 91, 100)');
      rovne(m.priceRange(root, 0, 1000).length, 9, 'priceRange(strom, 0, 1000).length');
      rovne(m.priceRange(null, 0, 10), [], 'priceRange(null, 0, 10)');
      const hodnoty = [];
      const pridaj = (lo, hi) => {
        if (lo > hi) return;
        const mid = Math.floor((lo + hi) / 2);
        hodnoty.push(mid);
        pridaj(lo, mid - 1);
        pridaj(mid + 1, hi);
      };
      pridaj(1, 10000);
      const t = sledovanyStrom(hodnoty);
      rovne(m.priceRange(t.root, 5000, 5010), [5000, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010], 'priceRange(10 000 produktov, 5000, 5010)');
      pravda(t.navstivene() <= 150, `pozrel si ${t.navstivene()}× na hodnotu uzla – nechoď do podstromov, kde nič nemôže byť`);
    },
  },
  {
    id: 14,
    nazov: 'orgLevels – organizačná štruktúra po úrovniach',
    testy: (m, { rovne }) => {
      const firma = {
        name: 'CEO Eva',
        reports: [
          { name: 'CTO Adam', reports: [{ name: 'Dev Ján' }, { name: 'Dev Ida', reports: [{ name: 'Junior Filip' }] }] },
          { name: 'CFO Marta', reports: [] },
          { name: 'COO Peter', reports: [{ name: 'Ops Zoe' }] },
        ],
      };
      rovne(
        m.orgLevels(firma),
        [['CEO Eva'], ['CTO Adam', 'CFO Marta', 'COO Peter'], ['Dev Ján', 'Dev Ida', 'Ops Zoe'], ['Junior Filip']],
        'orgLevels(firma)',
      );
      rovne(m.orgLevels({ name: 'Sólo' }), [['Sólo']], "orgLevels({ name: 'Sólo' })");
      rovne(m.orgLevels(null), [], 'orgLevels(null)');
    },
  },
];

module.exports = { debug, doplnenie, hladanie, prakticke, scenare };
