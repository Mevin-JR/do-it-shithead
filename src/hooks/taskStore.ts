import { create } from "zustand";
import { TabKey } from "../components/home-components/navbar";
import { TaskType } from "../utils/taskHandler";

type TaskStore = {
  taskCache: Partial<Record<TabKey, TaskType[]>>;
  setTasks: (tabId: TabKey, tasks: TaskType[]) => void;
  getTotalCount: () => number;
  getTabCount: (tab: TabKey) => number;
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
