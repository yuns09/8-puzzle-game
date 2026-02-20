import { useEffect, useState } from "react";
import { getAllActivities } from "../lib/db";

function Heatmap() {
  const [activities, setActivities] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAllActivities();
    setActivities(data);
    calculateStreak(data);
  };

  const calculateStreak = (data) => {
    const today = new Date();
    let currentStreak = 0;

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const formatted = checkDate.toISOString().split("T")[0];

      const found = data.find((item) => item.date === formatted);

      if (found && found.solved) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const getColor = (date) => {
    const found = activities.find((item) => item.date === date);

    if (!found) return "bg-gray-200";
    if (found.score > 80) return "bg-green-600";
    if (found.score > 50) return "bg-green-400";
    return "bg-green-300";
  };

  const generateLast30Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }

    return days;
  };

  return (
    <div className="mt-8 text-center">
      <h3 className="text-lg font-semibold mb-2">🔥 Current Streak: {streak}</h3>

      <div className="grid grid-cols-10 gap-2 justify-center">
        {generateLast30Days().map((date, index) => (
          <div
            key={index}
            className={`h-6 w-6 rounded ${getColor(date)}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Heatmap;
