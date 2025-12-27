type TabHeaderProps = {
  heading: string;
  notifValue?: number;
};

export default function TabHeader({ heading, notifValue = 0 }: TabHeaderProps) {
  return (
    <h1 className="w-fit flex items-center gap-5 text-black font-semibold text-4xl">
      {heading}
      {
        <span className="text-gray-700 text-3xl border border-gray-600/25 rounded-lg p-2">
          {notifValue}
        </span>
      }
    </h1>
  );
}
