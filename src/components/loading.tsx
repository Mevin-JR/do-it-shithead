import { useEffect, useState } from "react";

const loaderCaptions: string[] = [
  "Loading, please wait...",
  "Doing some magic...",
  "Preparing your content...",
  "Optimizing pixels...",
  "Almost there...",
];

export default function Loading() {
  const [loadingCaption, setLoadingCaption] = useState<string>(
    "Loading, please wait..."
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingCaption((prev) => {
        let next;
        do {
          next =
            loaderCaptions[Math.floor(Math.random() * loaderCaptions.length)];
        } while (next === prev);
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute w-screen h-screen flex items-center justify-center backdrop-blur">
      <div className="w-[95%] h-[95%] flex flex-col gap-3 items-center justify-center rounded-lg bg-[#f4f4f4] dark:bg-[#141414] shadow-[0_0_25px_10px_rgba(0,0,0,0.25)] smooth-transition">
        <div className="loader text-[#78c9f1] dark:text-[#fed43c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]" />
        <p className="text-[#78c9f1] dark:text-[#fed43c] text-shadow-[0_2px_3px_rgba(0,0,0,0.25)] dark:text-shadow-[0_2px_3px_rgba(255,255,255,0.25)]">
          {loadingCaption}
        </p>
      </div>
    </div>
  );
}
