import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { Tab } from "../components/home-components/navbar";
import { auth, db } from "../../firebase";

// FIXME: Move this into types dir (when created)
export type Task = {
  id: string;
  tabId: Tab;
  task: string;
  list: string; // TODO: Change this when lists types are specified
  dueDate?: Timestamp;
  createdAt: Timestamp;
};

/**
 * Adds a new task to the specified tab of the user's task collection
 *
 * NOTE:
 * - The user auth status is checked before writing to Firestore document
 * - Writes to `users/{uid}/tabs/{tabId}/tasks`
 * - Throws if user is not authenticated
 *
 * WARNING:
 * - Auth state relies on `auth.currentUser` and may be stale in edge cases
 *
 * @param task The task text provided by the user
 * @param tabId ID of the specified tab
 * @returns The Firestore document id of the task document
 *
 * @throws Error if user is not authenticated
 */
export const addTask = async (task: string, tabId: Tab): Promise<string> => {
  // HACK: UID should be sourced from UI auth context
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = await addDoc(
    collection(db, "users", user.uid, "tabs", tabId, "tasks"),
    {
      tabId,
      task,
      list: "",
      dueDate: null,
      createdAt: serverTimestamp(),
    },
  );

  return docRef.id;
};

/**
 * Remove a task from the specified tab of the user's task collection
 *
 * NOTE:
 * - Does not check if the task exists before deleting
 * - Resolves even if task does not exist
 * - Deletes `users/{uid}/tabs/{tabId}/tasks/{taskId}`
 *
 * @param taskId The id of the task Firestore document
 * @param tabId ID of the specified tab
 * @returns Promise resolution of the `deleteDoc` method
 *
 * @throws Error if user is not authenticated
 */
export const removeTask = async (taskId: string, tabId: Tab) => {
  // HACK: UID should be sourced from UI auth context
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  return deleteDoc(doc(db, "users", user.uid, "tabs", tabId, "tasks", taskId));
};

/**
 * Subscribes to realtime updates of tasks for a specified tab
 *
 * Sets up a Firestore `onSnapshot` listener on:
 * `users/{uid}/tabs/{tabId}/tasks`
 *
 * NOTE:
 * - Tasks are ordered by `createdAt` ascending
 * - Listener stays active until returned unsubscribe function is called
 *
 * @param tabId ID of the tab whose tasks should be observed
 * @param callback Function invoked with the latest task list on every snapshot update
 * @returns Unsubscribe function to stop listening to task updates
 *
 * @throws Error if user is not authenticated
 */
// TODO: Rectify loose typing of tasks array in the callback function
export const listenToTasks = (tabId: Tab, callback: (tasks: any[]) => void) => {
  // HACK: UID should be sourced from UI auth context
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(
    collection(db, "users", user.uid, "tabs", tabId, "tasks"),
    orderBy("createdAt", "asc"),
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
