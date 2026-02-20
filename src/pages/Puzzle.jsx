import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  saveDailyActivity,
  getDailyActivity,
} from "../lib/db";

const today = dayjs().format("YYYY-MM-DD");

const initialBoard = [1, 2, 3, 4, 5, 6, 7, 8, null];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Puzzle() {
  const [board, setBoard] = useState(shuffle(initialBoard));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  // ⏱ Timer
  useEffect(() => {
    let interval;
    if (timerStarted && !completed) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, completed]);

  // 🔥 Check completion
  useEffect(() => {
    if (
      board.slice(0, 8).every((num, i) => num === i + 1) &&
      board[8] === null
    ) {
      handleCompletion();
    }
  }, [board]);

  async function handleCompletion() {
    if (completed) return;

    setCompleted(true);

    const score = Math.max(1000 - time * 5 - moves * 2, 100);

    await saveDailyActivity({
      date: today,
      solved: true,
      score,
      timeTaken: time,
      difficulty: 1,
      synced: false,
    });

    calculateStreak();
  }

  async function calculateStreak() {
    let current = dayjs();
    let count = 0;

    while (true) {
      const dateStr = current.format("YYYY-MM-DD");
      const activity = await getDailyActivity(dateStr);

      if (activity?.solved) {
        count++;
        current = current.subtract(1, "day");
      } else {
        break;
      }
    }

    setStreak(count);
  }

  function moveTile(index) {
    if (completed) return;

    const emptyIndex = board.indexOf(null);

    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];

    if (!validMoves.includes(index)) return;

    const newBoard = [...board];
    [newBoard[index], newBoard[emptyIndex]] = [
      newBoard[emptyIndex],
      newBoard[index],
    ];

    setBoard(newBoard);
    setMoves((prev) => prev + 1);

    if (!timerStarted) setTimerStarted(true);
  }

  function restartGame() {
    setBoard(shuffle(initialBoard));
    setMoves(0);
    setTime(0);
    setCompleted(false);
    setTimerStarted(false);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-2">8 Tile Puzzle</h1>
      <p className="mb-4 text-gray-600">
        Arrange numbers in ascending order
      </p>

      <div className="grid grid-cols-3 gap-4">
        {board.map((tile, index) => (
          <button
            key={index}
            onClick={() => moveTile(index)}
            className={`w-20 h-20 text-xl font-bold rounded-lg shadow-md transition 
              ${
                tile === null
                  ? "bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {tile}
          </button>
        ))}
      </div>

      <div className="mt-6 text-lg">
        Moves: {moves} | Time: {time}s
      </div>

      <div className="mt-2 text-green-600 font-semibold">
        🔥 Current Streak: {streak}
      </div>

      <button
        onClick={restartGame}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Restart Game
      </button>

      {completed && (
        <div className="mt-4 text-green-700 font-bold">
          🎉 Puzzle Completed!
        </div>
      )}
    </div>
  );
}
