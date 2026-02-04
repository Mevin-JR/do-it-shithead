import { create } from "zustand";
import { Tab } from "../components/home-components/navbar";
import { Task } from "../utils/taskHandler";

type TaskStore = {
  taskCache: Partial<Record<Tab, Task[]>>;
  setTasks: (tabId: Tab, tasks: Task[]) => void;
  getTotalCount: () => number;
  getTabCount: (tab: Tab) => number;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  taskCache: {},
  setTasks: (tabId, tasks) =>
    set((state) => ({
      taskCache: { ...state.taskCache, [tabId]: tasks },
    })),
  getTotalCount: () =>
    Object.values(get().taskCache).reduce(
      (sum, tasks) => sum + (tasks?.length ?? 0),
      0,
    ),
  getTabCount: (tabId) => get().taskCache[tabId]?.length ?? 0,
}));
