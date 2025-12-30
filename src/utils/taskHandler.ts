import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { TabKey } from "../components/home-components/navbar";
import { auth, db } from "../../firebase";

export type TaskType = {
  id: string;
  task: string;
  list: string; // TODO: Change this when lists types are specified
  dueDate: Timestamp | null;
  createdAt: Timestamp;
};

export const addTask = async (task: string, tabId: TabKey): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = await addDoc(
    collection(db, "users", user.uid, "tabs", tabId, "tasks"),
    {
      task,
      list: "",
      dueDate: null,
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
};

export const listenToTasks = (
  tabId: TabKey,
  callback: (tasks: any[]) => void
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(
    collection(db, "users", user.uid, "tabs", tabId, "tasks"),
    orderBy("createdAt", "asc")
  );

  const unsub = onSnapshot(q, (snap) => {
    const tasks = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(tasks);
  });

  return unsub;
};
