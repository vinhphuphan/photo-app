import React from "react";
import cn from "../../utils/cn";
import { cva } from "class-variance-authority";

const buttonVariants = cva("flex items-center justify-center cursor-pointer", {
  variants: {
    variant: {
      primary: "bg-primary text-white hover:bg-red-800",
      secondary: "bg-neutral-200 text-black hover:bg-neutral-300",
      normal: "bg-transparent text-black",
      icon: "bg-transparent text-gray-500 hover:bg-neutral-200",
      home: "bg-gray-900 text-white",
      menu: "px-4 py-3 hover:bg-neutral-200",
    },
    size: {
      default: "rounded p-2 text-sm md:text-base font-medium ",
      primary: "rounded-full px-2 md:px-4 py-2 md:py-3 text-sm md:text-base font-medium",
      icon: "rounded-full w-6 md:w-10 h-6 md:h-10 p-1 md:p-2",
      menu: "text-sm md:text-base font-medium justify-start",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const Button = ({
  children,
  className,
  variant,
  size,
  buttonRef,
  ...props
}) => {
  return (
    <button
      ref={buttonRef}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
