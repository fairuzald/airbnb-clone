"use client";
import React, { Dispatch, SetStateAction } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface TextFieldsProps {
  type: string;
  disabled?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const TextFields: React.FC<TextFieldsProps> = ({
  type,
  disabled,
  value,
  setValue,
  required,
  id,
  register,
  errors,
  label,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        {...register(id, { required })}
        type={type}
        placeholder=""
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "focus:border-rose-500" : "focus:border-black"
        } peer rounded-lg w-full border-bnb-border border bg-white px-4 pt-[22px] pb-[10px] text-black bg-transparent outline-none`}
      />
      <label
        className={`
          absolute 
          text-md
          left-4
          duration-150 
          transform 
          -translate-y-1 
          top-5 
          z-10 
          origin-[0] 
          ${value && "-translate-y-4 scale-75"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextFields;
