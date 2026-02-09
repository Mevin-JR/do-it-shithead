type InputProps = {
  label: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, icon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col w-full">
        <p className="text-black text-sm font-medium leading-normal pb-1">
          {label}
        </p>
        <div className="relative w-full">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center justify-center text-gray-400">
              {icon}
            </span>
          )}

          <input
            {...props}
            className="flex w-full min-w-0 h-12 pl-10 pr-4 text-sm text-gray-900 font-normal leading-normal rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200"
          />
        </div>
      </label>
    </div>
  );
}
