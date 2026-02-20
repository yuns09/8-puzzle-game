import { openDB } from "idb";

const DB_NAME = "bluestocks-puzzle-db";
const STORE_NAME = "dailyActivity";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "date" });
      }
    },
  });
}

export async function saveDailyActivity(data) {
  const db = await getDB();
  return db.put(STORE_NAME, data);
}

export async function getDailyActivity(date) {
  const db = await getDB();
  return db.get(STORE_NAME, date);
}

export async function getAllActivities() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}


