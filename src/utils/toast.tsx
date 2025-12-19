import toast, { ToastOptions } from "react-hot-toast";

// TODO: Add a sound effect for toasts

const toastOptions: ToastOptions = {
  duration: 4000,
  position: "bottom-right",
  removeDelay: 100,
};

export const sendErrorToast = (message: string): void => {
  toast.custom(
    (t) => (
      <div
        className={`bg-red-400 pl-1 rounded-sm origin-right ${
          t.visible ? "animate-toast-in" : "animate-toast-out"
        }`}
      >
        <div
          className={`bg-[#272727] rounded-sm p-5 origin-right ${
            t.visible ? "animate-toast-in" : "animate-toast-out"
          }`}
        >
          <span className="text-gray-400 text-sm">{message}</span>
        </div>
      </div>
    ),
    toastOptions
  );
};

export const sendSuccessToast = (message: string): void => {
  toast.custom(
    (t) => (
      <div
        className={`bg-green-400 pl-1 rounded-sm origin-right ${
          t.visible ? "animate-toast-in" : "animate-toast-out"
        }`}
      >
        <div
          className={`bg-[#272727] rounded-sm p-5 origin-right ${
            t.visible ? "animate-toast-in" : "animate-toast-out"
          }`}
        >
          <span className="text-gray-400 text-sm">{message}</span>
        </div>
      </div>
    ),
    toastOptions
  );
};
