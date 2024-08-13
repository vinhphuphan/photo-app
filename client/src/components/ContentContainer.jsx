import React from "react";
import cn from "../utils/cn";
import { cva } from "class-variance-authority";

const contentContainerVariants = cva("flex flex-col justify-center", {
  variants: {
    variant: {
      default: "bg-white rounded-xl overflow-hidden",
      profile: "",
    },
    size: {
      default: "w-full h-[85vh] md:w-4/6 xl:w-[60%] py-10 px-14",
      profile: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const ContentContainer = ({ children, className, variant, size, ...props }) => {
  return (
    <div
      className="
            fixed w-full h-full top-20 z-0 pt-2
            flex items-start justify-center overflow-auto
            bg-neutral-200"
    >
      <div
        className={cn(contentContainerVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;
