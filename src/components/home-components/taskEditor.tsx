import { useState } from "react";
import { Tab } from "./navbar";
import { Task } from "../../utils/taskHandler";

type TaskEditorProps = {
  activeTab: Tab;
};

export default function TaskEditor({ activeTab }: TaskEditorProps) {
  const [selectedTask, setSelectedTask] = useState<Task>();
  return (
    <>
      {!selectedTask ? (
        <div className="w-72 max-w-[25vw] min-h-full flex flex-col items-center justify-center gap-5 p-3 rounded-xl bg-[#f4f4f4]">
          <p className="text-gray-400 text-sm">Select a task to view details</p>
        </div>
      ) : (
        <div className="w-72 max-w-[25vw] min-h-full flex flex-col gap-5 p-3 rounded-xl bg-[#f4f4f4]">
          <h2>Task:</h2>
        </div>
      )}
    </>
  );
}
