# JavaScript Algorithms & Data Structures – Study Plan (Udemy Masterclass)

A hands-on, beginner-friendly study plan that accompanies Colt Steele's Udemy course
[**JavaScript Algorithms and Data Structures Masterclass**](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/).
It covers the whole course (sections 3–29) in **16 topics with 800 auto-graded exercises**,
each with theory, quizzes, progressive hints and reference solutions.

> The learning material and exercises are written in **Slovak** (the author's native language).
> This is an independent personal study project – it is not affiliated with or endorsed by Udemy or Colt Steele,
> and it does not contain any course videos or slides. All explanations and exercises are original.

## Why

The course explains the concepts well, but practising them as a complete beginner is hard:
typical exercises assume you already know JavaScript and jump straight to the full algorithm.
This plan breaks every topic into small steps – first understand, then fix, then fill in, then predict, then write it yourself.

## How a topic works

Every topic folder follows the same five-step flow:

| File | Step | Exercises |
|---|---|---|
| `0-teoria.md` | Theory written for a total beginner – analogies, diagrams, all the JS syntax the exercises need | – |
| `1-teoria.js` | Interactive terminal quiz on the theory (multiple choice, instant explanation) | 10 |
| `2-debug.js` | Each function contains **exactly one bug** – find and fix it | 10 |
| `3-doplnenie.js` | Fill in the blanks (`___`) in otherwise complete code | 10 |
| `4-co-vypise.js` | Interactive quiz: *"What does this code print?"* | 10 |
| `5-prakticke.js` | Write the functions / classes from scratch, from easiest to hardest | 10 |
| `riesenie.js` | Reference solutions | – |
| `pokrocile/` | The original, harder exercise set for a second pass | – |

### Features

- **Auto-graded exercises** – every file runs its own tests: `node 2-debug.js` or a single task with `node 2-debug.js 3`.
- **Progressive hints** – three hints per exercise (`node 2-debug.js 3 --napoveda 2`); the first one appears automatically on the first failing task, the last one is almost the solution.
- **Interactive quizzes** – answer with a letter, get an explanation, one retry, `n` for a hint. Options are shuffled on every run and progress is saved to `.pokrok.json`.
- **Progress overview** – `node lib/over.js` shows the score for every topic and exercise type.
- **Guards against shortcuts** – e.g. recursion exercises check that the function really calls itself, sorting exercises forbid `.sort()`, string search forbids `indexOf`.
- **Self-verifying content** – `node lib/over.js --riesenia` checks that every reference solution passes, every unmodified exercise fails, and every *"what does this print"* answer matches the real output of the code (snippets are executed in a sandbox).

## Topics

| Folder | Udemy course sections |
|---|---|
| `s03-polia-a-objekty` | 3 – Analyzing Performance of Arrays and Objects |
| `s04-06-frequency-counter-a-pointers` | 4, 5, 6 – Problem Solving Approach & Patterns: Frequency Counter, Multiple Pointers |
| `s05-06-sliding-window-a-divide-conquer` | 5, 6 – Sliding Window, Divide and Conquer |
| `s07-09-rekurzia` | 7, 8, 9 – Recursion and both problem sets |
| `s10-vyhladavanie` | 10 – Linear, Binary and Naive String Search |
| `s11-14-zakladne-triedenia` | 11–14 – Bubble, Selection, Insertion Sort |
| `s15-17-merge-quick-radix` | 15–17 – Merge, Quick, Radix Sort |
| `s18-19-singly-linked-list` | 18, 19 – ES2015 Classes, Singly Linked Lists |
| `s20-doubly-linked-list` | 20 – Doubly Linked Lists |
| `s21-stack-a-queue` | 21 – Stacks and Queues |
| `s22-23-bst-a-prechadzanie` | 22, 23 – Binary Search Trees, Tree Traversal (BFS, DFS) |
| `s24-binary-heap` | 24 – Binary Heaps, Priority Queue |
| `s25-hash-table` | 25 – Hash Tables |
| `s26-27-grafy` | 26, 27 – Graphs, Graph Traversal |
| `s28-dijkstra` | 28 – Dijkstra's Algorithm |
| `s29-dynamicke-programovanie` | 29 – Dynamic Programming |

Section 1 is the course introduction (no exercises) and Big O (section 2) lives in a separate project.

## Getting started

Requirements: **Node.js 18+**. No dependencies, no install step.

```bash
git clone https://github.com/sky1407/js-algorithms-masterclass-study-plan.git
cd js-algorithms-masterclass-study-plan/s03-polia-a-objekty

# 1. read 0-teoria.md (in VS Code: Ctrl+Shift+V for the preview)
node 1-teoria.js                 # theory quiz
node 2-debug.js                  # fix the bugs
node 3-doplnenie.js              # fill in the blanks
node 4-co-vypise.js              # "what does this print?" quiz
node 5-prakticke.js              # write it yourself

node 2-debug.js 3 --napoveda 2   # second hint for task 3
node ../lib/over.js              # progress across all topics
```

Example output of a failing task:

```
=== s03 Polia a objekty – Debugging ===

  ❌ 1. lastItem – posledný prvok
       lastItem([1, 2, 3]) → očakávané 3, dostal som undefined
       💡 Nápoveda 1/3: Pole [1, 2, 3] má dĺžku 3. Aké indexy má?
       👉 Ďalšia nápoveda: node 2-debug.js 1 --napoveda 2
```

A detailed guide in Slovak is in [`NAVOD.md`](NAVOD.md).

## Project structure

```
lib/
  test-runner.js   test runner with assertions, hints and CLI arguments
  kviz.js          interactive terminal quiz with shuffling and saved progress
  over.js          progress overview and content self-check (--riesenia)
  zoznamy.js       test helpers for linked lists
sNN-topic/
  0-teoria.md … 5-prakticke.js, riesenie.js, testy.js (tests, quiz questions, hints)
  pokrocile/       harder original exercises
```

## Verification

```bash
node lib/over.js --riesenia
# Kontrola riešení: 800 úloh, 0 problémov
```
