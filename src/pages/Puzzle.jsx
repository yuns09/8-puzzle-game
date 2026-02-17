import React, { useState, useEffect } from "react";

export default function Puzzle() {
  const size = 3;
  const totalTiles = size * size;

  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || null
  );
  const [gameStarted, setGameStarted] = useState(false);

  // Generate solvable shuffled tiles
  const shuffleTiles = () => {
    let arr = [...Array(totalTiles - 1).keys()].map((x) => x + 1);
    arr.push(null);

    return arr.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setTiles(shuffleTiles());
  }, []);

  // Timer
  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);

    const validMoves = [
      index - 1,
      index + 1,
      index - size,
      index + size,
    ];

    if (validMoves.includes(emptyIndex)) {
      let newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];

      setTiles(newTiles);
      setMoves(moves + 1);
      setGameStarted(true);
    }
  };

  const isSolved = () => {
    for (let i = 0; i < totalTiles - 1; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return true;
  };

  // Save Best Score
  useEffect(() => {
    if (isSolved() && moves > 0) {
      if (!bestScore || moves < bestScore) {
        localStorage.setItem("bestScore", moves);
        setBestScore(moves);
      }
      setGameStarted(false);
    }
  }, [tiles]);

  const restartGame = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setSeconds(0);
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col items-center justify-center p-4">

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
        8 Number Sliding Puzzle
      </h1>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row gap-4 text-white mb-6 text-center">
        <div className="bg-gray-800 px-4 py-2 rounded-lg shadow">
          ⏱ Time: {seconds}s
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-lg shadow">
          🔢 Moves: {moves}
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-lg shadow">
          🏆 Best: {bestScore || "--"}
        </div>
      </div>

      {/* Puzzle Grid */}
      <div
        className="grid gap-2 bg-gray-800 p-3 rounded-xl shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => moveTile(index)}
            className={`flex items-center justify-center 
              text-2xl md:text-3xl font-bold 
              aspect-square w-20 sm:w-24 md:w-28
              rounded-lg cursor-pointer
              transition-all duration-300 ease-in-out
              ${
                tile === null
                  ? "bg-gray-900"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95"
              }`}
          >
            {tile}
          </div>
        ))}
      </div>

      {/* Solved Message */}
      {isSolved() && moves > 0 && (
        <div className="mt-4 text-green-400 font-bold text-lg animate-pulse">
          🎉 Puzzle Solved!
        </div>
      )}

      {/* Restart Button */}
      <button
        onClick={restartGame}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Restart Game
      </button>
    </div>
  );
}
