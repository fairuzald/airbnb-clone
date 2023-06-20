"use client";
import React from "react";

interface ButtonProps {
  children: string | JSX.Element;
  color: "white" | "red";
  onClick?:
    | React.FormEventHandler<HTMLFormElement>
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  onClick,
  disabled,
}) => {
  const colorEffect = {
    white: "bg-white border border-black text-black",
    red: "bg-bnb-red text-white",
  };
  return (
    <button
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      className={`${colorEffect[color]} flex disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 w-full items-center justify-center gap-4 rounded-md px-4 lg:px-5 py-2 lg:py-3 text-sm lg:text-base transition duration-300 `}
    >
      <p className="block text-sm lg:text-base font-bold">{children}</p>
    </button>
  );
};

export default Button;
