import React, { useEffect, useState } from "react";

const GRID_SIZE = 3;

// Initial solved state
const SOLVED_TILES = [1, 2, 3, 4, 5, 6, 7, 8, null];

function Puzzle() {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  // Shuffle puzzle on first load
  useEffect(() => {
    restartGame();
  }, []);

  // Shuffle function
  const shuffleTiles = () => {
    let shuffled = [...SOLVED_TILES];

    do {
      shuffled.sort(() => Math.random() - 0.5);
    } while (!isSolvable(shuffled) || isSolvedState(shuffled));

    return shuffled;
  };

  // Check solvability of puzzle
  const isSolvable = (tiles) => {
    const numbers = tiles.filter((tile) => tile !== null);
    let inversions = 0;

    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] > numbers[j]) inversions++;
      }
    }
    return inversions % 2 === 0;
  };

  // Check if puzzle is solved
  const isSolvedState = (tiles) => {
    return SOLVED_TILES.every((tile, index) => tile === tiles[index]);
  };

  // Handle tile click
  const handleTileClick = (index) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(null);

    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    // Allow move only if tile is adjacent to empty space
    const isAdjacent =
      Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

    if (!isAdjacent) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];

    setTiles(newTiles);
    setMoves((prev) => prev + 1);

    if (isSolvedState(newTiles)) {
      setIsSolved(true);
    }
  };

  // Restart game
  const restartGame = () => {
    setTiles(shuffleTiles());
    setMoves(0);
    setIsSolved(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">8 Tile Puzzle Game</h1>

      <p className="mb-4 text-gray-600">
        Try to arrange the numbers in ascending order
      </p>

      {/* Puzzle Grid */}
      <div
        className="grid gap-2 mb-4"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 70px)` }}
      >
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => handleTileClick(index)}
            className={`h-16 w-16 text-xl font-semibold border rounded
              ${
                tile === null
                  ? "bg-gray-300 cursor-default"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {tile}
          </button>
        ))}
      </div>

      <p className="mb-2 font-semibold">Moves: {moves}</p>

      {isSolved && (
        <p className="text-green-600 font-semibold mb-3">
          🎉 You solved the puzzle!
        </p>
      )}

      <button
        onClick={restartGame}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Restart Game
      </button>

      <p className="mt-6 text-sm text-gray-500">
        Developed by Mo Yunus (ECE, 3rd Year)
      </p>
    </div>
  );
}

export default Puzzle;

