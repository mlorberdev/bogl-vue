# Boggle Vue

A modern web implementation of the classic **Boggle** word game built with **Vue.js**.

🔗 **Live Demo:** https://boggle-vuejs.netlify.app/

## Overview

Boggle Vue challenges players to discover as many valid words as possible from a randomized 4×4 letter grid before time runs out. Words are formed by connecting horizontally, vertically, or diagonally adjacent letters without reusing the same tile in a single word.

The project combines a responsive user interface with efficient word validation and scoring to recreate the fast-paced gameplay of the classic tabletop game.

---

## Features

- Randomized 4×4 Boggle boards
- Real-time countdown timer
- Interactive tile selection
- Word validation against a dictionary
- Score tracking
- End-of-game solution display
- Responsive interface for desktop and mobile devices
- Built with Vue.js

---

## Screenshots

### Gameplay Board

Players search the board for connected letter paths and submit valid words before time expires.

![Gameplay Board](screenshots/gameplay-board.png)

---

### Word Selection

Selected letters are highlighted as players trace a word across adjacent tiles.

![Word Selection](screenshots/word-selection.png)

---

### Results and Solutions

At the end of a round, players can review discovered words, remaining valid words, and final scores.

![Results Screen](screenshots/results-screen.png)

---

## How to Play

1. Start a new game.
2. Form words by connecting adjacent letters.
3. Letters may touch horizontally, vertically, or diagonally.
4. A letter tile may only be used once per word.
5. Submit as many valid words as possible before the timer reaches zero.
6. Compare your score against all available solutions at the end of the game.

---

## Technology Stack

- Vue.js
- JavaScript
- HTML5
- CSS3
- Netlify

---

## Educational Applications

This project demonstrates concepts including:

- Graph traversal and adjacency relationships
- Dictionary-based word validation
- State management in Vue.js
- Event-driven user interfaces
- Algorithm design and optimization
- Responsive web application development
