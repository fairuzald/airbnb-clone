import React, { useCallback } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Counter = ({
  title,
  subtitle,
  value,
  onChange,
  lastItem,
}: {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  lastItem?: boolean;
}) => {
  const onAdd = useCallback(() => {
    const newValue = value + 1;
    onChange(newValue);
  }, [onChange, value]);
  const onReduce = useCallback(() => {
    const newValue = value - 1;
    onChange(newValue);
  }, [onChange, value]);
  return (
    <div
      className={`flex justify-between items-center ${
        !lastItem && "border-b-bnb-border border-b"
      } py-5  w-full`}
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-base font-medium text-black">{title}</p>
        <p className="text-base font-medium text-gray-600">{subtitle}</p>
      </div>
      <div
        className={`flex items-center justify-center ${
          value >= 10 ? "gap-4" : "gap-[22px]"
        }`}
      >
        <button
          disabled={value <= 1}
          onClick={onReduce}
          className="w-10 disabled:cursor-not-allowed h-10 rounded-full border border-neutral-600 flex items-center justify-center text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </button>
        <p className="text-xl text-neutral-600">{value}</p>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full border border-neutral-600 flex items-center justify-center text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
