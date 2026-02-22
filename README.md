# 🧩 8 Puzzle Game (Sliding Puzzle)

## 📌 Project Overview
The 8 Puzzle Game is an interactive sliding puzzle built using React.js and Vite.  
It consists of a 3x3 grid with 8 numbered tiles and one empty space.  
The objective is to arrange the tiles in ascending order (1–8) by sliding them into the empty space.

This project demonstrates strong understanding of React state management, component structure, and game logic implementation.

---

## 🚀 Live Demo
🔗 https://8-puzzle-game-c7r7.vercel.app

---

## 🎯 Features
- Interactive tile movement
- Valid move checking using adjacency logic
- Shuffle functionality
- Win condition detection
- Responsive user interface
- Smooth gameplay experience

---

## 🛠 Tech Stack
- React.js
- Vite
- JavaScript (ES6)
- CSS

---

## 🧠 Working Principle
The application uses React’s `useState` hook to manage the tile positions dynamically.

### Game Logic:
1. The board is represented as an array of numbers.
2. One tile position is set as `null` (empty space).
3. When a tile is clicked:
   - The program checks whether it is adjacent to the empty tile.
   - If valid, the tiles swap positions.
4. After each move, the system verifies whether the tiles are arranged in the correct sequence.
5. If the sequence matches the winning order, a success message is displayed.

---


---

## 📷 Screenshots

### 🟢 Game Start
![Game Start](./assets/screenshot1.png)

### 🟡 During Gameplay
![Gameplay](./assets/screenshot2.png)

### 🏆 Winning State
![Winning State](./assets/screenshot3.png)

---
---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yuns09/8-puzzle-game.git
cd 8-puzzle-game


👤 Author

Mo Yunus
Electronics & Communication Engineering Student

GitHub: https://github.com/yuns09

LinkedIn: https://www.linkedin.com/in/mo-yunus-63782035b/
