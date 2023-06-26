"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen?: boolean;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const Modals: React.FC<ModalProps> = ({ isOpen, body, footer, header }) => {
  // State to track if the component is mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set the mounted state to true when the component mounts
    setMounted(true);
  }, []);

  if (!mounted) {
    // If the component is not mounted yet, return null
    return null;
  }

  return (
    <>
      {typeof document !== "undefined" && (
        <>
          {ReactDOM.createPortal(
            <>
              <div
                className={`fixed ${
                  isOpen
                    ? "opacity-100 -translate-y-1/2"
                    : "translate-y-0 pointer-events-none opacity-0"
                } left-1/2 top-1/2 z-50 flex h-fit w-[90vw] translate
               max-w-[320px] -translate-x-1/2 translate transform flex-col items-center justify-center  rounded-xl bg-white py-4 text-white transition duration-300  sm:w-[60vw] sm:max-w-[550px] sm:items-start`}
              >
                {/* Main content */}
                {header}
                <div className="flex w-full  p-6 flex-col gap-8 sm:w-full">
                  {/* Content */}
                  {body}
                  {footer}
                </div>
              </div>
              <span
                className={` ${
                  isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                } fixed z-[49] inset-0 flex w-full bg-neutral-800/70 transition-opacity duration-300`}
              ></span>
            </>,
            document.getElementById("portal") as HTMLElement
          )}
        </>
      )}
    </>
  );
};

export default Modals;
