import {
  ArrowLeftFromLine,
  CalendarDays,
  ListTodo,
  LucideIcon,
  Search,
  CalendarArrowUp,
  Plus,
} from "lucide-react";

type tasksNavItemsType = {
  name: string;
  icon: LucideIcon;
};

const tasksNavItems: tasksNavItemsType[] = [
  { name: "Upcoming", icon: CalendarArrowUp },
  { name: "Today", icon: ListTodo },
  { name: "Calender", icon: CalendarDays },
];

const listsNavItems = [
  { name: "Personal", iconColour: "rgba(255, 0, 0, 0.7)" },
  { name: "Work", iconColour: "rgba(0, 183, 235, 0.7)" },
];

export default function Navbar() {
  return (
    <nav className="w-72 max-w-[25vw] min-h-full flex flex-col gap-5 p-3 rounded-xl bg-[#f4f4f4]">
      {/* Menu title & Collapse button */}
      <div className="w-full flex gap-5 items-center justify-between">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button className="cursor-pointer">
          <ArrowLeftFromLine size={22} className="text-gray-600" />
        </button>
      </div>

      {/* Search Field */}
      <div className="relative w-full">
        <Search
          size={16}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600"
        />
        <input
          type="text"
          placeholder="Search"
          maxLength={30}
          className="w-full border border-gray-300 outline-none p-2 pl-8 rounded text-sm text-gray-600 placeholder:text-gray-600 focus:border-gray-600 transition-colors duration-300"
        />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {/* Tasks Nav Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-black font-semibold text-xs">TASKS</h3>
          <ul>
            {tasksNavItems.map((item) => (
              <li className="p-2 rounded-lg hover:bg-[#edebeb] hover:cursor-pointer">
                <a className="flex items-center gap-3">
                  <span>
                    {<item.icon size={18} className="text-gray-600" />}
                  </span>
                  <span className="text-gray-600 text-sm">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="text-gray-400/15" />

        {/* Lists */}
        <div className="flex flex-col gap-2">
          <h3 className="text-black font-semibold text-xs">LISTS</h3>
          <ul>
            {listsNavItems.map((item) => (
              <li className="p-2 rounded-lg hover:bg-[#edebeb] hover:cursor-pointer">
                <a className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded`}
                    style={{ backgroundColor: item.iconColour }}
                  />
                  <span className="text-gray-600 text-sm">{item.name}</span>
                </a>
              </li>
            ))}
            <li className="p-2 rounded-lg hover:bg-[#edebeb] hover:cursor-pointer">
              <a className="flex items-center gap-3">
                <span>
                  <Plus size={18} className="text-gray-600" />
                </span>
                <span className="text-gray-600 text-sm">Add new list</span>
              </a>
            </li>
          </ul>
        </div>

        <hr className="text-gray-400/15" />
      </div>
    </nav>
  );
}
