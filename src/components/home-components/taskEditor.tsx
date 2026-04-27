import { ChangeEvent, useState } from "react";
import { useTaskStore } from "../../hooks/taskStore";

export default function TaskEditor() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const selectedTask = useTaskStore((s) => s.selectedTask);

  const handleTaskTitleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setTaskDescription(e.target.value);
  };

  return (
    <>
      {!selectedTask ? (
        <div className="w-88 max-w-[30vw] min-h-full flex flex-col items-center justify-center gap-5 p-3 rounded-xl bg-[#f4f4f4]">
          <p className="text-gray-400 text-sm">Select a task to view details</p>
        </div>
      ) : (
        <form className="w-88 max-w-[30vw] min-h-full flex flex-col gap-5 p-3 rounded-xl bg-[#f4f4f4]">
          <h2 className="font-semibold text-2xl text-gray-700">Task:</h2>
          <input
            name="task-title"
            type="text"
            placeholder={selectedTask.task}
            value={taskTitle}
            onChange={handleTaskTitleInput}
            className="w-full border border-gray-200 outline-none p-3 rounded text-sm text-gray-500 placeholder:text-gray-400 focus:border-gray-400 transition-colors duration-300"
          />
          <textarea
            name="task-description"
            placeholder={selectedTask.description || "Description"}
            value={taskDescription}
            onChange={handleTaskDescriptionInput}
            className="w-full min-h-30 resize-none border border-gray-200 outline-none p-3 rounded text-sm text-gray-500 placeholder:text-gray-400 focus:border-gray-400 transition-colors duration-300"
          />
          <div className="max-w-fit grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 text-sm text-gray-400">
            <span className="text-sm text-gray-600 font-semibold">List</span>
            <select className="border border-gray-200 rounded outline-none">
              <option>Bruh</option>
            </select>

            <span className="text-gray-600 font-semibold">Due Date</span>
            <select className="border border-gray-200 rounded p-3">
              <option>Bruh</option>
            </select>

            <span className="text-gray-600 font-semibold">Tags</span>
            <select className="border border-gray-200 rounded p-3">
              <option>Bruh</option>
            </select>
          </div>
        </form>
      )}
    </>
  );
}
