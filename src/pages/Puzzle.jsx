import React, { useState, useEffect } from 'react';

const size = 3;

const compress = (data) => btoa(JSON.stringify(data));
const decompress = (data) => JSON.parse(atob(data));

export default function Puzzle() {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState(null);

  // ⏱ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 📅 Generate Daily Puzzle (Seed Based)
  const generateDailyPuzzle = (offset = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + offset);

    const seed = today.getFullYear() + today.getMonth() + today.getDate();

    let arr = [...Array(8).keys()].map((x) => x + 1);
    arr.push(null);

    for (let i = arr.length - 1; i > 0; i--) {
      const j = (seed * (i + 1)) % arr.length;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  // 📦 Cache 7 days puzzles
  useEffect(() => {
    const cache = {};
    for (let i = 0; i < 7; i++) {
      cache[`day-${i}`] = generateDailyPuzzle(i);
    }
    localStorage.setItem('puzzleCache', compress(cache));
    setTiles(cache['day-0']);
  }, []);

  // 🎮 Move tile
  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [index - 1, index + 1, index - size, index + size];

    if (validMoves.includes(emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setMoves((m) => m + 1);

      if (isSolved(newTiles)) {
        const score = moves + 1 + time;
        const saved = localStorage.getItem('bestScore');

        if (!saved || score < saved) {
          localStorage.setItem('bestScore', score);
          setBestScore(score);
        }
      }
    }
  };

  const isSolved = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== i + 1) return false;
    }
    return true;
  };

  useEffect(() => {
    const saved = localStorage.getItem('bestScore');
    if (saved) setBestScore(saved);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Daily 8 Puzzle Challenge</h1>

      <div className="mb-4 flex gap-6 text-lg">
        <span>Moves: {moves}</span>
        <span>Time: {time}s</span>
        <span>Best: {bestScore || '-'}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => moveTile(index)}
            className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-2xl font-bold rounded-xl cursor-pointer transition-all duration-300
              ${
                tile === null ? 'bg-gray-800' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {tile}
          </div>
        ))}
      </div>
    </div>
  );
}
