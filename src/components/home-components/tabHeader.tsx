import { Tab } from "./navbar";

type TabHeaderProps = {
  tabId: Tab;
  taskCount: number;
};

export default function TabHeader({ tabId, taskCount }: TabHeaderProps) {
  const heading = tabId.charAt(0).toUpperCase() + tabId.slice(1);

  return (
    <h1 className="w-fit flex items-center gap-5 text-black font-semibold text-4xl">
      {heading}
      {
        <span className="text-gray-700 text-3xl border border-gray-600/25 rounded-lg p-2">
          {taskCount}
        </span>
      }
    </h1>
  );
}
