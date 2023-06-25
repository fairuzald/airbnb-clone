import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
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
  formatPrice?: boolean;
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
  formatPrice,
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
            errors[id] ? "border-rose-500 placeholder:text-rose-500" : "border-neutral-300"
          } ${
            errors[id] ? "focus:border-rose-500" : "focus:border-black"
          } peer rounded-lg resize-none w-full border-bnb-border border bg-white px-4 py-3 text-black bg-transparent outline-none`}
        />
      ) : (
        <div
          className={`w-full flex ${
            errors[id] ? "border-rose-500" : "border-neutral-300"
          } ${
            errors[id] ? "focus:border-rose-500 text-rose-500" : "focus:border-black text-zinc-400"
          } border-bnb-border border rounded-lg items-center justify-center pl-4 pr-5 gap-2`}
        >
          {formatPrice && (
              <BiDollar size={24} />
          )}
          <input
            id={id}
            {...register(id, { required })}
            type={type}
            placeholder=""
            disabled={disabled}
            value={value}
            onChange={handleChange}
            className={`peer rounded-lg w-full disabled:opacity-70 disabled:cursor-not-allowed bg-white pt-[22px] pb-[10px] text-black bg-transparent outline-none`}
          />
          <label
            className={`absolute text-md ${
              formatPrice ? "left-12" : "left-4"
            } duration-150 transform  -translate-y-1 top-5 z-10 origin-[0] ${
              value && "-translate-y-4 scale-75"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
              errors[id] ? "text-rose-500" : "text-zinc-400"
            }`}
          >
            {label}
          </label>
        </div>
      )}
    </div>
  );
};

export default TextFields;
