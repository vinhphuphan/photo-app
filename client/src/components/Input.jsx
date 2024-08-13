import cn from "../utils/cn.js";
import { cva } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  "block w-full p-3 rounded-xl bg-white border-[1px] text-sm text-gray-900",
  {
    variants: {
      variant: {
        primary: "border-blue-500 focus:border-blue-700",
        error: "border-rose-500 focus:border-rose-500",
        neutral: "border-neutral-400 focus:border-black",
      },
      size: {
        small: "p-2 text-xs",
        default: "p-3 text-sm",
        large: "p-4 text-base",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
);

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  required,
  register,
  disabled,
  errors,
  className,
  commentInput,
  value,
  onChange,
  variant,
  size,
  ...props
}) => {
  
  const inputClassName = cn(
    inputVariants({ variant: errors[id] ? "error" : variant, size }),
    {
      "disabled:bg-gray-200": disabled,
      "disabled:cursor-not-allowed": disabled,
    },
    className
  );

  return (
    <div className={`w-full flex ${commentInput ? "" : "relative flex-col"} `}>
      {!commentInput && (
        <label className="ml-3 mb-2 text-xs md:text-sm" htmlFor={label}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          {...register(id, { required })}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
