import cn from "../utils/cn.js";

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
}) => {
  // Define dynamic class names based on props and errors
  const inputClassName = cn(
    "block",
    "w-full",
    "p-3",
    "rounded-xl",
    "bg-white",
    "border-[1px]",
    "text-sm",
    "text-gray-900",
    {
      "disabled:bg-gray-200": disabled,
      "disabled:cursor-not-allowed": disabled,
    },
    { "border-rose-500": errors[id], "focus:border-rose-500": errors[id] },
    { "border-neutral-400": !errors[id] },
    { "focus:border-black": !errors[id] }
  );

  return (
    <div className="w-full relative flex flex-col">
      <label className="ml-3 mb-2 text-sm" htmlFor={label}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          {...register(id, { required })}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(className, inputClassName)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(className, inputClassName)}
        />
      )}
    </div>
  );
};

export default Input;
