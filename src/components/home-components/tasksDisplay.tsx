import { useEffect } from "react";
import { TabKey } from "./navbar";
import { listenToTasks } from "../../utils/taskHandler";
import { ChevronRight } from "lucide-react";
import { openContextMenu, setContextTask } from "../../utils/contextMenu";
import { useTaskStore } from "../../utils/taskStore";

type TasksDisplayProps = {
  tabId: TabKey;
};

export default function TasksDisplay({ tabId }: TasksDisplayProps) {
  const setTasks = useTaskStore((s) => s.setTasks);

  useEffect(() => {
    const unsub = listenToTasks(tabId, (tasks) => {
      setTasks(tabId, tasks);
    });

    return unsub;
  }, [tabId, setTasks]);

  const tasks = useTaskStore((s) => s.taskCache[tabId]);

  return (
    <ul className="w-full h-full flex flex-col gap-4">
      {(tasks ?? []).map((task) => (
        <li
          key={task.id}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setContextTask(task);
            openContextMenu("task");
          }}
          className="flex items-center gap-4 p-2 border-b border-gray-600/15"
        >
          <label className="cursor-pointer select-none">
            <input type="checkbox" className="peer hidden" />
            <div
              className="w-4 h-4 rounded border border-gray-400
                 flex items-center justify-center
                 transition
                 peer-checked:bg-cyan-500
                 peer-checked:border-cyan-500"
            />
          </label>
          <span className="flex-1 text-sm cursor-pointer">{task.task}</span>
          <button className="cursor-pointer">
            <ChevronRight size={22} className="text-gray-600" />
          </button>
        </li>
      ))}
    </ul>
  );
}
