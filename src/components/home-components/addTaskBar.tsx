import { ClipboardPen } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TabKey } from "./navbar";
import { addTask } from "../../utils/taskHandler";

type AddTaskBarProps = {
  tabId: TabKey;
};

export default function AddTaskBar({ tabId }: AddTaskBarProps) {
  const [taskInput, setTaskInput] = useState<string>("");

  const handleTaskInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskInput(e.target.value);
  };

  const handleTaskInputSubmit = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.stopPropagation();

    if (!taskInput) return;

    if (e.key === "Enter") {
      addTask(taskInput, tabId);
    }
  };

  return (
    <div className="relative">
      <ClipboardPen
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        name="task-input"
        type="text"
        placeholder="Add New Task"
        maxLength={100}
        value={taskInput}
        onChange={handleTaskInputChange}
        onKeyDown={handleTaskInputSubmit}
        className="w-full border border-gray-300 outline-none p-4 pl-12 rounded text-sm text-gray-600 placeholder:text-gray-500 focus:border-gray-600 transition-colors duration-300"
      />
    </div>
  );
}
