import { openDB } from "idb";

const DB_NAME = "bluestocksPuzzleDB";
const STORE_NAME = "dailyActivity";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "date" });
      }
    },
  });
}

export async function saveDailyActivity(data) {
  const db = await initDB();
  await db.put(STORE_NAME, data);
}

export async function getDailyActivity(date) {
  const db = await initDB();
  return db.get(STORE_NAME, date);
}

export async function getAllActivity() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
