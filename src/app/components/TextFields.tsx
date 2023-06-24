import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextFieldsProps {
  type?: string;
  disabled?: boolean;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: (value: string) => void;
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  textarea?: boolean;
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
  textarea,
  onChange,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    } else if (setValue) {
      setValue(newValue);
    }
  };

  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          id={id}
          {...register(id, { required })}
          placeholder={label}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className={`${
            errors[id] ? "border-rose-500" : "border-neutral-300"
          } ${
            errors[id] ? "focus:border-rose-500" : "focus:border-black"
          } peer rounded-lg resize-none w-full border-bnb-border border bg-white px-4 py-3 text-black bg-transparent outline-none`}
        />
      ) : (
        <>
          <input
            id={id}
            {...register(id, { required })}
            type={type}
            placeholder=""
            disabled={disabled}
            value={value}
            onChange={handleChange}
            className={`${
              errors[id] ? "border-rose-500" : "border-neutral-300"
            } ${
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
        </>
      )}
    </div>
  );
};

export default TextFields;
