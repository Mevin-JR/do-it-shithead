import { ArrowLeftFromLine } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="min-w-[20vw] min-h-full flex flex-col p-2 rounded-lg bg-[#f4f4f4]">
      <div className="flex gap-5 items-center justify-between">
        <h2 className="text-2xl font-semibold">Menu</h2>
        <button className="cursor-pointer">
          <ArrowLeftFromLine size={25} className="text-gray-600" />
        </button>
      </div>
    </nav>
  );
}
